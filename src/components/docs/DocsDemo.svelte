<script lang='ts'>


  import cssfabric from '../../lib/scripts/cssfabric';
  import ProxyDsp from '../demo/proxy/ProxyDsp.svelte';

  export let module      = '';
  const moduleAttributes = cssfabric.getModuleDocsAttributes(module);

  let out;

  function proxyDsp(val: any, moduleAttribute: any, moduleRule: string = 'default') {
    if (Array.isArray(val)) {
      return DspArray(val, moduleAttribute, moduleRule);
    } else {
      return dspObject(val, moduleAttribute, moduleRule);
    }
  }

  function DspArray(val: any[], moduleAttribute: any, moduleRule: any) {
    return `<div class={"marg-b-2"}>
            <p class={"marg-b-2 pad-tb"}>cssfabric.${moduleRule} : ${moduleAttribute} classnames for cssfabric</p>
            <div class={"flex-h flex-wrap cell-spacing"}>
                ` + val.map((className, y) => {
        /*return <DemoElement moduleAttribute={moduleAttribute} moduleRule={moduleRule}
         cssFabricClassName={className}>
         [{moduleAttribute}] .{class}
         </DemoElement>*/
    }) + `
            </div>
        </div>`;
  }

  function dspObject(val: Record<string, any>, moduleAttribute: any, moduleRule: any) {
    return `<div>` +
           Object.keys(val).map((moduleRule) => {
             return `<div>
                    <h5 class={"pad-2 pad-r-8 dsp-block-inline border-b"}>${moduleRule}</h5>
                    <div class={"marg-l-4"}>` +
                    proxyDsp(val[moduleRule], moduleAttribute, moduleRule)
                    + `</div>
                </div>`;
           })
           + `</div>`;
  }

</script>
<div>
    <!--<div class={"flex-v flex-items-end pad-r-8"}>
      <div class={"txt-800 border-b dsp-inline"}>
      cssfabric classnames
      </div>
      <div class={"txt-gray-300 marg-b-4"}>
      generated examples
      </div>
      </div> -->

    <div class="pad-8">

        {#each Object.entries(moduleAttributes) as [moduleAttribute, moduleAttributeValues] }

            <div class={"w-sm-full"}>
                <h4 class={"border-l-2 pad-l-2"}>module {moduleAttribute}</h4>
                <div class={"marg-l-4 text-gray-400 pad-tb"}>
                    {`- cssfabric demo for  css ${moduleAttribute} rules`}
                </div>
                <div class={"marg-b-4 marg-l-4"}>
                    {#each [cssfabric.getModuleTagDebug({module, moduleAttribute})] as moduleDebug }
                        {#each Object.entries(moduleDebug) as [tag, debugTag]}
                            <div>
                                <h5>- {tag}</h5>
                                <div class={' marg-l-4'}>
                                    <ProxyDsp val={debugTag} {moduleAttribute}/>
                                </div>
                            </div>
                        {/each}
                    {/each}
                </div>
            </div>
        {/each}

        })
    </div>
</div>