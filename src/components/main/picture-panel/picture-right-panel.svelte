<script lang="ts">
	import { onMount } from "svelte";
	import PictureEntry from "./picture-entry.svelte";
	import { Client, type PictureResource } from "adswebsitewrapper";

  let pictureArray: [typeof PictureEntry, PictureResource][] = []
  let hasEnded: boolean = false

  let pictureContainer: HTMLDivElement
  let loader: HTMLDivElement

  const runScrollCheck = async (): Promise<void> => {
    while (!hasEnded) {
      if (pictureContainer.scrollTop >= (pictureContainer.scrollHeight - (pictureContainer.clientHeight * 2))) {
        addNewContent()
      }

      await new Promise<void>((resolve) => setTimeout(resolve, 1000))
    }

    loader.hidden = true
  }

  const addNewContent = async (): Promise<void> => {
    const interval = 10
    const { searchParams } = new URL(document.location.toString())
    const listOffset = (() => {
      const offset = Number(searchParams.get('listOffset'))
      if (Number.isNaN(offset)) {
        return 0
      }

      return offset
    })()

    const pictures = await Client.getInstance().resources.pictures.list(listOffset + pictureContainer.children.length - 1, interval)
    if (pictures.length < interval) {
      hasEnded = true
    }

    for (const pictureEntry of pictures) {
      pictureArray.push([PictureEntry, pictureEntry])
      pictureArray = pictureArray
    }
  }

  onMount(async () => {
    void runScrollCheck()
  })
</script>
<style>
  div.pictureContainer {
    width: calc(100% - 40px);
    height: calc(100% - 64px);

    box-sizing: border-box;

    overflow-y: auto;
    background-color: #ffffff40;

    border-radius: 8px;

    margin: 32px;
    margin-left: 8px;
  }

  @media only screen and (max-width: 720px) {
    div.pictureContainer {
      width: 100%;
      margin: 0px;
      border-radius: 0px;
    }
  }

  div.pictureContainer::-webkit-scrollbar {
    display: none;
  }

  div.loader {
    width: 100%;
  }

  div.loaderContainer {
    display: inline-block;
    margin-left: calc(calc(100% / 2) - 32px);
  }
</style>

<div bind:this={pictureContainer} class="pictureContainer">
  {#each pictureArray as [component, resource]}
    <svelte:component this={component} picture={resource}></svelte:component>
  {/each}
  <div bind:this={loader} class="loader">
    <div class="loaderContainer">
      <img src="/images/loader.svg" alt="loading" />
    </div>
  </div>
</div>
