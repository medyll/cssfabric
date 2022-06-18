<script context="module" lang="ts">

  export const prerender = true;
</script>
<script lang="ts">
  import Header from '$lib/../components/header/Header.svelte';
  import '../app.css';
  import HeaderSiteTitle from "../components/HeaderSiteTitle.svelte";
  import {fabricNavigation} from "../scripts/utils";

  const links: string[] = fabricNavigation.getActiveLinks();

  export let moduleTag  = '';
  export let modulePage = '';



</script>

<main class={"w-full  flex flex-v   h-full content-start overflow-auto"}>
    <div class={"w-full w-sm-main "}>
        <HeaderSiteTitle
                description={"cssFabric is an alpha cssFabric"}
                title="cssfabric"
                title_tag={"just.fabric.it"}
        />

    </div>
    <div class={" dsp-none"}>
        <div class={"dsp-none dsp-sm-block"}>sm</div>
        <div class={"dsp-md-block dsp-none "}>md</div>
        <div class={"dsp-lg-block dsp-none"}>lg</div>
        <div class={"dsp-none dsp-xl-block dsp-none"}>xl</div>
        <div class={"dsp-none dsp-xxl-block dsp-none"}>xxl</div>
        <div class={"dsp-none dsp-xxxl-block dsp-none"}>xxxl</div>
    </div>
    <div class={"flex flex-lg-v flex-h  h-full"}>
        <aside class={"w-lg-full w-8 pad "}>
            <nav class={"pad pad-lg"}>
                <ul class={"menu-lg-h menu-v"}>
                    <li class={"menu-item " }>
                        <a href={'/installation'}>
                            <span>installation</span>
                        </a>
                    </li>
                </ul>
                <ul class={"menu-lg-h menu-v"}>
                    {#each Object.values(links) as key}
                        <!--{    css = (staticModule === key) ? 'active' : '';}-->
                        <li class={"menu-item " } class:active={(moduleTag === key)}>
                            <a  rel="external" href={fabricNavigation.getModuleClassNamesPage(key)}>
                                <span>{`${key}`}</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </aside>
        <section class={"flex-main"}>
            <slot>slot test</slot>
        </section>
    </div>
</main>


<style global lang="scss">
  @import "src/lib/styles/cssfabric.min";

  main {
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
