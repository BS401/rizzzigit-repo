<script lang="ts">
	import { onMount } from "svelte";
	import type { PictureResource } from "../../../../api/resource/data/picture";

  export let data: PictureResource
  let image: HTMLDivElement

  onMount(async () => {
    image.style.backgroundImage = `url(${(await data.getFile()).rawUrl})`
  })

  const open = () => window.open(`/pictures/${data.id}`, '_top')
</script>

<style>
  div.pictureContent {
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    padding: 16px;
  }

  div.image {
    width: 100%;
    height: 100%;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    box-shadow: 2px 2px 2px 2px #ffffff40;
  }
</style>

<div class="pictureContent" on:click={() => open()} on:keypress={() => open()}>
  <div class="image" bind:this={image}></div>
</div>
