import { Pie } from 'react-chartjs-2';

export const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'white',
        padding: 20,
        font: { size: 12 }
      }
    }
  }
};

export const generatePieChartData = (categoryData) => ({
  labels: Object.keys(categoryData),
  datasets: [{
    data: Object.values(categoryData),
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
    ],
    borderWidth: 0
  }]
});

const PieChart = ({ data }) => (
  <Pie data={generatePieChartData(data)} options={pieChartOptions} />
);

export default PieChart;
