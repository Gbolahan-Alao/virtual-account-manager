import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(50);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const navigate = useNavigate();

  const [cachedAccounts, setCachedAccounts] = useState({});
  const fetchAccounts = useCallback(
    async (searchTerm) => {
      try {
        if (cachedAccounts[searchTerm]) {
          setAccounts(cachedAccounts[searchTerm]); 
          setLoading(false);
          return;
        }

        setLoading(true);
        let endpoint = `https://localhost:7205/virtualaccount/created-accounts`;
        if (searchTerm.trim() !== '') {
          endpoint = `https://localhost:7205/VirtualAccount/find-account?searchWord=${searchTerm}`;
        }
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to search accounts');
        }
        const data = await response.json();
        setCachedAccounts((prevState) => ({
          ...prevState,
          [searchTerm]: data,
        }));

        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accounts:', error.message);
        setLoading(false);
        setOpenErrorModal(true);
        setErrorMessage('Failed to fetch accounts. Please try again later.');
      }
    },
    [cachedAccounts]
  );

  const handleChangeSearch = (e) => {
    const searchValue = e.target.value;
    setSearchWord(searchValue);
    fetchAccounts(searchValue);
  };

  useEffect(() => {
    fetchAccounts('');
  }, [fetchAccounts]);

  useEffect(() => {
    fetchAccounts(searchWord);
  }, [searchWord, fetchAccounts]);

  const navigateToCreateAccount = () => {
    navigate('/create-account');
  };

  const navigateToTransactions = (accountNumber) => {
    navigate(`/transactions/${accountNumber}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastAccount = page * rowsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - rowsPerPage;
  const currentAccounts = accounts.slice(indexOfFirstAccount, indexOfLastAccount);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
        paddingTop: '0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginBottom: '1rem',
        }}
      >
      <Typography variant="h4" sx={{ alignSelf: 'flex-start', flexGrow: 1, marginTop: 0, color: '#1d72f1' }}>
      Registered Accounts
     </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchWord}
          onChange={handleChangeSearch}
          sx={{ marginRight: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={navigateToCreateAccount}
          sx={{ textTransform: 'none', marginLeft: '1rem' }}
        >
          Create Account
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper sx={{ height: 500, overflow: 'auto', marginBottom: '1rem', width: '100%' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Created On</TableCell>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Nickname</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentAccounts.map((account, index) => (
                    <TableRow
                      key={index}
                      onClick={() => navigateToTransactions(account.accountNumber)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{new Date(account.createdOn).toLocaleString()}</TableCell>
                      <TableCell>{account.accountName}</TableCell>
                      <TableCell>{account.branch}</TableCell>
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell>{account.phoneNumber}</TableCell>
                      <TableCell>{account.nickName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Stack sx={{ my: 3 }}>
            <Pagination
              count={Math.ceil(accounts.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '8px',
                },
                '& .Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                },
              }}
            />
          </Stack>
        </>
      )}
      <Modal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& .MuiModal-root': {
            zIndex: 'modal',
          },
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default UserPage;
