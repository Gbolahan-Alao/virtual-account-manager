import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
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
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('https://localhost:7205/virtualaccount/created-accounts');
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        const data = await response.json();
        setAccounts(data.reverse());
      } catch (error) {
        console.error('Error fetching accounts:', error.message);
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={navigateToCreateAccount}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          },
          textTransform: 'none',
        }}
      >
        Create Account
      </Button>
      <Typography variant="h4" gutterBottom>
        Registered Accounts
      </Typography>
      <TableContainer
        component="div"
        sx={{
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#f7f7f7',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Account Name</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Created On</TableCell>
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
                <TableCell>{account.accountName}</TableCell>
                <TableCell>{account.accountNumber}</TableCell>
                <TableCell>{new Date(account.createdOn).toLocaleString()}</TableCell>
                <TableCell>{account.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Container>
  );
};

export default UserPage;
