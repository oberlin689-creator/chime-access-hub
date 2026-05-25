import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your credentials');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <Link to="/" className="text-4xl font-black text-[#25d366] mb-8">chime</Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Log in to Chime</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input 
                type="email" 
                placeholder="name@email.com" 
                className="pl-10 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="pl-10 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm font-semibold text-[#25d366] hover:underline">Forgot password?</a>
          </div>

          <Button 
            disabled={isLoading}
            className="w-full h-12 bg-[#25d366] hover:bg-[#1fb356] text-white rounded-lg font-bold text-lg"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          New to Chime? <Link to="/signup" className="font-semibold text-[#25d366] hover:underline">Apply now</Link>
        </p>
      </motion.div>
      
      <p className="mt-8 text-sm text-gray-400 max-w-sm text-center">
        Your security is our priority. Chime uses 128-bit encryption to protect your data.
      </p>
    </div>
  );
};

export default LoginPage;