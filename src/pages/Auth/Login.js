import  { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import AuthLayout from "../../layout/AuthLayout";

// A functional component for displaying validation errors
const ValidationError = ({ message }) => {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
};

// Main Registration Component
const Login = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  // --- Validation Logic ---
  const validate = () => {
    const newErrors = { email: null, password: null };
    let isValid = true;

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
    }else if(password.length<4)
    {
      newErrors.password = 'Password of 4 character allowed.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleEmailPass =(val,label)=>{
    const newErrors = { email: null, password: null};
    if(label == "email")
    {
      if (!/\S+@\S+\.\S+/.test(val)) 
      {
        newErrors.email = 'Email is not valid.';
      }
      setEmail(val);
    }
    else
    {
      if(val.length < 4) 
      {
        newErrors.password = 'Password of  4 character allowed.';
      }
      if( val.length<=4)
      {
          setPassword(val);
      }

    }
      
    setErrors(newErrors);
  }

  // --- Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // If validation is successful, proceed with form submission
      console.log('Form submitted successfully:', { email, password });
      alert('Registration successful!');
      // Here you would typically send the data to your backend API
    } else {
      console.log('Form validation failed.');
    }
  };

  return (
     <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
            <p className="text-center text-gray-500 mt-2">Join us and start your journey!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={(e) => handleEmailPass(e.target.value,"email")}
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
                  onChange={(e) => handleEmailPass(e.target.value,"password")}
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

        

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Login <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:underline">
              Register here
            </a>
          </p>

        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;