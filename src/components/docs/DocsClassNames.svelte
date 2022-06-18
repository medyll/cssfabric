<script lang="ts">

  import cssfabric from '../../lib/scripts/cssfabric';

  export let module;
  const moduleAttributes = cssfabric.getModuleDocsAttributes(module);

</script>

<div>
    <div class={"flex-v flex-items-end pad-r-4"}>
        <div class={"txt-800 border-b dsp-inline"}>
            cssfabric classnames
        </div>
        <div class={"txt-gray-300 marg-b-1"}>
            generated classnames
        </div>
    </div>
    <div class={"pad"}>
        {#each Object.keys(moduleAttributes) as moduleAttribute  }
            <div>
                <h4 class={"pad-tb"}>{moduleAttribute}</h4>
                <div class={"text-gray-400 pad-tb"}>
                    {`- cssfabric expressions list for  css ${moduleAttribute} rules`}
                </div>
                <div class={"marg-b-8"}>
                    {#each cssfabric.getModuleClassNames.getModuleTagClassNames({module, moduleAttribute}) as className}
                        <div class={""}>.{className}</div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>