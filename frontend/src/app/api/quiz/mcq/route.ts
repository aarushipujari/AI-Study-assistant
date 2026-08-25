import { NextRequest, NextResponse } from 'next/server';
import { globalChunks, askGroq } from '@/lib/server-state';

export async function POST(req: NextRequest) {
  try {
    const { subject, source_file, num_questions = 5 } = await req.json();

    const subChunks = globalChunks
      .filter((c) => c.subject.toLowerCase() === subject.toLowerCase() && (!source_file || c.source === source_file))
      .slice(0, 8);
    const context = subChunks.map((c) => c.text).join('\n\n');

    const prompt = `Generate ${num_questions} tricky multiple choice questions from the notes below.
Output ONLY valid JSON format:
[
  {
    "question": "Question text here",
    "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
    "correct_option": "A",
    "explanation": "Detailed explanation of why A is correct."
  }
]
Notes:
${context || subject}`;

    const raw = await askGroq(prompt, 0.3);
    let mcqs = [];
    try {
      const match = raw.match(/\[[\s\S]*\]/);
      mcqs = match ? JSON.parse(match[0]) : [];
    } catch {
      mcqs = [];
    }

    if (mcqs.length === 0) {
      mcqs = [
        {
          question: `Core concept in ${subject}?`,
          options: ['A. Fundamental Law', 'B. Secondary Case', 'C. Invalid Assumption', 'D. Noise Factor'],
          correct_option: 'A',
          explanation: `A is correct based on core syllabus in ${subject}.`,
        },
      ];
    }

    return NextResponse.json({ questions: mcqs });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Quiz error' }, { status: 500 });
  }
}
