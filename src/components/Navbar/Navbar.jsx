import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Badge,
  Popper,
  Paper,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import Cart from "../../Pages/Cart";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCartClick = (e) => {
    setCartAnchorEl(e.currentTarget);
    setCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            <StorefrontIcon sx={{ mr: 1 }} />
            <Typography variant="h6">MyStore</Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3 }}>
            {navLinks.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={NavLink}
                to={item.path}
                sx={{
                  textTransform: "none",
                  "&.active": { borderBottom: "2px solid white" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Cart button */}
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={totalQty} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setMobileDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile menu */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: 250 } }}
      >
        <Box>
          <Box display="flex" justifyContent="flex-end" p={1}>
            <IconButton onClick={() => setMobileDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Cart dropdown (Popper = no aria-hidden, no Modal, no warning) */}
      <Popper
        open={cartOpen}
        anchorEl={cartAnchorEl}
        placement="bottom-end"
        disablePortal
        sx={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={closeCart}>
          <Paper
            elevation={8}
            sx={{
              p: 2,
              width: { xs: 300, sm: 340 },
              borderRadius: 3,
              mt: 1,
            }}
          >
            <Cart onClose={closeCart} />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
