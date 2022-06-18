

<script lang="ts">
    export let title;
    export let tag;
    export let description;
</script>

<div class={"pad  flex-h flex-wrap flex-align-middle"}>
    <div class={"flex-h items-center pad-l-2 flex-main"}>
        <h2 class={"pad-all border-b "}>{title}</h2>
        <h5 class={"pad-all text-gray-500  text-h4"}>
            {tag}
        </h5>
    </div>
    <p class={"pad   text-center marg-l border-l color-grey-400"}>{description}</p>
</div>