<script lang="ts">
	import { Client } from 'adswebsitewrapper';
	import { onMount } from 'svelte';

  let components: Array<[string]> = []

	onMount(async () => {
		const fileInput = document.getElementById('file') as HTMLInputElement;
		fileInput.addEventListener('change', async () => {
			const files = fileInput.files;

			if (files == null) {
				return;
			}

			for (const file of files) {
				void (async () => {
					const client = Client.getInstance();
					const id = await client.resources.files.upload(file);

					components.push([id.rawUrl.toString()])
					console.log(id.id)
					components = components

					// await client.resources.news.create(`news: ${file.name}`, id, [])
					// await client.resources.pictures.create(id)
				})()
			}
		});
	});
</script>

<input multiple id="file" type="file" />

{#each components as [url]}
  <img src={url} alt="" on:click={() => window.open(url)} on:keypress={() => window.open(url)}/>
{/each}
