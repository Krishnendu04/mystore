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

const CART_MAX_HEIGHT = "70vh";

const Cart = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: CART_MAX_HEIGHT,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography fontWeight="bold">My Cart</Typography>

        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* ================= SCROLLABLE BODY ================= */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
          mt: 1,
        }}
      >
        {cartItems.length === 0 && (
          <Typography align="center" color="text.secondary" py={3}>
            Cart is empty
          </Typography>
        )}

        {cartItems.map((item) => (
          <Box key={item.id} py={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Product Info */}
              <Box sx={{ maxWidth: "60%" }}>
                <Typography fontSize={14} fontWeight={600} noWrap>
                  {item.title}
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  ${item.price}
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

                <Typography fontWeight="bold">
                  {item.quantity}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => dispatch(addToCart(item))}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>

          </Box>
        ))}
      </Box>

      {/* ================= FIXED FOOTER ================= */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            borderTop: "1px solid #e0e0e0",
            pt: 1.5,
            mt: 1,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{
              flexWrap: "nowrap",
            }}
          >
            {/* Total */}
            <Typography fontWeight="bold" fontSize={{ xs: 14, sm: 16 }}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>

            {/* Buttons */}
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                Buy Now
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => dispatch(clearCart())}
              >
                Clear
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
