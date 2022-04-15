<svelte:head>

    <title>{staticModule} {staticAction} cssfabric</title>
</svelte:head>
<script context="module" lang="ts">
  /** @type {import('./[module]/[page]').Load} */
  export async function load({params, fetch, session, stuff}) {
    // console.log(params, fetch, session, stuff);
    return {
      status: 200,
      props : {
        moduleTag : params.module,
        modulePage: params.page
      }
    };
  }
</script>

<script lang="ts">
  import cssfabric from '../../../lib/scripts/cssfabric';
  import HeaderSiteTitle from '../../../components/HeaderSiteTitle.svelte';
  import {fabricNavigation} from '../../../scripts/utils';
  import InnerMenu from '../../../components/InnerMenu.svelte';
  import SubHeader from '../../../components/SubHeader.svelte';
  import Header from '../../../components/Header.svelte';
  import Docs from '../../../components/docs/Docs.svelte';

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
<Header
        description={tagProperties.description}
        tag={"fabric.css." + tagProperties.title}
        title={"." + tagProperties.title}
/>
<div class={"flex  flex-xl-v flex-h marg-t-4"}>
    <div class={"marg-t-4 marg-lg-l-8"}>
        <InnerMenu action={staticAction} module={staticModule}/>
    </div>
    <div class={"pad-l-8 flex-main"}>
        <div>
            <SubHeader title={staticModule + '.' + staticAction}/>
        </div>
        <div>
            <slot>ll</slot>
            <!--{#if staticModule && !staticAction}
                <Docs module={staticModule}/>
            {/if}
            {#if staticModule && (staticAction === 'docs')}
                <Docs module={staticModule}/>
            {/if}-->
            <!--{staticModule && !staticAction && <Docs module={staticModule}/>}
            {staticModule && (staticAction === 'docs') && <Docs module={staticModule}/>}
            {staticModule && (staticAction === 'classnames') &&
            <DocsClassNames module={staticModule}/>}
            {staticModule && (staticAction === 'demo') && <DocsDemo module={staticModule}/>}-->

        </div>
    </div>
</div>