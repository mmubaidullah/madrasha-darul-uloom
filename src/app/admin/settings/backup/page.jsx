'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { Button, Card, DataTable, Badge, Modal, FormInput } from '@/components/ui';
import { FiDownload, FiUpload, FiTrash2, FiDatabase, FiHardDrive, FiClock, FiAlertCircle } from 'react-icons/fi';

export default function BackupPage() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [autoBackupSettings, setAutoBackupSettings] = useState({
    enabled: true,
    frequency: 'daily',
    time: '02:00',
    retention: 30
  });

  // Sample backup data
  useEffect(() => {
    const sampleBackups = [
      {
        id: 1,
        filename: 'madrasha_backup_2024_03_06.sql',
        size: '2.5 MB',
        createdAt: '2024-03-06 02:00:00',
        type: 'auto',
        status: 'completed',
        description: 'স্বয়ংক্রিয় দৈনিক ব্যাকআপ'
      },
      {
        id: 2,
        filename: 'madrasha_backup_2024_03_05.sql',
        size: '2.4 MB',
        createdAt: '2024-03-05 02:00:00',
        type: 'auto',
        status: 'completed',
        description: 'স্বয়ংক্রিয় দৈনিক ব্যাকআপ'
      },
      {
        id: 3,
        filename: 'madrasha_manual_backup_2024_03_01.sql',
        size: '2.3 MB',
        createdAt: '2024-03-01 14:30:00',
        type: 'manual',
        status: 'completed',
        description: 'ম্যানুয়াল ব্যাকআপ - পরীক্ষার আগে'
      }
    ];

    setBackups(sampleBackups);
  }, []);

  const columns = [
    {
      key: 'filename',
      label: 'ফাইলের নাম',
      render: (backup) => (
        <div>
          <div className="font-medium text-gray-900">{backup.filename}</div>
          <div className="text-sm text-gray-500">{backup.description}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'ধরন',
      render: (backup) => (
        <Badge variant={backup.type === 'auto' ? 'success' : 'secondary'}>
          {backup.type === 'auto' ? 'স্বয়ংক্রিয়' : 'ম্যানুয়াল'}
        </Badge>
      )
    },
    {
      key: 'size',
      label: 'আকার',
      render: (backup) => backup.size
    },
    {
      key: 'createdAt',
      label: 'তৈরির সময়',
      render: (backup) => backup.createdAt
    },
    {
      key: 'status',
      label: 'অবস্থা',
      render: (backup) => (
        <Badge variant={backup.status === 'completed' ? 'success' : 'warning'}>
          {backup.status === 'completed' ? 'সম্পন্ন' : 'প্রক্রিয়াধীন'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'কার্যক্রম',
      render: (backup) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDownloadBackup(backup)}
          >
            <FiDownload className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleRestoreBackup(backup)}
          >
            <FiUpload className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeleteBackup(backup.id)}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleCreateBackup = async () => {
    setLoading(true);
    try {
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newBackup = {
        id: Date.now(),
        filename: `madrasha_manual_backup_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}.sql`,
        size: '2.6 MB',
        createdAt: new Date().toLocaleString('bn-BD'),
        type: 'manual',
        status: 'completed',
        description: 'ম্যানুয়াল ব্যাকআপ'
      };
      
      setBackups([newBackup, ...backups]);
      alert('ব্যাকআপ সফলভাবে তৈরি হয়েছে!');
    } catch (error) {
      alert('ব্যাকআপ তৈরিতে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBackup = (backup) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = backup.filename;
    link.click();
    alert(`${backup.filename} ডাউনলোড করা হচ্ছে...`);
  };

  const handleRestoreBackup = (backup) => {
    setSelectedBackup(backup);
    setShowRestoreModal(true);
  };

  const handleDeleteBackup = (backupId) => {
    if (confirm('আপনি কি নিশ্চিত যে এই ব্যাকআপটি মুছে ফেলতে চান?')) {
      setBackups(backups.filter(b => b.id !== backupId));
    }
  };

  const handleRestoreConfirm = async () => {
    setLoading(true);
    try {
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 5000));
      alert('ডেটা সফলভাবে পুনরুদ্ধার করা হয়েছে!');
      setShowRestoreModal(false);
      setSelectedBackup(null);
    } catch (error) {
      alert('ডেটা পুনরুদ্ধারে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoBackupSettingsUpdate = () => {
    alert('স্বয়ংক্রিয় ব্যাকআপ সেটিংস আপডেট করা হয়েছে!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ব্যাকআপ ও পুনরুদ্ধার</h1>
          <p className="mt-1 text-sm text-gray-600">
            ডেটা ব্যাকআপ এবং পুনরুদ্ধার ব্যবস্থাপনা
          </p>
        </div>
        <Button onClick={handleCreateBackup} disabled={loading}>
          <FiDatabase className="w-4 h-4 mr-2" />
          {loading ? 'তৈরি হচ্ছে...' : 'নতুন ব্যাকআপ তৈরি'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <FiDatabase className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">মোট ব্যাকআপ</p>
              <p className="text-2xl font-bold text-gray-900">{backups.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiHardDrive className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">মোট আকার</p>
              <p className="text-2xl font-bold text-gray-900">7.2 MB</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiClock className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">শেষ ব্যাকআপ</p>
              <p className="text-2xl font-bold text-gray-900">আজ</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiAlertCircle className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">স্বয়ংক্রিয় ব্যাকআপ</p>
              <p className="text-2xl font-bold text-gray-900">
                {autoBackupSettings.enabled ? 'চালু' : 'বন্ধ'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Auto Backup Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">স্বয়ংক্রিয় ব্যাকআপ সেটিংস</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoBackupSettings.enabled}
                onChange={(e) => setAutoBackupSettings({
                  ...autoBackupSettings,
                  enabled: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">স্বয়ংক্রিয় ব্যাকআপ চালু করুন</span>
            </label>
          </div>
          
          <FormInput
            label="ব্যাকআপের সময়"
            type="time"
            value={autoBackupSettings.time}
            onChange={(e) => setAutoBackupSettings({
              ...autoBackupSettings,
              time: e.target.value
            })}
            disabled={!autoBackupSettings.enabled}
          />
          
          <FormInput
            label="সংরক্ষণের মেয়াদ (দিন)"
            type="number"
            min="1"
            max="365"
            value={autoBackupSettings.retention}
            onChange={(e) => setAutoBackupSettings({
              ...autoBackupSettings,
              retention: parseInt(e.target.value)
            })}
            disabled={!autoBackupSettings.enabled}
          />
          
          <div className="flex items-end">
            <Button 
              onClick={handleAutoBackupSettingsUpdate}
              disabled={!autoBackupSettings.enabled}
              className="w-full"
            >
              সেটিংস সংরক্ষণ
            </Button>
          </div>
        </div>
      </Card>

      {/* Backup List */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">ব্যাকআপ তালিকা</h3>
        </div>
        <DataTable
          columns={columns}
          data={backups}
          loading={false}
          emptyMessage="কোনো ব্যাকআপ পাওয়া যায়নি"
        />
      </Card>

      {/* Restore Confirmation Modal */}
      <Modal
        isOpen={showRestoreModal}
        onClose={() => {
          setShowRestoreModal(false);
          setSelectedBackup(null);
        }}
        title="ডেটা পুনরুদ্ধার নিশ্চিতকরণ"
      >
        {selectedBackup && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <FiAlertCircle className="w-5 h-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    সতর্কতা!
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      এই প্রক্রিয়া বর্তমান সকল ডেটা মুছে ফেলে ব্যাকআপ থেকে ডেটা পুনরুদ্ধার করবে।
                      এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">ব্যাকআপের বিবরণ:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ফাইল:</strong> {selectedBackup.filename}</p>
                <p><strong>আকার:</strong> {selectedBackup.size}</p>
                <p><strong>তৈরির সময়:</strong> {selectedBackup.createdAt}</p>
                <p><strong>বিবরণ:</strong> {selectedBackup.description}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => {
                  setShowRestoreModal(false);
                  setSelectedBackup(null);
                }}
              >
                বাতিল
              </Button>
              <Button 
                onClick={handleRestoreConfirm}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? 'পুনরুদ্ধার হচ্ছে...' : 'পুনরুদ্ধার করুন'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
