import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography, Stack, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (!user) {
    return <Typography variant="h6" align="center" sx={{ mt: 4 }}>User not found.</Typography>;
  }

  return (
    <Paper sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h5" gutterBottom>User Details</Typography>
      <Stack spacing={2}>
        <Typography><strong>First Name:</strong> {user.firstname}</Typography>
        <Typography><strong>Last Name:</strong> {user.lastname}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
      </Stack>
    </Paper>
  );
}

export default UserDetail;
