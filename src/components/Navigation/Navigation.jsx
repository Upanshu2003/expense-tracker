import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userData');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const NavLinks = ({ className = "" }) => (
    <div className={className}>
      {isAuthenticated && (
        <>
          <Link to="/dashboard" className="!text-yellow-600 hover:!text-yellow-500 px-3 py-2">Dashboard</Link>
          <Link to="/expenses" className="!text-yellow-600 hover:!text-yellow-500 px-3 py-2">Transactions</Link>
          <Link to="/insights" className="!text-yellow-600 hover:!text-yellow-500 px-3 py-2">Insights</Link>
        </>
      )}
    </div>
  );

  const AuthButtons = ({ className = "" }) => (
    <div className={className}>
      {!isAuthenticated ? (
        <>
          <Link to="/login" className="!text-yellow-600 hover:!text-yellow-500 px-4 py-2">Login</Link>
          <Link to="/register" 
            className="bg-yellow-500 hover:bg-yellow-600 !text-white px-6 py-2 rounded-full font-medium transition-colors">
            Get Started
          </Link>
        </>
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full !bg-purple-600 flex items-center justify-center text-white"
          >
            {auth.currentUser?.email?.[0].toUpperCase() || 'U'}
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 !bg-white rounded-lg shadow-xl py-2"
              >
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 !bg-white text-red-700 hover:!bg-gray-100 outline-none focus:outline-none"
                >
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <NavLinks className="hidden md:flex items-center space-x-4" />
          <AuthButtons className="hidden md:flex items-center space-x-4" />

          {/* Mobile menu button and avatar */}
          <div className="flex md:hidden items-center space-x-4">
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-8 h-8 rounded-full !bg-purple-600 flex items-center justify-center text-white text-sm"
                >
                  {auth.currentUser?.email?.[0].toUpperCase() || 'U'}
                </button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 !bg-white rounded-lg shadow-xl py-2 z-50"
                    >
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-red-700 hover:!bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="!text-yellow-600 hover:!text-yellow-500 !bg-white md:hidden outline-none focus:outline-none p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed left-0 right-0 top-16 !bg-white shadow-lg z-40"
          >
            <div className="px-4 py-4 space-y-3">
              <NavLinks className="flex flex-col space-y-3" />
              {!isAuthenticated && (
                <div className="pt-3 border-t !bg-white border-yellow-100">
                  <AuthButtons className="flex flex-col space-y-3" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
