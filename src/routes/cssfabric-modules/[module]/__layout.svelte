<svelte:head>

    <title>{staticModule} {staticAction} cssfabric</title>
</svelte:head>
<script context="module" lang="ts">
  export const prerender = true;
  /** @type {import('./modules/[module]/[page]').Load} */
  export async function load({params, fetch, session, stuff}) {
    console.log(params)
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
  import {fabricNavigation} from '../../../scripts/utils';
  import InnerMenu from '../../../components/InnerMenu.svelte';
  import SubHeader from '../../../components/SubHeader.svelte';
  import Header from '../../../components/Header.svelte';

  export let moduleTag  = '';
  export let modulePage = '';

  const links: string[] = fabricNavigation.getActiveLinks();

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
<div class={"flex  flex-xl-v flex-h marg-t-2"}>
    <div class={"marg-t-2 marg-lg-l-4 pad"}>
        <div class="">
            <ul class={"menu-xl-h menu-v menu-small shad-8"}>
                <li class={(modulePage==='demo')? 'active':''}>
                    <a href={fabricNavigation.getModuleDemoPage(moduleTag)}>
                        <a>Demo</a>
                    </a>
                </li>
                <li class={(modulePage==='classnames')? 'active':''}>
                    <a href={fabricNavigation.getModuleClassNamesPage(moduleTag)}>
                        <a>Classnames</a>
                    </a>
                </li>
                <li class={(modulePage==='docs')? 'active':''}>
                    <a href={fabricNavigation.getModuleDocsPage(moduleTag)}>
                        <a>Docs</a>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class={"pad-l-4 flex-main"}>
        <SubHeader title={staticModule + '.' + staticAction}/>
        <div>
            <slot module={staticModule} ></slot>
        </div>
    </div>
</div>
