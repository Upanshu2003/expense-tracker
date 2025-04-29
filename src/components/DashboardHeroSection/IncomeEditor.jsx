import React from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.config.js";

export default function IncomeEditor({ monthlyIncome, userId, onUpdate }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newIncome, setNewIncome] = React.useState("");

  const handleEditIncome = () => {
    setIsEditing(true);
    setNewIncome(monthlyIncome);
  };

  const handleSaveIncome = async () => {
    if (userId) {
      await updateDoc(doc(db, "Users", userId), {
        monthlyIncome: Number(newIncome),
      });
      onUpdate(Number(newIncome));
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="mt-8 flex flex-col items-center md:items-start space-y-2">
        <h3 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
          Monthly Income
          <FaPencilAlt 
            className="text-purple-300 cursor-pointer hover:text-purple-200" 
            onClick={handleEditIncome} 
          />
        </h3>
        <p className="text-3xl font-bold text-pink-400">₹{monthlyIncome}</p>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-indigo-900/90 p-8 rounded-3xl w-[90%] max-w-md">
            <input
              type="number"
              value={newIncome}
              onChange={(e) => setNewIncome(e.target.value)}
              className="w-full bg-white/10 border border-purple-500/30 p-3 rounded-xl mb-6"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleSaveIncome}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
