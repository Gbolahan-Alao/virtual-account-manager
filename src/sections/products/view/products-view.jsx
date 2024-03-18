import EventIcon from '@mui/icons-material/Event';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import JsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';
import './custom-datepicker.css';

export default function TransactionsView() {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://localhost:7205/api/notifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
      setOpenErrorModal(true);
      setErrorMessage('Failed to fetch notifications. Please try again later.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.transactionReference.toLowerCase().includes(searchQuery) ||
      notification.accountNumber.includes(searchQuery) ||
      notification.virtualAccountName.toLowerCase().includes(searchQuery)
  );

  const filteredNotificationsByDate = selectedDate
    ? filteredNotifications.filter(
        (notification) =>
          new Date(notification.transactionDate).toDateString() === selectedDate.toDateString()
      )
    : filteredNotifications;

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredNotificationsByDate);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Notifications');

    XLSX.writeFile(workbook, 'notifications.xlsx');
  };

  const exportToPdf = () => {
    const doc = new JsPDF();
  
    doc.text('Notifications', 10, 10);
  
    let y = 20;
    const notificationsToExport = filteredNotificationsByDate.length > 0 ? filteredNotificationsByDate : notifications;
    
    notificationsToExport.forEach((notification, index) => {
      doc.text(`Account Number:${notification.accountNumber}`, 10, y);
      doc.text(`Transaction Date: ${formatDate(notification.transactionDate)}`, 20, y + 10);
      doc.text(`Account Name: ${notification.virtualAccountName}`, 20, y + 30);
      doc.text(`Amount: ${notification.amount}`, 20, y + 40);
      doc.text(`Sender Account Number: ${notification.senderAccountNumber}`, 20, y + 50);
      doc.text(`Sender Account Name: ${notification.senderAccountName}`, 20, y + 60);
      doc.text(`Sender Bank Name: ${notification.senderBankName}`, 20, y + 70);
      doc.text(`Transaction Reference: ${notification.transactionReference}`, 20, y + 80);
  
      y += 100; 
    });
  
    doc.save('notifications.pdf');
  };
  

  return (
    <Container>
      <Typography variant="h4" component="h1" style={{ color: '#1d72f1', marginBottom: 20 }}>
        Account Transactions
      </Typography>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <InputBase
          placeholder="Find transactions"
          value={searchQuery}
          onChange={handleSearchChange}
          startAdornment={<SearchIcon style={{color:'#1d72f1'}}/>}
          style={{
            height: '40px',
            borderRadius: 8,
            backgroundColor: '#f3f3f3',
            padding: '6px 12px',
            marginRight: '16px',
            color: '#1d72f1',
            // border: '1px solid blue',
          }}
        />
        <DatePicker
          id="datepicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select date"
          wrapperClassName="datepicker-wrapper"
          className="datepicker-input"
          customInput={<InputBase startAdornment={<EventIcon style={{color:'#1976d2'}}/>} />}
          style={{
            borderRadius: 8,
            backgroundColor: '#f3f3f3',
            padding: '6px 12px',
            paddingRight: '3px',
            height: '40px',
            width: '200px',
            // color: 'blue',
            // border: '1px solid blue',
          }}
        />
        <Button variant="outlined" onClick={exportToExcel} startIcon={<SaveAltIcon style={{}}/>} style={{color:'#1976d2',borderColor: '#f3f3f3',backgroundColor: '#f3f3f3', marginRight: 10 }}>
          Excel
        </Button>
        <Button variant="outlined" onClick={exportToPdf} startIcon={<PictureAsPdfIcon />} style={{color:'#1976d2',borderColor: '#f3f3f3',backgroundColor: '#f3f3f3', marginRight: 10 }}>
          PDF
        </Button>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle3">Transaction Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle3">Account Number</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle3">Account Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle3">Amount</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle3">Sender Account Number</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle3">Sender Account Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle3">Sender Bank Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle3">Transaction Reference</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNotificationsByDate.map((notification) => (
                <TableRow
                  key={notification.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="caption">
                      {formatDate(notification.transactionDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{notification.accountNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{notification.virtualAccountName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{notification.amount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{notification.senderAccountNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{notification.senderAccountName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{notification.senderBankName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{notification.transactionReference}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        <Container
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
        </Container>
      </Modal>
    </Container>
  );
}
