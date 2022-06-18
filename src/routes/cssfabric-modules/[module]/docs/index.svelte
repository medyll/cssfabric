
<script context="module" lang="ts">
  export const prerender = true;
  /** @type {import('./[module]/docs').Load} */
  export async function load({params, fetch, session, stuff}) {

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
    import { HighlightAuto  } from "svelte-highlight";
    import "svelte-highlight/styles/github.css";
    import Docs from "../../../../components/docs/Docs.svelte";

    export let moduleTag  = '';
    export let modulePage = 'docs';

    let code = `let a = 123; let fr = 'red'; const red = function(args:any){}`
</script>
<HighlightAuto  code={`<div class="noclass"></div>`} />
<HighlightAuto  code={`npm i @medyll/cssfabric`} />
<HighlightAuto  code={code} />

<Docs module={moduleTag}  />
