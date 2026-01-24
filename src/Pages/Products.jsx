import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  TableSortLabel,
} from "@mui/material";
import useDebounce from "../hooks/useDebounce";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, filtered, categories } = useSelector(
    (state) => state.product,
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // null = no sorting, "asc" | "desc" = active sorting
  const [priceOrder, setPriceOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Toggle price sorting
  const handlePriceSort = () => {
    setPriceOrder((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null; // back to unsorted
    });
  };

  // used custom useDebounce hook to handle search input, to avoid filtering on every keystroke.
  const debouncedSearch=useDebounce(search,300);
  // Search + Category filter (NO sorting here)
  const filteredData = useMemo(() => {
    return filtered.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [filtered, debouncedSearch, selectedCategory]);

  // Pagination + Page-wise conditional sorting
  const paginatedData = useMemo(() => {
    const pageData = filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    // First load => keep API order (ID ascending)
    if (!priceOrder) return pageData;

    // After clicking Price => sort only this page
    return [...pageData].sort((a, b) =>
      priceOrder === "asc" ? a.price - b.price : b.price - a.price,
    );
  }, [filteredData, page, rowsPerPage, priceOrder]);

  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );

  if (isError) return <p>Error...</p>;

  return (
    <Box p={{ xs: 1, md: 3 }}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Products
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          label="Search by title"
          size="small"
          sx={{ width: 280 }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />

        <TextField
          select
          label="Category"
          size="small"
          sx={{ width: 220 }}
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(0);
          }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories?.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          height: 400,
          borderRadius: 2,
          boxShadow: 3,
          overflowX: "auto",
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: 70,
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#fff",
                  zIndex: 3,
                }}
              >
                ID
              </TableCell>

              <TableCell sx={{ width: 220, fontWeight: "bold" }}>
                Title
              </TableCell>

              <TableCell sx={{ width: 160, fontWeight: "bold" }}>
                Category
              </TableCell>

              {/* Sortable Price */}
              <TableCell sx={{ width: 100, fontWeight: "bold" }}>
                <TableSortLabel
                  active={Boolean(priceOrder)}
                  direction={priceOrder === "desc" ? "desc" : "asc"}
                  onClick={handlePriceSort}
                >
                  Price
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ width: 350, fontWeight: "bold" }}>
                Description
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <TableCell
                  sx={{
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 2,
                  }}
                >
                  {item.id}
                </TableCell>

                <TableCell
                  sx={{
                    maxWidth: 220,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </TableCell>

                <TableCell>{item.category}</TableCell>

                <TableCell>${item.price}</TableCell>

                <TableCell
                  sx={{
                    maxWidth: 350,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={item.description}
                >
                  {item.description}
                </TableCell>
              </TableRow>
            ))}

            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          justifyContent: { xs: "center", md: "right" },
        }}
      >
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 50]}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
    </Box>
  );
};

export default Products;
