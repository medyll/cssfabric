<script lang="ts">

  import DemoElementColor from './elements/DemoElementColor.svelte';
  import DemoElementBorderColor from './elements/DemoElementBorderColor.svelte';
  import DemoElementMargin from './elements/DemoElementMargin.svelte';
  import DemoElementPadding from './elements/DemoElementPadding.svelte';
  import DemoElementBorder from './elements/DemoElementBorder.svelte';
  import DemoElementGrid from './elements/DemoElementGrid.svelte';
  import DemoElementScale from './elements/DemoElementScale.svelte';
  import DemoElementText from './elements/DemoElementText.svelte';
  import DemoElementTable from './elements/DemoElementTable.svelte';
  import {onMount} from 'svelte';

  interface IDemoElement {
    module?: string;
    cssFabricClassName?: any;
    moduleAttribute?: any;
    moduleRule?: any;
    children?: any;
  }

  interface IDemoElementGridProps {
    module?: string;
    cssFabricClassName?: any;
    moduleAttribute?: any;
    moduleRule?: any;
    children?: any;
  }

  export let moduleAttribute;
  export let moduleRule;
  export let cssFabricClassName;

  onMount(async () => {
    /*await sleep(1000); // simulate network delay
    Thing = (await import('./Thing.svelte')).default;*/
  });

</script>

{#if moduleAttribute === "color" }
    <DemoElementColor {...$$props}/>

{:else if moduleAttribute === "border-color" }
    <DemoElementBorderColor {...$$props}/>

{:else if ["background-color", "background-themed", "theme"].includes(moduleAttribute)    }
    <DemoElementBorderColor {...$$props}/>
{:else if moduleAttribute === "margin" }
    <DemoElementMargin {...$$props}/>

{:else if moduleAttribute === "padding" }
    <DemoElementPadding {...$$props}/>

{:else if moduleAttribute === "border" }
    <DemoElementBorder {...$$props}/>

{:else if moduleAttribute === "grid" }
    <DemoElementGrid {...$$props}/>

{:else if moduleAttribute === "scale" }
    <DemoElementScale {...$$props}/>

{:else if moduleAttribute === "table" }
    <DemoElementTable {...$$props}/>
{:else if ["text", "text-align", "text-shadow", "text-transform", "font-weight"].includes(moduleAttribute) }
    <DemoElementText {...$$props}/>
{:else}
    <div class={cssFabricClassName + ' h-full'}>
        {moduleAttribute} {cssFabricClassName}
    </div>
{/if}














