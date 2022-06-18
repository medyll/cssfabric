<script context="module" lang="ts">
  export const prerender = true;
  /** @type {import('./[module]/classnames').Load} */
  export async function load({params, fetch, session, stuff}) {
    console.log({params})
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
<script>
    import DocsClassNames from "../../../../components/docs/DocsClassNames.svelte";

    export let moduleTag  = '';
    export let modulePage = '';
</script>


<DocsClassNames  module={moduleTag} />