import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Corrected import path
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "my-react-chatapp-38f38.firebaseapp.com",
  projectId: "my-react-chatapp-38f38",
  storageBucket: "my-react-chatapp-38f38.appspot.com",
  messagingSenderId: "870755423581",
  appId: "1:870755423581:web:a54a51d3e25444069304b4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);       // Pass app instance here
export const db = getFirestore(app);     // Pass app instance here
export const storage = getStorage(app);  // Pass app instance here