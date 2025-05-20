import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const [filters, setFilters] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  // });
  // const handleInputChange = (e) => {
  //   setFilters({ ...filters, [e.target.name]: e.target.value });
  // };

  // Fetch users from API
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
    } catch (error) {
      console.log(error);
    }
    getUsers();
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, margin: "auto", mt: 4 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography variant="h6">User List</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/users/new")}
            endIcon={<AddIcon />}
          >
            Add User
          </Button>
        </Stack>

        {loading ? (
          <Stack alignItems="center" sx={{ p: 4 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover", // uses MUI theme default
                    },
                  }}
                >
                  <TableCell onClick={() => navigate(`/users/${user.id}`)}>
                    {user.firstname}
                  </TableCell>
                  <TableCell onClick={() => navigate(`/users/${user.id}`)}>
                    {user.lastname}
                  </TableCell>
                  <TableCell onClick={() => navigate(`/users/${user.id}`)}>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ mr: 2 }}
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/users/${user.id}/edit`)}
                      endIcon={<EditIcon />}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
      sx={{ maxWidth: 800, margin: "auto", mt:1}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default UserList;
