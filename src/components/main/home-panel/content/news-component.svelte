<script lang="ts">
  import type { NewsResource } from 'adswebsitewrapper'
	import { onMount } from "svelte";

  export let data: NewsResource
  let image: HTMLImageElement

  onMount(async () => {
    image.src = `${(await data.getThumbnail()).rawUrl}`
  })

  const open = () => window.open(`/news/${data.id}`, '_top')
</script>

<style>
  div.newsContent {
    height: 100%;
    width: 100%;

    box-sizing: border-box;

    padding: 16px;
  }

  div.image {
    height: calc(100% - 32px);

    box-shadow: 2px 2px 2px 2px #ffffff40;
    border-radius: 8px;
  }

  div.image > img {
    object-fit:cover;

    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  div.title > p {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<div class="newsContent" on:click={() => open()} on:keypress={() => open()}>
  <div class="image"><img alt="News Thumbnail" bind:this={image}/></div>
  <div class="title"><p><b>{data.title}</b></p></div>
</div>

<!-- <script lang="ts">
	import { onMount } from "svelte";
	import { NewsResource } from "../../../../api/resource/data/news";

  let content: HTMLDivElement
  let image: HTMLImageElement

  export let data: NewsResource

  const open = () => { window.open(`/news/${data.id}`, '_top') }

  onMount(async () => {
    if (data instanceof NewsResource) {
      image.src = (await data.getThumbnail()).rawUrl.toString()
    }
  })
</script>

<style>
    div.sectionContent {
      box-sizing: border-box;
      height: 100%;
      overflow-x: hidden;
      padding: 16px;
    }

    div.newsFlexContainer {
      height: 100%;
      width: 100%;
    }

    div.newsContent {
      width: 100%;
    }

    img.newsImage {
      width: 100%;

      object-fit: fill;

      margin: auto;
    }

    div.newsDescription > p {
      margin: 0px;

      text-align: center;
    }

    div.newsContent:hover {
      text-decoration: underline;

      cursor: pointer;

      text-shadow: 2px 2px 2px #ffffff80;
    }
</style>


<div bind:this={content} class="sectionContent">
  <div class="newsFlexContainer">
    <div class="newsContent" on:click={() => open()} on:keypress={() => open()}>
      <img class="newsImage" alt="News thumbnail" bind:this={image}/>
      <div class="newsDescription"><p><b>{data.title}</b></p></div>
    </div>
  </div>
</div> -->
