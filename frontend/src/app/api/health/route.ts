import { NextResponse } from 'next/server';
import { globalChunks } from '@/lib/server-state';

export async function GET() {
  const subjects = Array.from(new Set(globalChunks.map((c) => c.subject)));
  return NextResponse.json({
    status: 'healthy',
    runtime: 'Vercel Serverless Node.js',
    total_chunks: globalChunks.length,
    subjects,
  });
}
