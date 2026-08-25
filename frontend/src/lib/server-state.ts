export interface Chunk {
  text: string;
  source: string;
  subject: string;
  score?: number;
}

// Global server memory store
export const globalChunks: Chunk[] = [
  {
    text: "Unit 3 ALGEBRA AND LOGIC CIRCUITS: Binary numbers, Number base conversion and Hexadecimal Numbers, Complements, Basic definitions, Basic theorems and properties of Boolean Algebra, Boolean functions, Canonical and Standard forms, Digital Logic gates, DeMorgan's Laws, Ex-OR realization using NAND and NOR, K-maps (Upto 4 variable) COMBINATIONAL LOGIC: Introduction, Design procedure, Adders-Half adder, Full adder.",
    source: "unit 3 ppt.pdf",
    subject: "ece"
  },
  {
    text: "Superconductivity is a state of matter characterized by zero electrical resistance and the expulsion of magnetic flux fields (Meissner Effect) occurring in certain materials below a characteristic critical temperature Tc. Type-I superconductors show complete Meissner effect with a single critical field Hc, while Type-II superconductors have two critical fields Hc1 and Hc2 with a mixed/vortex state.",
    source: "Unit3Superconductivity.pdf",
    subject: "phy"
  }
];

export async function askGroq(
  prompt: string,
  temperature: number = 0.3,
  model: string = "llama-3.3-70b-versatile",
  systemPrompt: string = "You are an elite academic professor and expert tutor."
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return "⚠️ Groq API key is not configured in Vercel Environment Variables. Please add `GROQ_API_KEY`.";
  }

  const models = [model, "llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"];
  for (const m of models) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: m,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature,
          max_tokens: 2048,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || "";
      }
    } catch {
      continue;
    }
  }
  return "Service busy. Please verify your Groq API key and quota.";
}

export async function searchTavily(query: string, maxResults: number = 3) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: maxResults,
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

export function retrieveChunks(query: string, subject: string, topK: number = 4): Chunk[] {
  const subjectChunks = globalChunks.filter((c) => c.subject.toLowerCase() === subject.toLowerCase());
  if (subjectChunks.length === 0) return [];

  const qWords = query.toLowerCase().match(/\w+/g) || [];
  
  const scored = subjectChunks.map((c) => {
    const cWords = c.text.toLowerCase().match(/\w+/g) || [];
    const cWordSet = new Set(cWords);
    const overlap = qWords.filter((w) => cWordSet.has(w)).length;
    const score = 65.0 + Math.min(33.0, (overlap / Math.max(1, qWords.length)) * 33.0);
    return {
      ...c,
      score: Math.round(score * 10) / 10,
    };
  });

  scored.sort((a, b) => (b.score || 0) - (a.score || 0));
  return scored.slice(0, topK);
}
