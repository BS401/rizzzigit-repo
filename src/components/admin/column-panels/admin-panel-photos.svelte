<script lang="ts">
	import { Client, type PictureResource } from "adswebsitewrapper";
	import { onMount } from "svelte";
	import PictureEntry from "./picture/picture-entry.svelte";

  let pictures: [PictureResource][] = []
  let uploadForm: HTMLInputElement
  let uploadButton: HTMLButtonElement
  let photosContainer: HTMLDivElement

  onMount(async () => {
    void (async () => {
      let hasEnded = false
      while (!hasEnded) {
        if (photosContainer.scrollTop > (photosContainer.scrollHeight - photosContainer.clientHeight - 300)) {
          const result = await Client.getInstance().resources.pictures.list(pictures.length, 10)

          if (result.length < 10) {
            hasEnded = true
          }


          for (const picture of result) {
            pictures.push([picture])
            pictures = pictures
          }
        }

        await new Promise<void>((resolve) => setTimeout(resolve, 100))
      }
    })()

  })

  const getFiles = (): File[] => {
    if (uploadForm.files == null) {
      return []
    }

    const files: File[] = []

    for (let index = 0; index < uploadForm.files.length; index++) {
      const file = uploadForm.files.item(index)

      if (file == null) {
        continue
      }

      files.push(file)
    }

    return files
  }

  const onUpload = async () => {
    uploadForm.click()
  }

  const onChange = async () => {
    const files = getFiles()
    if (files.length == 0) {
      return
    }

    const client = Client.getInstance()
    for (const file of files) {
      const fileResource = await client.resources.files.upload(file)
      const pictureResource = await client.resources.pictures.create(fileResource)

      pictures.unshift([pictureResource])
    }
    pictures = pictures
  }
</script>

<style>
  input.uploader {
    display: none;
  }

  button.uploadButton {
    width: 100%;
    margin: 0px;
  }

  div.uplaodButtonContainer {
    padding: 16px;
  }

  div.photosContainer {
    height: 100%;
    overflow-y: auto;
  }

  div.pictureList {
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
  }
</style>

<div class="photosContainer" bind:this={photosContainer}>
  <div class="uploaderContainer">
    <input type="file" accept="image/*" class="uploader" on:change={onChange} bind:this={uploadForm} />
    <div class="uplaodButtonContainer">
      <button class="uploadButton" on:click={onUpload} bind:this={uploadButton}>Upload New Picture</button>
    </div>
  </div>
  <div class="pictureList">
    {#each pictures as entry}
      <PictureEntry onRemove={() => {
        const index = pictures.indexOf(entry)

        if (index > -1) {
          pictures.splice(index, 1)
          pictures = pictures
        }
      }} picture={entry[0]}></PictureEntry>
    {/each}
  </div>
</div>
