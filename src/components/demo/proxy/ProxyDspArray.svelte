<script lang="ts">
    import DemoElement from "../DemoElement.svelte";

    export let val: any[], moduleAttribute: any, moduleRule: any;
</script>



<div class={"marg-b-2"}>
    <p class={"marg-b-2 pad-tb"}>cssfabric.{moduleRule} : {moduleAttribute} classnames for cssfabric</p>
    <div class={"flex-h flex-wrap cell-spacing"}>
        {#each val as className}
            <DemoElement moduleAttribute={moduleAttribute} moduleRule={moduleRule}
                         cssFabricClassName={className}>
                [{moduleAttribute}] .{className}
            </DemoElement>
            {/each}
    </div>
</div>