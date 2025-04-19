<script lang="ts">
  import type { User } from "../routes/+page.server";

  export let createdAt: string;
  export let picture: string;
  export let text: string;
  export let uid: string;
  export let user: User;

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat();

    return formatter.format(date);
  }
</script>

<div class="flex flex-col mr-2 mt-4">
  <article class="items-center w-fit flex" class:ml-auto={uid === user.user_id}>
    {#if uid !== user.user_id}
      <img src={picture} alt="message-user" height="30" width="30" class="rounded-full" />
    {/if}
    <section class={`px-4 py-2 ml-2 rounded-full ${uid === user.user_id ? "bg-blue-600" : "bg-gray-700"}`}>
      <p>
        {text}
      </p>
    </section>
    {#if uid === user.user_id}
      <img src={picture} alt="message-user" height="30" width="30" class="rounded-full ml-4" />
    {/if}
  </article>
  <time class="text-gray-400 text-sm mt-2 ml-2" class:ml-auto={uid === user.user_id} datetime={createdAt}>{formatTime(createdAt)}</time>
</div>
