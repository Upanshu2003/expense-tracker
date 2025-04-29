import React from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Image from '../../assets/rupee.png'; 

const Hero = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100 },
      size: { value: 2.5 },
      move: { enable: true, speed: 1 },
      links: { enable: true, color: "#ffffff", opacity: 0.2 },
      opacity: { value: 0.4 },
    },
    background: { color: "transparent" }
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 lg:mt-0 mt-12 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-20">
        
        {/* Text Side */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center md:text-left md:flex-[1.5]"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Track and Visualize Your <span className="text-pink-400">Expenses</span> Smartly
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300">
            Simplify your spending. Track, manage and optimize your finances effortlessly.
          </p>
          <button className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300">
            Track Your Expenses
          </button>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center md:justify-end md:flex-[0.8] mt-10 md:mt-0 md:pr-8"
        >
          <img
            src={Image}
            alt="Expense Tracker Illustration"
            className="w-64 md:w-72 lg:w-80 object-contain animate-bounce-slow"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
