<script lang="ts">
	import { Client, FileResource, NewsContentType, type NewsImageContent, NewsResource, PictureResource, type NewsContentResolvable } from "adswebsitewrapper";
	import { onMount } from "svelte";

  let news: Array<NewsResource> | null = []
  let thumbnail: string

  onMount(async () => {
    const newsId = Client.pathArray[1]
    if (newsId == null) {
      news = null
      return
    }

    const client = Client.getInstance()

    news = [await client.resources.news.get(newsId)] as [NewsResource]
    thumbnail = ((await (await news[0].getThumbnail()).getFile()).rawUrl).toString()
  })

  const getPictureUrl = async (content: NewsContentResolvable): Promise<string> => {
    const client = Client.getInstance()

    const picture = await client.resources.pictures.get((content as NewsImageContent).pictureId) as PictureResource
    const file = await client.resources.files.get(picture.fileId) as FileResource

    return file.rawUrl.toString()
  }

  const openPicture = async (content: NewsContentResolvable) => window.open(`/pictures/${(content as NewsImageContent).pictureId}`, '_blank')
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

  img.imageContent:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 720px) {
    div.newsEntry {
      width: 100%;
      margin: 0px;
      border-radius: 0px;
    }
  }
</style>

{#if news != null}
  {#each news as entry}
    <div class="newsEntry">
      <img class="newsThumbnail" alt="" src={thumbnail} />
      <div class="newsContent">
        <h1>{entry.title}</h1>
        {#each entry.contents as content}
          {#if content.contentType === NewsContentType.Text}
            <p class="textContent">{content.content}</p>

          {:else if content.contentType === NewsContentType.Image}
            {#await getPictureUrl(content) then url}
              <img class="imageContent" alt="" on:click={() => openPicture(content)} on:keypress={() => openPicture(content)} src={url}/>
            {/await}
          {:else if content.contentType === NewsContentType.Link}
            <a href={content.link}>{content.name}</a>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
{:else}
  <div class="newsEntry">
    <h1>Click any article {#if document.documentElement.clientWidth > 720}
      on the right slide
    {:else}
      below
    {/if} to view.</h1>
  </div>
{/if}
