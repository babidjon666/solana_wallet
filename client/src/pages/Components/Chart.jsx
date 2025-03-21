import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Get90DaysFromCurrentDay, GetMeanPriceIn90Days } from '../../services/chartService';
import { Layout } from 'antd';
const { Content } = Layout;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const Chart = ({chartData, selectedToCoin}) => {
    
  const generateChartData = () => {
    const labels = Get90DaysFromCurrentDay().reverse();
    const data = GetMeanPriceIn90Days(chartData);
    
    return {
      labels,
      datasets: [
        {
          label: 'Coin Price 30 days',
          data: data,
          borderColor: '#14F195',
          backgroundColor: 'rgba(20, 241, 149, 0.2)',
          tension: 0.4
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Content
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              width: '100%',
              padding: '20px',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '15px'
              }}>{selectedToCoin || 'Selected Coin'} Chart</h3>
              {chartData && <Line options={chartOptions} data={generateChartData()} />}
          </Content>
  )
}

export default Chart;