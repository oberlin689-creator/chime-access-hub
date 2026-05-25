import { motion } from 'framer-motion';
import { useUserAccount } from '@/lib/mock-data';
import DashboardLayout from '@/components/DashboardLayout';
import { ArrowUpRight, ArrowDownLeft, Wallet, PiggyBank, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TransactionList from '@/components/TransactionList';

const Dashboard = () => {
  const { data } = useUserAccount();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900">Good morning, {data.name.split(' ')[0]}!</h1>
          <p className="text-gray-500">Here's what's happening with your money.</p>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Wallet className="w-6 h-6 text-[#25d366]" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-500">Checking Account</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(data.checkingBalance)}</h2>
            <div className="flex items-center gap-2 mt-4 text-sm text-[#25d366] font-medium">
              <ArrowDownLeft className="w-4 h-4" />
              <span>+$1,200.00 this week</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <PiggyBank className="w-6 h-6 text-blue-500" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-500">Savings Account</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(data.savingsBalance)}</h2>
            <div className="mt-4 bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-3/4"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">75% of your $7,000 goal</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <CreditCard className="w-6 h-6 text-purple-500" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-500">Credit Builder</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(data.creditBuilderBalance)}</h2>
            <div className="flex items-center gap-2 mt-4 text-sm text-purple-500 font-medium">
              <ArrowUpRight className="w-4 h-4" />
              <span>Building credit score...</span>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need to move money?</h3>
            <p className="text-gray-400">Transfer funds between accounts or send money to friends instantly.</p>
          </div>
          <Link to="/dashboard/move-money">
            <button className="bg-[#25d366] hover:bg-[#1fb356] text-white px-8 py-4 rounded-full font-bold transition-colors">
              Move Money Now
            </button>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-xl">Recent Transactions</h3>
            <Link to="/dashboard/transactions" className="text-sm font-semibold text-[#25d366] hover:underline">
              View All
            </Link>
          </div>
          <TransactionList transactions={data.transactions.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;