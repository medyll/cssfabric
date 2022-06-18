<script lang="ts">
  import ProxyDspArray from "./ProxyDspArray.svelte";
  import ProxyDspObject from "./ProxyDspObject.svelte";

  export let val: any, moduleAttribute: any, moduleRule: string = 'default';
</script>

{#if Array.isArray(val)}
    <ProxyDspArray {...$$props}/>
{:else}
    <ProxyDspObject  {...$$props}/>
{/if}