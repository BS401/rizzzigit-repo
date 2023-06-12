<script lang="ts">
  export let _class: string
  export let type: 'news' | 'discography' | 'photos'
</script>

<style>
  div.section {
    height: 300px;
    margin: 32px;

    border: solid;
    border-radius: 8px;
  }

  @media only screen and (max-width: 720px) {
    div.section {
      border: none;
      border-top: solid;
      margin: 0px;
    }
  }
</style>

<div class="section {_class}"></div>
