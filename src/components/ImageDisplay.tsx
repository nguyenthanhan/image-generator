import React, { useState } from "react";
import { ITextToImage } from "@runware/sdk-js";
import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

type ImageDisplayProps = {
  images: Partial<ITextToImage>[] | null;
  loading: boolean;
  error: string | null;
};

const ImageDisplay = ({ images, loading, error }: ImageDisplayProps) => {
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handlers for modal
  const handleOpenModal = (imageUrl: string | undefined) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  // Handler for downloading the image
  const handleDownloadImage = async () => {
    if (selectedImage) {
      try {
        // Fetch the image as a blob
        const response = await fetch(selectedImage);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();

        // Create object URL from the blob
        const blobUrl = URL.createObjectURL(blob);

        // Extract filename from URL or use a default name
        const fileName =
          selectedImage.split("/").pop() || "generated-image.jpg";

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;

        // Append to body, trigger click and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the object URL to free memory
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      } catch (error) {
        console.error("Error downloading image:", error);
        // Fallback method if fetch fails
        window.open(selectedImage, "_blank");
      }
    }
  };

  if (loading) {
    return (
      <ImageList sx={{ width: "100%", height: "auto" }} cols={3} gap={8}>
        <ImageListItem
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            position: "relative",
            paddingTop: "100%",
            display: "block",
            boxShadow: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 2,
            }}
          >
            <Box>
              <ImageIcon
                sx={{ fontSize: 48, mb: 1, color: "text.secondary" }}
              />
              <Typography color="text.secondary" variant="body2">
                Generating your image...
              </Typography>
            </Box>
          </Box>
        </ImageListItem>
      </ImageList>
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
          maxWidth: "500px",
          maxHeight: "500px",
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
      <ImageList sx={{ width: "100%", height: "auto" }} cols={3} gap={8}>
        <ImageListItem
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            position: "relative",
            paddingTop: "100%",
            display: "block",
            boxShadow: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 2,
            }}
          >
            <Box>
              <ImageIcon
                sx={{ fontSize: 48, mb: 1, color: "text.secondary" }}
              />
              <Typography color="text.secondary" variant="body2">
                Your generated images will appear here
              </Typography>
            </Box>
          </Box>
        </ImageListItem>
      </ImageList>
    );
  }

  return (
    <>
      <ImageList sx={{ width: "100%", height: "auto" }} cols={3} gap={8}>
        {images.map((item) => (
          <ImageListItem
            key={item.imageURL}
            onClick={() => handleOpenModal(item.imageURL)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 3,
              },
            }}
          >
            <img
              srcSet={`${item.imageURL}?w=500&h=500&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.imageURL}?w=500&h=500&fit=crop&auto=format`}
              alt={item.seed?.toString()}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.seed}
              subtitle={item.taskType}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.seed}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Modal for full-size image display */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="full-image-modal"
        aria-describedby="modal-showing-full-size-image"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            outline: "none",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 1,
              gap: 1,
            }}
          >
            <Tooltip title="Download image">
              <IconButton
                onClick={handleDownloadImage}
                aria-label="download image"
                color="primary"
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleCloseModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              overflow: "auto",
              maxHeight: "calc(90vh - 48px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full size"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ImageDisplay;
