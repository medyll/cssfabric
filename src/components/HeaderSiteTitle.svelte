
<script lang="ts">
    export let title: string;
    export let title_tag: string;
    export let description: string;
</script>
<div class={"flex-v items-center pad-lg  pad border-b pos-sticky"}>
    <header class={"flex-h just-center items-center"}>
        <h4 class={"pad-all text-shad"}><a href={"/"}>{title}</a></h4>
        <h6 class={"pad-all self-start dsp-sm-none"}>{title_tag}</h6>
    </header>
</div>