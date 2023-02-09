<script>
    let tabs = [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Posts",
            url: "/posts",
        },
        {
            name: "About",
            url: "/about",
        }
    ];
</script>

<main>
    <nav>
        {#each tabs as tab}
            <a href={tab.url}>{tab.name}</a>
        {/each}
    </nav>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    a {
        margin: 0 10px;
        text-decoration: none;
        font-size: 20px;
        color: white;
    }

    nav {
        display: flex;
        justify-content: center;
        background-color: #444;
        padding: 20px;
        width: 100%;
    }

    nav a {
        font-size: 20px;
        text-decoration: none;
        color: #f7c061;
        margin-right: 20px;
    }
</style>
