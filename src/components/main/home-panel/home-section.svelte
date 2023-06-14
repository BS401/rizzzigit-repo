<script lang="ts">
	import { SvelteComponent, onMount } from "svelte";
	import { Client } from "../../../api/core/client";
	import NewsComponent from "./content/news-component.svelte";
	import PictureComponent from "./content/picture-component.svelte";

  type Functions = {
    list: (offset: number, length: number) => Promise<[typeof SvelteComponent, any][]>
  }

  export let type: 'News' | 'Pictures'

  let element: HTMLDivElement
  let previousButton: HTMLButtonElement
  let nextButton: HTMLButtonElement
  let seeAllButton: HTMLButtonElement
  let body: HTMLDivElement
  let loader: HTMLDivElement
  let loaderImage: HTMLImageElement

  const seeAllButtonClicked = () => {
    window.open(`/${type.toLowerCase()}`, '_top')
  }

  const nextButtonClicked = async () => {
    const increment = body.clientWidth / 25

    const start = body.scrollLeft
    while (
      (body.scrollLeft < (body.scrollWidth - body.clientWidth)) &&
      (body.scrollLeft < (start + body.clientWidth))
    ) {
      body.scrollBy({
        left: increment
      })

      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
  }

  const previousButtonClicked = async () => {
    const decrement = body.clientWidth / 25

    const start = body.scrollLeft
    while (
      (body.scrollLeft > 0) &&
      (body.scrollLeft > (start - body.clientWidth))
    ) {
      body.scrollBy({
        left: -decrement
      })
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
  }

  const setupNews = async (client: Client): Promise<Functions> => ({
    list: async (offset, length) => {
      return (await client.resources.news.list(offset, length) as any[]).map((entry) => [NewsComponent, entry])
    }
  })

  const setupPictures = async (client: Client): Promise<Functions> => ({
    list: async (offset, length) => {
      return (await client.resources.pictures.list(offset, length) as any[]).map((entry) => [PictureComponent, entry])
    }
  })

  let functions: Functions
  let components: [typeof SvelteComponent, any][] = []

  let hasEnded = false
  const addNewContent = async (): Promise<void> => {
    loaderImage.hidden = false
    const output = await functions.list(body.children.length - 1, 10)
    loaderImage.hidden = true
    if (output.length < 10) {
      hasEnded = true
    }

    for (const entry of output) {
      components.push(entry)
    }
    components = components
  }

  onMount(async () => {
    const client: Client = Client.getInstance()

    functions = await (async () => {
      switch (type) {
        case 'News': return await setupNews(client)
        case 'Pictures': return await setupPictures(client)
        default: throw new Error(`Unknown page: ${type}`)
      }
    })()

    const runChecker = async (): Promise<void> => {
      while (!hasEnded) {
        if ((body.scrollLeft + body.clientWidth) >= loader.offsetLeft) {
          await addNewContent()
        }

        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      loader.hidden = true
    }

    void runChecker()
  })
</script>

<style>
  div.section {
    height: 300px;
    margin: 32px;

    border: solid;
    border-color: transparent;
    border-radius: 8px;

    padding: 16px;
  }

  div.sectionHeader {
    float: left;

    padding: 8px 0px 0px 0px;
    width: 30%;
  }

  div.sectionHeader > h1 {
    margin-top: 0px;
  }

  div.sectionArrows {
    float: right;
  }

  div.sectionBody {
    display: flex;
    background-color: white;

    width: 100%;
    height: calc(100% - 64px);
    overflow-x: auto;
    box-sizing: border-box;

    margin-top: 64px;
    border-radius: 8px;
    border: solid;
    border-width: 1px;
    border-color: #ffffff40;
    background-color: #7a589fff;

    box-shadow: 2px 2px 2px 2px #ffffff40;
  }

  div.sectionBody::-webkit-scrollbar {
    display: none;
  }

  div.sectionContent {
    height: 100%;
    width: 256px;

    flex: 0 0 256px;
  }

  div.sectionEntry:hover {
    text-decoration: underline;
    text-shadow: 2px 2px 2px #ffffff80;

    cursor: pointer;
  }

  div.sectionLoader {
    width: 72px;
    flex: 0 0 128px;
  }

  @media only screen and (max-width: 720px) {
    div.section {
      border: none;
      border-top: solid;
      border-top-width: 1px;
      margin: 0px;
    }

    div.section {
      border-radius: 0px;
    }

    div.sectionArrows > button:nth-child(1), div.sectionArrows > button:nth-child(2) {
      display: none;
    }
  }

  div.loaderImageFlexContainer {
    width: 100%;
    height: 100%;

    display: flex;

    align-items: center;
    justify-content: center;
  }

  div.loaderImageContainer {
    width: 64px;
    height: 64px;
  }

  img.loaderImage {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={element} class="section section-{type.toLowerCase()}">
  <div class="sectionHeader"><h1>{type}</h1></div>
  <div class="sectionArrows">
    <button bind:this={previousButton} on:click={() => previousButtonClicked()}>&lt;</button>
    <button bind:this={nextButton} on:click={() => nextButtonClicked()}>&gt;</button>
    <button bind:this={seeAllButton} on:click={() => seeAllButtonClicked()}>See All</button>
  </div>
  <div bind:this={body} class="sectionBody">
    {#each components as [component, data]}
      <div class="sectionContent sectionEntry">
        <svelte:component this={component} data={data}></svelte:component>
      </div>
    {/each}
    <div bind:this={loader} class="sectionContent sectionLoader">
      <div class="loaderImageFlexContainer">
        <div class="loaderImageContainer">
          <img hidden bind:this={loaderImage} class="loaderImage" src="/images/loader.svg" alt="Loader"/>
        </div>
      </div>
    </div>
  </div>
</div>
