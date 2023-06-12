<script lang="ts">
	import { Client } from "../../../api/core/client";

  type Functions = {
    list: (offset: number, length: number) => Promise<HTMLDivElement[]>
  }

  export let type: 'News' | 'Discography' | 'Photos'

  let element: HTMLDivElement
  let previousButton: HTMLButtonElement
  let nextButton: HTMLButtonElement
  let body: HTMLDivElement

  const setupNews = async (client: Client): Promise<Functions> => ({
    list: async (offset, length) => {
      return []
    }
  })

  const setupDiscography = async (client: Client): Promise<Functions> => ({
    list: async (offset, length) => {
      return []
    }
  })

  const setupPhotos = async (client: Client): Promise<Functions> => ({
    list: async (offset, length) => {
      return []
    }
  })

  const run = async () => {
    const client: Client = Client.getInstance()
    let currentOffset = 0
    let hasEnded = 0

    switch (type) {
      case 'News':
        void setupNews(client)
        break

      case 'Discography':
        void setupDiscography(client)
        break

      case 'Photos':
        void setupPhotos(client)
        break
    }
  }
</script>

<style>
  div.section {
    height: 300px;
    margin: 32px;

    border: solid;
    border-radius: 8px;

    padding: 16px;
  }

  div.sectionHeader {
    float: left;

    padding: 8px 0px 0px 0px;
  }

  div.sectionHeader > h1 {
    margin-top: 0px;
  }

  div.sectionArrows {
    float: right;
  }

  div.sectionBody {
    background-color: white;

    height: calc(100% - 64px);

    margin-top: 64px;
  }

  @media only screen and (max-width: 720px) {
    div.section {
      border: none;
      border-top: solid;
      margin: 0px;
    }

    div.section {
      border-radius: 0px;
    }
  }
</style>

<div bind:this={element} class="section section-{type.toLowerCase()}" on:load={void run()}>
  <div class="sectionHeader"><h1>{type}</h1></div>
  <div class="sectionArrows">
    <button bind:this={previousButton}>Previous</button>
    <button bind:this={nextButton}>Next</button>
  </div>
  <div bind:this={body} class="sectionBody"></div>
</div>
