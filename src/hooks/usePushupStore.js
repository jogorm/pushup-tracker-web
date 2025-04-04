import { useState, useEffect } from 'react';
import sampleData from '../data/sampleData.json';

const STORAGE_KEY = 'pushupHistory';

export const usePushupStore = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    } else {
      populateHistoricalData();
    }
  }, []);

  const save = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const addPushups = (count) => {
    const today = new Date().toISOString().split('T')[0];
    const newHistory = [...history];
    const existingEntry = newHistory.find(entry => entry.date === today);
    
    if (existingEntry) {
      existingEntry.count = count;
    } else {
      newHistory.push({ date: today, count });
    }
    
    save(newHistory);
  };

  const populateHistoricalData = () => {
    const newHistory = [];
    const today = new Date();
    const startDate = new Date('2025-01-01');
    
    // Loop through all dates from start to today
    for (let date = startDate; date <= today; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      
      // Check if it's in the zero pushup period
      if (date >= new Date(sampleData.zeroPushupPeriod.start) && 
          date <= new Date(sampleData.zeroPushupPeriod.end)) {
        newHistory.push({ date: dateStr, count: 0 });
        continue;
      }
      
      // Check if it's a special day
      const specialDay = sampleData.specialDays.find(day => day.date === dateStr);
      if (specialDay) {
        newHistory.push({ date: dateStr, count: specialDay.count });
        continue;
      }
      
      // Use default count for all other days
      newHistory.push({ date: dateStr, count: sampleData.defaultCount });
    }
    
    save(newHistory);
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    populateHistoricalData();
  };

  return {
    history,
    addPushups,
    reset,
  };
};
