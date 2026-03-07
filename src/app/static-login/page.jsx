export default function StaticLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            মাদরাসা ব্যবস্থাপনা সিস্টেম
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেইল ঠিকানা
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="admin@example.com"
                defaultValue="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="আপনার পাসওয়ার্ড"
                defaultValue="123456"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                if (email && password) {
                  // Store auth data
                  const mockUser = {
                    id: 1,
                    name: 'প্রশাসক',
                    email: email,
                    role: 'admin'
                  };
                  
                  const mockToken = 'demo-jwt-token-' + Date.now();
                  
                  localStorage.setItem('auth_token', JSON.stringify(mockToken));
                  localStorage.setItem('user_data', JSON.stringify(mockUser));
                  
                  alert('লগইন সফল! Admin panel এ যাচ্ছি...');
                  
                  // Redirect
                  window.location.href = '/admin';
                } else {
                  alert('ইমেইল এবং পাসওয়ার্ড দিন');
                }
              }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              লগইন করুন
            </button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ডেমো লগইন: যেকোনো ইমেইল এবং পাসওয়ার্ড ব্যবহার করুন
            </p>
            
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  alert('Storage cleared!');
                  window.location.reload();
                }}
                className="text-xs text-red-600 hover:text-red-700 px-2 py-1 border border-red-200 rounded"
              >
                Clear Storage
              </button>
              
              <button
                type="button"
                onClick={() => window.location.href = '/admin'}
                className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 border border-blue-200 rounded"
              >
                Direct Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}