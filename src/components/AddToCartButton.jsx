import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ShoppingCartIcon />}
      size="large"
      onClick={() => dispatch(addToCart(product))}
      sx={{
        width: "100%",
        maxWidth: "100%",
        textTransform: "none",
        px: { xs: 1.5, sm: 2.5, md: 3 },
        py: { xs: 0.8, sm: 1, md: 1.2 },

        fontSize: {
          xs: "0.75rem",
          sm: "0.85rem",
          md: "0.95rem",
          lg: "1rem",
        },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1, 
        whiteSpace: "nowrap",
        borderRadius: 2,
      }}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
