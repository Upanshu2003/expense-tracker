import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const CTASection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <div className="relative w-full py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are already managing their expenses smarter. 
            Start your journey to financial freedom today.
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-6 py-4 bg-white/10 border-2 border-purple-400/30 rounded-full text-white 
                placeholder-purple-300 
                focus:outline-none 
                focus:ring-4 
                focus:ring-purple-500/50 
                focus:border-purple-500 
                focus:bg-white/20
                transition-all duration-300 ease-in-out"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 group-focus-within:opacity-20 -z-10 transition-opacity duration-300"></div>
            </div>
            <button className="whitespace-nowrap px-8 py-4 
              bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 
              bg-size-200 bg-pos-0 hover:bg-pos-100
              rounded-full text-white font-semibold text-lg 
              transform-gpu
              transition-all duration-1000 ease-out
              hover:scale-110 hover:-translate-y-1
              hover:shadow-2xl hover:shadow-purple-500/30 
              active:scale-95 active:duration-150"
            >
              Get Started Free
            </button>
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-8 text-purple-200"
            initial={{ opacity: 0 }}
            whileInView={() => {
              if (!hasAnimated) setHasAnimated(true);
              return { opacity: 1 };
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {hasAnimated && <CountUp end={10} suffix="K+" duration={2} />}
                {!hasAnimated && "0"}
              </span>
              <span className="text-purple-300">Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {hasAnimated && <CountUp end={99} suffix="%" duration={2} />}
                {!hasAnimated && "0%"}
              </span>
              <span className="text-purple-300">Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">24x7</span>
              <span className="text-purple-300">Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
