<script lang="ts">
  import { page } from '$app/stores';

  import HomePanel from './main/home-panel.svelte';
  import RightPanel from './main/right-panel.svelte';
  import LeftPanel from './main/left-panel.svelte';
  import ProgrammersPanel from './main/programmers-panel/programmers-panel.svelte';
	import MembersPanel from './main/members-panel/members-panel.svelte';
</script>

<style>

</style>

<div class="mainContainer">
  <div class="mainContent">
    {#if $page.url.pathname === '/'}
      <HomePanel />
    {:else if $page.url.pathname.startsWith('/programmers')}
      <ProgrammersPanel />
    {:else if $page.url.pathname.startsWith('/members')}
      <MembersPanel />
    {:else}
      <RightPanel />
      <LeftPanel />
    {/if}
  </div>
</div>
