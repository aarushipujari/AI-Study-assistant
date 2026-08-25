import { NextRequest, NextResponse } from 'next/server';
import { globalChunks, askGroq } from '@/lib/server-state';

export async function POST(req: NextRequest) {
  try {
    const { subject, source_file, persona = 'Dr. Harrison (Strict External Examiner)', difficulty = 'Standard University' } = await req.json();

    const subChunks = globalChunks
      .filter((c) => c.subject.toLowerCase() === subject.toLowerCase() && (!source_file || c.source === source_file))
      .slice(0, 8);
    const context = subChunks.map((c) => c.text).join('\n\n');

    const prompt = `You are ${persona} conducting a university oral viva exam on '${subject}'.
Difficulty level: ${difficulty}.
Generate ONE sharp, direct viva oral question based strictly on the notes below. Output ONLY the question.

Notes:
${context || subject}`;

    const q = await askGroq(prompt, 0.7);
    return NextResponse.json({ question: q, subject, source_file });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Viva question error' }, { status: 500 });
  }
}
