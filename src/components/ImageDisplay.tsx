import React, { useState } from "react";
import { ITextToImage } from "@runware/sdk-js";
import Image from "next/image";
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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ImageDisplayProps = {
  images: Partial<ITextToImage>[];
  loading: boolean;
  error: string | null;
  pendingCount: number; // Number of images being generated
};

const ImageDisplay = ({
  images,
  loading,
  error,
  pendingCount,
}: ImageDisplayProps) => {
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Handlers for modal
  const handleOpenModal = (imageUrl: string | undefined, index: number) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setCurrentImageIndex(index);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  // Navigation handlers
  const handlePreviousImage = () => {
    if (images.length > 1) {
      const newIndex =
        currentImageIndex <= 0 ? images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(images[newIndex].imageURL || null);
    }
  };

  const handleNextImage = () => {
    if (images.length > 1) {
      const newIndex =
        currentImageIndex >= images.length - 1 ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(images[newIndex].imageURL || null);
    }
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

  // Function to render loading placeholder items
  const renderLoadingItems = () => {
    const loadingItems = [];
    for (let i = 0; i < pendingCount; i++) {
      loadingItems.push(
        <ImageListItem
          key={`loading-${i}`}
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
              flexDirection: "column",
              textAlign: "center",
              p: 2,
            }}
          >
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography color="text.secondary" variant="body2">
              Generating image {i + 1}...
            </Typography>
          </Box>
        </ImageListItem>
      );
    }
    return loadingItems;
  };

  if (error && images.length === 0 && pendingCount === 0) {
    return (
      <ImageListItem
        sx={{
          border: 1,
          borderColor: "error.light",
          borderRadius: 1,
          position: "relative",
          paddingTop: "100%",
          display: "block",
          boxShadow: 1,
          overflow: "hidden",
          maxWidth: 500,
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
            flexDirection: "column",
            textAlign: "center",
            p: 2,
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
          <Typography color="error">{error}</Typography>
        </Box>
      </ImageListItem>
    );
  }

  if (images.length === 0 && !loading && pendingCount === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          p: 4,
        }}
      >
        <ImageIcon sx={{ fontSize: 48, mb: 2, color: "text.secondary" }} />
        <Typography color="text.secondary" variant="body2">
          Your generated images will appear here
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <ImageList sx={{ width: "100%", height: "auto" }} cols={3} gap={8}>
        {/* Completed images */}
        {images.map((item, index) => (
          <ImageListItem
            key={item.imageURL}
            onClick={() => handleOpenModal(item.imageURL, index)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 3,
              },
              position: "relative",
              overflow: "hidden",
            }}
          >
            {item.imageURL ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  aspectRatio: "1/1",
                }}
              >
                <Image
                  src={item.imageURL}
                  alt={item.seed?.toString() || "Generated image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "background.paper",
                }}
              >
                <ErrorOutlineIcon color="error" />
                <Typography color="error" variant="caption">
                  Image failed to load
                </Typography>
              </Box>
            )}
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
            ,
          </ImageListItem>
        ))}
        {/* Loading placeholders */}
        {loading && renderLoadingItems()}
      </ImageList>

      {/* Modal for full-size image viewing */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="full-image-modal"
        aria-describedby="modal-to-view-full-size-image"
      >
        <Paper
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            bgcolor: "black",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            m: 0,
            p: 0,
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 10,
            }}
          >
            <Tooltip title="Download Image">
              <IconButton
                onClick={handleDownloadImage}
                color="primary"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.7)" },
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={handleCloseModal}
              color="default"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.5)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.7)" },
                ml: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 0,
            }}
          >
            {/* Left navigation button */}
            {images.length > 1 && (
              <IconButton
                onClick={handlePreviousImage}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.7)" },
                  zIndex: 10,
                }}
                size="large"
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            )}

            {selectedImage && (
              <Box
                component="img"
                src={selectedImage}
                alt="Full size image"
                sx={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "95vw",
                  maxHeight: "95vh",
                  objectFit: "contain",
                }}
              />
            )}

            {/* Right navigation button */}
            {images.length > 1 && (
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.7)" },
                  zIndex: 10,
                }}
                size="large"
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Box>

          {/* Image counter indicator */}
          {images.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                zIndex: 10,
              }}
            >
              <Typography variant="body2">
                {currentImageIndex + 1} / {images.length}
              </Typography>
            </Box>
          )}
        </Paper>
      </Modal>
    </>
  );
};

export default ImageDisplay;
