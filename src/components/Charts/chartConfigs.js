export const defaultChartConfig = {
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

export const chartColors = {
  primary: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 
           'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)'],
  line: 'rgb(75, 192, 192)',
  bar: 'rgba(255, 206, 86, 0.8)',
  donut: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(255, 206, 86, 0.8)']
};

export const axisConfig = {
  y: {
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
};

export const processTransactionData = (transactions) => {
  const categoryWise = {};
  const monthly = Object.fromEntries(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => [m, 0]));

  transactions.forEach(t => {
    if (t.category !== 'savings') {
      categoryWise[t.category] = (categoryWise[t.category] || 0) + t.amount;
      monthly[new Date(t.date).toLocaleString('default', { month: 'short' })] += t.amount;
    }
  });

  const highest = Object.entries(categoryWise).reduce((max, [category, amount]) => 
    amount > max.amount ? { category, amount } : max, { category: '', amount: 0 });

  return { categoryWise, monthly, highest };
};
