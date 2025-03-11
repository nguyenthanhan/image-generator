import React, { useState } from "react";
import { generateImageOpenAI } from "@/lib/openai-service";
import { generateImageRunware } from "@/lib/runware-service";
import { IOutputType, IRequestImage, ITextToImage } from "@runware/sdk-js";
import { ImageGenerateParams } from "openai/src/resources/index.js";
import PromptSection from "./PromptSection";
import ImageSizeSection from "./ImageSizeSection";
import GenerationParameters from "./GenerationParameters";
import ModelSelection from "./ModelSelection";
import ApiProviderSelector from "./ApiProviderSelector";
import { PROMPT_SUGGESTIONS, SIZE_PRESETS } from "@/constants";

type ImageGeneratorFormProps = {
  setImages: (images: Partial<ITextToImage>[] | null) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  setError: (error: string | null) => void;
};

const ImageGeneratorForm = ({
  setImages,
  setLoading,
  loading,
  setError,
}: ImageGeneratorFormProps) => {
  const [apiChoice, setApiChoice] = useState<"openai" | "runware">("runware");

  const [runwareConfig, setRunwareConfig] = useState<IRequestImage>({
    positivePrompt: "",
    negativePrompt: "",
    model: "urn:air:flux1:checkpoint:civitai:618692@691639",
    width: 512,
    height: 512,
    numberResults: 1,
    outputFormat: "JPG",
    steps: 25,
    clipSkip: 2,
    CFGScale: 7,
    checkNSFW: false,
    outputType: "URL",
  });

  const handleRunwareConfigChange = <T,>(
    key: keyof IRequestImage,
    value: T
  ) => {
    setRunwareConfig((prev: IRequestImage) => ({
      ...prev,
      [key]: value,
    }));
  };

  // For text input to ensure valid numerical values
  const handleNumericInputChange = (
    key: keyof IRequestImage,
    value: string,
    min: number,
    max: number
  ) => {
    let numValue = Number(value);
    if (isNaN(numValue)) return;

    // Clamp value between min and max
    numValue = Math.max(min, Math.min(max, numValue));

    setRunwareConfig((prev: IRequestImage) => ({
      ...prev,
      [key]: numValue,
    }));
  };

  const handlePromptSuggestionSelect = (suggestion: string) => {
    setRunwareConfig((prev: IRequestImage) => ({
      ...prev,
      positivePrompt: suggestion,
    }));
  };

  // Handler for output type changes
  const handleOutputTypeChange = (value: IOutputType) => {
    handleRunwareConfigChange("outputType", value);
  };

  // Generate images using OpenAI
  const generateWithOpenAI = async (prompt: string) => {
    const params: ImageGenerateParams = {
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    };

    const images = await generateImageOpenAI(params);
    return images.map((image) => ({
      imageURL: image.url,
      positivePrompt: image.revised_prompt,
    }));
  };

  // Validate form inputs before submission
  const validateForm = (): { isValid: boolean; errorMessage?: string } => {
    const prompt = runwareConfig.positivePrompt;
    if (!prompt) {
      return {
        isValid: false,
        errorMessage: "Please enter a prompt to generate an image",
      };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.errorMessage || "Invalid form data");
      return;
    }

    setLoading(true);
    setError(null);
    setImages(null);

    try {
      if (apiChoice === "openai") {
        const images = await generateWithOpenAI(runwareConfig.positivePrompt);
        setImages(images);
      } else {
        const onPartialImages = (_images: Partial<ITextToImage>[]) => {
          console.log("images", JSON.stringify(_images, null, 2));
        };

        const images = await generateImageRunware({
          ...runwareConfig,
          onPartialImages,
        });

        setImages(images || null);
      }
    } catch (error) {
      setError(
        `Failed to generate image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setImages(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <ApiProviderSelector
          apiChoice={apiChoice}
          setApiChoice={setApiChoice}
        />

        <ModelSelection
          runwareConfig={runwareConfig}
          handleRunwareConfigChange={handleRunwareConfigChange}
        />

        <PromptSection
          runwareConfig={runwareConfig}
          setRunwareConfig={setRunwareConfig}
          handleRunwareConfigChange={handleRunwareConfigChange}
          promptSuggestions={PROMPT_SUGGESTIONS}
          handlePromptSuggestionSelect={handlePromptSuggestionSelect}
          loading={loading}
          handleSubmit={handleSubmit}
        />

        {apiChoice === "runware" && (
          <>
            <ImageSizeSection
              runwareConfig={runwareConfig}
              handleRunwareConfigChange={handleRunwareConfigChange}
              handleNumericInputChange={handleNumericInputChange}
              sizePresets={SIZE_PRESETS}
            />
            <GenerationParameters
              runwareConfig={runwareConfig}
              handleRunwareConfigChange={handleRunwareConfigChange}
              handleNumericInputChange={handleNumericInputChange}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default ImageGeneratorForm;
