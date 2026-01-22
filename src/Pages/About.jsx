import React from "react";
import { Box, Typography } from "@mui/material";
import aboutBanner from "../assets/images/about/about.png";

const About = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 6 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 6,
          p: { xs: 3, md: 6 },
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Our Store
        </Typography>
        <Typography variant="h6" color="text.secondary">
          We provide top-quality products with a focus on customer satisfaction
          and innovation.
        </Typography>
      </Box>

      {/* Full Width Banner Image with Same Height as Hero Box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 6 },
          mb: 6,
          overflow: "hidden",
        }}
      >
        <img
          src={aboutBanner}
          alt="Our Story"
          style={{
            width: "100%",
            maxWidth: "1200px", // optional max width
            height: "auto", // maintain aspect ratio
            display: "block",
            objectFit: "contain", // full image visible
          }}
        />
      </Box>

      {/* Our Story Text */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Our Story
        </Typography>
        <Typography variant="body1" mb={2}>
          Founded in 2020, our e-commerce platform aims to bring the best
          products to your doorstep. We carefully select items to ensure quality
          and customer satisfaction.
        </Typography>
        <Typography variant="body1">
          Our team is committed to delivering smooth shopping experiences, fast
          delivery, and excellent support for every customer.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
