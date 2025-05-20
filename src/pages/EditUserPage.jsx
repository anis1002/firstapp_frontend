import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {Stack,CircularProgress,} from "@mui/material";
import AddUser from "./CreateUserPage";

function EditUser() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user:", err);
        setLoading(false);
      });
    }, []);

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Stack>
    );
  }

  return user ? <AddUser currentUser={user}/> : <AdaadUser/>;
}

export default EditUser;
