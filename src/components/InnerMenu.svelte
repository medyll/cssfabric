

<script lang="ts">

import {fabricNavigation} from "../scripts/utils";

export let action:string;
export let module:string ;
</script>

<ul class={"menu-xl-h menu-v menu-small shad-8"}>
    <li class={(action==='demo')? 'active':''}>
        <a href={fabricNavigation.getModuleDemoPage(module)}>
            Demo
        </a>
    </li>
    <li class={(action==='classnames')? 'active':''}>
        <a href={fabricNavigation.getModuleClassNamesPage(module)}>
            Classnames
        </a>
    </li>
    <li class={(action==='docs')? 'active':''}>
        <a href={fabricNavigation.getModuleDocsPage(module)}>
            Docs
        </a>
    </li>
</ul>