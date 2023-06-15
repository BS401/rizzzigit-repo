<script lang="ts">
	import { Client, NewsContentType, NewsResource } from "adswebsitewrapper";
	import { onMount } from "svelte";

  let news: Array<NewsResource> = []
  let thumbnail: string

  onMount(async () => {
    const newsId = Client.pathArray[1] || ((await Client.getInstance().resources.news.list())[0].id)
    if (newsId == null) {
      return
    }
    const client = Client.getInstance()

    news = [await client.resources.news.get(newsId)] as [NewsResource]
    thumbnail = (await news[0].getThumbnail()).rawUrl.toString()
  })
</script>

<style>
  div.newsEntry {
    margin: 32px;
    margin-right: 8px;

    height: calc(100% - 64px);
    overflow-y: auto;

    border: solid;
    border-width: 1px;
    border-color: #ffffff40;
    box-sizing: border-box;
    border-radius: 8px;

    box-shadow: 2px 2px 2px #ffffff40;
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

  img.imageContent {
    width: 100%;
    height: 192px;

    object-fit: contain;
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
          <img class="imageContent" alt="" src={content.url}/>

        {:else if content.contentType === NewsContentType.Link}
          <a href={content.link}>{content.name}</a>
        {/if}
      {/each}
    </div>
  </div>
{/each}
