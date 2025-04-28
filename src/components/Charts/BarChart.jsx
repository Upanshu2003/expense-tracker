import { Bar } from 'react-chartjs-2';

export const barChartOptions = {
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
      ticks: { 
        color: 'rgba(255, 255, 255, 0.7)',
        callback: (value) => `₹${value}`
      },
      grid: { color: 'rgba(255, 255, 255, 0.1)' }
    },
    x: {
      ticks: { 
        color: 'rgba(255, 255, 255, 0.7)',
        font: { size: 12 }
      },
      grid: { color: 'rgba(255, 255, 255, 0.1)' }
    }
  }
};

export const generateBarChartData = (categoryData) => ({
  labels: Object.keys(categoryData),
  datasets: [{
    label: 'Amount',
    data: Object.values(categoryData),
    backgroundColor: 'rgba(255, 206, 86, 0.8)',
  }]
});

const BarChart = ({ data }) => (
  <Bar data={generateBarChartData(data)} options={barChartOptions} />
);

export default BarChart;
