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
      sx={{ textTransform: "none", px: 4 }}
      >
      Add to Cart
      </Button>
  );
};

export default AddToCartButton;
