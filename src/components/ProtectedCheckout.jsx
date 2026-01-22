import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProtectedCheckout = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Your cart is empty 🛒
        </Typography>

        <Typography color="text.secondary">
          Please add at least one item to proceed to checkout.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
        >
          Go to Products
        </Button>
      </Box>
    );
  }

  // If cart has items → allow access
  return children;
};

export default ProtectedCheckout;
