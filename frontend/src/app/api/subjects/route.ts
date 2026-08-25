import { NextResponse } from 'next/server';
import { globalChunks } from '@/lib/server-state';

export async function GET() {
  const subjectNames = Array.from(new Set(globalChunks.map((c) => c.subject)));
  const subjects = subjectNames.map((name) => {
    const sChunks = globalChunks.filter((c) => c.subject === name);
    const sources = Array.from(new Set(sChunks.map((c) => c.source)));
    return {
      name,
      chunk_count: sChunks.length,
      sources,
    };
  });

  return NextResponse.json({ subjects });
}
