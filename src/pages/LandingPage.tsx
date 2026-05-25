import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Smartphone, CreditCard, ArrowRight, CheckCircle2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-black text-[#25d366]">chime</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#benefits" className="text-sm font-medium text-gray-600 hover:text-gray-900">Benefits</a>
              <a href="#security" className="text-sm font-medium text-gray-600 hover:text-gray-900">Security</a>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Log In</Link>
              <Link to="/signup">
                <Button className="bg-[#25d366] hover:bg-[#1fb356] text-white rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4">
            <a href="#benefits" className="block text-base font-medium text-gray-600">Benefits</a>
            <a href="#security" className="block text-base font-medium text-gray-600">Security</a>
            <Link to="/login" className="block text-base font-medium text-gray-600">Log In</Link>
            <Link to="/signup" className="block">
              <Button className="w-full bg-[#25d366] hover:bg-[#1fb356] text-white rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-gray-900 leading-tight"
            >
              Banking that has <span className="text-[#25d366]">your back</span>
            </motion.h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Get paid up to 2 days early, grow your savings automatically, and manage your money with zero monthly fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup">
                <Button className="w-full sm:w-auto h-14 px-8 text-lg bg-[#25d366] hover:bg-[#1fb356] rounded-full">
                  Apply Now
                </Button>
              </Link>
              <div className="flex items-center gap-2 px-4 text-sm text-gray-500">
                <CheckCircle2 className="text-[#25d366] w-5 h-5" />
                No hidden fees
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d181e274-c365-4cfd-b91c-04263bed1374/hero-banking-app-dc61cb7a-1779694546279.webp" 
              alt="Chime App" 
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="benefits" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-[#25d366]/10 rounded-full flex items-center justify-center mx-auto">
              <Smartphone className="text-[#25d366] w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">2-Day Early Pay</h3>
            <p className="text-gray-600">Get your direct deposit up to two days earlier than traditional banks.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-[#25d366]/10 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="text-[#25d366] w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">No Monthly Fees</h3>
            <p className="text-gray-600">No minimum balance fees, no monthly service fees, and no foreign transaction fees.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-[#25d366]/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="text-[#25d366] w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Safe & Secure</h3>
            <p className="text-gray-600">Your accounts are FDIC-insured through our partner banks and we use 2FA.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-[2rem] p-8 md:p-16 text-center text-white overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Join over 14.5 million people who love Chime</h2>
            <p className="text-gray-400 text-lg">It takes less than 2 minutes to apply.</p>
            <Link to="/signup" className="inline-block pt-4">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full h-14 px-10 text-lg font-bold group">
                Open an Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25d366] opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-2xl font-black text-[#25d366]">chime</span>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
          <p className="text-sm text-gray-400">© 2024 Chime Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;