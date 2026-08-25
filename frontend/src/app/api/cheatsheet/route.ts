import { NextRequest, NextResponse } from 'next/server';
import { globalChunks, askGroq } from '@/lib/server-state';

export async function POST(req: NextRequest) {
  try {
    const { subject, source_file, doc_type } = await req.json();

    const subChunks = globalChunks
      .filter((c) => c.subject.toLowerCase() === subject.toLowerCase() && (!source_file || c.source === source_file))
      .slice(0, 10);
    const context = subChunks.map((c) => c.text).join('\n\n');

    const prompt = `Create a comprehensive markdown study document of type '${doc_type}' for '${subject}'. Use markdown tables, clear sections, key formulas, and definitions.\n\nNotes:\n${context || subject}`;
    const doc = await askGroq(prompt, 0.3);

    return NextResponse.json({ content: doc, doc_type, subject });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'CheatSheet error' }, { status: 500 });
  }
}
