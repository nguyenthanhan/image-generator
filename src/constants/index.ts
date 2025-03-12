import { IOutputType } from "@runware/sdk-js";
export const PROMPT_SUGGESTIONS = [
  "A metropolis built into the petals of a giant lotus flower",
  "An ancient temple hidden in a lush jungle canopy",
  "A futuristic city with floating buildings and neon lights",
  "A cozy cottage nestled in a snowy mountain landscape",
  "An underwater research station surrounded by exotic sea life",
  "A steampunk airship flying through clouds at sunset",
  "A magical library with books that float and glow",
  "A desert oasis with crystalline structures reflecting moonlight",
  "A cyberpunk street market in the rain at night",
  "A peaceful Japanese garden with cherry blossoms and a koi pond",
];

export const SIZE_PRESETS = [
  { width: 512, height: 512, label: "512×512" },
  { width: 768, height: 512, label: "768×512" },
  { width: 512, height: 768, label: "512×768" },
  { width: 768, height: 768, label: "768×768" },
  { width: 1024, height: 768, label: "1024×576" },
  { width: 768, height: 1024, label: "576×1024" },
  { width: 1024, height: 1024, label: "1024×1024" },
  { width: 1536, height: 1024, label: "1536×864" },
  { width: 1024, height: 1536, label: "864×1536" },
  { width: 1536, height: 1536, label: "1536×1536" },
];

export const OUTPUT_TYPES: { value: IOutputType; label: string }[] = [
  { value: "URL", label: "URL" },
  { value: "base64Data", label: "base64Data" },
  { value: "dataURI", label: "dataURI" },
];

type ModelOption = {
  label: string;
  value: string;
  baseModel: string;
};

enum ModelType {
  FLUX1D = "FLUX.1 D",
  FLUX1S = "FLUX.1 S",
  PONY = "Pony",
  SD1X = "SD 1.5",
  SDHYPER = "SD 1.5 Hyper",
  SD1XLCM = "SD 1.5 LCM",
  SD3 = "SD 3",
  SDXL = "SDXL 1.0",
  SDXLLCM = "SDXL 1.0 LCM",
  SDXLDISTILLED = "SDXL Distilled",
  SDXLHYPER = "SDXL Hyper",
  SDXLLIGHTNING = "SDXL Lightning",
  SDXLTURBO = "SDXL Turbo",
}

export const MODEL_RUNWARE_OPTIONS: ModelOption[] = [
  {
    label: "Juggernaut Pro Flux",
    value: "rundiffusion:130@100",
    baseModel: ModelType.FLUX1D,
  },
  {
    label: "Juggernaut Lightning Flux",
    value: "rundiffusion:110@101",
    baseModel: ModelType.FLUX1D,
  },
  {
    label: "Juggernaut XL",
    value: "civitai:133005@782002",
    baseModel: ModelType.SDXL,
  },
  {
    label: "DreamShaper",
    value: "runware:105@1",
    baseModel: ModelType.SD1X,
  },
  {
    label: "FLUX Schnell",
    value: "runware:100@1",
    baseModel: ModelType.FLUX1S,
  },
  {
    label: "FLUX Dev",
    value: "runware:101@1",
    baseModel: ModelType.FLUX1D,
  },
  {
    label: "FLUX Dev Fill",
    value: "runware:102@1",
    baseModel: ModelType.FLUX1D,
  },
  {
    label: "FLUX Dev Depth",
    value: "runware:103@1",
    baseModel: ModelType.FLUX1D,
  },
  {
    label: "FLUX Dev Canny",
    value: "runware:104@1",
    baseModel: ModelType.FLUX1D,
  },
];

export const MODEL_OPENAI_OPTIONS: ModelOption[] = [
  {
    label: "DALL-E",
    value: "DALL-E",
    baseModel: "DALL-E",
  },
];

