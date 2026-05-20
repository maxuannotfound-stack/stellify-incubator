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
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          "Missing OPENAI_API_KEY. Please set it in Vercel Project Settings → Environment Variables.",
      });
    }

    const client = new OpenAI({ apiKey });

    const { messages, tier } = req.body ?? {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing messages[]" });
    }

    // Later you can use tier to unlock higher models/features.
    const model = "gpt-4o-mini";

    const system = {
      role: "system",
      content:
        "You are Stellify AI Finance Assistant. Provide clear, practical, education-only guidance for Australian SMEs. Do NOT provide financial or investment advice. When uncertain, ask clarifying questions. Keep responses concise and structured.",
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

