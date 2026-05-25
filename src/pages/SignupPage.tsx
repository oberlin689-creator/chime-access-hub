import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone } from 'lucide-react';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <Link to="/" className="text-4xl font-black text-[#25d366] mb-8">chime</Link>
      
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Personal Info' : 'Secure Account'}
          </h2>
          <span className="text-sm font-medium text-gray-400">Step {step} of 2</span>
        </div>

        <form onSubmit={handleNext} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input placeholder="John Doe" className="pl-10 h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input type="email" placeholder="john@example.com" className="pl-10 h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input type="tel" placeholder="(555) 000-0000" className="pl-10 h-12" required />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Create Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input type="password" placeholder="••••••••" className="pl-10 h-12" required />
                </div>
              </div>
              <div className="p-4 bg-[#25d366]/5 rounded-lg border border-[#25d366]/20">
                <p className="text-sm text-gray-600">
                  By clicking "Complete Application", you agree to Chime's Terms of Service and Privacy Policy.
                </p>
              </div>
            </>
          )}

          <Button 
            className="w-full h-12 bg-[#25d366] hover:bg-[#1fb356] text-white rounded-lg font-bold text-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : step === 1 ? 'Next' : 'Complete Application'}
          </Button>
          
          {step === 2 && (
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-sm font-medium text-gray-400 hover:text-gray-600"
            >
              Go back
            </button>
          )}
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-[#25d366] hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;