import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for the spinner
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AppWidgetSummary from '../app-widget-summary'; // Assuming this component exists in your project

export default function AppView() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      try {
        const response = await axios.get('https://localhost:7205/virtualaccount/data');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb:  5 }}>
        Hi, Welcome back 👋
      </Typography>

      {loading ? ( // Conditionally render the spinner based on the loading state
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {dashboardData && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Accounts"
                  total={dashboardData.totalAccounts}
                  color="success"
                  icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Transactions"
                  total={1723315} // Assuming this value is hardcoded or comes from somewhere else
                  color="warning"
                  icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="New Accounts"
                  total={dashboardData.accountsCreatedLast24Hours}
                  color="info"
                  icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                />
              </Grid>
            </>
          )}

          {/* Remaining components for "Transactions" and "Recent Transactions" */}
        </Grid>
      )}
    </Container>
  );
}
