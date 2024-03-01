
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AppWidgetSummary from '../app-widget-summary';

export default function AppView() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://localhost:7205/VirtualAccount/data');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb:  5 }}>
        Hi, Welcome back 👋
      </Typography>

      {loading || !dashboardData ? ( 
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Accounts"
                total={dashboardData.virtualAccountsData.totalAccounts}
                color="success"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Transactions"
                total={1723315} 
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="New Accounts"
                total={dashboardData.virtualAccountsData.accountsCreatedLast24Hours}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Transactions Today"
                total={dashboardData.notificationTotals.notificationsWithin24Hours}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>
          </>
        </Grid>
      )}
    </Container>
  );
}
