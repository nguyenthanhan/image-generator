import { IRequestImage } from "@runware/sdk-js";
import React from "react";
import {
  Box,
  Button,
  Chip,
  FormLabel,
  Grid,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type SizePreset = {
  width: number;
  height: number;
  label: string;
};

type ImageSizeSectionProps = {
  runwareConfig: IRequestImage;
  handleRunwareConfigChange: (
    key: keyof IRequestImage,
    value: string | number
  ) => void;
  handleNumericInputChange: (
    key: keyof IRequestImage,
    value: string,
    min: number,
    max: number
  ) => void;
  sizePresets: SizePreset[];
};

const ImageSizeSection = ({
  runwareConfig,
  handleRunwareConfigChange,
  handleNumericInputChange,
  sizePresets,
}: ImageSizeSectionProps) => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <FormLabel sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                Width: {runwareConfig.width}px
              </FormLabel>
              <TextField
                type="number"
                inputProps={{ min: "256", max: "2048", step: "64" }}
                value={runwareConfig.width}
                onChange={(e) =>
                  handleNumericInputChange("width", e.target.value, 256, 2048)
                }
                size="small"
                sx={{ width: "80px" }}
              />
            </Box>
            <Slider
              min={256}
              max={2048}
              step={64}
              value={Number(runwareConfig.width)}
              onChange={(_, value) => handleRunwareConfigChange("width", value)}
              valueLabelDisplay="auto"
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <FormLabel sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                Height: {runwareConfig.height}px
              </FormLabel>
              <TextField
                type="number"
                inputProps={{ min: "256", max: "2048", step: "64" }}
                value={runwareConfig.height}
                onChange={(e) =>
                  handleNumericInputChange("height", e.target.value, 256, 2048)
                }
                size="small"
                sx={{ width: "80px" }}
              />
            </Box>
            <Slider
              min={256}
              max={2048}
              step={64}
              value={Number(runwareConfig.height)}
              onChange={(_, value) =>
                handleRunwareConfigChange("height", value)
              }
              valueLabelDisplay="auto"
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <FormLabel
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            display: "block",
            mb: 1,
          }}
        >
          Popular Sizes:
        </FormLabel>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {sizePresets.map((size) => (
            <Chip
              key={`${size.width}x${size.height}`}
              label={size.label}
              onClick={() => {
                handleRunwareConfigChange("width", size.width);
                handleRunwareConfigChange("height", size.height);
              }}
              variant={
                runwareConfig.width === size.width &&
                runwareConfig.height === size.height
                  ? "filled"
                  : "outlined"
              }
              color={
                runwareConfig.width === size.width &&
                runwareConfig.height === size.height
                  ? "primary"
                  : "default"
              }
              size="small"
              sx={{ m: 0.5 }}
              clickable
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ImageSizeSection;
