<script lang="ts">
    import HeaderSiteTitle from "../../../components/HeaderSiteTitle.svelte";
    import Header from "../../../components/Header.svelte";
    import InnerMenu from "../../../components/InnerMenu.svelte";
    import SubHeader from "../../../components/SubHeader.svelte";
    import {fabricNavigation} from '../../../scripts/utils';
    import cssfabric from '../../../lib/scripts/cssfabric';

    export let moduleTag  = '';
    export let modulePage = '';

    const links: string[] = fabricNavigation.getActiveLinks();

    let DynamicComponent;
    let tagProperties: Record<string, any> = {};

    let staticModule: string = moduleTag;
    let staticAction: string = '';

    $: tagProperties = cssfabric.getModuleMetaData(moduleTag);
    $: staticAction = modulePage;
</script>

<div class={"flex flex-v   h-full content-start overflow-auto"}>
    <div class={"w-full w-sm-main theme-bg-primary-light"}>
        <HeaderSiteTitle
                description={"cssFabric is an alpha cssFabric"}
                title="cssfabric"
                title_tag={"just.fabric.it"}
        />
        <div class={" dsp-none"}>
            <div class={"dsp-none dsp-sm-block"}>sm</div>
            <div class={"dsp-md-block dsp-none "}>md</div>
            <div class={"dsp-lg-block dsp-none"}>lg</div>
            <div class={"dsp-none dsp-xl-block dsp-none"}>xl</div>
            <div class={"dsp-none dsp-xxl-block dsp-none"}>xxl</div>
            <div class={"dsp-none dsp-xxxl-block dsp-none"}>xxxl</div>
        </div>
    </div>
    <div class={"flex flex-lg-v flex-h  h-full "}>
        <aside class={"w-lg-full w-16"}>
            <nav class={"pad-all-8 pad-lg-2"}>
                <ul class={"menu-lg-h menu-v"}>
                    {#each Object.values(links) as key}
                        <!--{    css = (staticModule === key) ? 'active' : '';}-->
                        <li class={"menu-item " }>
                            <a href={fabricNavigation.getModuleDemoPage(key)}>
                                <span>{`${key}`}</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </aside>
        <section class={"flex-main pad-all-4 "}>
            <slot></slot>
        </section>
    </div>
</div>