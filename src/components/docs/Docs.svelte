<script lang="ts">
  import cssfabric from '../../lib/scripts/cssfabric';
  import utils from '../../lib/scripts/utils';
  import {htmlUtils} from '../../utils';
  import 'svelte-highlight/styles/github.css';

  export let module      = '';
  const moduleAttributes = cssfabric.getModuleDocsAttributes(module);

  //$: console.log({module, moduleAttributes});

  let toParseKeys =
        ['keys',
         'levels',
         'levelsDeclin',
         'levelsLinked',
         'classNames'];

  function tre(part: any) {
    
    // if object, if array !!!
    // console.log(part)
    let out: any,
        levelValues: any;
    
    if (part && !Array.isArray(part) && typeof (part === 'object')) {


      out = Object.keys(part).map((levelKey) => {
        let levelValue = part[levelKey];

        if (Array.isArray(levelValue)) {
          levelValues = levelValue.map(x => `<div class="marg-r-4 w-2-min">${x}</div>`).join('');
        }
        
        return `<div class="flex flex-h">
                               <div class="color-gray-600 w-small marg-r-1 border-b pad">${levelKey} </div>
                                              <div class="flex flex-h flex-wrap marg-l-2 pad ">${levelValues}</div>
                                                             </div>`;
      }).join('');
    } else {
      
      switch (utils.isArrayOfTypes(part)) {
        case 'strings':
        case 'numbers':
          out = `<div class="flex flex-h flex-wrap gap-tiny">` + part.map((x: string) => `<div class="pad">${x}</div>`).join('') + `</div>`;
          break;
        case 'arrays':
          out = part.map((x: string[]) => x.join('')).map((x: any) => htmlUtils.enclose(x)).join('');
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

    <!--{@debug moduleAttributes}-->
    {#each Object.entries(moduleAttributes) as [moduleAttribute, moduleAttributeModel]}

        <div class={"pad-b-8"}>
            <div class={"flex-h flex-inline border-b  theme-border-primary align-middle cell-spacing marg-b-1"}>
                <label>{moduleAttributeModel.tag}</label>
                <div class={"text-400"}>{moduleAttribute}</div>
            </div>
            <div class={"color-gray-500 marg-b-2 pad-l-8 "}>
                <div class={"dsp-inline pad-all-2"}>
                    {moduleAttributeModel.about}
                </div>
            </div>
            <div class={"cell-spacing flex-main"}>
                {#each toParseKeys as keyToParse}
                    {#if moduleAttributeModel?.[keyToParse]}
                        <div class={"flex marg-b-4"}>
                            <div class={"w-8 pad-l-4 border-l-4 text-900"}>
                                {keyToParse}:
                            </div>
                            <!--<div>
                                <HighlightAuto  code={'tre(moduleAttributeModel?.[keyToParse])'} />
                            </div>-->
                            <div class={"marg-l-4"}>
                                {@html tre(moduleAttributeModel?.[keyToParse])}
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
</div>