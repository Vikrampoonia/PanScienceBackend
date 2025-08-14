import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// A functional component for displaying validation errors
const ValidationError = ({ message }) => {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
};

// Main Registration Component
const SignUp = () => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  // --- Validation Logic ---
  const validate = () => {
    const newErrors = { name: null, email: null, password: null, confirmPassword: null };
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid.';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters.';
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (val, label) => {
    const newErrors = { name: null, email: null, password: null, confirmPassword: null };

    if (label === 'name') {
      if (val.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters.';
      }
      setName(val);
    } else if (label === 'email') {
      if (!/\S+@\S+\.\S+/.test(val)) {
        newErrors.email = 'Email is not valid.';
      }
      setEmail(val);
    } else if (label === 'password') {
      if (val.length < 4) {
        newErrors.password = 'Password must be at least 4 characters.';
      }
      setPassword(val);
    } else {
      setConfirmPassword(val);
    }

    setErrors(newErrors);
  };

  // --- Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      toast.success('Successfully registered');
      navigate('/dashboard');
    } else {
      console.log('Form validation failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleFieldChange(e.target.value, 'name')}
                placeholder="John Doe"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
            </div>
            <ValidationError message={errors.name} />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleFieldChange(e.target.value, 'email')}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
            </div>
            <ValidationError message={errors.email} />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handleFieldChange(e.target.value, 'password')}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <ValidationError message={errors.password} />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => handleFieldChange(e.target.value, 'confirmPassword')}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <ValidationError message={errors.confirmPassword} />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Register <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
