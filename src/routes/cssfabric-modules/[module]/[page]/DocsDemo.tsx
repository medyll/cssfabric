import cssfabric   from "@medyll/cssfabric";
import React       from "react";
import DemoElement from "@/components/DemoElements/DemoElement";
import InnerMenu   from "@/components/InnerMenu";

interface IDocsClassNames {
    module: string;
}


export default function DocsDemo(props: IDocsClassNames) {
    
    const {module,}        = props;
    const moduleAttributes = cssfabric.getModuleDocsAttributes(module);
    
    let out;
    
    function proxyDsp(val: any, moduleAttribute: any, moduleRule: string = "default") {
        if (Array.isArray(val)) {
            return DspArray(val, moduleAttribute, moduleRule)
        } else {
            return dspObject(val, moduleAttribute, moduleRule)
        }
    }
    
    function DspArray(val: any[], moduleAttribute: any, moduleRule: any) {
        return <div className={"marg-b-2"}>
            <p className={"marg-b-2 pad-tb"}>cssfabric.{moduleRule} : {moduleAttribute} classnames for cssfabric</p>
            <div className={"flex-h flex-wrap cell-spacing"}>
                {val.map((className, y) => {
                    return <DemoElement moduleAttribute={moduleAttribute} moduleRule={moduleRule}
                                        cssFabricClassName={className}>
                        [{moduleAttribute}] .{className}
                    </DemoElement>
                })}
            </div>
        </div>
    }
    
    function dspObject(val: Record<string, any>, moduleAttribute: any, moduleRule: any) {
        return <div>
            {Object.keys(val).map((moduleRule) => {
                return <div>
                    <h5 className={"pad-2 pad-r-8 dsp-block-inline border-b"}>{moduleRule}</h5>
                    <div className={"marg-l-4"}>
                        {proxyDsp(val[moduleRule], moduleAttribute, moduleRule)}
                    </div>
                </div>
            })}
        </div>
        
    }
    
    return <div>
        {/*<div className={"flex-v flex-items-end pad-r-8"}>
         <div className={"txt-800 border-b dsp-inline"}>
         cssfabric classnames
         </div>
         <div className={"txt-gray-300 marg-b-4"}>
         generated examples
         </div>
         </div>*/}
        
        <div className={"pad-8"}>
            {
                Object.keys(moduleAttributes).map((moduleAttribute: string) => {
                    
                    const moduleDebug = cssfabric.getModuleTagDebug({module, moduleAttribute});
                    
                    return <div key={moduleAttribute} className={"w-sm-full"}>
                        <h4 className={"border-l-4 pad-l-4"}>module {moduleAttribute}</h4>
                        {/*<pre>{JSON.stringify(moduleDebug,null,"\t")}</pre>*/}
                        <div className={"marg-l-8 text-gray-400 pad-tb-2"}>
                            {`- cssfabric expressions list for  css ${moduleAttribute} rules`}
                        </div>
                        <div className={"marg-b-8 marg-l-8"}>
                            {Object.keys(moduleDebug).map((tag) => {
                                return <div>
                                    <h5 className={""}>- {tag}</h5>
                                    <div className={' marg-l-8'}>{proxyDsp(moduleDebug[tag], moduleAttribute)}</div>
                                </div>
                            })
                            }
                            {/*{proxyDsp(moduleDebug, moduleAttribute)}*/}
                        </div>
                    </div>
                })
                }
                </div>
                </div>
            }
