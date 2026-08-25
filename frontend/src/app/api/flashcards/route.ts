import { NextRequest, NextResponse } from 'next/server';
import { globalChunks, askGroq } from '@/lib/server-state';

export async function POST(req: NextRequest) {
  try {
    const { subject, source_file, count = 8, focus = 'Core Definitions' } = await req.json();

    const subChunks = globalChunks
      .filter((c) => c.subject.toLowerCase() === subject.toLowerCase() && (!source_file || c.source === source_file))
      .slice(0, 8);
    const context = subChunks.map((c) => c.text).join('\n\n');

    const prompt = `Create ${count} high-yield study flashcards from the notes below. Focus on: ${focus}.
Output ONLY valid JSON format:
[
  {
    "question": "Concept or Question?",
    "answer": "Clear, concise definition and key formula/points.",
    "topic": "${subject}"
  }
]
Notes:
${context || subject}`;

    const raw = await askGroq(prompt, 0.4);
    let cards = [];
    try {
      const match = raw.match(/\[[\s\S]*\]/);
      cards = match ? JSON.parse(match[0]) : [];
    } catch {
      cards = [];
    }

    if (cards.length === 0) {
      cards = [
        {
          question: `Key Principle of ${subject}`,
          answer: `Fundamental theorems, operating characteristics, and standard formulas in ${subject}.`,
          topic: subject,
        },
      ];
    }

    return NextResponse.json({ flashcards: cards });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Flashcard error' }, { status: 500 });
  }
}
