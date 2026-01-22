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
  Popover,
  Badge,
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
  const [cartAnchorEl, setCartAnchorEl] = useState(null); //used to store the DOM element ShoppingCartIcon and the cart popover will display below the cart icon.
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Screen size detection
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Drawer can only be open on mobile
  const drawerOpen = isMobile && mobileDrawerOpen;

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky">
        <Toolbar>
          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            <StorefrontIcon sx={{ mr: 1 }} />
            <Typography variant="h6">MyStore</Typography>
          </Box>

          {/* Desktop Menu */}
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

          {/* Cart */}
          <Badge
            badgeContent={totalQty}
            color="secondary"
            sx={{ cursor: "pointer", mr: 2 }}
            onClick={(e) => setCartAnchorEl(e.currentTarget)}
          >
            <ShoppingCartIcon />
          </Badge>

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 250 },
        }}
      >
        <Box sx={{ width: 250 }}>
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

      {/* Cart Popover */}
      <Popover
        open={Boolean(cartAnchorEl)}
        anchorEl={cartAnchorEl}
        onClose={() => setCartAnchorEl(null)}
        disableScrollLock //when this popupopens Material UI locks body scrolling and adds padding-right to the body to prevent this we use disableScrollLock
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 2,
            width: { xs: 300, sm: 340 },
            borderRadius: 3,
          },
        }}
      >
        <Cart onClose={() => setCartAnchorEl(null)} />
      </Popover>
    </>
  );
}
