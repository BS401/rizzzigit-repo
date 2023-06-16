<script lang="ts">
  import { onMount } from "svelte";
  import NewsEntry from "./news-entry.svelte";
	import { Client, type NewsResource } from "adswebsitewrapper";
	import { page } from "$app/stores";

  let newsArray: Array<[typeof NewsEntry, NewsResource]> = []
  let hasEnded: boolean = false

  let newsContainer: HTMLDivElement
  let loader: HTMLDivElement

  const runScrollCheck = async (): Promise<void> => {
    while (!hasEnded) {
      if (newsContainer.scrollTop >= (newsContainer.scrollHeight - (newsContainer.clientHeight * 2))) {
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

    const news = await Client.getInstance().resources.news.list(listOffset + newsContainer.children.length - 1, interval)
    if (news.length < interval) {
      hasEnded = true
    }

    for (const newsEntry of news) {
      newsArray.push([NewsEntry, newsEntry])
      newsArray = newsArray
    }
  }

  onMount(async () => {
    void runScrollCheck()
  })
</script>

<style>
  div.newsContainer {
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
    div.newsContainer {
      width: 100%;
      margin: 0px;
      border-radius: 0px;
    }
  }

  div.newsContainer::-webkit-scrollbar {
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

<div bind:this={newsContainer} class="newsContainer">
  {#each newsArray as [component, resource]}
    <svelte:component this={component} news={resource} />
  {/each}
  <div bind:this={loader} class="loader">
    <div class="loaderContainer">
      <img src="/images/loader.svg" alt="loading" />
    </div>
  </div>
</div>
