import cssfabric from "@medyll/cssfabric";
import InnerMenu from "@/components/InnerMenu";

interface IDocsClassNames {
    module: string;
}


export default function DocsClassNames(props: IDocsClassNames) {
    
    const {module,}        = props;
    const moduleAttributes = cssfabric.getModuleDocsAttributes(module);
    // const moduleAttributes = cssfabric.
    
    
    return <div>
        {/*<div className={"flex-v flex-items-end pad-r-8"}>
            <div className={"txt-800 border-b dsp-inline"}>
                cssfabric classnames
            </div>
            <div className={"txt-gray-300 marg-b-4"}>
                generated classnames
            </div>
        </div>*/}
        <div className={"pad-8"}>
            {
                Object.keys(moduleAttributes).map((moduleAttribute: string) => {
                    const newOut = cssfabric.getModuleClassNames.getModuleTagClassNames({module, moduleAttribute});
                    
                    return <div key={moduleAttribute} className={" "}>
                        <h4 className={"pad-tb-2"}>{moduleAttribute}</h4>
                        <div className={"text-gray-400 pad-tb-2"}>
                            {`- cssfabric expressions list for  css ${moduleAttribute} rules`}
                        </div>
                        <div className={"marg-b-8"}>
                            {newOut.map((x: string, y: number) => <div className={""}
                                                        key={x + y}>.{x}</div>)}
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}