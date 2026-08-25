import { NextRequest, NextResponse } from 'next/server';
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Subject name parameter required' }, { status: 400 });
    }

    const target = name.toLowerCase();
    for (let i = globalChunks.length - 1; i >= 0; i--) {
      if (globalChunks[i].subject.toLowerCase() === target) {
        globalChunks.splice(i, 1);
      }
    }

    return NextResponse.json({
      message: `Successfully removed subject "${name}"`,
      remaining_chunks: globalChunks.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Delete failed' }, { status: 500 });
  }
}
