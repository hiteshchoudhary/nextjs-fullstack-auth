// components/ServiceCard.js
"use client"

import { motion } from 'framer-motion';

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }} // Scale up on hover
      className="rounded-lg p-4 bg-gray-800 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
    >
      <img
        src={service.image}
        alt={service.title}
        className="w-16 h-16 rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-white">{service.title}</h3>
      <p className="text-gray-400">{service.description}</p>
    </motion.div>
  );
};

export default ServiceCard;
