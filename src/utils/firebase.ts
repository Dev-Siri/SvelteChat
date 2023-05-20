import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCG5ki4aFqZOXwCPGef5imnHs83bufe15o",
  authDomain: "svelte-chat-96ddb.firebaseapp.com",
  projectId: "svelte-chat-96ddb",
  storageBucket: "svelte-chat-96ddb.appspot.com",
  messagingSenderId: "990985000156",
  appId: "1:990985000156:web:207119297772b991a61019"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
