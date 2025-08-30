// src/ai/webllm.ts
// Minimal wrapper around WebLLM to load a local model (in-browser) and answer questions.
// Uses a singleton so we only load the model once per session.

// src/ai/webllm.ts
import {
  CreateWebWorkerMLCEngine,
  type MLCEngineInterface,
  type InitProgressReport,
} from "@mlc-ai/web-llm";

// A lighter default loads faster on most laptops/phones.
// You can switch to "Llama-3.1-8B-Instruct-q4f32_1-MLC" later if you want.
const DEFAULT_MODEL = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

let enginePromise: Promise<MLCEngineInterface> | null = null;

export function initWebLLM(
  onProgress?: (msg: string) => void,
  modelId: string = DEFAULT_MODEL
): Promise<MLCEngineInterface> {
  if (enginePromise) return enginePromise;

  enginePromise = (async () => {
    const engine = await CreateWebWorkerMLCEngine(
      new Worker(new URL("./webllm.worker.ts", import.meta.url), {
        type: "module",
      }),
      // ⬆️ pass the worker instance
      modelId, // ⬅️ selected model id (second arg)
      {
        // ⬅️ engineConfig (third arg)
        initProgressCallback: (report: InitProgressReport) => {
          if (!onProgress) return;
          const pct =
            typeof report.progress === "number"
              ? ` (${Math.round(report.progress * 100)}%)`
              : "";
          onProgress(`${report.text ?? "Loading model"}…${pct}`);
        },
      }
    );

    return engine; // MLCEngineInterface
  })();

  return enginePromise!;
}

export async function askAboutMovie(params: {
  question: string;
  movieContext: {
    title: string;
    genres: string[];
    runtimeMins?: number;
    topCast: string[];
    plot: string;
  };
}) {
  const { question, movieContext } = params;
  const spoilersAllowed = /(^|\b)spoilers ok(\b|$)/i.test(question);

  const engine = await initWebLLM();

  const context = [
    `Title: ${movieContext.title}`,
    movieContext.genres?.length ? `Genres: ${movieContext.genres.join(", ")}` : null,
    movieContext.runtimeMins ? `Runtime: ${movieContext.runtimeMins} minutes` : null,
    movieContext.topCast?.length ? `Top Cast: ${movieContext.topCast.join(", ")}` : null,
    movieContext.plot ? `Plot: ${movieContext.plot}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const system = [
    "You are a helpful movie assistant embedded in a web app.",
    "RULES:",
    "- Keep answers short: 3–5 sentences.",
    "- Do NOT include spoilers unless the user explicitly says 'spoilers ok'.",
    "- If spoilers are not allowed, avoid twists/endings and speak generally.",
  ].join("\n");

  const userPrompt = [
    "Context about the movie:",
    "-------------------------",
    context,
    "-------------------------",
    `User question: ${question}`,
    spoilersAllowed
      ? "Note: User explicitly allowed spoilers."
      : "Note: User did NOT allow spoilers.",
  ].join("\n");

  const completion = await engine.chat.completions.create({
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 220,
  });

  const text = completion?.choices?.[0]?.message?.content ?? "";
  return text.trim();
}
