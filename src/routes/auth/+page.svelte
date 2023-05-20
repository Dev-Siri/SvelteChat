<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { Circle } from "svelte-loading-spinners";

  let isSignup = true;
  let loading = false;
  let errorOccured = false;

  const switchModes = () => (isSignup = !isSignup);

  async function googleSignin() {
    const { auth } = await import("../../utils/firebase");
    const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");

    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);
      const authToken = await user.getIdToken();

      const expireDate = new Date(9999, 0, 1).toUTCString();

      document.cookie = `auth_token=${authToken};expires=${expireDate};path=/`;
      goto("/");
    } catch (error) {
      console.error(error);
      errorOccured = true;
    }
  }
</script>

<article class="flex flex-col items-center justify-center h-screen">
  <h1 class="font-bold text-4xl px-4 text-center sm:text-5xl pt-10 mb-4">Welcome to SvelteChat!</h1>
  <h2 class="font-semibold my-5 text-2xl p-4 text-center w-11/12 sm:w-fit rounded-md bg-semi-dark-gray">
    {isSignup ? "Signup to join the community!" : "Welcome back! Login to proceed."}
  </h2>
  <p class="rounded-md bg-semi-dark-gray p-4">
    {isSignup ? "Already have an account? " : "Don't have an account? "}
    <span class="text-blue-400 cursor-pointer" on:click={switchModes} on:keydown={switchModes}>
      {isSignup ? "Login" : "Signup"}
    </span>
  </p>
  <form
    method="POST"
    action={isSignup ? "?/signup" : "?/login"}
    class="m-4 p-5 shadow-md bg-semi-dark-gray rounded-md w-11/12 sm:w-3/4 lg:w-1/2"
    use:enhance={() => {
      loading = true;
    }}
  >
    {#if isSignup}
      <input type="text" name="username" placeholder="Username" required />
    {/if}
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    {#if isSignup}
      <input type="file" name="image" required />
    {/if}
    {#if errorOccured}
      <p class="text-red-600 text-center my-4">
        An error occured while trying to {isSignup ? "create your account." : "log you in."}
      </p>
    {/if}
    <div class="flex flex-col sm:flex-row mt-4 gap-4">
      <button type="button" on:click={googleSignin} class="bg-black w-full rounded-md p-3 flex items-center justify-center gap-2">
        <img src="/images/google.webp" alt="Google Icon" height="20" width="20" />
        Sign in with Google
      </button>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 duration-200 justify-center gap-2 flex w-full rounded-md p-3">
        {isSignup ? "Signup" : "Login"}
        {#if loading}
          <Circle size="25" color="white" />
        {/if}
      </button>
    </div>
  </form>
</article>

<style lang="postcss">
  input {
    @apply bg-[#121212] w-full p-3 outline-none;
  }
  input:first-of-type {
    @apply rounded-t-md;
  }
  input:last-of-type {
    @apply rounded-b-md;
  }
</style>
