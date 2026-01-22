import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Skeleton,
  Grid,
} from "@mui/material";
import AddToCartButton from "../AddToCartButton";

const CARD_WIDTH = 230;
const CARD_HEIGHT = 360;

export default function ProductSlider() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { isLoading, isError, products } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const displayedProducts = useMemo(() => {
    if (!products?.length) return [];
    return [...products].slice(0, 5);
  }, [products]);

  return (
    <Box py={6}>
      <Container maxWidth="xl">
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={4}>
          🔥 Trending Products
        </Typography>

        <Grid
          container
          columns={{ xs: 1, sm: 2, md: 5 }}
          columnSpacing={3}
          rowSpacing={4}
          justifyContent="center"
        >
          {/* Skeleton */}
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <Grid key={index} gridColumn="span 1" display="flex" justifyContent="center">
                <Card sx={cardStyle}>
                  <Skeleton variant="rectangular" height={160} />
                  <CardContent>
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                    <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}

          {/* Products */}
          {!isLoading &&
            !isError &&
            displayedProducts.map((product) => (
              <Grid
                key={product.id}
                gridColumn="span 1"
                display="flex"
                justifyContent="center"
              >
                <Card sx={cardStyle}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                    onClick={() => navigate(`/products/${product.id}`)}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {product.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" noWrap>
                      {product.category}
                    </Typography>

                    <Typography variant="h6" color="primary" mt={1}>
                      ${product.price}
                    </Typography>
                    
                    <Box display="flex" justifyContent="center" mt={1}>
                      <AddToCartButton product={product} />
                    </Box>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {!isLoading && isError && (
          <Typography color="error" textAlign="center" mt={3}>
            Failed to load products
          </Typography>
        )}
      </Container>
    </Box>
  );
}

const cardStyle = {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  display: "flex",
  flexDirection: "column",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: 4,
  },
};
