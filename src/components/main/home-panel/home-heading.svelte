<script>
</script>

<style>
  div.headingContainer {
    box-sizing: border-box;

    width: 500px;
    height: 100%;
    max-height: 800px;

    float: right;
  }

  div.headingFlexContainer {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.headingContent > * {
    text-align: center;
  }

  div.headingContent > div.albumImage > img {
    box-shadow: 2px 2px 4px 4px #7a589fff;
    border-radius: 16px;
    margin: auto;
  }

  div.headingContent > h1,
  div.headingContent > p {
    text-shadow: 4px 4px 4px #7a589fff;
  }

  div.headingContent > h1 {
    font-size: 48px;
    margin: 0px;
  }

  div.headingContent > p {
    font-size: 16px;
    margin: 0px;
  }

  @media only screen and (max-width: 720px) {
    div.headingContent {
      padding-top: 64px;
    }

    div.headingContainer {
      width: 100%;
    }

    div.headingFlexContainer {
      display: block;
    }
  }

  div.space {
    height: 64px;
  }
</style>

<div class="headingContainer">
   <div class="headingFlexContainer">
    <div class="headingContent">
      <div class="albumImage">
        <img src="/images/album.webp" alt="Album" />
      </div>
      <h1>「Hare Hare」</h1>
      <p>TWICE Japan 10th single</p>
      <div class="space"></div>

      <div class="linkContainer">
        <button on:click={() => {
          // window.open('https://www.youtube.com/watch?v=-uqWaGzQyxA', '_top')
        }}>{'▶'} Watch on YouTube</button>

        <button on:click={() => {
          // window.open('https://open.spotify.com/track/3QcJghvqRS17RoPPP0C2sp', '_top')
        }}>{'▶'} Listen on Spotify</button>

        <button on:click={() => {
          // window.open('https://www.amazon.com/Hare-Regular-Version-TWICE/dp/B0BYD5QWBY', '_top')
        }}>{'🛒'} Buy on Amazon</button>
      </div>
    </div>
  </div>
</div>
