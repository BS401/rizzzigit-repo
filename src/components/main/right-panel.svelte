<script lang="ts">
	import { SvelteComponent, onMount } from "svelte";
	import NewsRightPanel from "./news-panel/news-right-panel.svelte";
	import PictureRightPanel from "./picture-panel/picture-right-panel.svelte";
	import { Client } from "adswebsitewrapper";

  let component: typeof SvelteComponent

  onMount(async () => {
    switch (Client.pathArray[0]) {
      case 'news':
        component = NewsRightPanel
        break

      case 'pictures':
        component = PictureRightPanel
        break
    }
  })
</script>

<div class="mainPanel mainRightPanel">
  <svelte:component this={component}></svelte:component>
</div>
