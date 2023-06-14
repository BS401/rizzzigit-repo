<script lang="ts">
	import { page } from '$app/stores';

	import HomePanel from './main/home-panel.svelte';
	import RightPanel from './main/right-panel.svelte';
	import LeftPanel from './main/left-panel.svelte';
</script>

<div class="mainContainer">
	<div class="mainContent">
		{#if $page.url.pathname === '/'}
			<HomePanel />
		{:else}
			<RightPanel />
			<LeftPanel />
		{/if}
	</div>
</div>
