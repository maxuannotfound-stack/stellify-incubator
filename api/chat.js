import OpenAI from "openai";

/**
 * Vercel Serverless Function
 * POST /api/chat
 * Body: { messages: [{ role: "user"|"assistant"|"system", content: string }], tier?: "free"|"pro" }
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Switch to Groq (OpenAI-compatible endpoint)
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          "Missing GROQ_API_KEY. Please set it in Vercel Project Settings → Environment Variables.",
      });
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const { messages, tier } = req.body ?? {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing messages[]" });
    }

    // Later you can use tier to unlock higher models/features.
    const model = tier === "pro" ? "llama-3.1-70b-versatile" : "llama-3.1-8b-instant";

    const system = {
      role: "system",
      content:
        "You are Stellify AI Finance Assistant. Provide clear, practical, education-only guidance for Australian SMEs. Do NOT provide financial or investment advice. When uncertain, ask clarifying questions. Keep responses concise and structured. Reply in the same language as the user.",
    };

    const completion = await client.chat.completions.create({
      model,
      messages: [system, ...messages],
      temperature: tier === "pro" ? 0.4 : 0.2,
      max_tokens: tier === "pro" ? 700 : 450,
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    return res.status(200).json({ text });
  } catch (err) {
    // Avoid leaking sensitive details to client
    console.error(err);
    return res.status(500).json({
      error: "Chat request failed. Check server logs and API key permissions.",
    });
  }
}
