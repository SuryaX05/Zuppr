import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function LoginModal() {
  const { isLoginModalOpen, setLoginModalOpen, setUser } = useAppStore();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!studentId.trim() || !password.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate login process
    const user = {
      id: Date.now().toString(),
      name: `Student ${studentId}`,
      email: `${studentId}@gitam.edu`,
      studentId: studentId
    };

    setUser(user);
    setLoginModalOpen(false);
    setStudentId('');
    setPassword('');
    alert(`Welcome, Student ID: ${studentId}!`);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    const user = {
      id: Date.now().toString(),
      name: 'John Doe',
      email: 'john.doe@gitam.edu',
    };

    setUser(user);
    setLoginModalOpen(false);
    alert('Welcome via Google!');
  };

  if (!isLoginModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      data-testid="login-modal"
    >
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-black text-gray-800" data-testid="modal-title">
            Student Login 🎓
          </h2>
          <button 
            className="text-2xl text-gray-600 hover:text-gray-800" 
            onClick={() => setLoginModalOpen(false)}
            data-testid="modal-close"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2" data-testid="student-id-label">
              Student ID
            </label>
            <input 
              type="text" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-grado-orange" 
              placeholder="Enter your student ID"
              data-testid="student-id-input"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2" data-testid="password-label">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-grado-orange" 
              placeholder="Enter your password"
              data-testid="password-input"
            />
          </div>
          
          <button 
            className="w-full gradient-bg text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform" 
            onClick={handleLogin}
            data-testid="login-submit"
          >
            Login
          </button>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Or login with Google</p>
            <button 
              className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center mx-auto"
              onClick={handleGoogleLogin}
              data-testid="google-login"
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google" 
                className="w-5 h-5 mr-2" 
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
