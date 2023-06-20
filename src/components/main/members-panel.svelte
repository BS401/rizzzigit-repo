<script lang="ts">
	import { Client, FileResource } from "adswebsitewrapper";

  const members: {
    name: string
    photoId: string
    birthday: Date
  }[] = [
    {
      name: 'Im Nayeon',
      photoId: '648b203a72df23dff4340672',
      birthday: new Date('1995.09.22')
    },
    {
      name: 'Yoo Jeongyeon',
      photoId: '648b203a72df23dff434068a',
      birthday: new Date('1996.11.01')
    },
    {
      name: 'Hirai Momo',
      photoId: '648b203a72df23dff4340681',
      birthday: new Date('1996.11.09')
    },
    {
      name: 'Minatoaki Sana',
      photoId: '648b203a72df23dff4340688',
      birthday: new Date('1996.12.29')
    },
    {
      name: 'Park Jihyo',
      photoId: '648b203a72df23dff434067f',
      birthday: new Date('1997.02.01')
    },
    {
      name: 'Myoui Mina',
      photoId: '648b203a72df23dff434067d',
      birthday: new Date('1997.03.24')
    },
    {
      name: 'Kim Dahyun',
      photoId: '648b203a72df23dff43406c0',
      birthday: new Date('1998.05.28')
    },
    {
      name: 'Son Chaeyoung',
      photoId: '648b203a72df23dff43406bd',
      birthday: new Date('1999.04.23')
    },
    {
      name: 'Chou Tzuyu',
      photoId: '648b203a72df23dff43406b4',
      birthday: new Date('1999.06.14')
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

  div.memberText > p {
    text-align: center;
  }

  p.birthday {
    font-size: 12px;
    text-decoration: none;
  }
</style>

<div class="memberContainer">
  <h1 class="header">TWICE Members</h1>
  <div class="memberList">
    {#each members as { name, photoId, birthday }}
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
            <p class="name"><b>{name}</b></p>
            <p class="birthday">Birthday: {birthday.toDateString()}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
