<script lang="ts">
  import { Client } from 'adswebsitewrapper';
  import { onMount } from 'svelte';
	import AdminPanel from './admin/admin-panel.svelte';
	import LoginPanel from './admin/login-panel.svelte';

  let loggedIn: boolean | null = null

  const check = async () => {
    loggedIn = await Client.getInstance().resources.authentication.isAuthorized()
  }

  onMount(async () => {
    Client.getInstance().on('authChange', async () => {
      await check()
    })

    await check()
  });
</script>

{#if loggedIn == true}
  <AdminPanel/>
{:else if loggedIn == false}
  <LoginPanel/>
{/if}
