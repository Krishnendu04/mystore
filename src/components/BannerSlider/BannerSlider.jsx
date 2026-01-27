import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Import banner images
import banner1 from "../../assets/images/banner/banner1.png";
import banner2 from "../../assets/images/banner/banner2.jpg";
import banner3 from "../../assets/images/banner/banner3.jpg";
import banner4 from "../../assets/images/banner/banner4.jpg";

const images = [banner1, banner2, banner3, banner4];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "1%" }}>
      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 280, sm: 400, md: 520 },
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={images[current]}
          alt="banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Previous Button */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 20,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.4)",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Next Button */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 20,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.4)",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Slider Indicators */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 2,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: current === index ? 14 : 10,
              height: current === index ? 14 : 10,
              borderRadius: "50%",
              backgroundColor: current === index ? "primary.main" : "grey.400",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
