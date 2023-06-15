<script lang="ts">
	import type { PictureResource } from "adswebsitewrapper";
	import { onMount } from "svelte";

  export let picture: PictureResource
  let url: string

  onMount(async () => {
    url = (await picture.getFile()).rawUrl.toString()
  })

  const open = () => (document.querySelector('img.mainPicture') as HTMLImageElement).src = url
</script>

<style>
  img {
    width: calc(50% - 16px);
    height: 150px;
    margin: 8px;

    object-fit: cover;

    box-shadow: 2px 2px 2px 2px #ffffff40;

    display: inline;
  }

  img:hover {
    cursor: pointer;
    box-shadow: 2px 2px 2px 2px #ffffff80;
  }
</style>

<img alt="" on:click={open} on:keypress={open} src={url}/>
