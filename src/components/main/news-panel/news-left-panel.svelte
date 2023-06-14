<script lang="ts">
	import { onMount } from "svelte";
	import { Client } from "../../../api/core/client";
	import { NewsContentType, type NewsResource } from "../../../api/resource/data/news";

  let news: Array<NewsResource> = []
  let thumbnail: string

  onMount(async () => {
    const newsId = Client.pathArray[1] || ((await Client.getInstance().resources.news.list())[0].id)
    if (newsId == null) {
      return
    }
    const client = Client.getInstance()

    news = [await client.resources.news.get(newsId)]
    thumbnail = (await news[0].getThumbnail()).rawUrl.toString()
  })
</script>

<style>
  div.newsEntry {
    margin: 32px;
    margin-right: 8px;

    height: calc(100% - 64px);
    overflow-y: auto;

    background-color: #ffffff40;
    border-radius: 8px;
  }
  div.newsEntry::-webkit-scrollbar {
    display: none;
  }

  img.newsThumbnail {
    width: 100%;
    border-radius: 8px 8px 0px 0px;
  }

  div.newsContent {
    padding: 16px;
  }

  h1 {
    text-align: center;
  }

  p.textContent {
    text-align: center;
  }

  @media only screen and (max-width: 720px) {
    div.newsEntry {
      width: 100%;
      margin: 0px;
      border-radius: 0px;
    }
  }
</style>

{#each news as entry}
  <div class="newsEntry">
    <img class="newsThumbnail" alt="" src={thumbnail}/>
    <div class="newsContent">
      <h1>{entry.title}</h1>
      {#each entry.contents as content}
        {#if content.contentType === NewsContentType.Text}
          <p class="textContent">{content.content}</p>

        {:else if content.contentType === NewsContentType.Image}
          <img alt="" src={content.url}/>

        {:else if content.contentType === NewsContentType.Link}
          <a href={content.link}>{content.name}</a>
        {/if}
      {/each}
    </div>
  </div>
{/each}
