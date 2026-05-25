import { Transaction } from '@/lib/mock-data';
import { ArrowUpRight, ArrowDownLeft, Coffee, ShoppingBag, Zap, DollarSign, RefreshCcw } from 'lucide-react';

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category.toLowerCase()) {
    case 'food': return <Coffee className="w-5 h-5 text-orange-500" />;
    case 'shopping': return <ShoppingBag className="w-5 h-5 text-blue-500" />;
    case 'bills': return <Zap className="w-5 h-5 text-yellow-500" />;
    case 'income': return <DollarSign className="w-5 h-5 text-green-500" />;
    case 'transfer': return <RefreshCcw className="w-5 h-5 text-[#25d366]" />;
    default: return <ShoppingBag className="w-5 h-5 text-gray-500" />;
  }
};

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (transactions.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((tx) => (
        <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              tx.type === 'credit' ? 'bg-green-50' : 'bg-gray-100'
            }`}>
              <CategoryIcon category={tx.category} />
            </div>
            <div>
              <p className="font-bold text-gray-900">{tx.description}</p>
              <p className="text-sm text-gray-500">{tx.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold ${
              tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'
            }`}>
              {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
            </p>
            <p className="text-xs text-gray-400 capitalize">{tx.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;