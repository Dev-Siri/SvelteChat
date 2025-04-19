import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { fail, redirect, type Actions } from "@sveltejs/kit";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { PageServerLoad } from "../$types";
import { auth, firestore, storage } from "../../utils/firebase";

export const actions: Actions = {
  async login({ request, cookies }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) return fail(400, { email, missing: true });
    if (!password) return fail(400, { password, missing: true });
    if (email instanceof Blob) return fail(400, { email, invalid: true });
    if (password instanceof Blob) return fail(400, { password, invalid: true });

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const authToken = await user.getIdToken();

    cookies.set("auth_token", authToken, {
      expires: new Date(9999, 0, 1)
    });
    throw redirect(301, "/");
  },
  async signup({ request, cookies }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const image = formData.get("image") as File | null;

    if (!email) return fail(400, { email, missing: true });
    if (!username) return fail(400, { username, missing: true });
    if (!password) return fail(400, { password, missing: true });
    if (!image) return fail(400, { image, missing: true });
    if (email instanceof Blob) return fail(400, { email, invalid: true });
    if (username instanceof Blob) return fail(400, { username, invalid: true });
    if (password instanceof Blob) return fail(400, { password, invalid: true });
    if (typeof image === "string") return fail(400, { image, invalid: true });

    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    const photoRef = ref(storage, `users/${crypto.randomUUID()}`);

    await uploadBytes(photoRef, await image.arrayBuffer(), { contentType: image.type });

    const photoURL = await getDownloadURL(photoRef);

    await updateProfile(user, {
      displayName: username,
      photoURL
    });

    const authToken = await user.getIdToken();

    const usersCollection = collection(firestore, "users");
    addDoc(usersCollection, {
      name: username,
      picture: photoURL
    });

    cookies.set("auth_token", authToken, {
      expires: new Date(9999, 0, 1)
    });
    throw redirect(301, "/");
  }
};

export const load: PageServerLoad = ({ cookies }) => {
  const authToken = cookies.get("auth_token");

  if (authToken) throw redirect(301, "/");
};
