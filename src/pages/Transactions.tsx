import { useUserAccount } from '@/lib/mock-data';
import DashboardLayout from '@/components/DashboardLayout';
import TransactionList from '@/components/TransactionList';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const TransactionsPage = () => {
  const { data } = useUserAccount();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = data.transactions.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Transactions</h1>
            <p className="text-gray-500">Keep track of your spending and income.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10 h-10 rounded-lg border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <TransactionList transactions={filteredTransactions} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;