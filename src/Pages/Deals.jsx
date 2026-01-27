import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper, Chip } from "@mui/material";
import AddToCartButton from "../components/AddToCartButton";
import { DISCOUNT_MAP } from "../config/discounts";

const Deals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, isError } = useSelector((state) => state.product);

  useEffect(() => {
    if (!products.length) dispatch(fetchProduct());
  }, [dispatch, products.length]);

  /**
   * Only products that exist in DISCOUNT_MAP
   */
  const dealProducts = useMemo(() => {
    return products.filter((p) => DISCOUNT_MAP[p.id]);
  }, [products]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">Failed to load deals</Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        🔥 Today’s Deals
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(5, 1fr)",
          },
          gap: 2,
        }}
      >
        {dealProducts.map((product) => (
          <Paper
            key={product.id}
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
            }}
          >
            {/* Discount badge */}
            <Chip
              label={`${product.discount}% OFF`}
              color="secondary"
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                zIndex: 2,
                fontWeight: "bold",
              }}
            />

            {/* Image */}
            <Box
              onClick={() => navigate(`/products/${product.id}`)}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundImage: `url(${product.thumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                bgcolor: "#fafafa",
                cursor: "pointer",
              }}
            />

            {/* Info */}
            <Box
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                gap: 0.5,
              }}
            >
              <Typography fontWeight="bold" noWrap title={product.title}>
                {product.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Typography fontWeight="bold" color="error">
                  ${product.discountedPrice}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  ${product.price}
                </Typography>
              </Box>

              {/* Add to cart uses discounted price */}
              <AddToCartButton
                product={{ ...product, price: product.discountedPrice }}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Deals;
