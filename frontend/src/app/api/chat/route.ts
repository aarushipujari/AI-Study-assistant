import { NextRequest, NextResponse } from 'next/server';
import { retrieveChunks, askGroq, searchTavily } from '@/lib/server-state';

export async function POST(req: NextRequest) {
  try {
    const { subject, query, framing_style = 'Exam Standard (5/10 Mark Format)', top_k = 4, model = 'llama-3.3-70b-versatile' } = await req.json();

    const retrieved = retrieveChunks(query, subject, top_k);
    const notesContext = retrieved.map((c) => `[Source: ${c.source} | Match: ${c.score}%]\n${c.text}`).join('\n\n');

    const framingInstructions: Record<string, string> = {
      'Exam Standard (5/10 Mark Format)': 'Format like a top-scoring exam answer with bold headings, numbered points, definitions, and key formulas.',
      'Feynman Technique (Intuitive & Simple)': 'Explain using simple analogies, everyday language, and intuitive examples.',
      'High-Yield Bullet Points': 'Provide concise, rapid-revision high-yield bullet points with zero fluff.',
      'Step-by-Step Derivation / Formulas': 'Focus heavily on equations, derivations, step-by-step logic, and SI units.',
    };

    const styleGuide = framingInstructions[framing_style] || 'Format clearly with headings.';

    const notesPrompt = `You are an elite university professor. Answer using ONLY the provided lecture note context below.
Style instruction: ${styleGuide}

Context from Course Notes:
${notesContext || 'No specific course notes found for this inquiry. Provide general academic explanation.'}

Question: ${query}

Answer:`;

    const notesAnswer = await askGroq(notesPrompt, 0.3, model);

    const webResults = await searchTavily(`${subject} ${query}`, 3);
    let webAnswer = 'No external web references available.';
    if (webResults.length > 0) {
      const webContext = webResults.map((r: any) => `${r.title}: ${r.content}`).join('\n\n');
      const webPrompt = `Summarize live web info for academic topic: '${query}'.\n\nContext:\n${webContext}\n\nAnswer:`;
      webAnswer = await askGroq(webPrompt, 0.4, model);
    }

    const fuPrompt = `Based on question '${query}' in ${subject}, provide exactly 3 short follow-up study questions. Format as lines starting with '-'.`;
    const fuRaw = await askGroq(fuPrompt, 0.5, model);
    const followups = fuRaw
      .split('\n')
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => line.replace(/^-\s*/, '').trim());

    return NextResponse.json({
      notes_answer: notesAnswer,
      web_answer: webAnswer,
      citations: retrieved.map((c) => ({
        source: c.source,
        score: c.score,
        snippet: c.text.slice(0, 240),
      })),
      web_sources: webResults.map((r: any) => ({
        title: r.title,
        url: r.url,
      })),
      suggested_followups: followups.length > 0 ? followups : [
        `What are the practical applications of ${subject}?`,
        `Derive the fundamental equation in this topic`,
        `What are the typical exam pitfalls here?`
      ],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Chat error' }, { status: 500 });
  }
}
