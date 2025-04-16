"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RateMyWork() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [average, setAverage] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voteCount, setVoteCount] = useState(0); // Limit 2x

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ratings"), (snapshot) => {
      const ratings = snapshot.docs.map((doc) => doc.data().rating);
      const sum = ratings.reduce((a, b) => a + b, 0);
      setAverage(ratings.length ? sum / ratings.length : 0);
      setTotalVotes(ratings.length);
    });

    return () => unsub();
  }, []);

  const handleRating = async (value: number) => {
    if (voteCount >= 2) {
      alert("You have reached your 2 votes limit!");
      return;
    }
    try {
      await addDoc(collection(db, "ratings"), { rating: value });
      setVoteCount(voteCount + 1);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Rate My Work</h2>
      <div className="flex justify-center mb-4 space-x-2">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
          <motion.div
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star
              className={`h-10 w-10 cursor-pointer transition-colors ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => {
                setRating(star);
                handleRating(star);
              }}
              fill={(hover || rating) >= star ? "#FACC15" : "none"}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {rating > 0 && (
          <motion.p
            key="thank-you"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-green-500 font-semibold mb-2"
          >
            Thanks for rating!
          </motion.p>
        )}
      </AnimatePresence>

      <p className="text-gray-600">
        Rating: {average.toFixed(1)} ⭐ ({totalVotes} votes)
      </p>
    </div>
  );
}
