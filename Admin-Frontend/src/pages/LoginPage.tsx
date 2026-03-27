import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import axios from 'axios';


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const authBaseUrl = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3000/api/v1';
      console.log('Attempting login to:', authBaseUrl);
      console.log('Login payload:', { Username: username, password });
      
      const response = await axios.post(`${authBaseUrl}/users/login`, {
        Username: username, 
        password: password,
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.data) {
        const userData = response.data.data;
        const { token } = userData;
        const userRole = response.data.data.role;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify({ ...userData, role: userRole }));
        login(userData.Username, password);
        
        if (userRole === 'admin' || userRole === 'superadmin') {
          navigate('/dashboard');
        } else {
          setError('Access denied: You do not have admin privileges.');
        }
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed: Unable to connect to server';
      setError(errorMsg);
      console.error('Login error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        fullError: err.message,
        backend: import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3000/api/v1'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg" />
          <span className="text-2xl font-bold text-blue-600">Travallee</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600 mb-8">
          Sign in to your hotel management account
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-red-700 text-sm font-medium">Error:</p>
            <p className="text-red-600 text-sm mt-1 break-words">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="admin_username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <a
            href="#forgot"
            className="inline-block text-blue-500 text-sm font-medium hover:underline float-right"
          >
            Forgot password?
          </a>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
