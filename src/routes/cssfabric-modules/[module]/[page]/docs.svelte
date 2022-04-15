<script lang="ts">
  import cssfabric from '../../lib/scripts/cssfabric';
  import utils from '../../lib/scripts/utils';
  import {htmlUtils} from '../../utils';

  export let module      = '';
  const moduleAttributes = cssfabric.getModuleDocsAttributes(module);

  $: console.log({module,moduleAttributes})
  function tre(part: any) {
    
    // if object, if array !!!
    // console.log(part)
    let out: any,
        levelValues: any;
    
    if (part && !Array.isArray(part) && typeof (part === 'object')) {
      out = Object.keys(part).map((levelKey) => {
        let levelValue = part[levelKey];
        // console.log({levelKey, levelValue})
        if (Array.isArray(levelValue)) {
          //levelValues = levelValue.map(x => <div class={"marg-r-4 w-2-min"}>{x}</div>)
        }
        
        return `<div class={"pad"}>
                               <div class={"color-gray-600 dsp-inline marg-r-1 border-b pad"}>{levelKey}</div>
                                              <div class={"flex-h flex-wrap marg-l-4 pad "}>{levelValues}</div>
                                                             </div>`;
      });
    } else {
      
      switch (utils.isArrayOfTypes(part)) {
        case 'strings':
        case 'numbers':
          out = `<div class={"flex-h flex-wrap"}>{part.map((x: string) => <div
              class={"marg-r-4"}>{x}</div>)}</div>`;
          break;
        case 'arrays':
          out = part.map((x: string[]) => x.join('  ')).map((x: any) => htmlUtils.enclose(x));
          break;
        
      }
      
    }

    return out;
  }
</script>

<svelte:head>

    <title>{module} cssfabric documentation</title>
</svelte:head>

<div>
    {#each Object.entries(moduleAttributes) as [moduleAttribute, moduleAttributeModel]}


        <!--let {tag, keys, levels, levelsDeclin, levelsLinked, classNames, values, about} = moduleAttributeModel;
        let toParse = {
            keys,
            levels,
            levelsDeclin,
            levelsLinked,
            classNames
        };

        let moduleClassNames = cssfabric.getModuleClassNames.getModuleTagClassNames({
            module,
            moduleAttribute
        });-->

        <div class={"pad-b-8"}>
            <div
                    class={"flex-h flex-inline border-b  theme-border-primary align-middle cell-spacing marg-b-1"}>
                <label>{moduleAttributeModel.tag}</label>
                <div class={"text-400"}>{moduleAttribute}</div>
            </div>
            <div class={"color-gray-500 marg-b-2 pad-l-8 "}>
                <div class={"dsp-inline pad-all-2"}>
                    {moduleAttributeModel.about}
                </div>
            </div>
            <div class={"cell-spacing flex-main"}>999
                <!--{#each Object.keys(toParse).filter((x:any) => toParse?.[x]) as w}
                <div class={"marg-b-4"}>
                    <div class={"w-8 pad-l-4 border-l-4 text-900"}>
                        {w}:
                    </div>
                    <div class={"marg-l-4"}>
                        {tre(toParse[w])}
                    </div>
                </div>
                {/each}-->

            </div>
        </div>
    {/each}
</div>