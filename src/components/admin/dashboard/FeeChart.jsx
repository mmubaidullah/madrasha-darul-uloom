'use client';
import { useState, useEffect } from 'react';
import { FiDollarSign, FiTrendingUp } from 'react-icons/fi';

export default function FeeChart() {
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCollection, setTotalCollection] = useState(0);

  useEffect(() => {
    loadFeeData();
  }, []);

  const loadFeeData = async () => {
    try {
      // গত ৬ মাসের ফি কালেকশন ডাটা
      const months = [];
      const monthNames = ['জানু', 'ফেব', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্ট', 'অক্টো', 'নভে', 'ডিসে'];
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthIndex = date.getMonth();
        const amount = Math.floor(Math.random() * 30000) + 20000; // 20k-50k রেঞ্জে
        
        months.push({
          month: monthNames[monthIndex],
          amount: amount,
          date: date
        });
      }
      
      setFeeData(months);
      setTotalCollection(months.reduce((sum, month) => sum + month.amount, 0));
    } catch (error) {
      console.error('ফি ডাটা লোড করতে সমস্যা:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxAmount = Math.max(...feeData.map(d => d.amount), 50000);

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
        <h3 className="text-lg font-medium text-gray-900">মাসিক ফি সংগ্রহ</h3>
        <div className="flex items-center space-x-2">
          <FiDollarSign className="h-4 w-4 text-green-500" />
          <span className="text-lg font-semibold text-green-600">
            ৳{totalCollection.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {feeData.map((month, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 text-xs text-gray-500 text-right">
              {month.month}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(month.amount / maxAmount) * 100}%` }}
              ></div>
            </div>
            <div className="w-16 text-xs font-medium text-gray-900 text-right">
              ৳{(month.amount / 1000).toFixed(0)}k
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">গড় মাসিক:</span>
            <span className="ml-2 font-medium text-gray-900">
              ৳{Math.round(totalCollection / feeData.length).toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-gray-500">বৃদ্ধি:</span>
            <span className="ml-2 font-medium text-green-600 flex items-center justify-end">
              <FiTrendingUp className="h-3 w-3 mr-1" />
              +১৫%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}