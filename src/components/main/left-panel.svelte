<script lang="ts">
	import { SvelteComponent, onMount } from "svelte";
	import NewsLeftPanel from "./news-panel/news-left-panel.svelte";
	import PictureLeftPanel from "./picture-panel/picture-left-panel.svelte";
	import { Client } from "adswebsitewrapper";

  let component: typeof SvelteComponent

  onMount(async () => {
    switch (Client.pathArray[0]) {
      case 'news':
        component = NewsLeftPanel
        break

      case 'pictures':
        component = PictureLeftPanel
        break
    }
  })
</script>

<div class="mainPanel mainLeftPanel">
  <svelte:component this={component}></svelte:component>
</div>
