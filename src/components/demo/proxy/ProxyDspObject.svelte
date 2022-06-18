<script lang="ts">
  import ProxyDsp from "./ProxyDsp.svelte";

  export let val: Record<string, any>, moduleAttribute: any, moduleRule: any;

</script>

{#each Object.keys(val) as moduleRule}

    <div>
        <h5 class={"pad-2 pad-r-8 dsp-block-inline border-b"}>{moduleRule}</h5>
        <div class={"marg-l-4"}>
            <ProxyDsp val={val[moduleRule]} {moduleAttribute} {moduleRule} />
        </div>
    </div>

{/each}