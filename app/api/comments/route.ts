import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Handle GET request (ambil semua komentar)
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'comments'));
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ comments: [] });
  }
}

// Handle POST request (tambah komentar baru)
export async function POST(req: Request) {
  try {
    const { name, text, rating } = await req.json();

    const docRef = await addDoc(collection(db, 'comments'), {
      name,
      text,
      rating,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
