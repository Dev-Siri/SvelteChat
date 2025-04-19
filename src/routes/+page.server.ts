import { redirect, type Actions } from "@sveltejs/kit";
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import jwtDecode from "jwt-decode";

import type { Message } from "../app";
import type { PageServerLoad } from "./$types";

import { firestore } from "../utils/firebase";

export interface User {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      "google.com": string[];
      email: string[];
    };
    sign_in_provider: string;
  };
}

export const actions: Actions = {
  async default({ cookies, request }) {
    const authToken = cookies.get("auth_token");

    if (!authToken) return;

    const user = jwtDecode<User>(authToken);
    const formData = await request.formData();
    const message = formData.get("message");

    if (!message || message instanceof Blob) return;

    const chatsCollection = collection(firestore, "messages");

    let picture = user.picture;
    const { user_id: uid } = user;

    if (user.firebase.sign_in_provider !== "google.com") {
      const docRef = doc(firestore, "users", uid);

      const docSnap = await getDoc(docRef);
      const userData = docSnap.data() as Pick<User, "name" | "picture">;

      picture = userData.picture;
    }

    addDoc(chatsCollection, {
      createdAt: new Date().toISOString(),
      text: message,
      picture,
      uid
    });
  }
};

export const load: PageServerLoad = async ({ cookies }) => {
  const authToken = cookies.get("auth_token");

  if (!authToken) throw redirect(307, "/auth");

  const user = jwtDecode<User>(authToken);

  const chatsCollection = collection(firestore, "messages");
  const querySort = orderBy("createdAt");
  const queryLimit = limit(25);
  const q = query(chatsCollection, querySort, queryLimit);

  const { docs } = await getDocs(q);
  const initialChats = docs.map((doc) => doc.data()) as Message[];

  if (user.firebase.sign_in_provider !== "google.com") {
    const docRef = doc(firestore, "users", user.user_id);

    const docSnap = await getDoc(docRef);
    const userData = docSnap.data() as Pick<User, "name" | "picture">;

    return {
      user: {
        ...user,
        ...userData
      },
      initialChats
    };
  }

  return {
    user,
    initialChats
  };
};
