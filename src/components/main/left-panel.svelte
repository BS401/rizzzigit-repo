<script lang="ts">
	import { SvelteComponent, onMount } from "svelte";
	import NewsLeftPanel from "./news-panel/news-left-panel.svelte";
	import { Client } from "../../api/core/client";

  let component: typeof SvelteComponent

  onMount(async () => {
    switch (Client.pathArray[0]) {
      case 'news':
        component = NewsLeftPanel
    }
  })
</script>

<div class="mainPanel mainLeftPanel">
  <svelte:component this={component}></svelte:component>
</div>
