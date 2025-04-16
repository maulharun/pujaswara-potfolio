"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PortfolioSection() {
  const [openDetailIndex, setOpenDetailIndex] = useState<number | null>(null);

  const portfolios = [
    { 
      year: "2022",
      title: "Praktik Kerja Lapangan - PT. Indonetupne Net Manufacturing",
      desc: "Melaksanakan Praktik Kerja Industri (PRAKERIN) di bidang TKJ dengan predikat Sangat Baik.",
      detail: "Melaksanakan Praktik Kerja Industri (PRAKERIN) di PT. Indonetupne Net Manufacturing, berlokasi di Jl. Raya Rancaekek - Garut, Cangtuang, Rancaekek, Bandung. Praktik dilaksanakan dari 11 Mei 2022 sampai 11 Juli 2022 dengan predikat Sangat Baik. Kompetensi: Teknik Komputer dan Jaringan (TKJ).",
      image: "/pkl.jpg",
    },
    { 
      year: "2023",
      title: "Certificate of Appreciation - Teknik Komputer dan Jaringan",
      desc: "Awarded for successfully passing the competency test in Computer and Network Engineering with a 'Good' grade.",
      detail: "Received a Certificate of Appreciation from SMK Ma'arif Terpadu Cicalengka and VMT Software after passing the competency exam in the field of Computer and Network Engineering with a 'Good' predicate.",
      image: "/certificate-tkj.jpg",

    },
    { 
      year: "2024",
    title: "Toko Online Matcha Coffee",
    desc: "Developed an online store specializing in matcha coffee products.",
    detail: "Built a complete e-commerce platform for Matcha Coffee, including user authentication, product management, shopping cart, and order processing features.",
    image: "/TokoOnline.jpg",

    },
  ];

  const handleMoreDetails = (index: number) => {
    setOpenDetailIndex(openDetailIndex === index ? null : index);
  };

  return (
    <motion.section 
      id="portfolio" 
      className="py-16 px-6 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-12">Portfolio Timeline</h2>

      <div className="relative border-l-2 border-indigo-500 ml-4">
        {portfolios.map((item, index) => (
          <motion.div
            key={index}
            className="mb-12 ml-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-2 top-6"></div>
            
            <div className="bg-gray-100 p-6 rounded-md shadow-md hover:bg-indigo-100 transition group">
              <Image 
                src={item.image} 
                alt={item.title} 
                width={600} 
                height={400} 
                className="rounded-md mb-4 object-cover w-full h-48" 
              />
              <h3 className="text-xl font-semibold text-indigo-600">{item.title} <span className="text-sm text-gray-500 ml-2">{item.year}</span></h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>

              <button 
                onClick={() => handleMoreDetails(index)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                {openDetailIndex === index ? "Hide Details" : "More Details"}
              </button>

              {openDetailIndex === index && (
                <motion.div 
                  className="mt-6 bg-white p-4 rounded-lg border border-indigo-300 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    width={600}
                    height={400}
                    className="rounded-md mb-4 object-cover w-full h-64"
                  />
                  <p className="text-gray-700">{item.detail}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
