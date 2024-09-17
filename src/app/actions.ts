"use server";
import openai from "@/lib/openaimodel";
import runware from "@/lib/runawaymodel";
import { IImage, IRequestImage, ITextToImage } from "@runware/sdk-js";
import { ImagesResponse } from "openai/resources/images.mjs";

export const generateImageByOpenAI = async (
  formData: FormData
): Promise<ImagesResponse> => {
  const prompt = formData.get("prompt") as string;
  if (!prompt) {
    throw Error("prompt is not set");
  }

  // generate an image using openai

  const res = await openai.images.generate({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  console.log("res", JSON.stringify(res, null, 2));
  return JSON.parse(JSON.stringify(res));
};

export const generateImageByRunwareAI = async (
  formData: FormData
): Promise<ITextToImage[] | undefined> => {
  try {
    const prompt = formData.get("prompt") as string;
    if (!prompt) {
      throw Error("prompt is not set");
    }

    const params: IRequestImage = {
      positivePrompt: prompt,
      // model: 6424,
      model: "civitai:6424@11745",
      // model: "civitai:618692@691639",
      width: 512,
      height: 512,
      numberResults: 1,
      outputType: "URL",
      steps: 25,
      clipSkip: 2,
      CFGScale: 7,
      // onPartialImages(images: IImage[]) {
      //   setImages((prev) => [...prev, ...(images ?? [])]);
      // },
    };

    const images = await runware.requestImages(params);
    console.log("images", JSON.stringify(images, null, 2));

    return images;
  } catch (error) {
    console.log("🚀 ~ generateImageByRunwareAI error:", error);
    return undefined;
  }
};
