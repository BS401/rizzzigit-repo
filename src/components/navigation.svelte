<script lang="ts">
  const pages: string[] = ['Home', 'News', 'Discography', 'Schedule']

  function open (page: string) {
    window.open(`/${page == 'Home' ? '' : page.toLowerCase()}`, '_top')
  }
</script>

<div class="navigationContainer">
  <div class="navigationContent">
    <div class="navigationLogoContainer">
      <div class="navigationLogoContainerLayout" on:click={() => open(pages[0])} on:keypress={() => open(pages[0])}>
        <img class="navigationLogo" src="images/favicon_solid.svg" alt="TWICE Logo" />
      </div>
    </div>
    <div class="navigationButtonContainer">
      <div class="navigationButtonContent">
        <div class="navigationButton">
          <p>☰</p>
        </div>
      </div>
    </div>
    <nav class="navigationListContainer">
      <ul class="navigationList">
        {#each pages as page}
          <li class="navigationEntry" on:click={() => open(page)} on:keypress={() => open(page)}><p><b>{page}</b></p></li>
        {/each}
      </ul>
    </nav>
  </div>
</div>
