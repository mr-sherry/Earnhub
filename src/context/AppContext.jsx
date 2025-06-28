// AppContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext'; // Adjust to your actual file structure

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  const { user } = useAuth(); // Make sure this returns { uid, ... }

  const addPoints = (amount) => setPoints((prev) => prev + amount);
  const resetPoints = () => setPoints(0);

  // 🔥 Fetch dashboard data on login
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoadingDashboard(true);
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setDashboardData(snap.data());
        } else {
          console.warn('No dashboard data found.');
          setDashboardData(null);
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
        setDashboardData(null);
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        points,
        addPoints,
        resetPoints,
        dashboardData,
        loadingDashboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
