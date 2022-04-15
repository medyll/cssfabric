<script context="module" lang="ts">

  export const prerender = true;
</script>

<script lang="ts">
  import {fabricNavigation} from '../scripts/utils';

  const cssfabricModules = fabricNavigation.getActiveLinks();
  $: console.log({cssfabricModules});
</script>
<svelte:head>
    <title>cssFabric home</title>

</svelte:head>
<div class={"flex-v  flex-align-center h-full theme-color-background  overflow-auto  "}>

    <h1 class={"flex-v flex-align-center flex-align-middle scale-h-16"}>
        cssfabric
    </h1>
    <h6>actually in early version</h6>
    <div class={"flex-main flex-align-middle scale-w-sm-full scale-w-lg-32 scale-w-64 pad-all"}>
        <div title={"a css framework"}>
            <p>
                <strong>cssfabric</strong> is another css framework, semantically driven and fully responsive<br/>
                it's goal is to permit you to achieve of all your design task, from single page applications to frontend web sites
            </p>
        </div>
        <p title={"with some css in"}>
        </p>
        <div class={"flex-h flex-wrap flex-align-center"}>
            {#each Object.values(cssfabricModules) as key, name }
                <div class={"pad-4 marg-4   scale-w-8 scale-h-8 flex-v flex-align-middle text-center bg-themed-gray-200 shad-4"}>
                    <a href={fabricNavigation.getModuleDemoPage(key)}>
                        <span>{`${key}`}</span>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
