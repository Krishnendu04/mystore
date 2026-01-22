import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Stack
} from "@mui/material";

import Grid from "@mui/material/Grid";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          justifyContent={{ xs: "center", md: "space-between" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <StorefrontIcon fontSize="large" />
              <Typography variant="h6">MyStore</Typography>
            </Stack>
            <Typography variant="body2">
              Your one-stop destination for quality products at the best prices.
            </Typography>
          </Grid>

          {/* Shop */}
          <Grid
            size={{ xs: 12, sm: 6, md: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Shop
            </Typography>
            <Link href="/products" color="inherit" underline="hover">
              Products
            </Link>
            <Link href="/products" color="inherit" underline="hover">
              Categories
            </Link>
            <Link href="/products" color="inherit" underline="hover">
              Deals
            </Link>
          </Grid>

          {/* Support */}
          <Grid
            size={{ xs: 12, sm: 6, md: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="c/contact" color="inherit" underline="hover">
              Help Center
            </Link>
            <Link href="/about" color="inherit" underline="hover">
              Returns
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Grid>

          {/* Newsletter */}
          <Grid
            size={{ xs: 12, sm: 6, md: 5 }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography variant="h6" gutterBottom>
              Subscribe to our newsletter
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                placeholder="Email address"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                }}
              />
              <Button variant="contained" color="secondary">
                Subscribe
              </Button>
            </Box>

            {/* Social Icons */}
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom */}
        <Box
          sx={{
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            mt: 4,
            pt: 2,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} MyStore. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
