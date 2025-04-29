import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config.js";
import { FaChartPie } from 'react-icons/fa';

const Actions = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState({
    savings: 0,
    groceries: 0,
    utilities: 0,
    entertainment: 0,
    misc: 0,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) fetchUserData(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const docSnap = await getDoc(doc(db, "Users", uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setExpenses({
          savings: data.savings || 0,
          groceries: data.groceries || 0,
          utilities: data.utilities || 0,
          entertainment: data.entertainment || 0,
          misc: data.misc || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="relative w-full min-h-fit py-32 px-6 md:px-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <button 
            onClick={() => navigate('/recent-transactions')}
            className="group relative flex flex-col items-center p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-lg border-2 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 overflow-hidden outline-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-xl font-bold text-white mb-2">Recent Transactions</h2>
            <p className="text-gray-300 text-center text-sm">View and manage your recent financial activities</p>
          </button>

          <button
          onClick={() => navigate('/insights')}
          className="group relative flex flex-col items-center p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-lg border-2 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-xl font-bold text-white mb-2">Your Insights</h2>
            <p className="text-gray-300 text-center text-sm">Analyze your spending patterns and trends</p>
          </button>
        </div>

        {/* Monthly Expenses Section */}
        <button 
          onClick={() => navigate('/insights')}
          className="w-full bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 hover:bg-white/20 transition-all duration-300 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/25"
        >
          <div className="flex items-center justify-between">
            <div className="text-left flex-1">
              <h3 className="text-xl font-bold text-white mb-4">Monthly Expenses Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {Object.entries(expenses).map(([category, amount]) => (
                  <div key={category} className="text-left">
                    <p className="text-purple-300/70 capitalize">{category}</p>
                    <p className="text-lg font-semibold text-purple-200">₹{amount}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-400/10 flex items-center justify-center ml-6">
              <FaChartPie className="text-purple-400" size={24} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Actions;
