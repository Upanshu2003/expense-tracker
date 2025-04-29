import { Line } from 'react-chartjs-2';

export const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        font: { size: 12 }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { 
        color: 'rgba(255, 255, 255, 0.7)',
        callback: (value) => `₹${value}`
      },
      grid: { color: 'rgba(255, 255, 255, 0.1)' }
    },
    x: {
      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' }
    }
  }
};

export const generateLineChartData = (monthlyData) => ({
  labels: Object.keys(monthlyData),
  datasets: [{
    label: 'Monthly Expenses',
    data: Object.values(monthlyData),
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    tension: 0.3,
    fill: true,
    borderWidth: 2
  }]
});

const LineChart = ({ data }) => (
  <Line data={generateLineChartData(data)} options={lineChartOptions} />
);

export default LineChart;
