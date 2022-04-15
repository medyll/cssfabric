import jsonConfig              from "../_generated/export.variables.json" ;
import cssfabricClassNames from "./cssfabricClassNames";

export type IFabricConfModulePart = Record<string, any>;
export type IFabricConfModuleDataPart = Record<string, any>;
export type IFabricConfModuleMetaDataPart = Record<string, any>;
export type IFabricConfModuleDocsPart = Record<string, any>;
export type TFabricConfModuleDocsAttributesPart = Record<string, any>;

//
const getModuleList = (): Record<string, any> => {
    return jsonConfig["cssfabric"]?.["modules"] || {};
};

const getModuleConfig = (module?: string): IFabricConfModulePart => {
    if (module) return jsonConfig["cssfabric"]?.["modules"]?.[module] || {};
    return jsonConfig;
};

const getModuleData = (module?: string): IFabricConfModuleDataPart => {
    if (module) return jsonConfig["cssfabric"]?.["modules"]?.[module]?.["_data"] || {};
    return jsonConfig;
};

const getModuleMetaData = (module?: string): IFabricConfModuleMetaDataPart => {
    if (module)
        return jsonConfig["cssfabric"]?.["modules"]?.[module]?.["_metadata"] || {};
    return jsonConfig;
};

const getModuleDocs = (module?: string): IFabricConfModuleDocsPart => {
    if (module)
        return jsonConfig["cssfabric"]?.["modules"]?.[module]?.["_docs"] || {};
    return jsonConfig;
};

const getModuleDocsAttributes = (module?: string): TFabricConfModuleDocsAttributesPart => {
    if (module)
        return jsonConfig["cssfabric"]?.["modules"]?.[module]?.["_docs"]?.["attributes"] || {};
    return jsonConfig;
};

export default {
    getModuleList,
    getModuleConfig,
    getModuleData,
    getModuleMetaData,
    getModuleDocs,
    getModuleDocsAttributes,
    getClassNames: cssfabricClassNames,
    getModuleClassNames: cssfabricClassNames,
    getModuleTagClassNames: cssfabricClassNames.getModuleTagClassNames,
    getModuleTagDebug: cssfabricClassNames.getModuleTagDebug,
};
