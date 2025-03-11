import { IOutputType } from "@runware/sdk-js";

export const PROMPT_SUGGESTIONS = [
  "Steampunk octopus playing a grand piano underwater",
  "Floating islands with bioluminescent trees and cascading waterfalls",
  "Quantum dream dimension where mathematics is visible as colored strands",
  "Ancient library with living books and staircases that defy gravity",
  "Crystalline beings having a tea party on the rings of Saturn",
  "Digital forest where code grows as trees and data streams as rivers",
  "A metropolis built into the petals of a giant lotus flower",
  "Time travelers museum displaying artifacts from futures that never happened",
  "Dragons made of stained glass flying through aurora borealis",
  "Microscopic civilizations living on musical instruments",
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
