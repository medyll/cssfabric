<script lang="ts">
  export let moduleAttribute, moduleRule, cssFabricClassName;

  const multiply = (factor: number) => {
    return [...Array(factor)].map((x, i) => `<div class={'border marg pad w-4-min '}>&nbsp;{++i}&nbsp;</div>`);
  };
</script>


const def =
<div class={' w-48 pad-1 border-l-4 shad-4 marg-4'}>
    <h6 class={"pad text-bold border-b"}>
        {cssFabricClassName}
    </h6>
    <div class={"flex-h overflow-hidden cell-spacing"}>
        <div class={"flex-main overflow-hidden"}>
            <div class={"pad text-right"}>.flex-v</div>
            <div class={'flex-v ' + cssFabricClassName + " h-8 overflow-hidden"}>
                {multiply(12)}
            </div>
        </div>
        <div class={"flex-main overflow-hidden  border-l"}>
            <div class={"pad"}>.flex-h</div>
            <div class={'flex-h ' + cssFabricClassName + " h-8 overflow-hidden"}>
                {multiply(12)}
            </div>
        </div>
    </div>
</div>

const forClassNames =
<div class={'flex-h w-64 pad-1 h-16-min'}>
    <div class={"w-mid border-r flex-v"}>
        <div class={"pad"}>.flex-h</div>
        <div class={'flex-main flex-h ' + cssFabricClassName + " h-8"}>
            {multiply(6)}
        </div>
    </div>
    <div class={"flex-v"}>
        <div class={"pad"}>.flex-v</div>
        <div class={'flex-main flex-v ' + cssFabricClassName + " h-8"}>
            {multiply(3)}
        </div>
    </div>
</div>

<!--
switch (moduleRule) {
    case "classnames":
    return <React.Fragment>{forClassNames}</React.Fragment>
    default:
    return <React.Fragment>{def}</React.Fragment>
}-->
