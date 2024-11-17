import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAh0lyWxPQW7SLwMncW276ESrCWfT1tB8o",
  authDomain: "van-life-4281f.firebaseapp.com",
  projectId: "van-life-4281f",
  storageBucket: "van-life-4281f.firebasestorage.app",
  messagingSenderId: "938702120406",
  appId: "1:938702120406:web:15f522e6c279ef86e67077",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}
const userCollectionRef = collection(db, "users");

export async function loginUser(creds) {
  try {
    // Fetch all users from the Firestore collection
    const snapshot = await getDocs(userCollectionRef);
    const users = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Find a user that matches the credentials
    const user = users.find(
      (u) => u.email === creds.email && u.password === creds.password
    );

    if (!user) {
      throw {
        message: "No users exists with these credentials",
        statusText: "Unauthorized",
        status: 401,
      };
    }

    // Simulate the same data structure returned by the API
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (err) {
    // Throw an error object
    throw {
      message: err.message || "An error occurred",
      statusText: err.statusText || "Internal Server Error",
      status: err.status || 500,
    };
  }
}
