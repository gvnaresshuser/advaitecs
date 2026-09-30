import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateOpenAIResponse(prompt: string) {
  const response = await openai.responses.create({
    model: "gpt-5.6-luna",
    input: prompt,
  });

  return response.output_text;
}