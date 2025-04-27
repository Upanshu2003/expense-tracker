import React, { useEffect, useRef } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function FeatureSection() {
  const featureRefs = useRef([]);

  const features = [
    { title: "Expense Tracking", description: "Easily log and track your daily expenses." },
    { title: "Category Insights", description: "Visualize spending by categories." },
    { title: "Monthly Reports", description: "Get clear monthly expense reports." },
  ];

  useEffect(() => {
    const currentRefs = featureRefs.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    }, { threshold: 0.1 });

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Particle background config
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 50 },
      size: { value: 2 },
      move: { enable: true, speed: 0.8 },
      links: { enable: true, color: "#a855f7", opacity: 0.3 },
      opacity: { value: 0.5 },
    },
    background: { color: "transparent" }
  };

  return (
    <div className="relative w-full min-h-fit py-32 px-6 md:px-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900">     
      <Particles
        id="tsparticles-features"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 max-w-7xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl border border-purple-800/50 shadow-2xl p-10">
        <h2 className="text-center text-4xl mb-14 font-bold text-purple-300">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="opacity-0 translate-y-8 p-6 
                bg-black/30 border border-purple-500 
                backdrop-blur-lg rounded-2xl 
                transform-gpu 
                transition-all duration-700 ease-out
                hover:scale-110 hover:border-purple-300 
                hover:shadow-xl hover:shadow-purple-500/40 
                hover:-translate-y-1"
            >
              <h3 className="text-xl mb-3 text-purple-200 font-semibold">{feature.title}</h3>
              <p className="text-purple-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
