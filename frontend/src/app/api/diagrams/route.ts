import { NextRequest, NextResponse } from 'next/server';
import { globalChunks, askGroq } from '@/lib/server-state';

export async function POST(req: NextRequest) {
  try {
    const { subject, topic, diagram_type = 'Anatomical Sketch & Step-by-Step Exam Guide' } = await req.json();

    const subChunks = globalChunks
      .filter((c) => c.subject.toLowerCase() === subject.toLowerCase())
      .slice(0, 8);
    const context = subChunks.map((c) => c.text).join('\n\n');

    const prompt = `You are a distinguished Professor of Medicine, Anatomy, and Physiology.
The student needs to understand and DRAW a complete, exam-scoring medical/scientific diagram for: "${topic}" in subject: "${subject}".
Diagram Type: "${diagram_type}".

Available Subject Notes (if applicable):
${context || topic}

Generate a comprehensive JSON object with these EXACT keys:
{
  "title": "<Concise official diagram title>",
  "mermaid_code": "<Valid, syntax-error-free Mermaid.js diagram code starting with 'graph TD' or 'flowchart TD' or 'sequenceDiagram'. Keep node labels alphanumeric and short without parentheses or special characters.>",
  "drawing_steps": [
    "Step 1: <Detailed physical sketching instruction for exam answer sheet>",
    "Step 2: <Next anatomical/structural part to draw>",
    "Step 3: <How to connect branches, vessels, or chambers>",
    "Step 4: <Final finishing strokes and orientations>"
  ],
  "labels_checklist": [
    "<Crucial label 1 with high-yield function note>",
    "<Crucial label 2 with high-yield function note>",
    "<Crucial label 3 with high-yield function note>",
    "<Crucial label 4 with high-yield function note>",
    "<Crucial label 5 with high-yield function note>"
  ],
  "color_coding_guide": [
    "<Pen/Pencil color recommendation for specific structures (e.g. Red for Arteries/Oxygenated, Blue for Veins, Yellow for Nerves)>"
  ],
  "high_yield_mnemonics": "<High-yield memory hook, mnemonic acronym, or visual peg to memorize this structure/pathway instantly>",
  "clinical_correlation": "<High-yield MBBS clinical/pathology correlation tested in exams or ward rounds>"
}

Output ONLY the JSON object. Ensure Mermaid code has clean syntax without syntax errors.`;

    const raw = await askGroq(prompt, 0.2);
    let parsed;
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    } catch {
      parsed = null;
    }

    if (!parsed || !parsed.title) {
      parsed = {
        title: topic,
        mermaid_code: `graph TD
    A[Receptor / Stimulus] --> B[Afferent Pathway]
    B --> C[Central Processing Unit]
    C --> D[Efferent Pathway]
    D --> E[Effector Organ / Response]`,
        drawing_steps: [
          `Step 1: Draw the primary structural outline for ${topic}.`,
          `Step 2: Add the internal compartments and functional zones.`,
          `Step 3: Trace the flow direction with directional arrows.`,
          `Step 4: Add clear leader lines to the right-hand margin for labeling.`
        ],
        labels_checklist: [
          `Primary functional structure`,
          `Vascular or nerve supply`,
          `Input and output pathways`,
          `Key histological layer`
        ],
        color_coding_guide: [
          `Red: Arterial / Active stimulation`,
          `Blue: Venous / Inhibitory return`,
          `Yellow: Nerve conduction / Signals`
        ],
        high_yield_mnemonics: `Associate structure with primary physiological function.`,
        clinical_correlation: `Lesions or dysfunctions in this pathway cause classic university exam clinical syndromes.`
      };
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Diagram generation error' }, { status: 500 });
  }
}
