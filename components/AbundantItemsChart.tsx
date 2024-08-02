import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const valueFormatter = (value: number | null) => `${value}`;

const AbundantItemsChart = ({ pantryItems }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sortedPantryItems = [...pantryItems].sort((a, b) => b.quantity - a.quantity);
  const topFiveItems = sortedPantryItems.slice(0, 5);

  const chartSetting = {
    xAxis: [
      {
        label: 'Quantity',
      },
    ],
    height: isMobile ? 250 : 300,
    width: isMobile ? 400 : 500,
    margin: {
      left: isMobile ? 140 : 150,
      right: 10,
      top: 15
    },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

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
        Most Stocked Items
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BarChart
          dataset={topFiveItems}
          yAxis={[{ 
            scaleType: 'band', 
            dataKey: 'name',
            tickLabelStyle: {
              fontSize: isMobile ? 15 : 16,
              textWrap: 'wrap',
              maxWidth: isMobile ? 60 : 80,
            },
          }]}
          series={[
            { dataKey: 'quantity', label: 'Quantity', valueFormatter },
          ]}
          {...chartSetting}
          layout="horizontal"
          colors={['#C05F3D']}
        />
      </Box>
    </Box>
  );
}

export default AbundantItemsChart;