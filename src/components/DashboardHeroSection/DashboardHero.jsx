import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaChartPie } from "react-icons/fa";
import { useUserData } from "../../hooks/useUserData";
import CountUp from 'react-countup';

export default function DashboardHero() {
  const navigate = useNavigate();
  const { currentAmount, monthlyIncome, highestCategory, updateIncome, updateCurrentAmount } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null); 
  const [editValue, setEditValue] = useState("");

  const handleStartEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value.toString());
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editingField === 'income') {
      await updateIncome(editValue);
    } else if (editingField === 'balance') {
      await updateCurrentAmount(editValue);
    }
    setIsEditing(false);
  };

  return (
    <section className="w-full h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-8">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-16 items-center gap-8 lg:gap-16 2xl:gap-24 px-8">
        {/* Left Side - Balance Info */}
        <div className="lg:col-span-6 space-y-6 p-6 lg:pl-16">
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Your Current <br /> Balance
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-4xl lg:text-5xl font-extrabold text-yellow-400">
                ₹<CountUp end={currentAmount} duration={2} separator="," />
              </span>
              <FaPencilAlt 
                className="text-yellow-400 cursor-pointer hover:text-yellow-300 transform hover:scale-110 transition-transform"
                size={16} 
                onClick={() => handleStartEdit('balance', currentAmount)}
              />
            </div>
          </div>

          <div className="space-y-2 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-2">
              <h3 className="text-xl lg:text-2xl text-purple-300">Monthly Income</h3>
              <FaPencilAlt 
                className="text-purple-300 cursor-pointer hover:text-purple-200 transform hover:scale-110 transition-transform"
                size={14}
                onClick={() => handleStartEdit('income', monthlyIncome)}
              />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-pink-400">
              ₹<CountUp end={monthlyIncome} duration={2} separator="," />
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl max-w-sm hover:bg-white/15 transition-colors">
            <h3 className="text-lg text-white/90">Highest Spending</h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xl lg:text-2xl font-bold text-yellow-400 capitalize">
                {highestCategory.category} 
                <span className="text-lg lg:text-xl ml-2">₹{highestCategory.amount}</span>
              </p>
              <FaChartPie className="text-yellow-400 animate-pulse" size={24} />
            </div>
          </div>
        </div>

        {/* Middle - Animated Blob */}
        <div className="lg:col-span-4 lg:col-start-7 flex justify-center items-center relative mx-12">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <svg 
            viewBox="0 0 200 200" 
            className="w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] animate-blob relative z-10"
          >
            <path
              fill="#FFD700"
              d="M45.7,-51.6C59.9,-37.9,72.5,-21.9,74.6,-4.2C76.7,13.5,68.3,32.8,54.1,45.7C39.9,58.5,19.9,64.8,0.2,64.6C-19.6,64.4,-39.2,57.7,-53.8,44.8C-68.4,31.9,-78,12.8,-76.4,-5.1C-74.8,-23,-62,-39.7,-46.5,-53.2C-31,-66.7,-15.5,-77.1,0.8,-78.1C17.2,-79,31.5,-65.4,45.7,-51.6Z"
              transform="translate(100 100)"
              className="animate-morph"
            />
          </svg>
        </div>

        {/* Right Side - Additional Stats */}
        <div className="lg:col-span-5 lg:col-start-12 space-y-6 p-6 lg:pr-16">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-colors">
            <h3 className="text-lg text-white/90 mb-3">Monthly Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-300">Total Expenses</span>
                <span className="text-lg font-bold text-red-400">
                  ₹<CountUp end={highestCategory.amount * 2} duration={2} separator="," />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-300">Savings</span>
                <span className="text-lg font-bold text-green-400">
                  ₹<CountUp end={monthlyIncome - (highestCategory.amount * 2)} duration={2} separator="," />
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-4">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  style={{ width: `${((monthlyIncome - (highestCategory.amount * 2)) / monthlyIncome) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-colors">
            <h3 className="text-lg text-white/90 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => navigate('/expenses')}
                className="py-1 flex items-center justify-center !bg-yellow-500 rounded hover:bg-yellow-700 transition-colors whitespace-nowrap"
              >
                <span className="text-[10.5px] font-medium text-white">Expenses</span>
              </button>
              <button 
                onClick={() => navigate('/insights')}
                className="py-1 flex items-center justify-center !bg-yellow-500 rounded hover:bg-yellow-700 transition-colors whitespace-nowrap"
              >
                <span className="text-[10.5px] font-medium text-white">View Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 p-8 rounded-3xl w-[90%] max-w-md shadow-2xl">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Edit {editingField === 'income' ? 'Monthly Income' : 'Current Balance'}
              </h3>
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full bg-white/10 border border-purple-500/30 p-4 rounded-xl mb-6 text-white text-lg focus:outline-none focus:border-purple-500"
                placeholder={`Enter new ${editingField === 'income' ? 'income' : 'balance'}`}
              />
              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 !bg-white/10 hover:!bg-white/20 rounded-xl text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-3 !bg-purple-500 hover:!bg-purple-600 rounded-xl text-white transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
