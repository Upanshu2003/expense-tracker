import { motion } from 'framer-motion';

const DashboardCTA = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full p-8 my-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ x: -30 }}
          animate={{ x: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Smart Money Management
        </motion.h2>
        
        <motion.div 
          className="flex justify-center gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="text-5xl mb-3">💰</div>
            <p className="text-white font-medium">Track Expenses</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="text-5xl mb-3">📊</div>
            <p className="text-white font-medium">View Analytics</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="text-5xl mb-3">🎯</div>
            <p className="text-white font-medium">Set Goals</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardCTA;
