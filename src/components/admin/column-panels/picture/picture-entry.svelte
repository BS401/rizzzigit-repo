<script lang="ts">
	import type { PictureResource } from "adswebsitewrapper";
	import { onMount } from "svelte";

  export let picture: PictureResource
  export let onRemove: () => void
  let image: HTMLImageElement

  const getPictureUrl = async (picture: PictureResource) => {
    const file = await picture.getFile()

    return file.rawUrl.toString()
  }

  const open = () => window.open(`/pictures/${picture.id}`, '_blank')

  const menu = async () => {
    if (confirm("Do you want to delete this picture?")) {
      await (await picture.getFile()).delete()
      await picture.delete()

      onRemove()
    }
  }

  onMount(async () => {
    // image.src = (await picture.getFile()).rawUrl.toString()
  })
</script>

<style>
  img {
    width: 128px;
    height: 128px;

    object-fit: cover;

    margin: 4px;

    border: solid;
    border-color: #00000000;
    border-width: 1px;
  }

  img:hover {
    cursor: pointer;
    border-color: white;
  }
</style>

{#await getPictureUrl(picture)}
  <img src="/images/loader.svg" on:contextmenu|preventDefault={menu} bind:this={image} on:click={open} on:keypress={open} alt="" class="" />
{:then asd}
  <img src={asd} on:contextmenu|preventDefault={menu} bind:this={image} on:click={open} on:keypress={open} alt="" class="" />
{/await}
