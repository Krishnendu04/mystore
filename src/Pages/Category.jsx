// src/pages/Category.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, products, isLoading, isError } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchProduct());
    }
  }, [dispatch, categories.length]);

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
        <Typography color="error">Failed to load categories</Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
      >
        Shop by Category
      </Typography>

      {/* CSS Grid for responsive layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // 2 per row on mobile
            sm: "repeat(3, 1fr)", // 3 per row on small screens
            md: "repeat(5, 1fr)", // 5 per row on desktop
          },
          gap: 3, // spacing between items
          justifyContent: "center",
        }}
      >
        {categories.map((cat) => {
          const product = products.find((p) => p.category === cat);
          const image = product?.thumbnail || "";

          return (
            <Paper
              key={cat}
              elevation={3}
              onClick={() =>
                navigate(`/products?q=&cat=${encodeURIComponent(cat)}&page=1`)
              }
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 120,
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Category Name */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
                sx={{ py: 2 }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default Category;
