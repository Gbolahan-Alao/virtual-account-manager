import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Iconify from 'src/components/iconify';

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleGenerateAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7205/VirtualAccount/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ApiKey': 'Keehv8hwc0pgXuhCgkTm_6f7af4a2cc5e48b4ba95418ac431aad9',
        },
        body: JSON.stringify({
          firstName,
          lastName,  
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate virtual account');
      }

     
      alert(`Account created successfully. Account Name: ${lastName} ${firstName}`);
    } catch (error) {
      console.error('Error generating virtual account:', error.message);
      alert('Failed to generate virtual account. Please try again later.');
    } finally {
      setLoading(false);
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
       
      }}
    >
      <Stack direction="column" spacing={4} mb={5} sx={{ width: '40%' }}>
        <Typography variant="h4">Create Virtual Account</Typography>

        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={handleFirstNameChange}
          fullWidth
        />

        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={handleLastNameChange}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleGenerateAccount}
          sx={{ height: '50px', lineHeight: '50px' }}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateAccountPage;
