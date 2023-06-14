<script lang="ts">
	import { onMount } from "svelte";
	import { Client } from "../../api/core/client";

  onMount(async () => {
    const client = Client.getInstance()
    const { resources } = client

    if (!await resources.authentication.isAuthorized()) {
      await resources.authentication.login('test', 'test')
    }
    await resources.authentication.login('test', 'test')
  })

  let fileChoose: HTMLInputElement

  const change = async () => {
    const { files } = fileChoose
    if (files == null) {
      return
    }

    const [file] = files
    const client = Client.getInstance()

    const fileResource = await client.resources.files.upload(file)
    const picture = await client.resources.pictures.create(fileResource)

    console.log((await picture.getFile()).rawUrl)
  }
</script>

<input type="file" bind:this={fileChoose} on:change={change}/>
