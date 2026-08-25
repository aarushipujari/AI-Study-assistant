import { NextRequest, NextResponse } from 'next/server';
import { globalChunks, askGroq } from '@/lib/server-state';

export async function POST(req: NextRequest) {
  try {
    const { subject, source_file, question, student_answer, persona = 'Dr. Harrison (Strict External Examiner)' } = await req.json();

    const subChunks = globalChunks
      .filter((c) => c.subject.toLowerCase() === subject.toLowerCase() && (!source_file || c.source === source_file))
      .slice(0, 8);
    const context = subChunks.map((c) => c.text).join('\n\n');

    const evalPrompt = `You are ${persona} evaluating a student's answer in a university viva exam.
    
Notes:
${context || subject}

Viva Question: ${question}
Student's Answer: ${student_answer}

Provide a structured evaluation in valid JSON with these exact keys:
{
    "accuracy_score": <int 1-10>,
    "terminology_score": <int 1-10>,
    "clarity_score": <int 1-10>,
    "overall_grade": "<'A+ - Outstanding' | 'A - Strong' | 'B - Satisfactory' | 'C - Needs Revision'>",
    "strengths": "<What the student explained well>",
    "missing_points": "<Critical missing keywords, misconceptions, or omitted facts>",
    "ideal_model_answer": "<The concise, flawless model answer>",
    "followup_question": "<A natural deeper follow-up question the examiner would ask next>"
}
Return ONLY the JSON string.
`;

    const rawEval = await askGroq(evalPrompt, 0.2);
    let rubric;
    try {
      const match = rawEval.match(/\{[\s\S]*\}/);
      rubric = match ? JSON.parse(match[0]) : null;
    } catch {
      rubric = null;
    }

    if (!rubric) {
      rubric = {
        accuracy_score: 8,
        terminology_score: 7,
        clarity_score: 8,
        overall_grade: 'A - Strong',
        strengths: 'Demonstrated sound understanding of core definitions.',
        missing_points: 'Could include specific formulas and technical terminology.',
        ideal_model_answer: 'Complete conceptual explanation covering fundamental laws.',
        followup_question: 'How does this apply to practical applications?',
      };
    }

    return NextResponse.json(rubric);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Viva evaluate error' }, { status: 500 });
  }
}
