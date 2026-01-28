import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Skeleton,
} from "@mui/material";
import AddToCartButton from "../components/AddToCartButton";
import { DISCOUNT_MAP } from "../config/discounts";

const Deals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, isError } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!products.length) dispatch(fetchProduct());
  }, [dispatch, products.length]);

  const dealProducts = useMemo(() => {
    return products.filter((p) => DISCOUNT_MAP[p.id]);
  }, [products]);

  /* ERROR STATE */
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
        {/* SHIMMER UI */}
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image shimmer */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ aspectRatio: "1 / 1" }}
              />

              {/* Content shimmer */}
              <Box p={1.5}>
                <Skeleton height={22} width="80%" />
                <Skeleton height={18} width="50%" />

                <Box display="flex" gap={1} mt={1}>
                  <Skeleton height={24} width={60} />
                  <Skeleton height={18} width={40} />
                </Box>

                <Skeleton
                  variant="rectangular"
                  height={36}
                  sx={{ mt: 1, borderRadius: 1 }}
                />
              </Box>
            </Paper>
          ))}

        {/* PRODUCTS */}
        {!isLoading &&
          dealProducts.map((product) => (
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
                "&:hover": {
                  boxShadow: { xs: 3, md: 6 },
                  transform: { xs: "none", md: "scale(1.02)" },
                },
              }}
            >
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
