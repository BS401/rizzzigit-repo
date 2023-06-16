<script lang="ts">
	import { Client, FileResource } from "adswebsitewrapper";

  const members: {
    name: string
    photoId: string
  }[] = [
    {
      name: 'Im Nayeon',
      photoId: '648b203a72df23dff4340672'
    },
    {
      name: 'Yoo Jeongyeon',
      photoId: '648b203a72df23dff434068a'
    },
    {
      name: 'Hirai Momo',
      photoId: '648b203a72df23dff4340681'
    },
    {
      name: 'Minatoaki Sana',
      photoId: '648b203a72df23dff4340688'
    },
    {
      name: 'Park Jihyo',
      photoId: '648b203a72df23dff434067f'
    },
    {
      name: 'Myoui Mina',
      photoId: '648b203a72df23dff434067d'
    },
    {
      name: 'Kim Dahyun',
      photoId: '648b203a72df23dff43406c0'
    },
    {
      name: 'Son Chaeyoung',
      photoId: '648b203a72df23dff43406bd'
    },
    {
      name: 'Chou Tzuyu',
      photoId: '648b203a72df23dff43406b4'
    }
  ]

  const getPhotoUrl = async (id: string): Promise<string> => (await Client.getInstance().resources.files.get(id) as FileResource).rawUrl.toString()
</script>

<style>
  div.memberContainer > h1 {
    text-align: center;
  }

  div.memberList {
    display: flex;

    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  div.memberEntry {
    width: 400px;
    height: 128px;

    background-color: #ffffff40;
    margin: 16px;
    border-radius: 8px;
    /* box-shadow: 2px 2px 2px 2px #ffffff40; */
  }

  div.memberImage {
    float: left;

    width: 128px;
    height: 100%;

    border-radius: 8px 0px 0px 8px;
  }

  div.memberImage > img {
    width: 100%;
    height: 100%;

    border-radius: 8px 0px 0px 8px;

    object-fit: cover;
  }

  div.memberTextContainer {
    float: right;

    width: calc(100% - 128px);
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="memberContainer">
  <h1 class="header">TWICE Members</h1>
  <div class="memberList">
    {#each members as { name, photoId }}
      <div class="memberEntry">
        <div class="memberImage">
          {#if photoId != null}
            {#await getPhotoUrl(photoId) then photo}
              <img alt="" src={photo} />
            {/await}
          {/if}
        </div>
        <div class="memberTextContainer">
          <div class="memberText">
            <p><b>{name}</b></p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
