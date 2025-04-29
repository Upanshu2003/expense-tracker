import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config.js";
import { defaultUserData, defaultTransactions } from '../components/DashboardHeroSection/defaultData';

export const useUserData = () => {
  const [userData, setUserData] = useState({
    currentAmount: defaultUserData.currentAmount,
    monthlyIncome: defaultUserData.monthlyIncome,
    highestCategory: { category: '', amount: 0 },
    userId: null
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(prev => ({ ...prev, userId: user.uid }));
        fetchUserData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    const docSnap = await getDoc(doc(db, "Users", uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      updateUserData(data);
    } else {
      await createNewUser(uid);
    }
  };

  const updateUserData = (data) => {
    setUserData(prev => ({
      ...prev,
      currentAmount: data.currentAmount || defaultUserData.currentAmount,
      monthlyIncome: data.monthlyIncome || defaultUserData.monthlyIncome,
      highestCategory: calculateHighestCategory(data.transactions || defaultTransactions)
    }));
  };

  const createNewUser = async (uid) => {
    await setDoc(doc(db, "Users", uid), {
      ...defaultUserData,
      transactions: defaultTransactions
    });
    updateUserData(defaultUserData);
  };

  const updateIncome = async (newIncome) => {
    await updateDoc(doc(db, "Users", userData.userId), {
      monthlyIncome: Number(newIncome)
    });
    setUserData(prev => ({ ...prev, monthlyIncome: Number(newIncome) }));
  };

  const updateCurrentAmount = async (newAmount) => {
    await updateDoc(doc(db, "Users", userData.userId), {
      currentAmount: Number(newAmount)
    });
    setUserData(prev => ({ ...prev, currentAmount: Number(newAmount) }));
  };

  return { ...userData, updateIncome, updateCurrentAmount };
};

const calculateHighestCategory = (transactions) => {
  const categoryWise = transactions.reduce((acc, t) => {
    if (t.category !== 'savings') {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  return Object.entries(categoryWise).reduce((max, [category, amount]) => 
    amount > max.amount ? { category, amount } : max,
    { category: '', amount: 0 }
  );
};
