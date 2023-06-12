<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Footer from '../components/footer.svelte';
	import Main from '../components/main.svelte';
	import Navigation from '../components/navigation.svelte';
	import { run } from '../main';
</script>

<div class="background" on:load={void run(window, document)}>
	<video loop autoplay muted />
</div>
<div class="backgroundDecorator" />

<div class="container">
	<Navigation />
	<Main />
	<Footer />
</div>
