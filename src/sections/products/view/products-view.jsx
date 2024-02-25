import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export default function TransactionsView() {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://localhost:7205/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.transactionReference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Account Transactions
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon style={{ marginRight: 8 }} />
          <InputBase
            placeholder="Find by reference"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ borderRadius: 8, backgroundColor: '#f3f3f3', padding: '6px 12px' }}
          />
        </div>
      </div>

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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell><Typography variant="caption">{formatDate(notification.transactionDate)}</Typography></TableCell>
                <TableCell><Typography variant="caption">{notification.accountNumber}</Typography></TableCell>
                <TableCell><Typography variant="caption">{notification.virtualAccountName}</Typography></TableCell>
                <TableCell><Typography variant="caption">{notification.amount}</Typography></TableCell>
                <TableCell><Typography variant="caption">{notification.transactionType}</Typography></TableCell>
                <TableCell><Typography variant="caption">{notification.senderAccountName}</Typography></TableCell>
                <TableCell><Typography variant="caption">{notification.senderBankName}</Typography></TableCell>
                <TableCell><Typography variant="caption">{notification.transactionReference}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
