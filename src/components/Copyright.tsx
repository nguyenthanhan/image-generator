import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

interface CopyrightProps {
  websiteName?: string;
  websiteUrl?: string;
  year?: number;
}

export default function Copyright({
  websiteName = "Image Generator",
  websiteUrl = "https://image-generator.com",
  year = new Date().getFullYear(),
}: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
        my: 0,
      }}
    >
      {"Copyright © "}
      <MuiLink color="inherit" href={websiteUrl}>
        {websiteName}
      </MuiLink>{" "}
      {year}
    </Typography>
  );
}
