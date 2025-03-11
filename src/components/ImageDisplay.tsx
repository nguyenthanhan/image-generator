import React from "react";
import { ITextToImage } from "@runware/sdk-js";
import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

type ImageDisplayProps = {
  images: Partial<ITextToImage>[] | null;
  loading: boolean;
  error: string | null;
};

const ImageDisplay = ({ images, loading, error }: ImageDisplayProps) => {
  if (loading) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography color="text.secondary">
            Generating your image...
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
          <Typography color="error">{error}</Typography>
        </Box>
      </Paper>
    );
  }

  if (!images || images.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ImageIcon sx={{ fontSize: 48, mb: 1, color: "text.secondary" }} />
          <Typography color="text.secondary">
            Your generated images will appear here
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <ImageList sx={{ width: "100%", height: "auto" }} cols={3} gap={8}>
      {images.map((item) => (
        <ImageListItem key={item.imageURL}>
          <img
            srcSet={`${item.imageURL}?w=248&h=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.imageURL}?w=248&h=248&fit=crop&auto=format`}
            alt={item.seed?.toString()}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.seed}
            subtitle={item.taskType}
            actionIcon={
              <IconButton
                sx={{ color: "gray" }}
                aria-label={`info about ${item.seed}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageDisplay;
