import { NextRequest, NextResponse } from 'next/server';
import { globalChunks } from '@/lib/server-state';

function extractTextFromBuffer(buffer: Buffer): string {
  const raw = buffer.toString('latin1');
  // Extract text from standard PDF streams
  const textBlocks: string[] = [];
  const regex = /\(([^)]+)\)\s*Tj/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    textBlocks.push(match[1]);
  }

  if (textBlocks.length > 5) {
    return textBlocks.join(' ');
  }

  // Fallback: extract all readable ASCII / UTF-8 characters
  const clean = raw.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
  return clean.replace(/\s+/g, ' ');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const subject = (formData.get('subject') as string) || 'General';
    const files = formData.getAll('files') as File[];

    let newChunksCount = 0;

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      let text = '';

      if (file.name.toLowerCase().endsWith('.pdf')) {
        text = extractTextFromBuffer(buffer);
      } else {
        text = buffer.toString('utf-8');
      }

      const words = text.split(/\s+/).filter(Boolean);
      let start = 0;
      while (start < words.length) {
        const end = start + 400;
        const chunkStr = words.slice(start, end).join(' ');
        if (chunkStr.trim().length > 10) {
          globalChunks.push({
            text: chunkStr,
            source: file.name,
            subject: subject.trim().toLowerCase(),
          });
          newChunksCount++;
        }
        start += 340;
      }
    }

    return NextResponse.json({
      message: `Successfully indexed ${newChunksCount} chunks for "${subject}"`,
      new_chunks_count: newChunksCount,
      total_chunks: globalChunks.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to upload notes' },
      { status: 500 }
    );
  }
}
