import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockGoogleUser: User = {
        id: "google-user-" + Date.now(),
        name: "Google User",
        email: "user@gmail.com",
        role: "New Member",
        avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c"
      };
      // Save to "DB"
      const existingUsers = JSON.parse(localStorage.getItem('phil_users') || '[]');
      if (!existingUsers.find((u: User) => u.email === mockGoogleUser.email)) {
          existingUsers.push(mockGoogleUser);
          localStorage.setItem('phil_users', JSON.stringify(existingUsers));
      }
      
      setIsLoading(false);
      onLogin(mockGoogleUser);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('phil_users') || '[]');

      if (isLogin) {
        // Login Logic
        const foundUser = existingUsers.find((u: User) => u.email === email && u.password === password);
        if (foundUser) {
          onLogin(foundUser);
        } else {
          setError("Invalid email or password.");
          setIsLoading(false);
        }
      } else {
        // Signup Logic
        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            setIsLoading(false);
            return;
        }
        
        if (existingUsers.find((u: User) => u.email === email)) {
            setError("User already exists.");
            setIsLoading(false);
            return;
        }

        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            password,
            role: "Productivity Enthusiast",
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=153e28&color=fff`
        };

        localStorage.setItem('phil_users', JSON.stringify([...existingUsers, newUser]));
        onLogin(newUser);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-primary-light dark:bg-gray-900 relative overflow-hidden p-6 transition-colors duration-500 justify-center">
       {/* Background Blobs */}
       <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/20 dark:bg-green-900/20 rounded-full blur-3xl animate-pulse-slow"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-green-300/20 dark:bg-green-600/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="z-10 w-full max-w-sm mx-auto">
        <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 bg-primary dark:bg-green-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-green-900/20 mb-4 rotate-3">
                <span className="text-3xl">P.</span>
            </div>
            <h1 className="text-3xl font-bold text-primary dark:text-white mb-2">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isLogin ? 'Sign in to continue your productivity journey.' : 'Join us and start setting your goals.'}
            </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl animate-slide-up">
            {/* Google Button */}
            <button 
                onClick={handleGoogleLogin}
                className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3 transition-all mb-6"
            >
                {isLoading ? (
                    <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                    <>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
                    </>
                )}
            </button>

            <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or with email</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div className="relative">
                        <UserIcon size={18} className="absolute left-4 top-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary/50 text-primary dark:text-white transition-all"
                        />
                    </div>
                )}

                <div className="relative">
                    <Mail size={18} className="absolute left-4 top-4 text-gray-400" />
                    <input 
                        type="email" 
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary/50 text-primary dark:text-white transition-all"
                    />
                </div>

                <div className="relative">
                    <Lock size={18} className="absolute left-4 top-4 text-gray-400" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-11 pr-12 outline-none focus:ring-2 focus:ring-primary/50 text-primary dark:text-white transition-all"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary dark:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-900 dark:hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                    {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                    {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </form>
        </div>

        <div className="text-center mt-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                    onClick={() => { setIsLogin(!isLogin); setError(""); }}
                    className="text-primary dark:text-green-400 font-bold hover:underline"
                >
                    {isLogin ? "Sign up" : "Log in"}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;