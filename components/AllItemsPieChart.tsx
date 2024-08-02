import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, useTheme, useMediaQuery, Typography } from '@mui/material';

const AllItemsPieChart = ({ pantryItems }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const chartSetting = {
    height: isMobile ? 300 : 400,
    width: isMobile ? 300 : 400,
    margin: { top: 20, bottom: 20, left: 20, right: 20 },
  };

  // Prepare data for PieChart
  const pieChartData = pantryItems.map((item: any) => ({
    id: item.id,
    value: item.quantity,
    label: item.name,
  }));

  return (
    <Box sx={{ width: 'fit-content', overflowX: 'auto' }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          color: 'primary.main',
        }}
      >
        All Items
      </Typography>
      <PieChart
        series={[
          {
            data: pieChartData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
          },
        ]}
        slotProps={{
          legend: { hidden: true },
        }}
        {...chartSetting}
      />
    </Box>
  );
}

export default AllItemsPieChart;