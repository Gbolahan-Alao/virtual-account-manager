import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { useAuth } from '../user/useAuth';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('https://localhost:7205/api/account/login', {
        email,
        password,
      });

      if (response.data.token) {
        auth.login(response.data.token); 
        console.log(response.data.to)// Store the token
        router.push('/app');
      }
    } catch (loginError) { // Rename the error variable to avoid shadowing
      console.error('Login failed:', loginError);
      setError('Failed to login. Please try again.');
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
          style={{ marginBottom: '20px' }}
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
        loading={loading}
        disabled={loading}
      >
        Login
      </LoadingButton>
      {error && <Typography color="error">{error}</Typography>}
    </form>
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto', // Enable scrolling if content overflows
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing(3),
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: theme.spacing(3) }}>
            Sign in
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
