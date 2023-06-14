<script lang="ts">
	import { onMount } from "svelte";
	import type { NewsResource } from "../../../api/resource/data/news";

  export let news: NewsResource
  let element: HTMLDivElement
  let thumbnailUrl: string

  onMount(async () => {
    const thumbnail = await news.getThumbnail()

    thumbnailUrl = thumbnail.rawUrl.toString()
  })

  const open = () => window.open(`/news/${news.id}`, '_top')
</script>

<style>
  div.newsEntry {
    margin: 16px;
  }

  div.newsImage {
    width: 100%;
  }

  div.newsImage > img {
    width: 100%;
    height: 192px;

    object-fit: cover;

    box-shadow: 2px 2px 2px 2px #ffffff40;
  }

  p.newsTitle {
    text-shadow: 2px 2px 2px #ffffff40;
  }

  div.newsEntry:hover p.newsTitle {
    text-shadow: 2px 2px 2px #ffffff80;
    text-decoration: underline;
  }

  div.newsEntry:hover {
    cursor: pointer;
  }
</style>

<div bind:this={element} class="newsEntry" on:click={() => open()} on:keypress={() => open()}>
  <div class="newsImage">
    <img src={thumbnailUrl} alt=""/>
  </div>
  <div class="newsTitleContainer">
    <p class="newsTitle"><b>{news.title}</b></p>
  </div>
</div>
