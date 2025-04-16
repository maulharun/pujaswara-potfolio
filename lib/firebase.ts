import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBi-vlhXJQB9D70xPoXDUxYc0oMNfdHIj0",
  authDomain: "comment-7973f.firebaseapp.com",
  projectId: "comment-7973f",
  storageBucket: "comment-7973f.appspot.com",
  messagingSenderId: "259487154301",
  appId: "1:259487154301:web:77e34e2df8bfe798e63114",
  measurementId: "G-6E3CL6W17R"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Define the CommentType
type CommentType = {
  id: string;
  name: string;
  text: string;
  rating: number;
  createdAt: Date;
};

// Save a comment to Firestore
async function saveComment(name: string, text: string, rating: number) {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      name,
      text,
      rating,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Real-time listener for comments
function subscribeToComments(callback: (comments: CommentType[]) => void) {
  const unsubscribe = onSnapshot(collection(db, "comments"), (querySnapshot) => {
    const comments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      text: doc.data().text,
      rating: doc.data().rating,
      createdAt: doc.data().createdAt.toDate() // Convert to Date object if needed
    }));
    callback(comments);
  });
  return unsubscribe; // Return the unsubscribe function for cleanup
}

// Export db and helper functions
export { db, saveComment, subscribeToComments };
