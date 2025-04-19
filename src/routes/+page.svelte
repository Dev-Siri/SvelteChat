<script lang="ts">
  import { enhance } from "$app/forms";
  import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import ChatMessage from "../components/ChatMessage.svelte";
  import { firestore } from "../utils/firebase";

  import type { Message } from "../app";

  export let data;
  let chats: Message[] = data.initialChats;

  const logout = async () => {
    await fetch("/logout", { method: "POST" });
    goto("/auth");
  };

  onMount(() => {
    const chatsCollection = collection(firestore, "messages");
    const querySort = orderBy("createdAt");
    const queryLimit = limit(25);
    const q = query(chatsCollection, querySort, queryLimit);

    const unsubscribe = onSnapshot(q, (snapshot) => (chats = snapshot.docs.map((doc) => doc.data() as Message)));

    return unsubscribe;
  });
</script>

<header class="p-4 flex items-center border-b-2 border-b-gray-800">
  <img src="/favicon.png" alt="SvelteChat" height="40" width="40" />
  <h1 class="ml-2 text-2xl font-bold">SvelteChat</h1>
  <button on:click={logout} class="ml-auto mr-2 font-bold">Log out</button>
  <img src={data.user?.picture} alt="User Profile" height="40" width="40" class="rounded-full" />
</header>
<aside class="p-4 h-[81%] overflow-y-auto">
  {#each chats as chat}
    <ChatMessage {...chat} user={data.user} />
  {/each}
</aside>
<form method="POST" action="/" class="flex" use:enhance>
  <input type="text" name="message" placeholder="Message" class="flex-[3] p-3 bg-gray-800 outline-none" />
  <button type="submit" class="bg-blue-500 hover:bg-blue-600 duration-200 px-5">Send</button>
</form>
