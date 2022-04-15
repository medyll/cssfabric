
<script lang="ts">
    export let title: string;
    export let title_tag: string;
    export let description: string;
</script>
<div class={"flex-v items-center pad-lg-4 pad-all-8 border-b pos-sticky"}>
    <header class={"flex-h just-center items-center"}>
        <h1 class={"pad-all text-shad-info"}><a href={"/"}>{title}</a></h1>
        <h6 class={"pad-all self-start dsp-sm-none"}>{title_tag}</h6>
    </header>
    <p class={"pad-all  dsp-sm-none"}>{description}</p>
</div>