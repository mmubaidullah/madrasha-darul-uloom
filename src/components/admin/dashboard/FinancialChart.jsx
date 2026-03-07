'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'জানু', income: 450000, expense: 320000 },
  { month: 'ফেব্রু', income: 520000, expense: 380000 },
  { month: 'মার্চ', income: 480000, expense: 350000 },
  { month: 'এপ্রিল', income: 567890, expense: 420000 },
  { month: 'মে', income: 510000, expense: 390000 },
  { month: 'জুন', income: 490000, expense: 360000 }
];

export default function FinancialChart() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        মাসিক আয়-ব্যয়
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`৳${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar dataKey="income" fill="#10B981" name="আয়" />
            <Bar dataKey="expense" fill="#EF4444" name="ব্যয়" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">আয়</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">ব্যয়</span>
        </div>
      </div>
    </div>
  );
}