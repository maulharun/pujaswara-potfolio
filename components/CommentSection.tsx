'use client';

import { useState, useEffect } from 'react';
import { saveComment, getAllComments } from '@/lib/firebase'; // ⬅️ import yang baru

type CommentType = {
  name: string;
  text: string;
  rating: number;
};

export default function CommentSection() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const fetchComments = async () => {
    const data = await getAllComments();
    setComments(data as CommentType[]);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveComment(name, text, rating);
    await fetchComments();
    setName('');
    setText('');
    setRating(5);
  };

  return (
    <div id="commentSection" className="max-w-2xl mx-auto p-4"> {/* ⬅️ Tambah id disini */}
      <h2 className="text-2xl font-bold mb-4 text-center">Leave a Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6 mb-8">
        <input
          className="w-full border border-gray-300 rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your Comment"
          required
        />
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={rating}
          min="1"
          max="5"
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Post Comment
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <ul className="space-y-4">
        {comments.map((c, i) => (
          <li key={i} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-lg">{c.name}</strong>
              <span className="text-yellow-500">{'⭐'.repeat(c.rating)}</span>
            </div>
            <p className="text-gray-700">{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
