<script lang="ts">
  export let moduleAttribute, moduleRule, cssFabricClassName;
</script>

<div class={' pad-2 overflow-none scale-w-16'}>
    <h6 class={'border-l-4 pad-l theme-border-primary-dark dsp-inline'}>.{cssFabricClassName}</h6>
    <p class={cssFabricClassName + " text-ellipsis"}>Here is some {cssFabricClassName} text</p>
    <p class={cssFabricClassName + " text-ellipsis"}>This {cssFabricClassName} text is from cssfabric a css sass
        framework</p>
</div>