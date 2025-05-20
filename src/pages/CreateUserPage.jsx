import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Paper, Stack, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// 🔒 Zod schema for validation
const schema = (currentUser ) =>
  z.object({
    firstname: z.string().nonempty("First name is required"),
    lastname: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email"),
    password: currentUser
      ? z.string().optional()
      : z
          .string()
          .nonempty("Password is required")
          .min(8, "Password must be at least 8 characters"),
  });

function AddUser({ currentUser }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema(currentUser)),
    defaultValues: {
      firstname: currentUser?.firstname || "",
      lastname: currentUser?.lastname || "",
      email: currentUser?.email || "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      currentUser
        ? await axios.put(
            `http://localhost:8080/api/users/${currentUser?.id}`,
            data
          )
        : await axios.post("http://localhost:8080/api/users", data);
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Paper sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {currentUser ? "Edit User" : "Add New User"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            {...register("firstname")}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
          />
          <TextField
            label="Last Name"
            {...register("lastname")}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
          />
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          {!currentUser && (
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default AddUser;
