import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh", // full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Flex container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // stack on small, side by side on md+
          gap: 4,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Contact Form */}
        <Paper
          elevation={3}
          sx={{
            flex: 1, // take equal space
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Send us a Message
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Paper>

        {/* Contact Info */}
        <Paper
          elevation={3}
          sx={{
            flex: 1, // equal space
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Contact Information
          </Typography>

          <Typography variant="body1" mb={2}>
            <strong>Address:</strong> 123 E-commerce St., City, Country
          </Typography>

          <Typography variant="body1" mb={2}>
            <strong>Email:</strong> support@ecommerce.com
          </Typography>

          <Typography variant="body1" mb={2}>
            <strong>Phone:</strong> +1 234 567 890
          </Typography>

          <Typography variant="body1" mb={2}>
            <strong>Working Hours:</strong> Mon - Fri, 9AM - 6PM
          </Typography>

          <Box mt={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Follow Us
            </Typography>
            <Typography variant="body2">
              Facebook | Twitter | Instagram
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Contact;
