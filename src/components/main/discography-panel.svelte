<script lang="ts">
	import { Client, FileResource } from "adswebsitewrapper";
	import { onMount } from "svelte";

  const releases: {
    name: string
    photoId: string
    year: number
  }[] = [
    {
      name: 'Hare Hare',
      photoId: '648c771f00f89572c58d57df',
      year: 2023
    },
    {
      name: 'Ready to Be',
      photoId: '648c772e00f89572c58d582a',
      year: 2023
    },
    {
      name: 'Moonlight Sunrise',
      photoId: '648c773600f89572c58d586d',
      year: 2023
    },
    {
      name: 'Between 1 & 2',
      photoId: '648c774500f89572c58d58c6',
      year: 2022
    },
    {
      name: 'Celebrate',
      photoId: '648c775100f89572c58d5913',
      year: 2022
    },
    {
      name: 'Just Be Yourself',
      photoId: '648c775d00f89572c58d5964',
      year: 2022
    },
    {
      name: '#TWICE4',
      photoId: '648c776900f89572c58d59b5',
      year: 2022
    },
    {
      name: 'Doughnut',
      photoId: '648c777700f89572c58d5a02',
      year: 2021
    },
    {
      name: 'Formula of Love O+T=<3',
      photoId: '648c778000f89572c58d5a53',
      year: 2021
    },
    {
      name: 'The Feels',
      photoId: '648c778b00f89572c58d5aa0',
      year: 2021
    },
    {
      name: 'Perfect World',
      photoId: '648c779600f89572c58d5af1',
      year: 2021
    },
    {
      name: 'Taste of Love',
      photoId: '648c779f00f89572c58d5b70',
      year: 2021
    },
    {
      name: 'Kura Kura',
      photoId: '648c7a1100f89572c58d71f2',
      year: 2021
    },
    {
      name: 'Eyes Wide Open',
      photoId: '648c7a1e00f89572c58d7297',
      year: 2020
    },
    {
      name: '#TWICE3',
      photoId: '648c7a3300f89572c58d749b',
      year: 2020
    },
    {
      name: 'Fanfare',
      photoId: '648c7a3c00f89572c58d7569',
      year: 2020
    },
    {
      name: 'More & More',
      photoId: '648c7a4800f89572c58d75f4',
      year: 2020
    },
    {
      name: '&TWICE (Repackage)',
      photoId: '648c7a5400f89572c58d76c6',
      year: 2020
    },
    {
      name: '&TWICE',
      photoId: '648c7a5e00f89572c58d773c',
      year: 2019
    },
    {
      name: 'Feel Special',
      photoId: '648c7a6300f89572c58d77e6',
      year: 2019
    },
    {
      name: 'Happy Happy',
      photoId: '648c7a7200f89572c58d7953',
      year: 2019
    },
    {
      name: 'Breakthrough',
      photoId: '648c7a6b00f89572c58d7892',
      year: 2019
    },
    {
      name: 'Fancy',
      photoId: '648c7a8900f89572c58d7b88',
      year: 2019
    },
    {
      name: '#TWICE2',
      photoId: '648c7a9500f89572c58d7c6a',
      year: 2019
    },
    {
      name: 'BDZ',
      photoId: '648c7a9d00f89572c58d7cf9',
      year: 2018
    },
    {
      name: 'The Year of YES',
      photoId: '648c7aa600f89572c58d7dc5',
      year: 2018
    },
    {
      name: 'Yes or Yes',
      photoId: '648c7aad00f89572c58d7e5b',
      year: 2018
    },
    {
      name: 'BDZ',
      photoId: '648c7ab300f89572c58d7f0c',
      year: 2018
    },
    {
      name: 'Summer Nights',
      photoId: '648c7aba00f89572c58d7fd5',
      year: 2018
    },
    {
      name: 'Wake Me Up',
      photoId: '648c7abf00f89572c58d8071',
      year: 2018
    },
    {
      name: 'What is Love?',
      photoId: '648c7ac600f89572c58d8137',
      year: 2018
    },
    {
      name: 'Candy Pop',
      photoId: '648c7acf00f89572c58d81e1',
      year: 2018
    },
    {
      name: 'Marry & Happy',
      photoId: '648c7ad500f89572c58d829b',
      year: 2017
    },
    {
      name: 'Twicetagram',
      photoId: '648c7adb00f89572c58d834e',
      year: 2017
    },
    {
      name: '#TWICE',
      photoId: '648c7ae200f89572c58d840c',
      year: 2017
    },
    {
      name: 'SIGNAL',
      photoId: '648c7ae900f89572c58d84c6',
      year: 2017
    },
    {
      name: 'TWICEcoaster: Lane 2',
      photoId: '648c7aef00f89572c58d857f',
      year: 2017
    },
    {
      name: 'TWICEcoaster: Lane 1',
      photoId: '648c7af700f89572c58d8639',
      year: 2016
    },
    {
      name: 'Page Two',
      photoId: '648c7afd00f89572c58d86f4',
      year: 2016
    },
    {
      name: 'The Story Begins',
      photoId: '648c7b0600f89572c58d87b0',
      year: 2015
    }
  ]

  const getPhotoUrl = async (id: string): Promise<string> => (await Client.getInstance().resources.files.get(id) as FileResource).rawUrl.toString()

  onMount(async () => {
    const styleElement = document.createElement('style')

    styleElement.innerText = 'div.mainContent, div.mainContainer { height: unset; }'
    document.head.appendChild(styleElement)
  })
</script>

<style>
  div.releaseContainer > h1 {
    text-align: center;
  }

  div.releaseList {
    display: flex;

    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  div.releaseEntry {
    width: 400px;
    height: 128px;

    background-color: #ffffff40;
    margin: 16px;
    border-radius: 8px;
    /* box-shadow: 2px 2px 2px 2px #ffffff40; */
  }

  div.releaseImage {
    float: left;

    width: 128px;
    height: 100%;

    border-radius: 8px 0px 0px 8px;
  }

  div.releaseImage > img {
    width: 100%;
    height: 100%;

    border-radius: 8px 0px 0px 8px;

    object-fit: cover;
  }

div.releaseTextContainer {
  float: right;

  width: calc(100% - 128px);
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

  div.releaseTextContainer > div > p {
    text-align: center;
  }

  p.year {
    font-size: 13px;
  }
</style>

<div class="releaseContainer">
  <h1 class="header">Discography</h1>
  <div class="releaseList">
    {#each releases as { name, photoId, year }}
      <div class="releaseEntry">
        <div class="releaseImage">
          {#if photoId != null}
            {#await getPhotoUrl(photoId) then photo}
              <img alt="" src={photo} />
            {/await}
          {/if}
        </div>
        <div class="releaseTextContainer">
          <div class="releaseText">
            <p><b>{name}</b></p>
            <p class="year">{year}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
