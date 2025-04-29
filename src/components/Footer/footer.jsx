import { Link } from 'react-router-dom';
import Logo from '../../assets/logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-gray-400 max-w-md">
              Track your expenses smartly and take control of your financial future with our intuitive expense tracking solution.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
              <li><Link to="/expenses" className="text-gray-400 hover:text-white">Transactions</Link></li>
              <li><Link to="/insights" className="text-gray-400 hover:text-white">Insights</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
