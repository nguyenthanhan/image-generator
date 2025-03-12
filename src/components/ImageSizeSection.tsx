import { IRequestImage } from "@runware/sdk-js";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
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
  const currentSizeValue = `${runwareConfig.width}x${runwareConfig.height}`;

  const handleSizePresetChange = (event: any) => {
    const [width, height] = event.target.value.split("x").map(Number);
    handleRunwareConfigChange("width", width);
    handleRunwareConfigChange("height", height);
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 0 }}>
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
                Width:
              </FormLabel>
              <TextField
                type="number"
                value={runwareConfig.width}
                onChange={(e) =>
                  handleNumericInputChange("width", e.target.value, 256, 2048)
                }
                size="small"
                sx={{ width: "80px" }}
              />
              <FormLabel sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                px
              </FormLabel>
            </Box>
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
                Height:
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
              <FormLabel sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                px
              </FormLabel>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
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
          <Select
            value={currentSizeValue}
            onChange={handleSizePresetChange}
            displayEmpty
            sx={{ minWidth: 150 }}
          >
            <MenuItem disabled value="">
              <em>Select a size</em>
            </MenuItem>
            {sizePresets.map((size) => (
              <MenuItem
                key={`${size.width}x${size.height}`}
                value={`${size.width}x${size.height}`}
              >
                {size.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ImageSizeSection;
