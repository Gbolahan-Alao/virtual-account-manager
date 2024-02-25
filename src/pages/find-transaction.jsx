import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FindTransactionsPage = () => {
  const { accountNumber } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`https://localhost:7205/api/notifications/${accountNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [accountNumber]);

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (transactions.length === 0) {
    return (
      <Container>
      <Typography
      variant="h4"
      sx={{
        margin: '20px 0',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      No transactions found for account number: {accountNumber}
    </Typography>
      </Container>
    );
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transactions for Account Number: {accountNumber}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle2">Transaction Date</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Account Number</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Account Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Amount</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Transaction Type</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Sender Account Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Sender Bank Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Transaction Reference</Typography></TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
              <TableCell><Typography variant="caption">{formatDate(transaction.transactionDate)}</Typography></TableCell>
              <TableCell><Typography variant="caption">{transaction.accountNumber}</Typography></TableCell>
              <TableCell><Typography variant="caption">{transaction.virtualAccountName}</Typography></TableCell>
              <TableCell><Typography variant="caption">{transaction.amount}</Typography></TableCell>
              <TableCell><Typography variant="caption">{transaction.transactionType}</Typography></TableCell>
              <TableCell><Typography variant="caption">{transaction.senderAccountName}</Typography></TableCell>
              <TableCell><Typography variant="caption">{transaction.senderBankName}</Typography></TableCell>
              <TableCell><Typography variant="caption">{transaction.transactionReference}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FindTransactionsPage;
