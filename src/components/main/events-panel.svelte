<script lang="ts">
	import { Client, type NewsResource } from "adswebsitewrapper";
	import type { NoticeResource } from "adswebsitewrapper/dist/resource/data/notice";
	import { onMount } from "svelte";

  let list: NoticeResource[] = []

  onMount(async () => {
    list = await Client.getInstance().resources.notices.list(0, 10)

    void (async () => {
      while (true) {
        if (document.documentElement.scrollTop > document.documentElement.scrollHeight - document.documentElement.clientHeight - 10) {
          list.push(...await Client.getInstance().resources.notices.list(list.length, 10))
          list = list
        }

        await new Promise<void>((resolve) => setTimeout(resolve, 100))
      }
    })()

    const styleElement = document.createElement('style')

    styleElement.innerText = 'div.mainContent, div.mainContainer { height: unset; }'
    document.head.appendChild(styleElement)
  })

  const open = (id: string) => window.open(`https://twice.jype.com/Default/NoticeView?AnSeq=${id}`, '_blank')
</script>

<style>
  div.eventContainer > h1 {
    text-align: center;
  }

  div.eventList {
    display: flex;

    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  div.eventEntry {
    width: 400px;
    height: 128px;

    background-color: #ffffff40;
    margin: 16px;
    border-radius: 8px;
    /* box-shadow: 2px 2px 2px 2px #ffffff40; */

    cursor: pointer;
  }

div.eventTextContainer {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

  div.eventTextContainer > div > p {
    text-align: center;
  }

  p.year {
    font-size: 13px;
  }
</style>

<div class="eventContainer">
  <h1 class="header">Events</h1>
  <div class="eventList">
    {#each list as { title, createTime, id }}
      <div class="eventEntry" on:click={() => open(id)} on:keypress={() => open(id)}>
        <div class="eventTextContainer">
          <div class="eventText">
            <p><b>{title}</b></p>
            <p class="year">{new Date(Number(`${createTime}`)).toDateString()}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
