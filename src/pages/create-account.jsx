
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify';

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nickName, setNickName] = useState('');
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleNickNameChange = (event) => {
    setNickName(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleGenerateAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7205/VirtualAccount/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ApiKey: 'Keehv8hwc0pgXuhCgkTm_6f7af4a2cc5e48b4ba95418ac431aad9',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          branch,
          nickName,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.virtualAccountName || 'Failed to generate virtual account');
      }

      if (
        responseData &&
        responseData.virtualAccountName ===
          'Phone number already exists. Account cannot be created.'
      ) {
        setError('Phone number already exists. Account cannot be created.');
        return;
      }

      alert(`Account created successfully. Account Name: ${lastName} ${firstName}`);
      navigate('/app');
    } catch (fetchError) {
      console.error('Error generating virtual account:', fetchError.message);
      setError('Failed to generate virtual account. Please try again later.');
    } finally {
      setLoading(false);
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setNickName('');
      setBranch('');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack direction="column" spacing={3} mb={5} sx={{ width: '40%' }}>
        <Typography variant="h4">Create Virtual Account</Typography>

        <TextField
          id="lastName"
          label="Surname"
          variant="outlined"
          value={lastName}
          onChange={handleLastNameChange}
          fullWidth
          inputProps={{
            style: {
              height: 50,
              padding: '0 14px',
            },
          }}
        />
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={handleFirstNameChange}
          fullWidth
          inputProps={{
            style: {
              height: 50,
              padding: '0 14px',
            },
          }}
        />

        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          fullWidth
          inputProps={{
            style: {
              height: 50,
              padding: '0 14px',
            },
          }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel id="branch-label">Branch</InputLabel>
        <Select
           labelId="branch-label"
           id="branch-select"
           value={branch}
           onChange={handleBranchChange}
           label="Branch"
           MenuProps={{
             PaperProps: {
               sx: {
                 maxHeight: '250px', 
                 width: 'auto',
               },
             },
           }}
           sx={{
             '& .MuiSelect-select': {
               padding: '14px',
               fontSize: '1rem',
             },
             '& .MuiSelect-select:focus': {
               backgroundColor: 'white',
             },
             '& .MuiOutlinedInput-root': {
               '& fieldset': {
                 borderColor: 'rgba(0, 0, 0, 0.23)',
               },
               '&:hover fieldset': {
                 borderColor: 'rgba(0, 0, 0, 0.87)',
               },
               '&.Mui-focused fieldset': {
                 borderColor: 'rgba(0, 0, 0, 0.87)',
               },
             },
           }}
        >
           <MenuItem value="Mowe">Mowe</MenuItem>
           <MenuItem value="Ibafo">Ibafo</MenuItem>
           <MenuItem value="Magboro">Magboro</MenuItem>
           <MenuItem value="Asese">Asese</MenuItem>
        </Select>
       </FormControl>
       

        <TextField
          id="nickName"
          label="Nickname"
          variant="outlined"
          value={nickName}
          onChange={handleNickNameChange}
          fullWidth
          inputProps={{
            style: {
              height: 50,
              padding: '0 14px',
            },
          }}
        />

        {error && <Typography color="error">{error}</Typography>}

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




// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Snackbar from '@mui/material/Snackbar';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Iconify from 'src/components/iconify';

// const CreateAccountPage = () => {
//  const [firstName, setFirstName] = useState('');
//  const [lastName, setLastName] = useState('');
//  const [phoneNumber, setPhoneNumber] = useState('');
//  const [nickName, setNickName] = useState('');
//  const [branch, setBranch] = useState('');
//  const [loading, setLoading] = useState(false);
//  const [error, setError] = useState('');
//  const [open, setOpen] = useState(false);
//  const [message, setMessage] = useState('');
//  const [severity, setSeverity] = useState('success');
//  const navigate = useNavigate();

//  const handleFirstNameChange = (event) => {
//     setFirstName(event.target.value);
//  };

//  const handleLastNameChange = (event) => {
//     setLastName(event.target.value);
//  };

//  const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
//  };

//  const handleNickNameChange = (event) => {
//     setNickName(event.target.value);
//  };

//  const handleBranchChange = (event) => {
//     setBranch(event.target.value);
//  };

//  const handleClick = () => {
//     setOpen(true);
//  };

//  const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//  };

//  const handleGenerateAccount = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://localhost:7205/VirtualAccount/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'ApiKey': 'Keehv8hwc0pgXuhCgkTm_6f7af4a2cc5e48b4ba95418ac431aad9',
//         },
//         body: JSON.stringify({
//           firstName,
//           lastName,
//           phoneNumber,
//           branch,
//           nickName,
//         }),
//       });

//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.virtualAccountName || 'Failed to generate virtual account');
//       }

//       if (responseData && responseData.virtualAccountName === "Phone number already exists. Account cannot be created.") {
//         setError('Phone number already exists. Account cannot be created.');
//         setSeverity('error');
//         setMessage(setError);
//         handleClick();
//         return;
//       }

//       setSeverity('success');
//       setMessage(`Account created successfully. Account Name: ${lastName} ${firstName}`);
//       handleClick();
//       navigate('/app');
//     } catch (fetchError) {
//       console.error('Error generating virtual account:', fetchError.message);
//       setError('Failed to generate virtual account. Please try again later.');
//       setSeverity('error');
//       setMessage(setError);
//       handleClick();
//     } finally {
//       setLoading(false);
//       setFirstName('');
//       setLastName('');
//       setPhoneNumber('');
//       setNickName('');
//       setBranch('');
//     }
//  };

//  return (
//     <Container
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Stack direction="column" spacing={3} mb={5} sx={{ width: '40%' }}>
//         <Typography variant="h4">Create Virtual Account</Typography>

//         {/* TextFields and Select for inputs */}
//         <TextField
//                   id="lastName"
//                   label="Surname"
//                   variant="outlined"
//                   value={lastName}
//                   onChange={handleLastNameChange}
//                   fullWidth
//                   inputProps={{
//                     style: {
//                       height: 50,
//                       padding: '0 14px',
//                     },
//                   }}
//                 />
//                 <TextField
//                   label="First Name"
//                   variant="outlined"
//                   value={firstName}
//                   onChange={handleFirstNameChange}
//                   fullWidth
//                   inputProps={{
//                     style: {
//                       height: 50,
//                       padding: '0 14px',
//                     },
//                   }}
//                 />
        
//                 <TextField
//                   id="phoneNumber"
//                   label="Phone Number"
//                   variant="outlined"
//                   value={phoneNumber}
//                   onChange={handlePhoneNumberChange}
//                   fullWidth
//                   inputProps={{
//                     style: {
//                       height: 50,
//                       padding: '0 14px',
//                     },
//                   }}
//                 />
//                 <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                 <InputLabel id="branch-label">Branch</InputLabel>
//                 <Select
//                    labelId="branch-label"
//                    id="branch-select"
//                    value={branch}
//                    onChange={handleBranchChange}
//                    label="Branch"
//                    MenuProps={{
//                      PaperProps: {
//                        sx: {
//                          maxHeight: '250px', // Increase the maximum height here
//                          width: 'auto', // Adjust the width as needed
//                        },
//                      },
//                    }}
//                    sx={{
//                      '& .MuiSelect-select': {
//                        padding: '14px',
//                        fontSize: '1rem',
//                      },
//                      '& .MuiSelect-select:focus': {
//                        backgroundColor: 'white',
//                      },
//                      '& .MuiOutlinedInput-root': {
//                        '& fieldset': {
//                          borderColor: 'rgba(0, 0, 0, 0.23)',
//                        },
//                        '&:hover fieldset': {
//                          borderColor: 'rgba(0, 0, 0, 0.87)',
//                        },
//                        '&.Mui-focused fieldset': {
//                          borderColor: 'rgba(0, 0, 0, 0.87)',
//                        },
//                      },
//                    }}
//                 >
//                    <MenuItem value="Mowe">Mowe</MenuItem>
//                    <MenuItem value="Ibafo">Ibafo</MenuItem>
//                    <MenuItem value="Magboro">Magboro</MenuItem>
//                    <MenuItem value="Asese">Asese</MenuItem>
//                 </Select>
//                </FormControl>
               
        
//                 <TextField
//                   id="nickName"
//                   label="Nickname"
//                   variant="outlined"
//                   value={nickName}
//                   onChange={handleNickNameChange}
//                   fullWidth
//                   inputProps={{
//                     style: {
//                       height: 50,
//                       padding: '0 14px',
//                     },
//                   }}
//                 />

//         {error && <Typography color="error">{error}</Typography>}

//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Iconify icon="eva:plus-fill" />}
//           onClick={handleGenerateAccount}
//           sx={{ height: '50px', lineHeight: '50px' }}
//           disabled={loading}
//         >
//           {loading ? 'Creating...' : 'Create Account'}
//         </Button>
//       </Stack>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </Container>
//  );
// };

// export default CreateAccountPage;
