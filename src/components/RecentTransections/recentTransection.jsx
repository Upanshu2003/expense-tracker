import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.config.js";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

export default function RecentTransactions() {
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: 'groceries',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTransactions(userId);
    }
  }, [userId]);

  const fetchTransactions = async (uid) => {
    const userRef = doc(db, "Users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists() && docSnap.data().transactions) {
      setTransactions(docSnap.data().transactions);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userRef);
      const currentAmount = userDoc.data().currentAmount || 0;

      if (Number(newExpense.amount) > currentAmount) {
        setError('Insufficient balance!');
        return;
      }

      const newTransaction = {
        id: Date.now().toString(),
        ...newExpense,
        amount: Number(newExpense.amount),
        date: new Date(newExpense.date).toISOString()
      };

      await updateDoc(userRef, {
        currentAmount: currentAmount - Number(newExpense.amount),
        transactions: [newTransaction, ...transactions]
      });

      setTransactions([newTransaction, ...transactions]);
      setIsModalOpen(false);
      setNewExpense({
        amount: '',
        description: '',
        category: 'groceries',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      setError('Failed to add expense');
    }
  };

  const handleEditTransaction = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userRef);
      const currentAmount = userDoc.data().currentAmount;
      
      const oldAmount = editingTransaction.amount;
      const newAmount = Number(newExpense.amount);
      const amountDifference = newAmount - oldAmount;
      
      if (amountDifference > currentAmount) {
        setError('Insufficient balance for this modification!');
        return;
      }

      const updatedTransactions = transactions.map(t => 
        t.id === editingTransaction.id ? 
        { ...t, ...newExpense, amount: newAmount } : t
      );

      await updateDoc(userRef, {
        currentAmount: currentAmount - amountDifference,
        transactions: updatedTransactions
      });

      setTransactions(updatedTransactions);
      setEditingTransaction(null);
      setIsModalOpen(false);
    } catch (error) {
      setError('Failed to update transaction');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const userRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userRef);
      const currentAmount = userDoc.data().currentAmount;

      const updatedTransactions = transactions.filter(
        t => t.id !== transactionToDelete.id
      );

   
      await updateDoc(userRef, {
        currentAmount: currentAmount + transactionToDelete.amount,
        transactions: updatedTransactions
      });

      setTransactions(updatedTransactions);
      setIsDeleteModalOpen(false);
      setTransactionToDelete(null);
    } catch (error) {
      setError('Failed to delete transaction');
    }
  };

  const calculateTotalExpenditure = () => {
    return transactions.reduce((total, t) => total + t.amount, 0);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 px-3 md:px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Recent Transactions</h2>
        </div>
        
        <div className="flex justify-end mb-6 md:mb-8">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all rounded-xl text-gray-900 font-bold shadow-lg shadow-yellow-400/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Expense
          </button>
        </div>

        <div className="space-y-3 md:space-y-4 w-full">
          {transactions.map((transaction) => (
            <div key={transaction.id} 
                className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:justify-between hover:bg-white/20 transition-all">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-white text-left">
                  {transaction.description}
                </h3>
                <div className="flex items-center gap-2 mt-1 md:mt-2">
                  <p className="text-white/70 text-xs md:text-sm">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <span className="text-white/70 text-xs md:text-sm">
                    • {transaction.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 border-t md:border-0 pt-3 md:pt-0 mt-2 md:mt-0">
                <span className="text-xl md:text-2xl font-bold text-yellow-400">
                  ₹{transaction.amount}
                </span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setEditingTransaction(transaction);
                      setNewExpense({
                        amount: transaction.amount.toString(),
                        description: transaction.description,
                        category: transaction.category,
                        date: new Date(transaction.date).toISOString().split('T')[0]
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg !bg-white/5"
                  >
                    <FaPencilAlt className="text-blue-400" size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      setTransactionToDelete(transaction);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg !bg-white/5"
                  >
                    <FaTrash className="text-red-400" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

    
        <div className="mt-6 md:mt-8 bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-purple-500/30">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white/70">Total Expenditure</h3>
              <p className="text-3xl font-bold text-yellow-400 mt-1">
                ₹{calculateTotalExpenditure().toLocaleString()}
              </p>
            </div>
            
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-8 rounded-2xl w-full max-w-md border border-purple-500/30 backdrop-blur-md shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {editingTransaction ? 'Edit Transaction' : 'Add New Expense'}
              </h3>
              {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
              
              <form onSubmit={editingTransaction ? handleEditTransaction : handleAddExpense} className="space-y-4">
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="Amount"
                  className="w-full bg-white/10 border border-purple-500/30 p-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50"
                  required
                />
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  placeholder="Description"
                  className="w-full bg-white/10 border border-purple-500/30 p-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50"
                  required
                />
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full bg-white/10 border border-purple-500/30 p-3 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  <option value="groceries" className="bg-purple-900 text-white">Groceries</option>
                  <option value="utilities" className="bg-purple-900 text-white">Utilities</option>
                  <option value="entertainment" className="bg-purple-900 text-white">Entertainment</option>
                  <option value="savings" className="bg-purple-900 text-white">Savings</option>
                  <option value="misc" className="bg-purple-900 text-white">Misc</option>
                </select>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 !bg-white/5 hover:!bg-white/10 text-white rounded-xl border !border-purple-500/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 rounded-xl font-bold shadow-lg shadow-yellow-400/20 transition-all"
                  >
                    {editingTransaction ? 'Save Changes' : 'Add Expense'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-8 rounded-2xl w-full max-w-md border border-purple-500/30 backdrop-blur-md shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Delete Transaction</h3>
              <p className="text-white text-center mb-8">
                Are you sure you want to delete this transaction? This will add ₹{transactionToDelete?.amount} back to your balance.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setTransactionToDelete(null);
                  }}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-purple-500/30"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
