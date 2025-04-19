# SvelteChat

A fullstack Chat Application made with Firebase (for Authentication, Storage & Firestore) & SvelteKit!

I made this to try out SvelteKit.

## Technologies

- Svelte (With SvelteKit)
- Firebase
  - Firestore
  - Authentication
  - File Storage

## Getting Started

- Clone the repository

```sh
$ git clone https://github.com/Dev-Siri/SvelteChat.git
```

- Install dependencies

```sh
$ pnpm i
```

- Replace My Firebase credentials with your project's ones

**_src/utils/firebase.ts_**

```diff
import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
-  apiKey: "AIzaSyCG5ki4aFqZOXwCPGef5imnHs83bufe15o",
-  authDomain: "svelte-chat-96ddb.firebaseapp.com",
-  projectId: "svelte-chat-96ddb",
-  storageBucket: "svelte-chat-96ddb.appspot.com",
-  messagingSenderId: "990985000156",
-  appId: "1:990985000156:web:207119297772b991a61019"
+  apiKey: "your apiKey",
+  authDomain: "your authDomain",
+  projectId: "your projectId",
+  storageBucket: "your storageBucket URL",
+  messagingSenderId: "your messagingSenderId",
+  appId: "your appID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

```

- Run development server

```sh
$ pnpm dev
```

## Deployment

This project is deployed on Vercel.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dev-Siri/SvelteChat)

## License

This project is MIT Licensed, see [LICENSE.md](LICENSE.md)
