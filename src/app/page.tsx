"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Copyright from "@/components/Copyright";
import ImageGeneratorForm from "@/components/ImageGeneratorForm";
import ImageDisplay from "@/components/ImageDisplay";
import { ITextToImage } from "@runware/sdk-js";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ModeSwitch from "@/components/ModeSwitch";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";

export default function Home() {
  const [images, setImages] = useState<Partial<ITextToImage>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addImages = (newImages: Partial<ITextToImage>[] | null) => {
    if (newImages) {
      setImages((prevImages) => [...newImages, ...prevImages]);
    }
  };

  // Updated function to track pending images
  const handleGenerationStart = (count: number) => {
    setLoading(true);
    setPendingCount(count);
    setError(null);
  };

  // Updated function to handle completion
  const handleGenerationComplete = () => {
    setLoading(false);
    setPendingCount(0);
  };

  const sidebarContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton component={NextLink} href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NextLink} href="/about">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="My Images" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Image Generator
          </Typography>
          <ModeSwitch />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        {sidebarContent}
      </Drawer>

      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>
          {/* Left column - Form (1/3 width) */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              height: "100%",
              overflow: "auto",
              p: 2,
            }}
          >
            <ImageGeneratorForm
              setImages={addImages}
              loading={loading}
              setError={setError}
              onGenerationStart={handleGenerationStart}
              onGenerationComplete={handleGenerationComplete}
            />
          </Grid>

          {/* Right column - Image Display (2/3 width) */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ height: "100%", overflow: "auto", p: 2 }}
          >
            <ImageDisplay
              images={images}
              loading={loading}
              error={error}
              pendingCount={pendingCount}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
          pb: 1,
        }}
      >
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Box>
  );
}
