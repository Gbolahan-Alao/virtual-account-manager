import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7205/api/Account/AddUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add user');
      }

      setStatus('success');
      setMessage('User added successfully.');

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
      });

     
      setTimeout(() => {
        navigate('/app');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to add user.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box sx={{
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: 4,
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Add New User
        </Typography>
        {status && (
          <Typography variant="body1" align="center" sx={{ marginBottom: 2, color: status === 'success' ? 'green' : 'red' }}>
            {message}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Add User
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Settings;
