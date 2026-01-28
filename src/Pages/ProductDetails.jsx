import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { fetchProduct } from "../redux/slices/ProductSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProduct());
    }
  }, [dispatch, products.length]);

  const product = products.find((p) => p.id === Number(id));

  if (isLoading || !product) {
    return (
      <Box
        minHeight="60vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  const hasDiscount = product.discount > 0;

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ minHeight: "70vh" }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          p: 3,
          borderRadius: 2,
          position: "relative",
        }}
      >
        {/* Discount Badge */}
        {hasDiscount && (
          <Chip
            label={`${product.discount}% OFF`}
            color="secondary"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              fontWeight: "bold",
            }}
          />
        )}

        {/* Image */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            style={{
              maxWidth: "100%",
              maxHeight: 350,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Details */}
        <Box flex={2}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {product.category}
          </Typography>

          <Typography variant="body1" mb={2}>
            {product.description}
          </Typography>

          {/* Price Section */}
          {hasDiscount ? (
            <Box mb={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h5" color="error" fontWeight="bold">
                  ${product.discountedPrice}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  ${product.price}
                </Typography>
              </Box>

              <Typography variant="body2" color="success.main">
                You save {product.discount}% 🎉
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Price: ${product.price}
            </Typography>
          )}

          {/* Add to Cart uses discounted price */}
          <Box
            sx={{
              width: {
                xs: "100%", 
                sm: "80%", 
                md: "60%", 
                lg: "18vw", 
              },
              maxWidth: 220, 
              minWidth: 140, 
            }}
          >
            <AddToCartButton
              product={{
                ...product,
                price: hasDiscount ? product.discountedPrice : product.price,
              }}
            />
          </Box>
        </Box>
      </Paper>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
