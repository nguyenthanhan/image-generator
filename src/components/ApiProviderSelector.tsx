import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type ApiProviderSelectorProps = {
  apiChoice: "openai" | "runware";
  setApiChoice: (choice: "openai" | "runware") => void;
};

const ApiProviderSelector = ({
  apiChoice,
  setApiChoice,
}: ApiProviderSelectorProps) => {
  return (
    <Box sx={{ mb: 1 }}>
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{ fontSize: "0.875rem", fontWeight: 500, mb: 1 }}
        >
          Choose AI Provider:
        </FormLabel>
        <RadioGroup
          row
          name="apiChoice"
          value={apiChoice}
          onChange={(e) => setApiChoice(e.target.value as "openai" | "runware")}
        >
          <FormControlLabel
            value="runware"
            control={<Radio />}
            label="Runware"
            sx={{ mr: 2 }}
          />
          <FormControlLabel value="openai" control={<Radio />} label="OpenAI" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ApiProviderSelector;
