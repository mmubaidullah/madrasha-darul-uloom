'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { FiSearch, FiDollarSign, FiPrinter, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { DEPARTMENTS, DEPARTMENT_CLASSES } from '@/lib/departments';

const feeTypes = [
  { key: 'monthlyFee', name: 'মাসিক বেতন', defaultAmount: 1500 },
  { key: 'admissionFee', name: 'ভর্তি ফি', defaultAmount: 5000 },
  { key: 'examFee', name: 'পরীক্ষার ফি', defaultAmount: 800 },
  { key: 'libraryFee', name: 'লাইব্রেরি ফি', defaultAmount: 200 },
  { key: 'developmentFee', name: 'উন্নয়ন ফি', defaultAmount: 1000 }
];

export default function FeeCollectionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [student, setStudent] = useState(null);
  const [selectedFees, setSelectedFees] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchStudent = async () => {
    if (!searchTerm.trim()) {
      toast.error('ছাত্রের আইডি, নাম বা মোবাইল নম্বর দিন');
      return;
    }

    setLoading(true);
    try {
      // রিয়েল ছাত্র ডাটা খুঁজুন
      const response = await fetch(`/api/students?search=${encodeURIComponent(searchTerm)}`);
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        const foundStudent = result.data[0]; // প্রথম ছাত্রটি নিন
        
        // ছাত্রের ফি তথ্য তৈরি করুন
        const studentWithFees = {
          id: foundStudent._id,
          studentId: foundStudent.studentId,
          name: foundStudent.nameBangla,
          class: foundStudent.class || 'ইবতিদাইয়্যাহ-১ (উর্দূ)',
          section: foundStudent.section || 'ক',
          fatherName: foundStudent.fatherName,
          phone: foundStudent.phone,
          photo: foundStudent.photo || null,
          fees: {}
        };

        // ফি তথ্য তৈরি করুন (এখানে আপনি রিয়েল ফি ডাটা ব্যবহার করতে পারেন)
        let totalDue = 0;
        feeTypes.forEach(feeType => {
          const paid = Math.floor(Math.random() * feeType.defaultAmount); // র‍্যান্ডম পেইড অ্যামাউন্ট
          const due = feeType.defaultAmount - paid;
          studentWithFees.fees[feeType.key] = {
            amount: feeType.defaultAmount,
            paid: paid,
            due: due
          };
          totalDue += due;
        });
        
        studentWithFees.totalDue = totalDue;
        
        setStudent(studentWithFees);
        setShowPaymentForm(false);
        setSelectedFees({});
        toast.success('ছাত্রের তথ্য পাওয়া গেছে');
      } else {
        // নমুনা ছাত্র দেখান যদি কোনো ছাত্র না পাওয়া যায়
        const sampleStudent = {
          id: 'sample1',
          studentId: 'STD001',
          name: 'মোহাম্মদ আলী',
          class: 'ইবতিদাইয়্যাহ-২ (তাইসীর)',
          section: 'ক',
          fatherName: 'আব্দুল করিম',
          phone: '০১৭১২৩৪৫৬৭৮',
          photo: null,
          fees: {
            monthlyFee: { amount: 1500, paid: 1500, due: 0 },
            admissionFee: { amount: 5000, paid: 5000, due: 0 },
            examFee: { amount: 800, paid: 0, due: 800 },
            libraryFee: { amount: 200, paid: 200, due: 0 },
            developmentFee: { amount: 1000, paid: 500, due: 500 }
          },
          totalDue: 1300
        };
        
        setStudent(sampleStudent);
        setShowPaymentForm(false);
        setSelectedFees({});
        toast.success('নমুনা ছাত্রের তথ্য দেখানো হচ্ছে (কোনো ছাত্র পাওয়া যায়নি)');
      }
    } catch (error) {
      console.error('ছাত্র খুঁজতে সমস্যা:', error);
      toast.error('ছাত্র খুঁজতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleFeeSelection = (feeKey, amount) => {
    setSelectedFees(prev => ({
      ...prev,
      [feeKey]: prev[feeKey] ? 0 : amount
    }));
  };

  const getTotalSelectedAmount = () => {
    return Object.values(selectedFees).reduce((sum, amount) => sum + amount, 0);
  };

  const processPayment = async () => {
    const totalAmount = getTotalSelectedAmount();
    if (totalAmount === 0) {
      toast.error('কমপক্ষে একটি ফি নির্বাচন করুন');
      return;
    }

    try {
      const paymentData = {
        studentId: student.studentId,
        studentName: student.name,
        fees: selectedFees,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        date: new Date().toISOString(),
        receiptNo: `RCP${Date.now()}`
      };

      const response = await fetch('/api/fees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: student.studentId,
          studentName: student.name,
          paidAmount: totalAmount,
          paymentMethod: paymentMethod,
          feeTypes: Object.keys(selectedFees).filter(key => selectedFees[key] > 0),
          receiptNo: paymentData.receiptNo
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(`৳${totalAmount} টাকা সফলভাবে গ্রহণ করা হয়েছে!`);
        
        // Reset form
        setSelectedFees({});
        setShowPaymentForm(false);
        
        // Update student's fee status (you might want to reload student data)
        // For now, just update the local state
        const updatedStudent = { ...student };
        Object.keys(selectedFees).forEach(feeKey => {
          if (selectedFees[feeKey] > 0) {
            updatedStudent.fees[feeKey].paid += selectedFees[feeKey];
            updatedStudent.fees[feeKey].due -= selectedFees[feeKey];
          }
        });
        updatedStudent.totalDue -= totalAmount;
        setStudent(updatedStudent);
      } else {
        toast.error(result.error || 'পেমেন্ট প্রসেস করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('পেমেন্ট প্রসেস করতে সমস্যা:', error);
      toast.error('পেমেন্ট প্রসেস করতে সমস্যা হয়েছে');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ফি কালেকশন</h1>
        <p className="mt-1 text-sm text-gray-600">
          ছাত্রদের ফি সংগ্রহ করুন এবং রশিদ তৈরি করুন
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">ছাত্র খুঁজুন</h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ছাত্রের আইডি, নাম বা মোবাইল নম্বর দিন..."
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchStudent()}
              />
            </div>
          </div>
          <button
            onClick={searchStudent}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'খুঁজছি...' : 'খুঁজুন'}
          </button>
        </div>
      </div>

      {/* Student Information */}
      {student && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">ছাত্রের তথ্য</h3>
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                {student.photo ? (
                  <img src={student.photo} alt={student.name} className="w-20 h-20 rounded-lg object-cover" />
                ) : (
                  <FiUser className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">নাম</p>
                <p className="text-lg font-semibold text-gray-900">{student.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">আইডি</p>
                <p className="text-lg font-semibold text-gray-900">{student.studentId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">জামাত</p>
                <p className="text-lg font-semibold text-gray-900">{student.class} - {student.section}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">পিতার নাম</p>
                <p className="text-lg font-semibold text-gray-900">{student.fatherName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">মোবাইল</p>
                <p className="text-lg font-semibold text-gray-900">{student.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">মোট বকেয়া</p>
                <p className="text-lg font-semibold text-red-600">৳{student.totalDue}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fee Details */}
      {student && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">ফি বিবরণ</h3>
            <button
              onClick={() => setShowPaymentForm(!showPaymentForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              <FiDollarSign className="mr-2 h-4 w-4" />
              পেমেন্ট নিন
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ফি এর ধরন
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    মোট পরিমাণ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    পরিশোধিত
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    বকেয়া
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    অবস্থা
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feeTypes.map((feeType) => {
                  const fee = student.fees[feeType.key];
                  return (
                    <tr key={feeType.key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feeType.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ৳{fee.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ৳{fee.paid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ৳{fee.due}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          fee.due === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {fee.due === 0 ? 'পরিশোধিত' : 'বকেয়া'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Form */}
      {student && showPaymentForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">পেমেন্ট নিন</h3>
          
          <div className="space-y-6">
            {/* Fee Selection */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">ফি নির্বাচন করুন</h4>
              <div className="space-y-2">
                {feeTypes.map((feeType) => {
                  const fee = student.fees[feeType.key];
                  if (fee.due === 0) return null;
                  
                  return (
                    <label key={feeType.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedFees[feeType.key] > 0}
                        onChange={() => handleFeeSelection(feeType.key, fee.due)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-900">{feeType.name}</span>
                      <span className="text-sm font-medium text-gray-900">৳{fee.due}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">পেমেন্ট পদ্ধতি</h4>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">নগদ</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">বিকাশ</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">ব্যাংক</span>
                </label>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">মোট পরিমাণ:</span>
                <span className="text-xl font-bold text-green-600">৳{getTotalSelectedAmount()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={processPayment}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                <FiDollarSign className="mr-2 h-4 w-4" />
                পেমেন্ট নিন ও রশিদ তৈরি করুন
              </button>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                বাতিল
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
