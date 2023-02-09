<script>
	import Tabs from "./Tabs.svelte";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment'; 

	$:current = $page;
    let prompt = '\\\\celes.in\\C$\\inetpub\\wwwroot\\blog\\'
    $: $page && browser && (document.title = "Celesian's blog | " + $page.route.id);
    $: $page && browser &&  updatePrompt($page.url);
    function updatePrompt(page) {
        if (browser){
            
            let url = new URL(page)
            if (url){
                prompt = `\\\\${url.hostname}${url.port != '' ? '%'+url.port : ''}\\C$\\inetpub\\wwwroot\\blog${url.pathname.replace('/','\\')}`

            }

        }
    }


</script>

<main>
	<div class="title">
		<h1>celes.in</h1>
		<h3 class="path">{prompt} </h3>
	</div>
	<Tabs />
	<div >
		<slot></slot>
	</div>
</main>
<style>
	:global(body) {
		background-color: #2c2c2c;
		color: #fffbd8;

	}
    :global(a) {
    color: #f7c061; /* unclicked link color */
  }

  :global(a:visited) {
    color: #a76900; /* visited link color */
  }
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	main {
		text-transform: lowercase;

		text-align: center;
		padding: 1em;

		margin: 0 auto;
		max-width: 70ch;
		padding: calc(1vmin + 0.5rem);
		margin-inline: auto;
		font-size: clamp(1em, 0.909em + 0.45vmin, 1.25em);
		font-family: "JetBrains Mono";
		src: url("https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Regular.woff2")
				format("woff2"),
			url("https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-Regular.woff")
				format("woff");
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}

	main :not(:is(h1, h2, h3, h4, h5, h6)) {
		line-height: 1.75;
	}
	h1 {
		color: #f7c061;
		font-family: "JetBrains Mono";
	}
	.path {
		color: #ffecc7;		
		margin-left: auto;
        font-size: 0.8em;
	}
    
   
</style>