"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="py-16 px-6 bg-white dark:bg-gray-900 text-center flex flex-col items-center transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 transition-colors duration-500">
        About Me
      </h2>
      
      <motion.div
  className="mt-6 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-800 transition-all duration-500"
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  <div className="w-32 h-32 rounded-full overflow-hidden">
    <Image
      src="/puja2.jpg"
      alt="Your Photo"
      width={128}
      height={128}
      className="object-cover"
    />
  </div>
</motion.div>


      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-lg transition-colors duration-500">
        I am Puja Swara, a dedicated Data Analyst with a strong passion for uncovering insights from complex datasets.
      </p>
    </motion.section>
  );
}
