import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // Validate email
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Check all fields
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email)) newErrors.email = "Invalid email address";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success: Show snackbar and clear form
    setSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Contact Form */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
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

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 3 }}
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
            />

            <TextField
              label="Subject"
              name="subject"
              variant="outlined"
              fullWidth
              value={form.subject}
              onChange={handleChange}
              error={!!errors.subject}
              helperText={errors.subject}
              sx={{ mb: 3 }}
            />

            <TextField
              label="Message"
              name="message"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={form.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              sx={{ mb: 3 }}
            />

            <Button variant="contained" color="primary" size="large" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </Paper>

        {/* Contact Info */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
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
            <Typography variant="body2">Facebook | Twitter | Instagram</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
