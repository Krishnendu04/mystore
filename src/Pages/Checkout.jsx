import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Stack
} from "@mui/material";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        p: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* LEFT: Forms */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          {/* SHIPPING ADDRESS */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <FormControl fullWidth component="fieldset">
              <FormLabel sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
                Shipping Address
              </FormLabel>

              <Stack spacing={2}>
                <TextField fullWidth label="Full Name" />
                <TextField fullWidth label="Phone Number" />
                <TextField fullWidth label="Address" />
                <TextField fullWidth label="City" />
                <TextField fullWidth label="Pincode" />
              </Stack>
            </FormControl>
          </Paper>

          {/* PAYMENT METHOD */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <FormControl component="fieldset">
              <FormLabel sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
                Payment Method
              </FormLabel>

              <RadioGroup defaultValue="card">
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit / Debit Card"
                />
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label="UPI / Google Pay / PhonePe"
                />
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Box>

        {/* RIGHT: Order Summary */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
          <Typography variant="h6" mb={2}>
            Order Summary
          </Typography>

          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2">
                {item.title} × {item.quantity}
              </Typography>
              <Typography variant="body2">
                ${item.price * item.quantity}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Shipping</Typography>
            <Typography>{shipping === 0 ? "Free" : `$${shipping}`}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Tax</Typography>
            <Typography>${tax.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>

          <Button variant="contained" color="primary" size="large" fullWidth>
            Place Order
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Checkout;
