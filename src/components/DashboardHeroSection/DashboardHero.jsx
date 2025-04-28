import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaChartPie } from "react-icons/fa";
import { useUserData } from "../../hooks/useUserData";

export default function DashboardHero() {
  const navigate = useNavigate();
  const { currentAmount, monthlyIncome, highestCategory, updateIncome, updateCurrentAmount } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null); // 'income' or 'balance'
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
    <section className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-6 h-screen flex items-center">
        {/* Left Side - Balance Info */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-white">
              Your Current Balance
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-7xl font-extrabold text-yellow-400">
                ₹{currentAmount}
              </span>
              <FaPencilAlt 
                className="text-yellow-400 cursor-pointer hover:text-yellow-300" 
                onClick={() => handleStartEdit('balance', currentAmount)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl text-purple-300">Monthly Income</h3>
              <FaPencilAlt 
                className="text-purple-300 cursor-pointer hover:text-purple-200" 
                onClick={() => handleStartEdit('income', monthlyIncome)}
              />
            </div>
            <p className="text-4xl font-bold text-pink-400">₹{monthlyIncome}</p>
          </div>

          <div className="bg-black/20 p-6 rounded-xl max-w-md">
            <h3 className="text-xl text-white/70">Highest Spending</h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-3xl font-bold text-yellow-400 capitalize">
                {highestCategory.category} <span className="text-xl">₹{highestCategory.amount}</span>
              </p>
              <FaChartPie className="text-yellow-400" size={28} />
            </div>
          </div>
        </div>

        {/* Right Side - Animated SVG */}
        <div className="flex-1 hidden lg:flex justify-center items-center">
          <svg 
            viewBox="0 0 200 200" 
            className="w-96 h-96 animate-blob"
          >
            <path
              fill="#FFD700"
              d="M45.7,-51.6C59.9,-37.9,72.5,-21.9,74.6,-4.2C76.7,13.5,68.3,32.8,54.1,45.7C39.9,58.5,19.9,64.8,0.2,64.6C-19.6,64.4,-39.2,57.7,-53.8,44.8C-68.4,31.9,-78,12.8,-76.4,-5.1C-74.8,-23,-62,-39.7,-46.5,-53.2C-31,-66.7,-15.5,-77.1,0.8,-78.1C17.2,-79,31.5,-65.4,45.7,-51.6Z"
              transform="translate(100 100)"
              className="animate-morph"
            />
          </svg>
        </div>

        {/* Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-indigo-900/90 p-8 rounded-3xl w-[90%] max-w-md">
              <h3 className="text-xl font-semibold text-white mb-4">
                Edit {editingField === 'income' ? 'Monthly Income' : 'Current Balance'}
              </h3>
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full bg-white/10 border border-purple-500/30 p-3 rounded-xl mb-6 text-white"
                placeholder={`Enter new ${editingField === 'income' ? 'income' : 'balance'}`}
              />
              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white"
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
