<script>
	import HomeSection from "./home-section.svelte";

</script>

<style>
  div.lowerContainer {
    float: right;

    width: 100%;

    margin-top: 96px;
  }
</style>

<div class="lowerContainer">
  <HomeSection _class="news" type="news"/>
  <HomeSection _class="discography" type="discography"/>
  <HomeSection _class="schedule" type="schedule"/>
  <HomeSection _class="photos" type="photos"/>
  <div class="section newsContainer">
  </div>
  <div class="section discography">
  </div>
  <div class="section schedule">
  </div>
  <div class="section photos">
  </div>
</div>
