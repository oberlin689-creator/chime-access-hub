import { useState } from 'react';
import { useUserAccount } from '@/lib/mock-data';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowRightLeft, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const MoveMoneyPage = () => {
  const { data, transferBetweenAccounts } = useUserAccount();
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState<'checking' | 'savings'>('checking');
  const [to, setTo] = useState<'checking' | 'savings'>('savings');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    
    if (isNaN(val) || val <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (from === to) {
      toast.error('Cannot transfer to the same account');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const success = transferBetweenAccounts(val, from, to);
      setIsProcessing(false);
      
      if (success) {
        toast.success(`Successfully transferred $${val} to ${to}!`);
        setAmount('');
      } else {
        toast.error('Insufficient funds');
      }
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Move Money</h1>
          <p className="text-gray-500">Transfer funds between your Chime accounts instantly.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
        >
          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700">From</label>
              <Select value={from} onValueChange={(v: any) => setFrom(v)}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account (${data.checkingBalance.toFixed(2)})</SelectItem>
                  <SelectItem value="savings">Savings Account (${data.savingsBalance.toFixed(2)})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center -my-3 relative z-10">
              <div className="bg-white p-2 rounded-full border border-gray-100 shadow-sm">
                <ArrowRightLeft className="w-6 h-6 text-[#25d366]" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700">To</label>
              <Select value={to} onValueChange={(v: any) => setTo(v)}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account (${data.checkingBalance.toFixed(2)})</SelectItem>
                  <SelectItem value="savings">Savings Account (${data.savingsBalance.toFixed(2)})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-10 h-16 text-2xl font-bold rounded-xl border-gray-200 focus-visible:ring-[#25d366]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button 
              disabled={isProcessing}
              className="w-full h-14 bg-[#25d366] hover:bg-[#1fb356] text-white rounded-xl font-bold text-lg"
            >
              {isProcessing ? 'Processing...' : 'Transfer Funds'}
            </Button>
          </form>
        </motion.div>

        {/* Other Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4 hover:border-[#25d366]/50 transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="font-bold">Pay a Friend</p>
              <p className="text-sm text-gray-500">Send money instantly</p>
            </div>
          </button>
          <button className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4 hover:border-[#25d366]/50 transition-colors">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-left">
              <p className="font-bold">External Account</p>
              <p className="text-sm text-gray-500">Link another bank</p>
            </div>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MoveMoneyPage;