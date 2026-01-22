import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button
} from "@mui/material";
import { fetchProduct } from "../redux/slices/ProductSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { filtered, isLoading } = useSelector((state) => state.product);
  const navigate=useNavigate();
  useEffect(() => {
    if (filtered.length === 0) {
      dispatch(fetchProduct());
    }
  }, [dispatch, filtered.length]);

  const product = filtered.find((item) => item.id === Number(id));

  if (isLoading || !product) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* LEFT SIDE - PRODUCT IMAGE */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={product.images}
            alt={product.title}
            style={{
              maxWidth: "100%",
              maxHeight: 350,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* RIGHT SIDE - PRODUCT DETAILS */}
        <Box flex={2}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
          >
            Category: {product.category}
          </Typography>

          <Typography variant="body1" mb={2}>
            {product.description}
          </Typography>

          <Typography variant="h6" fontWeight="bold" mb={3}>
            Price: ${product.price}
          </Typography>

          {/* Reusable AddToCart Component */}
          <AddToCartButton product={product} />
        </Box>
      </Paper>
      <Box display="flex" justifyContent="flex-end" mb={2} mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
