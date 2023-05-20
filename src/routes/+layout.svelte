<script lang="ts">
  import "../app.css";
</script>

<svelte:head>
  <title>SvelteChat</title>
  <meta name="description" content="A chat application made with Svelte & Firebase" />
  <meta name="og:title" content="SvelteChat" />
  <meta name="og:description" content="A chat application made with Svelte & Firebase" />
  <meta name="og:type" content="website" />
  <meta name="twitter:title" content="SvelteChat" />
  <meta name="twitter:description" content="A chat application made with Svelte & Firebase" />
  <meta name="twitter:card" content="large_summary_image" />
</svelte:head>

<main class="h-screen w-screen bg-dark-gray text-white">
  <slot />
</main>

<style lang="postcss">
  :global(*) {
    margin: 0;
    padding: 0;
    scrollbar-width: none;
    color-scheme: dark;
  }

  :global(*)::-webkit-scrollbar {
    display: none;
  }
</style>
