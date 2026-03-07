'use client';
import { useState, useEffect } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function AttendanceChart() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const loadAttendanceData = async () => {
    try {
      // গত ৭ দিনের হাজিরার ডাটা তৈরি করুন
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString('bn-BD', { weekday: 'short' });
        const percentage = Math.floor(Math.random() * 20) + 75; // 75-95% রেঞ্জে
        
        last7Days.push({
          day: dayName,
          date: date.toISOString().split('T')[0],
          percentage: percentage
        });
      }
      
      setAttendanceData(last7Days);
    } catch (error) {
      console.error('হাজিরার ডাটা লোড করতে সমস্যা:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAverageAttendance = () => {
    if (attendanceData.length === 0) return 0;
    const sum = attendanceData.reduce((acc, day) => acc + day.percentage, 0);
    return Math.round(sum / attendanceData.length);
  };

  const getTrend = () => {
    if (attendanceData.length < 2) return 'neutral';
    const lastTwo = attendanceData.slice(-2);
    return lastTwo[1].percentage > lastTwo[0].percentage ? 'up' : 'down';
  };

  const maxPercentage = Math.max(...attendanceData.map(d => d.percentage), 100);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">সাপ্তাহিক হাজিরা</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">গড়:</span>
          <span className="text-lg font-semibold text-gray-900">{getAverageAttendance()}%</span>
          {getTrend() === 'up' ? (
            <FiTrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <FiTrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {attendanceData.map((day, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 text-xs text-gray-500 text-right">
              {day.day}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(day.percentage / maxPercentage) * 100}%` }}
              ></div>
            </div>
            <div className="w-12 text-xs font-medium text-gray-900">
              {day.percentage}%
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500">
          <span>গত সপ্তাহের তুলনায়</span>
          <span className={getTrend() === 'up' ? 'text-green-600' : 'text-red-600'}>
            {getTrend() === 'up' ? '+২.৫%' : '-১.২%'}
          </span>
        </div>
      </div>
    </div>
  );
}