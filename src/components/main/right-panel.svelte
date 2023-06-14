<script lang="ts">
	import { SvelteComponent, onMount } from "svelte";
	import NewsRightPanel from "./news-panel/news-right-panel.svelte";
	import { Client } from "../../api/core/client";

  let component: typeof SvelteComponent

  onMount(async () => {
    switch (Client.pathArray[0]) {
      case 'news':
        component = NewsRightPanel
    }
  })
</script>

<div class="mainPanel mainRightPanel">
  <svelte:component this={component}></svelte:component>
</div>
