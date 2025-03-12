import { IRequestImage } from "@runware/sdk-js";
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Slider,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OUTPUT_TYPES } from "@/constants";

type GenerationParametersProps = {
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
};

const GenerationParameters = ({
  runwareConfig,
  handleRunwareConfigChange,
  handleNumericInputChange,
}: GenerationParametersProps) => {
  const [expanded, setExpanded] = useState(false);
  const [negativePromptEnabled, setNegativePromptEnabled] = useState(false);

  const handleNegativePromptToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNegativePromptEnabled(event.target.checked);
    // Clear negative prompt when disabled
    if (!event.target.checked) {
      handleRunwareConfigChange("negativePrompt", "");
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel
              sx={{ fontSize: "0.875rem", color: "text.secondary", mb: 1 }}
            >
              Number of Images: {runwareConfig.numberResults}
            </FormLabel>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Slider
                min={1}
                max={8}
                step={1}
                value={Number(runwareConfig.numberResults)}
                onChange={(_, value) =>
                  handleRunwareConfigChange("numberResults", value)
                }
                valueLabelDisplay="auto"
                marks={Array(8)
                  .fill(0)
                  .map((_, i) => i + 1)
                  .map((value) => ({
                    value,
                    label: value.toString(),
                  }))}
                sx={{ flex: 1, mr: 2 }}
              />
            </Box>
          </FormControl>
        </Grid>
      </Grid>

      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          backgroundColor: "#f5f5f5",
          "& .MuiAccordionSummary-root": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="advanced-config-content"
          id="advanced-config-header"
        >
          <Typography fontWeight="medium">Advanced Config</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel
                  sx={{ fontSize: "0.875rem", color: "text.secondary", mb: 1 }}
                >
                  Output Type
                </FormLabel>
                <Select
                  value={runwareConfig.outputType}
                  onChange={(e) =>
                    handleRunwareConfigChange("outputType", e.target.value)
                  }
                  size="small"
                >
                  {OUTPUT_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

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
                Steps: {runwareConfig.steps}
              </FormLabel>
              <TextField
                type="number"
                value={runwareConfig.steps}
                onChange={(e) =>
                  handleNumericInputChange("steps", e.target.value, 1, 50)
                }
                size="small"
                sx={{ width: "80px" }}
              />
            </Box>
            <Slider
              min={1}
              max={50}
              value={Number(runwareConfig.steps)}
              onChange={(_, value) => handleRunwareConfigChange("steps", value)}
              valueLabelDisplay="auto"
            />
          </Box>

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
                Clip Skip: {runwareConfig.clipSkip}
              </FormLabel>
              <TextField
                type="number"
                value={runwareConfig.clipSkip}
                onChange={(e) =>
                  handleNumericInputChange("clipSkip", e.target.value, 0, 2)
                }
                size="small"
                sx={{ width: "80px" }}
              />
            </Box>
            <Slider
              min={0}
              max={2}
              value={Number(runwareConfig.clipSkip)}
              onChange={(_, value) =>
                handleRunwareConfigChange("clipSkip", value)
              }
              valueLabelDisplay="auto"
            />
          </Box>

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
                CFG Scale: {runwareConfig.CFGScale}
              </FormLabel>
              <TextField
                type="number"
                value={runwareConfig.CFGScale}
                onChange={(e) =>
                  handleNumericInputChange("CFGScale", e.target.value, 0, 30)
                }
                size="small"
                sx={{ width: "80px" }}
              />
            </Box>
            <Slider
              min={0}
              max={30}
              value={Number(runwareConfig.CFGScale)}
              onChange={(_, value) =>
                handleRunwareConfigChange("CFGScale", value)
              }
              valueLabelDisplay="auto"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GenerationParameters;
