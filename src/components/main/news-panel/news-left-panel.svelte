<script lang="ts">
	import { onMount } from "svelte";
	import { Client } from "../../../api/core/client";

  let newsJSON: string

  onMount(async () => {
    const newsId = Client.pathArray[1]
    const client = Client.getInstance()

    const news = await client.resources.news.get(newsId)
    newsJSON = JSON.stringify(news)
  })
</script>

<style>

</style>

<pre>{newsJSON}</pre>
