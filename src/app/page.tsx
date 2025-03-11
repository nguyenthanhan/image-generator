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

export default function Home() {
  const [images, setImages] = useState<Partial<ITextToImage>[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Image Generator
          </Typography>
          <ModeSwitch />
        </Toolbar>
      </AppBar>

      <Container disableGutters>
        <ImageGeneratorForm
          setImages={setImages}
          setLoading={setLoading}
          loading={loading}
          setError={setError}
        />

        <ImageDisplay images={images} loading={loading} error={error} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "auto",
            pt: 2,
            pb: 1,
          }}
        >
          <Link href="/about" color="secondary" component={NextLink}>
            Go to the about page
          </Link>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
