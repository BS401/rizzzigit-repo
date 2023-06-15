<script lang="ts">
	import { Client } from "adswebsitewrapper";
	import { onMount } from "svelte";

  let pictures: string[] = []
  let element: HTMLImageElement

  onMount(async () => {
    const pictureId = Client.pathArray[1] ?? (await Client.getInstance().resources.pictures.list())[0].id
    if (pictureId == null) {
      return
    }

    const picture = await Client.getInstance().resources.pictures.get(pictureId)
    if (picture == null) {
      return
    }

    pictures = [(await picture.getFile()).rawUrl.toString()]
  })

  const open = () => window.open(element.src, '_blank')
</script>

<style>
  img {
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    max-height: 1080px;
    margin: 16px;

    object-fit: contain;

    box-shadow: 2px 2px 2px 2px #ffffff40;
    border: solid;
    border-color: #ffffff40;
    border-width: 1px;
  }

  img:hover {
    cursor: pointer;
  }
</style>

{#each pictures as picture}
  <img bind:this={element} alt="" class="mainPicture" src={picture} on:click={open} on:keypress={open}/>
{/each}
