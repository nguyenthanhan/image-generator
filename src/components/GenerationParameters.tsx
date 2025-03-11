import { IRequestImage } from "@runware/sdk-js";
import React from "react";
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
} from "@mui/material";

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
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel
              sx={{ fontSize: "0.875rem", color: "text.secondary", mb: 1 }}
            >
              Number of Results:
            </FormLabel>
            <ButtonGroup variant="outlined" fullWidth>
              {[1, 2, 3, 4].map((num) => (
                <Button
                  key={num}
                  onClick={() =>
                    handleRunwareConfigChange("numberResults", num)
                  }
                  variant={
                    runwareConfig.numberResults === num
                      ? "contained"
                      : "outlined"
                  }
                  sx={{ py: 1 }}
                >
                  {num}
                </Button>
              ))}
            </ButtonGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
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
              <MenuItem value="URL">URL</MenuItem>
              <MenuItem value="base64Data">base64Data</MenuItem>
              <MenuItem value="dataURI">dataURI</MenuItem>
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
          onChange={(_, value) => handleRunwareConfigChange("clipSkip", value)}
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
          onChange={(_, value) => handleRunwareConfigChange("CFGScale", value)}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};

export default GenerationParameters;
