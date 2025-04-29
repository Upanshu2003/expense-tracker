import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { FaChartPie } from 'react-icons/fa';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import DoughnutChart from '../Charts/DoughnutChart';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

export default function Insights() {
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const [highestCategory, setHighestCategory] = useState({ category: '', amount: 0 });
  const [currentAmount, setCurrentAmount] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) fetchTransactions(userId);
  }, [userId]);

  const fetchTransactions = async (uid) => {
    try {
      const userRef = doc(db, "Users", uid);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCurrentAmount(userData.currentAmount || 0);
        setMonthlyIncome(userData.monthlyIncome || 0); 
        if (userData.transactions) {
          setTransactions(userData.transactions);
          processData(userData.transactions);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processData = (trans) => {
    // Category wise data processing
    const categoryWise = {};
    trans.forEach(t => {
      categoryWise[t.category] = (categoryWise[t.category] || 0) + t.amount;
    });
    setCategoryData(categoryWise);

    // Initialize all months with 0
    const monthly = {
      'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0,
      'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0,
      'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0
    };

    // Fill in the actual data
    trans.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      monthly[month] = (monthly[month] || 0) + t.amount;
    });
    setMonthlyData(monthly);

    // Highest spending category
    const highest = Object.entries(categoryWise).reduce((max, [category, amount]) => 
      amount > max.amount ? { category, amount } : max,
      { category: '', amount: 0 }
    );
    setHighestCategory(highest);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 px-3 md:px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Spending Insights</h2>
        </div>
        
        {/* Highest Spending Category Card */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white/70">Highest Spending Category</h3>
              <p className="text-3xl font-bold text-yellow-400 mt-1 capitalize">
                {highestCategory.category} <span className="text-lg">₹{highestCategory.amount}</span>
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
              <FaChartPie className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Pie Chart */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Category Distribution</h3>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart data={categoryData} />
            </div>
          </div>

          {/* Monthly Line Chart */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Monthly Expenses</h3>
            <div className="h-[300px] flex items-center justify-center">
              <LineChart data={monthlyData} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Category Wise Expenses</h3>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart data={categoryData} />
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Income Distribution</h3>
            <div className="h-[300px] flex items-center justify-center">
              <DoughnutChart 
                currentAmount={currentAmount}
                categoryData={categoryData}
                monthlyIncome={monthlyIncome}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
