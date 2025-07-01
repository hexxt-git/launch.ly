// pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const systemPrompt = `
You are a marketing assistant AI specialized in advertising strategy and video promotion planning.

Your job is to:
1. Accept a product, project, or app idea from the user.
2. Generate 3 ad scripts with different marketing angles, labeled "Script 1:", "Script 2:", and "Script 3:".
3. After user selects one, generate:
   - Marketing strategy
   - Social media captions for LinkedIn, Instagram, Facebook, and Twitter (each adapted to that platform).
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { idea, scriptChoice } = req.body;
  if (!idea) return res.status(400).json({ message: "Missing idea" });

  try {
    // Step 1: Get 3 scripts
    const scriptsRes = await axios.post(GEMINI_URL, {
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: idea }] },
      ],
    });

    const scriptsText =
      scriptsRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const scripts = Array.from(
      scriptsText.matchAll(/Script \d:\s*([\s\S]*?)(?=Script \d:|$)/g)
    ).map((match) => match[1].trim());

    let strategy = "";
    let captions = "";

    if (scriptChoice && ["1", "2", "3"].includes(scriptChoice)) {
      const selectedScript = scripts[parseInt(scriptChoice) - 1];

      // Step 2: Get marketing strategy
      const strategyPrompt = `Here is a selected script: "${selectedScript}"\nProvide a marketing strategy.`;
      const stratRes = await axios.post(GEMINI_URL, {
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "user", parts: [{ text: strategyPrompt }] },
        ],
      });
      strategy = stratRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Step 3: Get social media captions
      const captionPrompt = `You are a social media marketing assistant. Based on the script: "${selectedScript}", generate social media captions for:\n- LinkedIn\n- Instagram\n- Facebook\n- Twitter\nLabel them clearly.`;
      const captionRes = await axios.post(GEMINI_URL, {
        contents: [{ role: "user", parts: [{ text: captionPrompt }] }],
      });
      captions =
        captionRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }

    res.status(200).json({ scripts, strategy, captions });
  } catch (err: any) {
    console.error("Gemini error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ message: `Failed to generate content.${err.message}` });
  }
}
