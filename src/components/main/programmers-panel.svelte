<script lang="ts">
	import { Client, FileResource } from "adswebsitewrapper";

  const programmers: {
    name: string
    address: string
    photoId?: string
  }[] = [
    {
      name: 'Omandam, Carl James',
      address: '308 Negra Aurora Lane, Albaquerque, New Mexico',
      photoId: '648b1d7deb28424ff278b216'
    },
    {
      name: 'Suyat, Arvin John',
      address: '308 Negra Aurora Lane, Albaquerque, New Mexico',
      photoId: '6490696b26e992240e514fb5'
    },
    {
      name: 'Liwanag, Allan Raphael',
      address: '308 Negra Aurora Lane, Albaquerque, New Mexico',
      photoId: '6490697126e992240e514fe2'
    },
    {
      name: 'Guerrero, Fredrick',
      address: '308 Negra Aurora Lane, Albaquerque, New Mexico',
      photoId: '6490697126e992240e514fe4'
    },
    {
      name: 'Marabe, Jermaine Benedict',
      address: '308 Negra Aurora Lane, Albaquerque, New Mexico',
      photoId: '64906ab526e992240e515162'
    }
  ]

  const getPhotoUrl = async (id: string): Promise<string> => (await Client.getInstance().resources.files.get(id) as FileResource).rawUrl.toString()
</script>

<style>
  div.programmerContainer > h1 {
    text-align: center;
  }

  div.programmerList {
    display: flex;

    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  div.programmerEntry {
    width: 400px;
    height: 128px;

    background-color: #ffffff40;
    margin: 16px;
    border-radius: 8px;
    /* box-shadow: 2px 2px 2px 2px #ffffff40; */
  }

  div.programmerImage {
    float: left;

    width: 128px;
    height: 100%;

    border-radius: 8px 0px 0px 8px;
  }

  div.programmerImage > img {
    width: 100%;
    height: 100%;

    border-radius: 8px 0px 0px 8px;
    object-fit: cover;
  }

  div.programmerTextContainer {
    float: right;

    width: calc(100% - 128px);
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="programmerContainer">
  <h1 class="header">Meet The Team</h1>
  <div class="programmerList">
    {#each programmers as { name, photoId }}
      <div class="programmerEntry">
        <div class="programmerImage">
          {#if photoId != null}
            {#await getPhotoUrl(photoId) then photo}
              <img alt="" src={photo} />
            {/await}
          {/if}
        </div>
        <div class="programmerTextContainer">
          <div class="programmerText">
            <p><b>{name}</b></p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
