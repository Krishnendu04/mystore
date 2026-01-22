import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  addToCart,
  clearCart,
} from "../redux/slices/CartSlice";

import {
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography fontWeight="bold">My Cart</Typography>

        {/* Close Cart */}
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1 }} />

      {/* Empty Cart */}
      {cartItems.length === 0 && (
        <Typography align="center" color="text.secondary" py={2}>
          Cart is empty
        </Typography>
      )}

      {/* Cart Items */}
      {cartItems.map((item) => (
        <Box key={item.id} py={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Product Info */}
            <Box sx={{ maxWidth: "65%" }}>
              <Typography fontSize={14} fontWeight={600} noWrap>
                {item.title}
              </Typography>
              <Typography fontSize={13} color="text.secondary">
                $ {item.price}
              </Typography>
            </Box>

            {/* Quantity Controls */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                size="small"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography fontWeight="bold">{item.quantity}</Typography>

              <IconButton
                size="small"
                onClick={() => dispatch(addToCart(item))}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}

      {/* Footer */}
      {cartItems.length > 0 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          spacing={1}
        >
          <Typography fontWeight="bold">
            Total: $ {totalPrice.toFixed(2)}
          </Typography>

          <Stack direction="row" spacing={1}>
            {/* Buy Now Button */}
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                onClose(); // close cart popover
                navigate("/checkout"); // go to checkout page
              }}
            >
              Buy Now
            </Button>

            {/* Clear Button */}
            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => dispatch(clearCart())}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default Cart;
