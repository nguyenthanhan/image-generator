import { IRequestImage, ITextToImage, Runware } from "@runware/sdk-js";

export type RunwareResponse = ITextToImage[] | undefined;

// Initialize the Runware client
const runware = new Runware({
  apiKey: process.env.NEXT_PUBLIC_RUNWARE_API_KEY || "",
});

export async function generateImageRunware(
  config: IRequestImage
): Promise<ITextToImage[] | undefined> {
  try {
    console.log("config", JSON.stringify(config, null, 2));
    const response = await runware.requestImages(config);
    console.log("response", JSON.stringify(response, null, 2));

    return response;
  } catch (error: unknown) {
    console.error("Error generating image with Runware:", error);
    if (error instanceof Error) {
      throw error.message;
    }
    throw String(error);
  }
}
