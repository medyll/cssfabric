<script context="module" lang="ts">

</script>
<script>
    import {HighlightAuto,Highlight} from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import node from "svelte-highlight/languages/node-repl";

    const code1 = `npm i @medyll/cssfabric
#or
yarn add @medyll/cssfabric`

    const code2 = `npm init @medyll/cssfabric # will create configuration files`

    const htmlCode = "<style></style>"
</script>


<h4>install cssfabric</h4>

<Highlight language={typescript} code={code1}/>
then
<Highlight language={node} code={code2}/>


<Highlight   code={htmlCode}/>


