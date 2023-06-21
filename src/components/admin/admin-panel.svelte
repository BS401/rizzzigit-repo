<script lang="ts">
	import AdminPanelPhotos from "./column-panels/admin-panel-photos.svelte";
</script>

<style>
  div.main {
    position: fixed;

    left: 0px;
    top: 0px;

    width: 100%;
    height: 100%;
  }

  div.columnContainer {
    width: 100%;
    height: 100%;

    max-width: 1280px;

    margin: auto;

    display: flex;
  }

  div.separator {
    width: 1px;
    background-color: white;
  }

  div.column {
    width: calc(100% - 2px);
  }
</style>

<div class="main">
  <div class="columnContainer">
    <div class="separator"></div>
    <div class="column">
      <AdminPanelPhotos></AdminPanelPhotos>
    </div>
    <div class="separator"></div>
  </div>
</div>
