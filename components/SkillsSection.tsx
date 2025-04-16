"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaDatabase, FaChartLine } from "react-icons/fa";

export default function SkillsSection() {
  const skills = [
    { icon: <FaReact />, title: "React", desc: "Modern web applications" },
    { icon: <FaPython />, title: "Python", desc: "Data analysis & ML" },
    { icon: <FaDatabase />, title: "SQL", desc: "Database management" },
    { icon: <FaChartLine />, title: "Data Visualization", desc: "Power BI & Tableau" },
  ];

  return (
    <motion.section
      id="skills"
      className="py-16 px-6 text-center bg-indigo-100 dark:bg-gray-900 transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-semibold text-indigo-600 dark:text-blue-400">Skills</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg transition-colors duration-500"
            whileInView={{ opacity: 1, scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-indigo-600 dark:text-blue-400 text-3xl mb-4">{skill.icon}</div>
            <h3 className="font-semibold text-lg dark:text-white">{skill.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
