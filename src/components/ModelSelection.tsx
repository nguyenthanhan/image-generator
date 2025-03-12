import { IRequestImage } from "@runware/sdk-js";
import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

type ModelSelectionProps = {
  modelOptions: { label: string; value: string }[];
  runwareConfig: IRequestImage;
  handleRunwareConfigChange: (
    key: keyof IRequestImage,
    value: string | number
  ) => void;
};

const ModelSelection = ({
  modelOptions,
  runwareConfig,
  handleRunwareConfigChange,
}: ModelSelectionProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth>
        <FormLabel
          sx={{ fontSize: "0.875rem", color: "text.secondary", mb: 1 }}
        >
          Model AIR:
        </FormLabel>
        <TextField
          value={runwareConfig.model}
          onChange={(e) => handleRunwareConfigChange("model", e.target.value)}
          fullWidth
          placeholder="Enter model URN (e.g., rundiffusion:110@101)"
          size="small"
        />
      </FormControl>
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="caption"
          fontSize="0.875rem"
          color="text.secondary"
        >
          Models on Runware:
        </Typography>
        <FormControl fullWidth size="small" sx={{ mt: 1 }}>
          <Select
            value={runwareConfig.model}
            onChange={(e) => handleRunwareConfigChange("model", e.target.value)}
            displayEmpty={false}
          >
            <MenuItem disabled value="">
              <em>Select a model</em>
            </MenuItem>
            {modelOptions.map((model) => (
              <MenuItem key={model.value} value={model.value}>
                {model.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ModelSelection;
