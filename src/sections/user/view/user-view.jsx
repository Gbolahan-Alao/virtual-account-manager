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
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('https://localhost:7205/virtualaccount/created-accounts');
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        const data = await response.json();
        setAccounts(data);
        setLoading(false);
      } catch (fetchError) {
        console.error('Error fetching accounts:', fetchError.message);
        setLoading(false);
        setOpenErrorModal(true);
        setErrorMessage('Failed to fetch accounts. Please try again later.');
      }
    };

    fetchAccounts();
  }, []);

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
        paddingTop: '0', // Add padding top to align content from the top
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '1rem' }}>
        <Typography variant="h4" sx={{ alignSelf: 'flex-start', flexGrow: 1, marginTop: 0 }}>
          Registered Accounts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={navigateToCreateAccount}
          sx={{ textTransform: 'none' }}
        >
          Create Account
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper sx={{ height: 400, overflow: 'auto', marginBottom: '1rem', width: '100%' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Created On</TableCell>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Nickname</TableCell>
                    <TableCell>Reference</TableCell>
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
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell>{account.phoneNumber}</TableCell>
                      <TableCell>{account.branch}</TableCell>
                      <TableCell>{account.nickName}</TableCell>
                      <TableCell>{account.reference}</TableCell>
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
