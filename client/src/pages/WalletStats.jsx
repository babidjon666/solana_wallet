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

const WalletStats = () => {
    const mockData = {
        labels: ['14.03', '15.03', '16.03', '17.03', '19.03', '20.03', '21.03'],
        datasets: [
            {
                label: 'Wallet Balance',
                data: [1000, 1200, 1100, 1400, 1300, 1600, 1500],
                borderColor: '#14F195',
                backgroundColor: 'rgba(20, 241, 149, 0.2)',
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
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
                height: '350px'
            }}>
            <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '15px'
            }}>Wallet Stats</h3>
            <div style={{ height: 'calc(100% - 50px)' }}>
                <Line options={chartOptions} data={mockData} />
            </div>
        </Content>
    )
}

export default WalletStats;