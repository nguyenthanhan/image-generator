import OpenAI from "openai";
import { Image, ImageGenerateParams } from "openai/src/resources/images.js";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateImageOpenAI(
  params: ImageGenerateParams
): Promise<Image[]> {
  try {
    console.log("config", JSON.stringify(params, null, 2));
    const response = await openai.images.generate(params);
    console.log("response", JSON.stringify(response, null, 2));

    return response.data;
  } catch (error) {
    console.error("Error generating image with OpenAI:", error);
    throw error;
  }
}
