
<script lang="ts">
    export let tag;
    export let description;
</script>
<div class={"pad-all flex-main"}>
    <div class={"flex-h items-center"}>
        <div class={"w-4 text-center border-4"}>
        </div>
        <div>
            <h4 class={"pad-all"}>{tag}</h4>
            <p class={"pad-all"}>{description}</p>
        </div>
    </div>
    <div class={"flex-h"}>
        <div class={"w-4 text-center border-4"}>
        </div>
        <article class={"marg-l-8"}>
            <slot></slot>
        </article>
    </div>
</div>