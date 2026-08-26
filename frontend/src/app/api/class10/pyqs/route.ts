import { NextRequest, NextResponse } from 'next/server';
import { askGroq } from '@/lib/server-state';
import { CLASS10_CHAPTERS } from '@/lib/class10-data';

export async function POST(req: NextRequest) {
  try {
    const { chapterId, questionType = 'All Sections (CBSE Board Full Paper Mix)', yearRange = '2019-2024' } = await req.json();

    const chapter = CLASS10_CHAPTERS.find((c) => c.id === chapterId) || CLASS10_CHAPTERS[0];

    const prompt = `You are a Senior CBSE Class 10 Board Examiner and NCERT Master Educator.
Generate authentic CBSE Class 10 Board Previous Year Questions (PYQs) and Exemplar problems for Chapter: "${chapter.name}" (${chapter.subject}).
Question Type Focus: "${questionType}".
CBSE Years: "${yearRange}".

NCERT Chapter Core Syllabus:
${chapter.coreConceptsSummary}

Generate a comprehensive JSON response with this exact structure:
{
  "chapter_name": "${chapter.name}",
  "subject": "${chapter.subject}",
  "official_ncert_url": "${chapter.officialPdfUrl}",
  "high_yield_weightage": "${chapter.highYieldWeightage}",
  "pyq_collection": [
    {
      "id": "pyq_1",
      "year": "CBSE 2023 (Set 1)",
      "marks": 1,
      "questionType": "MCQ / Assertion-Reason",
      "question": "<High-yield board question with 4 options or Assertion-Reason>",
      "cbseModelAnswer": "<Precise answer with option letter & explanation>",
      "markingSchemePoints": [
        "1 Mark: Correct option identified with scientific reason"
      ],
      "commonMistakes": "<Typical mistake students make on board answer sheets>"
    },
    {
      "id": "pyq_2",
      "year": "CBSE 2022 (Term 2)",
      "marks": 3,
      "questionType": "Standard (3M)",
      "question": "<3-Mark conceptual or numerical question with values and SI units>",
      "cbseModelAnswer": "<Step-by-step model solution>",
      "markingSchemePoints": [
        "1 Mark: Stating the formula / law",
        "1 Mark: Step-by-step substitution with units",
        "1 Mark: Final answer with correct SI unit"
      ],
      "commonMistakes": "<Missing SI units or calculation errors>"
    },
    {
      "id": "pyq_3",
      "year": "CBSE 2024 (Compartment / Main)",
      "marks": 5,
      "questionType": "Long Answer / Derivation (5M)",
      "question": "<5-Mark comprehensive question with ray diagram / circuit / balanced equation>",
      "cbseModelAnswer": "<Full structured 5-mark answer with diagram guidelines>",
      "markingSchemePoints": [
        "2 Marks: Neat labeled diagram with arrows",
        "2 Marks: Working principle & derivation steps",
        "1 Mark: Concluding inference / sub-question"
      ],
      "commonMistakes": "<Incomplete arrow marks on ray diagrams or unbalanced equations>"
    },
    {
      "id": "pyq_4",
      "year": "CBSE 2023 Sample Paper",
      "marks": 4,
      "questionType": "Case-Based Integrated (4M)",
      "question": "<A real-world case passage followed by 3 sub-questions (1M + 1M + 2M)>",
      "cbseModelAnswer": "<Answers for sub-questions (a), (b), and (c)>",
      "markingSchemePoints": [
        "Sub-q (a): 1 Mark",
        "Sub-q (b): 1 Mark",
        "Sub-q (c): 2 Marks with internal choice"
      ],
      "commonMistakes": "<Not referring back to data given in the case paragraph>"
    }
  ],
  "top_exam_traps": [
    "<High-probability CBSE board trap 1>",
    "<High-probability CBSE board trap 2>",
    "<High-probability CBSE board trap 3>"
  ],
  "formula_and_laws_cheat_sheet": [
    "<Key formula 1 with variable definitions>",
    "<Key formula 2 / balanced reaction / law>"
  ]
}

Ensure strictly valid JSON output.`;

    const raw = await askGroq(prompt, 0.3);
    let parsed;
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    } catch {
      parsed = null;
    }

    if (!parsed || !parsed.pyq_collection) {
      parsed = {
        chapter_name: chapter.name,
        subject: chapter.subject,
        official_ncert_url: chapter.officialPdfUrl,
        high_yield_weightage: chapter.highYieldWeightage,
        pyq_collection: [
          {
            id: 'pyq_1',
            year: 'CBSE 2023',
            marks: 3,
            questionType: 'Standard (3M)',
            question: `State the fundamental law and solve the standard numerical problem from ${chapter.name}.`,
            cbseModelAnswer: `State law clearly: Define fundamental principle with proper SI units.\nStep-by-step substitution.`,
            markingSchemePoints: [
              '1 Mark: Formula and principle',
              '1 Mark: Calculation',
              '1 Mark: Units and conclusion'
            ],
            commonMistakes: 'Leaving out SI units or omitting formula statement.'
          }
        ],
        top_exam_traps: [
          'Confusing sign conventions in lens and mirror formulas',
          'Not balancing chemical equations before calculating mass'
        ],
        formula_and_laws_cheat_sheet: [
          '1/f = 1/v + 1/u (Mirror Formula)',
          'V = IR (Ohm\'s Law)'
        ]
      };
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Class 10 PYQ error' }, { status: 500 });
  }
}
