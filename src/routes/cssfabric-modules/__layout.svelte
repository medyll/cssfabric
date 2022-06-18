<script context="module" lang="ts">

  export const prerender = true;
</script>
<script lang="ts">

  import {fabricNavigation} from '../../scripts/utils';
  import cssfabric from '../../lib/scripts/cssfabric';
  import HeaderSiteTitle from '../../components/HeaderSiteTitle.svelte';

  export let moduleTag  = '';
  export let modulePage = '';

  const links: string[] = fabricNavigation.getActiveLinks();

  let DynamicComponent;
  let tagProperties: Record<string, any> = {};

  let staticModule: string = moduleTag;
  let staticPage: string   = modulePage;

  $: tagProperties = cssfabric.getModuleMetaData(moduleTag);
  $: staticPage = modulePage;
</script>

<slot></slot>