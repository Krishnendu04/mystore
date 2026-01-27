import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/slices/ProductSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  MenuItem,
  Paper,
  CircularProgress,
  TableSortLabel,
  Button,
  Typography,
} from "@mui/material";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, categories, isLoading, isError } = useSelector(
    (s) => s.product
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const category = searchParams.get("cat") || "all";
  const priceRange = searchParams.get("price") || "all";

  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const page = Math.max(0, pageFromUrl - 1);

  const limit = [10, 20, 50].includes(Number(searchParams.get("limit")))
    ? Number(searchParams.get("limit"))
    : 10;

  const sort = searchParams.get("sort");
  const priceOrder =
    sort === "price_asc" ? "asc" : sort === "price_desc" ? "desc" : null;

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (k === "page") {
        const pageValue = Number(v) + 1;
        if (pageValue <= 1) params.delete("page");
        else params.set("page", pageValue);
        return;
      }
      if (v === null || v === "" || v === "all") params.delete(k);
      else params.set(k, v);
    });
    setSearchParams(params, { replace: true });
  };

  const clearAll = () => setSearchParams({}, { replace: true });
  const debouncedSearch = useDebounce(search, 300);

  // ---------------- Filtering ONLY ----------------
  const filtered = useMemo(() => {
    const getPrice = (p) => p.discountedPrice || p.price;
    const isInPriceRange = (price) => {
      switch (priceRange) {
        case "0-50":
          return price <= 50;
        case "50-100":
          return price > 50 && price <= 100;
        case "100-500":
          return price > 100 && price <= 500;
        case "500+":
          return price > 500;
        default:
          return true;
      }
    };

    let data = products;

    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    if (debouncedSearch) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (priceRange !== "all") {
      data = data.filter((p) => isInPriceRange(getPrice(p)));
    }

    return data;
  }, [products, category, debouncedSearch, priceRange]);

  // ---------------- Pagination + Page Sorting ----------------
  const paginated = useMemo(() => {
    const start = page * limit;
    let pageData = filtered.slice(start, start + limit);

    if (priceOrder) {
      pageData = [...pageData].sort((a, b) => {
        const getPrice = (p) => p.discountedPrice || p.price;
        return priceOrder === "asc"
          ? getPrice(a) - getPrice(b)
          : getPrice(b) - getPrice(a);
      });
    }

    return pageData;
  }, [filtered, page, limit, priceOrder]);

  // ---------------- Loading ----------------
  if (isLoading)
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

  if (isError)
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">Error loading products</Typography>
      </Box>
    );

  return (
    <Box p={{ xs: 1, md: 3 }} sx={{ minHeight: "60vh" }}>
      {/* ---------------- Filters ---------------- */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          size="small"
          label="Search by title"
          value={search}
          onChange={(e) => updateParams({ q: e.target.value, page: 0 })}
          sx={{ width: 260 }}
        />

        <TextField
          select
          size="small"
          label="Category"
          value={category}
          onChange={(e) => updateParams({ cat: e.target.value, page: 0 })}
          sx={{ width: 200 }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Price Range"
          value={priceRange}
          onChange={(e) => updateParams({ price: e.target.value, page: 0 })}
          sx={{ width: 180 }}
        >
          <MenuItem value="all">All Prices</MenuItem>
          <MenuItem value="0-50">Under $50</MenuItem>
          <MenuItem value="50-100">$50 - $100</MenuItem>
          <MenuItem value="100-500">$100 - $500</MenuItem>
          <MenuItem value="500+">$500+</MenuItem>
        </TextField>

        {(search || category !== "all" || priceRange !== "all" || priceOrder) && (
          <Button variant="outlined" size="small" color="error" onClick={clearAll}>
            Clear All
          </Button>
        )}
      </Box>

      {/* ---------------- Table ---------------- */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" sx={{ tableLayout: "fixed", minWidth: 1100 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  width={80}
                  sx={{
                    position: "sticky",
                    left: 0,
                    background: "#fff",
                    zIndex: 3,
                  }}
                >
                  ID
                </TableCell>
                <TableCell width={220}>Title</TableCell>
                <TableCell width={160}>Category</TableCell>
                <TableCell width={120}>
                  <TableSortLabel
                    active={!!priceOrder}
                    direction={priceOrder === "desc" ? "desc" : "asc"}
                    onClick={() =>
                      updateParams({
                        sort: !priceOrder
                          ? "price_asc"
                          : priceOrder === "asc"
                          ? "price_desc"
                          : null,
                      })
                    }
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell width={350}>Description</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.map((p) => (
                <TableRow
                  key={p.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <TableCell
                    sx={{
                      position: "sticky",
                      left: 0,
                      background: "#fff",
                      zIndex: 2,
                    }}
                  >
                    {p.id}
                  </TableCell>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>${p.discountedPrice || p.price}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 20, 50]}
            count={filtered.length}
            rowsPerPage={limit}
            page={page}
            onPageChange={(e, p) => updateParams({ page: p })}
            onRowsPerPageChange={(e) =>
              updateParams({ limit: e.target.value, page: 0 })
            }
          />
        </Box>
      </Paper>
    </Box>
  );
}
