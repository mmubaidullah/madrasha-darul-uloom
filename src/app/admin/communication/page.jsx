'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { Button, Card, DataTable, SearchBar, Badge, Modal, FormInput, FormSelect } from '@/components/ui';
import { FiPlus, FiEdit, FiTrash2, FiSend, FiMessageSquare, FiBell, FiUsers, FiMail } from 'react-icons/fi';

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('sms');
  const [smsHistory, setSmsHistory] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data
  useEffect(() => {
    const sampleSmsHistory = [
      {
        id: 1,
        title: 'পরীক্ষার সময়সূচী',
        message: 'আগামী সোমবার থেকে অর্ধবার্ষিক পরীক্ষা শুরু হবে। সময়: সকাল ৯টা।',
        recipients: 'সকল অভিভাবক',
        recipientCount: 150,
        sentDate: '2024-03-01',
        sentBy: 'প্রধান শিক্ষক',
        status: 'sent',
        cost: 450
      },
      {
        id: 2,
        title: 'ছুটির দিন',
        message: 'আগামীকাল জাতীয় দিবস উপলক্ষে মাদরাসা বন্ধ থাকবে।',
        recipients: 'ক্লাস ৮-১০',
        recipientCount: 75,
        sentDate: '2024-02-28',
        sentBy: 'প্রধান শিক্ষক',
        status: 'sent',
        cost: 225
      }
    ];

    const sampleNotices = [
      {
        id: 1,
        title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
        content: 'আগামী মাসে বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকল ছাত্রদের অংশগ্রহণ করতে অনুরোধ করা হচ্ছে।',
        publishDate: '2024-03-05',
        expiryDate: '2024-03-25',
        publishedBy: 'প্রধান শিক্ষক',
        status: 'published',
        priority: 'high',
        targetAudience: 'সকল ছাত্র'
      },
      {
        id: 2,
        title: 'লাইব্রেরি নিয়মাবলী',
        content: 'নতুন লাইব্রেরি নিয়মাবলী কার্যকর হয়েছে। বিস্তারিত জানতে লাইব্রেরিয়ানের সাথে যোগাযোগ করুন।',
        publishDate: '2024-03-03',
        expiryDate: '2024-04-03',
        publishedBy: 'লাইব্রেরিয়ান',
        status: 'published',
        priority: 'medium',
        targetAudience: 'সকল ছাত্র'
      }
    ];

    setTimeout(() => {
      setSmsHistory(sampleSmsHistory);
      setNotices(sampleNotices);
      setLoading(false);
    }, 1000);
  }, []);
  const smsColumns = [
    {
      key: 'title',
      label: 'শিরোনাম',
      render: (sms) => (
        <div>
          <div className="font-medium text-gray-900">{sms.title}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">{sms.message}</div>
        </div>
      )
    },
    {
      key: 'recipients',
      label: 'প্রাপক',
      render: (sms) => (
        <div>
          <div className="text-sm font-medium">{sms.recipients}</div>
          <div className="text-xs text-gray-500">{sms.recipientCount} জন</div>
        </div>
      )
    },
    {
      key: 'sentDate',
      label: 'প্রেরণের তারিখ',
      render: (sms) => sms.sentDate
    },
    {
      key: 'cost',
      label: 'খরচ',
      render: (sms) => (
        <span className="font-medium">৳{sms.cost}</span>
      )
    },
    {
      key: 'status',
      label: 'অবস্থা',
      render: (sms) => (
        <Badge variant={sms.status === 'sent' ? 'success' : 'warning'}>
          {sms.status === 'sent' ? 'প্রেরিত' : 'অপেক্ষমাণ'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'কার্যক্রম',
      render: (sms) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleViewSms(sms)}
          >
            <FiMessageSquare className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeleteSms(sms.id)}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const noticeColumns = [
    {
      key: 'title',
      label: 'শিরোনাম',
      render: (notice) => (
        <div>
          <div className="font-medium text-gray-900">{notice.title}</div>
          <div className="text-sm text-gray-500">{notice.targetAudience}</div>
        </div>
      )
    },
    {
      key: 'publishDate',
      label: 'প্রকাশের তারিখ',
      render: (notice) => notice.publishDate
    },
    {
      key: 'expiryDate',
      label: 'মেয়াদ শেষ',
      render: (notice) => notice.expiryDate
    },
    {
      key: 'priority',
      label: 'অগ্রাধিকার',
      render: (notice) => (
        <Badge 
          variant={
            notice.priority === 'high' ? 'danger' : 
            notice.priority === 'medium' ? 'warning' : 'secondary'
          }
        >
          {notice.priority === 'high' ? 'উচ্চ' : 
           notice.priority === 'medium' ? 'মধ্যম' : 'নিম্ন'}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'অবস্থা',
      render: (notice) => (
        <Badge variant={notice.status === 'published' ? 'success' : 'secondary'}>
          {notice.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'কার্যক্রম',
      render: (notice) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEditNotice(notice)}
          >
            <FiEdit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeleteNotice(notice.id)}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleViewSms = (sms) => {
    setSelectedItem(sms);
    // Open view modal
  };

  const handleDeleteSms = (smsId) => {
    if (confirm('আপনি কি নিশ্চিত যে এই SMS রেকর্ডটি মুছে ফেলতে চান?')) {
      setSmsHistory(smsHistory.filter(s => s.id !== smsId));
    }
  };

  const handleEditNotice = (notice) => {
    setSelectedItem(notice);
    setShowNoticeModal(true);
  };

  const handleDeleteNotice = (noticeId) => {
    if (confirm('আপনি কি নিশ্চিত যে এই নোটিশটি মুছে ফেলতে চান?')) {
      setNotices(notices.filter(n => n.id !== noticeId));
    }
  };

  const filteredSmsHistory = smsHistory.filter(sms =>
    sms.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sms.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">যোগাযোগ ব্যবস্থাপনা</h1>
          <p className="mt-1 text-sm text-gray-600">
            SMS এবং নোটিশ বোর্ড ব্যবস্থাপনা
          </p>
        </div>
        <div className="flex space-x-3">
          {activeTab === 'sms' && (
            <Button onClick={() => setShowSmsModal(true)}>
              <FiSend className="w-4 h-4 mr-2" />
              SMS পাঠান
            </Button>
          )}
          {activeTab === 'notices' && (
            <Button onClick={() => setShowNoticeModal(true)}>
              <FiPlus className="w-4 h-4 mr-2" />
              নতুন নোটিশ
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <FiMessageSquare className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">মোট SMS</p>
              <p className="text-2xl font-bold text-gray-900">{smsHistory.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiUsers className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">প্রাপক</p>
              <p className="text-2xl font-bold text-gray-900">
                {smsHistory.reduce((sum, sms) => sum + sms.recipientCount, 0)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiBell className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">সক্রিয় নোটিশ</p>
              <p className="text-2xl font-bold text-gray-900">
                {notices.filter(n => n.status === 'published').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiMail className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">SMS খরচ</p>
              <p className="text-2xl font-bold text-gray-900">
                ৳{smsHistory.reduce((sum, sms) => sum + sms.cost, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('sms')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            SMS ইতিহাস
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notices'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            নোটিশ বোর্ড
          </button>
        </nav>
      </div>

      {/* Search */}
      <Card className="p-4">
        <SearchBar
          placeholder={activeTab === 'sms' ? "SMS শিরোনাম বা বার্তা দিয়ে খুঁজুন..." : "নোটিশের শিরোনাম বা বিষয়বস্তু দিয়ে খুঁজুন..."}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </Card>

      {/* Content */}
      <Card>
        {activeTab === 'sms' ? (
          <DataTable
            columns={smsColumns}
            data={filteredSmsHistory}
            loading={loading}
            emptyMessage="কোনো SMS রেকর্ড পাওয়া যায়নি"
          />
        ) : (
          <DataTable
            columns={noticeColumns}
            data={filteredNotices}
            loading={loading}
            emptyMessage="কোনো নোটিশ পাওয়া যায়নি"
          />
        )}
      </Card>

      {/* SMS Modal */}
      <SmsModal
        isOpen={showSmsModal}
        onClose={() => setShowSmsModal(false)}
        onSend={(smsData) => {
          const newSms = {
            id: Date.now(),
            ...smsData,
            sentDate: new Date().toISOString().split('T')[0],
            sentBy: 'প্রধান শিক্ষক',
            status: 'sent',
            cost: smsData.recipientCount * 3 // 3 taka per SMS
          };
          setSmsHistory([newSms, ...smsHistory]);
          setShowSmsModal(false);
        }}
      />

      {/* Notice Modal */}
      <NoticeModal
        isOpen={showNoticeModal}
        onClose={() => {
          setShowNoticeModal(false);
          setSelectedItem(null);
        }}
        notice={selectedItem}
        onSave={(noticeData) => {
          if (selectedItem) {
            setNotices(notices.map(n => 
              n.id === selectedItem.id ? { ...n, ...noticeData } : n
            ));
          } else {
            const newNotice = {
              id: Date.now(),
              ...noticeData,
              publishedBy: 'প্রধান শিক্ষক',
              status: 'published'
            };
            setNotices([newNotice, ...notices]);
          }
          setShowNoticeModal(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
// SMS Modal Component
function SmsModal({ isOpen, onClose, onSend }) {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    recipients: 'all',
    customRecipients: ''
  });

  const recipientOptions = [
    { value: 'all', label: 'সকল অভিভাবক', count: 150 },
    { value: 'class-6', label: 'ক্লাস ৬ এর অভিভাবক', count: 25 },
    { value: 'class-7', label: 'ক্লাস ৭ এর অভিভাবক', count: 30 },
    { value: 'class-8', label: 'ক্লাস ৮ এর অভিভাবক', count: 28 },
    { value: 'class-9', label: 'ক্লাস ৯ এর অভিভাবক', count: 32 },
    { value: 'class-10', label: 'ক্লাস ১০ এর অভিভাবক', count: 35 },
    { value: 'custom', label: 'কাস্টম তালিকা', count: 0 }
  ];

  const selectedOption = recipientOptions.find(opt => opt.value === formData.recipients);
  const estimatedCost = selectedOption ? selectedOption.count * 3 : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipientData = recipientOptions.find(opt => opt.value === formData.recipients);
    onSend({
      ...formData,
      recipients: recipientData.label,
      recipientCount: recipientData.count
    });
    setFormData({ title: '', message: '', recipients: 'all', customRecipients: '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SMS পাঠান"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="শিরোনাম *"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            বার্তা * ({formData.message.length}/160)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={4}
            maxLength={160}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="SMS বার্তা লিখুন..."
            required
          />
        </div>

        <FormSelect
          label="প্রাপক নির্বাচন *"
          value={formData.recipients}
          onChange={(e) => setFormData({...formData, recipients: e.target.value})}
          options={recipientOptions}
          required
        />

        {formData.recipients === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ফোন নম্বর তালিকা (কমা দিয়ে আলাদা করুন)
            </label>
            <textarea
              value={formData.customRecipients}
              onChange={(e) => setFormData({...formData, customRecipients: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="01712345678, 01812345678, ..."
            />
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>প্রাপক সংখ্যা:</span>
            <span className="font-medium">{selectedOption?.count || 0} জন</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>আনুমানিক খরচ:</span>
            <span className="font-medium">৳{estimatedCost}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            বাতিল
          </Button>
          <Button type="submit">
            SMS পাঠান
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// Notice Modal Component
function NoticeModal({ isOpen, onClose, notice, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publishDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    priority: 'medium',
    targetAudience: 'সকল ছাত্র'
  });

  useEffect(() => {
    if (notice) {
      setFormData({
        title: notice.title || '',
        content: notice.content || '',
        publishDate: notice.publishDate || new Date().toISOString().split('T')[0],
        expiryDate: notice.expiryDate || '',
        priority: notice.priority || 'medium',
        targetAudience: notice.targetAudience || 'সকল ছাত্র'
      });
    } else {
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      
      setFormData({
        title: '',
        content: '',
        publishDate: today.toISOString().split('T')[0],
        expiryDate: nextMonth.toISOString().split('T')[0],
        priority: 'medium',
        targetAudience: 'সকল ছাত্র'
      });
    }
  }, [notice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={notice ? 'নোটিশ সম্পাদনা' : 'নতুন নোটিশ তৈরি'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="নোটিশের শিরোনাম *"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            নোটিশের বিষয়বস্তু *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="নোটিশের বিস্তারিত লিখুন..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="প্রকাশের তারিখ *"
            type="date"
            value={formData.publishDate}
            onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
            required
          />
          
          <FormInput
            label="মেয়াদ শেষের তারিখ *"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="অগ্রাধিকার *"
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            options={[
              { value: 'high', label: 'উচ্চ' },
              { value: 'medium', label: 'মধ্যম' },
              { value: 'low', label: 'নিম্ন' }
            ]}
            required
          />
          
          <FormSelect
            label="লক্ষ্য দর্শক *"
            value={formData.targetAudience}
            onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
            options={[
              { value: 'সকল ছাত্র', label: 'সকল ছাত্র' },
              { value: 'সকল শিক্ষক', label: 'সকল শিক্ষক' },
              { value: 'সকল অভিভাবক', label: 'সকল অভিভাবক' },
              { value: 'ক্লাস ৬-৮', label: 'ক্লাস ৬-৮' },
              { value: 'ক্লাস ৯-১০', label: 'ক্লাস ৯-১০' }
            ]}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            বাতিল
          </Button>
          <Button type="submit">
            {notice ? 'আপডেট করুন' : 'প্রকাশ করুন'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
