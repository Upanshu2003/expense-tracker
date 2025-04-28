import { Doughnut } from 'react-chartjs-2';

export const doughnutChartOptions = {
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

export const generateDoughnutChartData = (currentAmount, categoryData, monthlyIncome) => ({
  labels: ['Balance', 'Expenses', ],
  datasets: [{
    data: [
      currentAmount,
      Object.values(categoryData).reduce((a, b) => a + b, 0),
      monthlyIncome - (currentAmount + Object.values(categoryData).reduce((a, b) => a + b, 0))
    ],
    backgroundColor: [
      'rgba(75, 192, 192, 0.8)',
      'rgba(255, 99, 132, 0.8)',
     
    ],
    borderWidth: 0
  }]
});

const DoughnutChart = ({ currentAmount, categoryData, monthlyIncome }) => (
  <Doughnut 
    data={generateDoughnutChartData(currentAmount, categoryData, monthlyIncome)} 
    options={doughnutChartOptions}
  />
);

export default DoughnutChart;
