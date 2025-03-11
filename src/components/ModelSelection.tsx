import { IRequestImage } from "@runware/sdk-js";
import React from "react";
import {
  Box,
  Chip,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type ModelOption = {
  label: string;
  value: string;
};

type ModelSelectionProps = {
  runwareConfig: IRequestImage;
  handleRunwareConfigChange: (
    key: keyof IRequestImage,
    value: string | number
  ) => void;
};

const ModelSelection = ({
  runwareConfig,
  handleRunwareConfigChange,
}: ModelSelectionProps) => {
  const modelOptions: ModelOption[] = [
    {
      label: "Flux",
      value: "urn:air:flux1:checkpoint:civitai:618692@691639",
    },
  ];

  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth>
        <FormLabel
          sx={{ fontSize: "0.875rem", color: "text.secondary", mb: 1 }}
        >
          Model URN:
        </FormLabel>
        <TextField
          value={runwareConfig.model}
          onChange={(e) => handleRunwareConfigChange("model", e.target.value)}
          fullWidth
          placeholder="Enter model URN (e.g., urn:air:other:checkpoint:civitai:1285819@1450739)"
          size="small"
        />
      </FormControl>
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Common models:
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mt: 0.5 }}
        >
          {modelOptions.map((model) => (
            <Chip
              key={model.value}
              label={model.label}
              onClick={() => handleRunwareConfigChange("model", model.value)}
              variant={
                runwareConfig.model === model.value ? "filled" : "outlined"
              }
              color={
                runwareConfig.model === model.value ? "primary" : "default"
              }
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

export default ModelSelection;
