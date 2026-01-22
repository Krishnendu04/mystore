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
} from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, filtered, categories } = useSelector(
    (state) => state.product,
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // 10 per page

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Search + Category Filter
  const filteredData = useMemo(() => {
    return filtered.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [filtered, search, selectedCategory]);

  // Pagination
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: "50vh", // center vertically in half page
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
        {/* Search */}
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

        {/* Category Dropdown */}
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
          height: 400, // fixed height
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 70, fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ width: 220, fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ width: 160, fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ width: 100, fontWeight: "bold" }}>
                Price
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
                <TableCell>{item.id}</TableCell>

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
  );
};

export default Products;
