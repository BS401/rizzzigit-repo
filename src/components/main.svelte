<script lang="ts">
	import { page } from '$app/stores';

  import HomePanel from './main/home-panel.svelte';
	import LeftPanel from './main/left-panel.svelte';
	import RightPanel from './main/right-panel.svelte';
</script>

<div class="mainContainer">
  <div class="mainContent">
    {#if $page.url.pathname === "/"}
      <HomePanel></HomePanel>
    {:else}
      <LeftPanel></LeftPanel>
      <RightPanel></RightPanel>
    {/if}
  </div>
</div>
