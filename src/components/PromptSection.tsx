import { IRequestImage } from "@runware/sdk-js";
import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";

type PromptSectionProps = {
  runwareConfig: IRequestImage;
  setRunwareConfig: React.Dispatch<React.SetStateAction<IRequestImage>>;
  handleRunwareConfigChange: (
    key: keyof IRequestImage,
    value: string | number
  ) => void;
  promptSuggestions: string[];
  handlePromptSuggestionSelect: (suggestion: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const PromptSection = ({
  runwareConfig,
  setRunwareConfig,
  handleRunwareConfigChange,
  promptSuggestions,
  handlePromptSuggestionSelect,
  loading,
  handleSubmit,
}: PromptSectionProps) => {
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);

  // Handle toggle for negative prompt
  const handleNegativePromptToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isEnabled = event.target.checked;
    setShowNegativePrompt(isEnabled);

    // Clear negative prompt when disabled
    if (!isEnabled) {
      handleRunwareConfigChange("negativePrompt", "");
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel
          htmlFor="prompt"
          sx={{ mb: 1, fontSize: "0.875rem", fontWeight: 500 }}
        >
          Describe the image you want to generate:
        </FormLabel>
        <TextField
          id="prompt"
          multiline
          rows={4}
          fullWidth
          value={runwareConfig.positivePrompt}
          onChange={(e) =>
            setRunwareConfig({
              ...runwareConfig,
              positivePrompt: e.target.value,
            })
          }
          placeholder="E.g., A serene mountain landscape with a lake at sunset"
          required
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth sx={{ mt: 0 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showNegativePrompt}
              onChange={handleNegativePromptToggle}
              color="primary"
            />
          }
          label="Use Negative Prompt"
        />

        {showNegativePrompt && (
          <>
            <FormLabel
              htmlFor="negativePrompt"
              sx={{ mb: 1, mt: 1, fontSize: "0.875rem", fontWeight: 500 }}
            >
              Negative Prompt:
            </FormLabel>
            <TextField
              id="negativePrompt"
              multiline
              rows={4}
              fullWidth
              value={runwareConfig?.negativePrompt}
              onChange={(e) =>
                handleRunwareConfigChange("negativePrompt", e.target.value)
              }
              placeholder="E.g., simple background, no people"
              variant="outlined"
            />
          </>
        )}
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button
          variant="contained"
          color={loading ? "inherit" : "primary"}
          onClick={handleSubmit}
          disabled={loading}
          sx={{ py: 1, px: 3 }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </Button>
      </Box>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {promptSuggestions.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              onClick={() => handlePromptSuggestionSelect(suggestion)}
              variant="outlined"
              size="small"
              sx={{ my: 0.5 }}
              clickable
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default PromptSection;
