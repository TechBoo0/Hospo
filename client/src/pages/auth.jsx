import { useState } from 'react';
import axios from 'axios';
import { api } from '../api';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',    
    gender: 'male',
    contact: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const validateEmail = (email) => {
    const regex = /.+@.+\..+/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 5) {
      newErrors.password = 'Password should be at least 5 characters long';
    }

  
    
    if (!isLogin) {
      if (!formData.contact) {
        newErrors.contact = 'Contact is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      let response;
      
      if (isLogin) {
        response = await axios.post(`${api}/user/login`, {
          Email: formData.email,
          Password: formData.password,
        });
      } else {
        response = await axios.post(`${api}/user/register`, {
          Email: formData.email,
          Password: formData.password,
          Username: formData.username,
          Gender: formData.gender,
          Contact: formData.contact
        });
      }
      
      if (response.data) {
        const userData = {
          username: response.data.Username,  
          email: formData.email,  
          token: response.data.token  
        };

        localStorage.setItem('user', JSON.stringify(userData));

        console.log("Stored User Data:", JSON.parse(localStorage.getItem("user")));

        nav("/");
        toast.success("Authentication successful!");
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-[#DEFFDA]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isLogin 
              ? 'Sign in to access your account' 
              : 'Fill out the form to create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 5 characters"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className={`w-full py-2 px-4 text-white font-medium rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : ' bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline focus:outline-none font-medium"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;