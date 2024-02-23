import axios from 'axios';
import { useState } from 'react';

// Material-UI components
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Custom components
import Iconify from 'src/components/iconify';


// Router
import { useRouter } from 'src/routes/hooks';

// Theme
import { alpha, useTheme } from '@mui/material/styles';

// Theme CSS
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('https://localhost:7205/api/account/login', {
        email,
        password,
      });

      if (response.data.token) {
        router.push('/app');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    
    <form onSubmit={handleClick}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
        style={{marginBottom:"20px"}}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

    

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        disabled={loading}
      >
        Login
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
      <Card
      sx={{
        p: 5,
        width: 1,
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(3) // Add space between child elements
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: theme.spacing(3) }}>Sign in</Typography> {/* Add marginBottom to create space */}
      {renderForm}
    </Card>
      </Stack>
    </Box>
  );
}
