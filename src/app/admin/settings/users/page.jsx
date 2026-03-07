'use client';
import { useState, useEffect } from 'react';
import { Button, Card, DataTable, SearchBar, Badge, Modal, FormInput, FormSelect, Checkbox } from '@/components/ui';
import { FiPlus, FiEdit, FiTrash2, FiLock, FiUnlock, FiShield, FiUser } from 'react-icons/fi';
import { USER_ROLES, USER_ROLE_LABELS } from '@/lib/constants';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample data
  useEffect(() => {
    const sampleUsers = [
      {
        id: 1,
        name: 'মাওলানা আব্দুল করিম',
        email: 'admin@madrasha.edu',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-03-06',
        createdAt: '2024-01-01',
        permissions: ['all']
      },
      {
        id: 2,
        name: 'উস্তাদ মোহাম্মদ রহিম',
        email: 'teacher@madrasha.edu',
        role: 'teacher',
        status: 'active',
        lastLogin: '2024-03-05',
        createdAt: '2024-01-15',
        permissions: ['students.read', 'attendance.write', 'exams.write']
      },
      {
        id: 3,
        name: 'মোহাম্মদ হাসান',
        email: 'accountant@madrasha.edu',
        role: 'accountant',
        status: 'active',
        lastLogin: '2024-03-04',
        createdAt: '2024-02-01',
        permissions: ['fees.all', 'reports.financial']
      }
    ];

    setTimeout(() => {
      setUsers(sampleUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      key: 'user',
      label: 'ব্যবহারকারী',
      render: (user) => (
        <div>
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'ভূমিকা',
      render: (user) => (
        <Badge variant="secondary">
          {USER_ROLE_LABELS[user.role]}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'অবস্থা',
      render: (user) => (
        <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
          {user.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
        </Badge>
      )
    },
    {
      key: 'lastLogin',
      label: 'শেষ লগইন',
      render: (user) => user.lastLogin
    },
    {
      key: 'createdAt',
      label: 'তৈরির তারিখ',
      render: (user) => user.createdAt
    },
    {
      key: 'actions',
      label: 'কার্যক্রম',
      render: (user) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEditUser(user)}
          >
            <FiEdit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleManagePermissions(user)}
          >
            <FiShield className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleToggleStatus(user.id)}
          >
            {user.status === 'active' ? <FiLock className="w-4 h-4" /> : <FiUnlock className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeleteUser(user.id)}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleManagePermissions = (user) => {
    setSelectedUser(user);
    setShowPermissionModal(true);
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (confirm('আপনি কি নিশ্চিত যে এই ব্যবহারকারীকে মুছে ফেলতে চান?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    USER_ROLE_LABELS[user.role].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ব্যবহারকারী ব্যবস্থাপনা</h1>
          <p className="mt-1 text-sm text-gray-600">
            ব্যবহারকারী এবং অনুমতি পরিচালনা
          </p>
        </div>
        <Button onClick={() => setShowUserModal(true)}>
          <FiPlus className="w-4 h-4 mr-2" />
          নতুন ব্যবহারকারী
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <FiUser className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">মোট ব্যবহারকারী</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiUnlock className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">সক্রিয়</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiShield className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">প্রশাসক</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <FiUser className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">শিক্ষক</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'teacher').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <SearchBar
          placeholder="নাম, ইমেইল বা ভূমিকা দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </Card>

      {/* Users Table */}
      <Card>
        <DataTable
          columns={columns}
          data={filteredUsers}
          loading={loading}
          emptyMessage="কোনো ব্যবহারকারী পাওয়া যায়নি"
        />
      </Card>

      {/* User Modal */}
      <UserFormModal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={(userData) => {
          if (selectedUser) {
            setUsers(users.map(u => 
              u.id === selectedUser.id ? { ...u, ...userData } : u
            ));
          } else {
            const newUser = {
              id: Date.now(),
              ...userData,
              status: 'active',
              lastLogin: null,
              createdAt: new Date().toISOString().split('T')[0],
              permissions: []
            };
            setUsers([...users, newUser]);
          }
          setShowUserModal(false);
          setSelectedUser(null);
        }}
      />

      {/* Permission Modal */}
      <PermissionModal
        isOpen={showPermissionModal}
        onClose={() => {
          setShowPermissionModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={(permissions) => {
          setUsers(users.map(u => 
            u.id === selectedUser.id ? { ...u, permissions } : u
          ));
          setShowPermissionModal(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
}
// User Form Modal Component
function UserFormModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'teacher',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'teacher',
        password: ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'teacher',
        password: ''
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'ব্যবহারকারী সম্পাদনা' : 'নতুন ব্যবহারকারী যোগ করুন'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="নাম *"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        
        <FormInput
          label="ইমেইল *"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />

        <FormSelect
          label="ভূমিকা *"
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          options={Object.entries(USER_ROLE_LABELS).map(([value, label]) => ({
            value,
            label
          }))}
          required
        />

        <FormInput
          label={user ? 'নতুন পাসওয়ার্ড (ঐচ্ছিক)' : 'পাসওয়ার্ড *'}
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required={!user}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            বাতিল
          </Button>
          <Button type="submit">
            {user ? 'আপডেট করুন' : 'তৈরি করুন'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// Permission Modal Component
function PermissionModal({ isOpen, onClose, user, onSave }) {
  const [permissions, setPermissions] = useState([]);

  const permissionGroups = [
    {
      name: 'ছাত্র ব্যবস্থাপনা',
      permissions: [
        { key: 'students.read', label: 'ছাত্র তালিকা দেখা' },
        { key: 'students.write', label: 'ছাত্র যোগ/সম্পাদনা' },
        { key: 'students.delete', label: 'ছাত্র মুছে ফেলা' }
      ]
    },
    {
      name: 'শিক্ষক ব্যবস্থাপনা',
      permissions: [
        { key: 'teachers.read', label: 'শিক্ষক তালিকা দেখা' },
        { key: 'teachers.write', label: 'শিক্ষক যোগ/সম্পাদনা' },
        { key: 'teachers.delete', label: 'শিক্ষক মুছে ফেলা' }
      ]
    },
    {
      name: 'হাজিরা ব্যবস্থাপনা',
      permissions: [
        { key: 'attendance.read', label: 'হাজিরা দেখা' },
        { key: 'attendance.write', label: 'হাজিরা নেওয়া' }
      ]
    },
    {
      name: 'ফি ব্যবস্থাপনা',
      permissions: [
        { key: 'fees.read', label: 'ফি তথ্য দেখা' },
        { key: 'fees.write', label: 'ফি সংগ্রহ' },
        { key: 'fees.all', label: 'সকল ফি অনুমতি' }
      ]
    },
    {
      name: 'পরীক্ষা ব্যবস্থাপনা',
      permissions: [
        { key: 'exams.read', label: 'পরীক্ষার তথ্য দেখা' },
        { key: 'exams.write', label: 'পরীক্ষা তৈরি/সম্পাদনা' },
        { key: 'exams.results', label: 'ফলাফল প্রবেশ' }
      ]
    },
    {
      name: 'রিপোর্ট',
      permissions: [
        { key: 'reports.financial', label: 'আর্থিক রিপোর্ট' },
        { key: 'reports.academic', label: 'একাডেমিক রিপোর্ট' },
        { key: 'reports.attendance', label: 'হাজিরা রিপোর্ট' }
      ]
    }
  ];

  useEffect(() => {
    if (user) {
      setPermissions(user.permissions || []);
    }
  }, [user]);

  const handlePermissionChange = (permissionKey) => {
    if (permissions.includes(permissionKey)) {
      setPermissions(permissions.filter(p => p !== permissionKey));
    } else {
      setPermissions([...permissions, permissionKey]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(permissions);
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${user.name} এর অনুমতি ব্যবস্থাপনা`}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-600">ভূমিকা: {USER_ROLE_LABELS[user.role]}</p>
        </div>

        {user.role === 'admin' ? (
          <div className="text-center py-8">
            <FiShield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">প্রশাসক অ্যাকাউন্ট</h3>
            <p className="text-gray-600">প্রশাসকের সকল অনুমতি রয়েছে।</p>
          </div>
        ) : (
          <div className="space-y-6">
            {permissionGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h4 className="font-medium text-gray-900 mb-3">{group.name}</h4>
                <div className="space-y-2">
                  {group.permissions.map((permission, permIndex) => (
                    <label key={permIndex} className="flex items-center">
                      <Checkbox
                        checked={permissions.includes(permission.key)}
                        onChange={() => handlePermissionChange(permission.key)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {user.role !== 'admin' && (
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              বাতিল
            </Button>
            <Button type="submit">
              অনুমতি সংরক্ষণ
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
}