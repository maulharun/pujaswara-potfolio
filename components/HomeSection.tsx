"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <motion.section id="home" className="py-32 px-6 bg-gray-200 text-center flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <h2 className="text-5xl font-bold text-indigo-600"> Hi, I&apos;m Puja Swara</h2>
      <p className="mt-6 text-2xl text-gray-700 max-w-2xl">
        A passionate Data Analyst who transforms raw data into actionable insights.
      </p>
    </motion.section>
  );
}