export const SCHEDULERS_FOR_FLUX: { value: string; label: string }[] = [
  { value: "Euler", label: "Euler" },
  {
    value: "FlowMatchEulerDiscreteScheduler",
    label: "FlowMatchEulerDiscreteScheduler",
  },
  { value: "DPM++", label: "DPM++" },
  { value: "DPM++ SDE", label: "DPM++ SDE" },
  { value: "DPM++ 2M", label: "DPM++ 2M" },
  { value: "DPM++ 2M SDE", label: "DPM++ 2M SDE" },
  { value: "DPM++ 3M", label: "DPM++ 3M" },
  { value: "Euler Beta", label: "Euler Beta" },
  { value: "Euler Exponential", label: "Euler Exponential" },
  { value: "Euler Karras", label: "Euler Karras" },
  { value: "DPM++ Beta", label: "DPM++ Beta" },
  { value: "DPM++ Exponential", label: "DPM++ Exponential" },
  { value: "DPM++ Karras", label: "DPM++ Karras" },
  { value: "DPM++ SDE Beta", label: "DPM++ SDE Beta" },
  { value: "DPM++ SDE Exponential", label: "DPM++ SDE Exponential" },
  { value: "DPM++ SDE Karras", label: "DPM++ SDE Karras" },
  { value: "DPM++ 2M Beta", label: "DPM++ 2M Beta" },
  { value: "DPM++ 2M Exponential", label: "DPM++ 2M Exponential" },
  { value: "DPM++ 2M Karras", label: "DPM++ 2M Karras" },
  { value: "DPM++ 2M SDE Beta", label: "DPM++ 2M SDE Beta" },
  { value: "DPM++ 2M SDE Exponential", label: "DPM++ 2M SDE Exponential" },
  { value: "DPM++ 2M SDE Karras", label: "DPM++ 2M SDE Karras" },
  { value: "DPM++ 3M Beta", label: "DPM++ 3M Beta" },
  { value: "DPM++ 3M Exponential", label: "DPM++ 3M Exponential" },
  { value: "DPM++ 3M Karras", label: "DPM++ 3M Karras" },
];

export const SCHEDULERS_FOR_SD: { value: string; label: string }[] = [
  { value: "Default", label: "Default" },
  { value: "DDIM", label: "DDIM" },
  { value: "DDIMScheduler", label: "DDIMScheduler" },
  { value: "DDPMScheduler", label: "DDPMScheduler" },
  { value: "DEISMultistepScheduler", label: "DEISMultistepScheduler" },
  {
    value: "DPMSolverSinglestepScheduler",
    label: "DPMSolverSinglestepScheduler",
  },
  {
    value: "DPMSolverMultistepScheduler",
    label: "DPMSolverMultistepScheduler",
  },
  { value: "DPMSolverMultistepInverse", label: "DPMSolverMultistepInverse" },
  { value: "DPM++", label: "DPM++" },
  { value: "DPM++ Karras", label: "DPM++ Karras" },
  { value: "DPM++ 2M", label: "DPM++ 2M" },
  { value: "DPM++ 2M Karras", label: "DPM++ 2M Karras" },
  { value: "DPM++ 2M SDE Karras", label: "DPM++ 2M SDE Karras" },
  { value: "DPM++ 2M SDE", label: "DPM++ 2M SDE" },
  { value: "DPM++ 3M", label: "DPM++ 3M" },
  { value: "DPM++ 3M Karras", label: "DPM++ 3M Karras" },
  { value: "DPM++ SDE Karras", label: "DPM++ SDE Karras" },
  { value: "DPM++ SDE", label: "DPM++ SDE" },
  { value: "EDM Euler", label: "EDM Euler" },
  { value: "EDM DPM-Solver Multi-step", label: "EDM DPM-Solver Multi-step" },
  { value: "Euler", label: "Euler" },
  { value: "Euler Discrete Scheduler", label: "Euler Discrete Scheduler" },
  { value: "Euler Karras", label: "Euler Karras" },
  { value: "Euler Ancestral", label: "Euler Ancestral" },
  {
    value: "Euler Ancestral Discrete Scheduler",
    label: "Euler Ancestral Discrete Scheduler",
  },
  { value: "FlowMatch Euler", label: "FlowMatch Euler" },
  { value: "Heun", label: "Heun" },
  { value: "Heun Discrete Scheduler", label: "Heun Discrete Scheduler" },
  { value: "Heun Karras", label: "Heun Karras" },
  { value: "IPNDM", label: "IPNDM" },
  { value: "KDPM2", label: "KDPM2" },
  { value: "KDPM2 Ancestral", label: "KDPM2 Ancestral" },
  { value: "LCM", label: "LCM" },
  { value: "LCM Scheduler", label: "LCM Scheduler" },
  { value: "LMS", label: "LMS" },
  { value: "LMS Discrete Scheduler", label: "LMS Discrete Scheduler" },
  { value: "LMS Karras", label: "LMS Karras" },
  { value: "PNDM", label: "PNDM" },
  { value: "TCD Scheduler", label: "TCD Scheduler" },
  { value: "UniPC", label: "UniPC" },
  { value: "UniPC Multistep Scheduler", label: "UniPC Multistep Scheduler" },
  { value: "UniPC Karras", label: "UniPC Karras" },
  { value: "UniPC 2M", label: "UniPC 2M" },
  { value: "UniPC 2M Karras", label: "UniPC 2M Karras" },
  { value: "UniPC 3M", label: "UniPC 3M" },
  { value: "UniPC 3M Karras", label: "UniPC 3M Karras" },
];
