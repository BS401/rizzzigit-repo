<script lang="ts">
  const pages: string[] = ['Home', 'News', 'Discography', 'Members', 'Pictures', 'Events', 'Programmers', 'Admin']

  function open (page: string) {
    const path = `/${page == 'Home' ? '' : page.toLowerCase()}`

    if (path == document.location.pathname) {
      return
    }

    window.open(path, '_top')
  }

  const run = () => {
    document.title = `${
      (document.location.pathname !== '/')
        ? `${pages[pages.findIndex(e => e.toLowerCase() == document.location.pathname.split('/')[1])]} | `
        : ''
    }TWICE Fan Page`
  }
</script>

<div on:load={void run()} class="navigationContainer navigationContainerOnScrollZero">
  <div class="navigationContent">
    <div class="navigationLogoContainer">
      <div class="navigationLogoContainerLayout" on:click={() => open(pages[0])} on:keypress={() => open(pages[0])}>
        <img class="navigationLogo" src="/images/favicon_solid_white.svg" alt="TWICE Logo" />
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
