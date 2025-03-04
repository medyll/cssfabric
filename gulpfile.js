import json2md from "json2md"
import { cssFabricSassConf } from "./cssfabric.sass.js";
import { glob, globSync,   } from 'glob';
import path from 'path';
import fs from "fs-extra"
import dartSass from 'sass';
import micromatch from "micromatch";
import chokidar from "chokidar";

const { 
    fabricModuleDir,
    fabricGeneratedDir,
    fabricStylesDir
} = cssFabricSassConf;

const doFabric = {
    /**
     * build readme fragment from _generated json file
     * @param file_content
     * @param file_info
     * @returns {{}}
     */
    fabricReadmeFile: (file_content) => { 
        // name of the module, from path
        const fileContent = file_content || {}
        const moduleList = fileContent?.cssfabric?.modules;

        let out = [];
        const content = [];
        const docContent = [];

        const table = { headers: ["modules", ""] };
        const rows = [];

        const labelIn = "<span style='width:80px;display:inline-block;overflow:visible'><b>";
        const labelOut = "</b></span>";

        const labelNestedIn = "<span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- ";
        const labelNestedOut = "</span>";

        const eol = '<br>&nbsp;&nbsp;-&nbsp;&nbsp;';

        out.push({ h1: "Welcome to cssfabric" });
        out.push({ p: "Willing to bring my utility-first 2011 css framework to a more decent life !" });
        out.push({ p: "This is also a learning point about gulp, webpack, packages and friends." });
        out.push({ blockquote: "yaocf !" });
        out.push({ p: "<br/>" });
        out.push({ h2: "Incoming features" });
        out.push({ p: "<br/>" });

        Object.keys(moduleList).forEach((moduleListKey, moduleListIndex, a) => {
            const moduleListValue = moduleList[moduleListKey];

            let title = moduleListValue?._metadata?.title;
            let description = moduleListValue?._metadata?.description;
            let docs = moduleListValue?._docs || {};

            let config = Object.keys(moduleListValue?._data);
            let cssProps = config?.cssProps;
            let collect;
            let collectContentList;
            let nestedLevels;


            if (docs?.attributes) {

                docContent.push({ hr: '' });
                docContent.push({ h4: `<strong>module ${title}</strong>` });


                Object.keys(docs.attributes).forEach((attributeCode) => {

                    collectContentList = [];
                    collect = {};
                    nestedLevels = [];

                    const attributeValue = docs.attributes[attributeCode];
                    // looking for tag

                    if (typeof attributeValue === "object" && !Array.isArray(attributeValue)) {
                        collect.title = `[${attributeCode}]`;
                        // si tag
                        if (attributeValue?.tag) {
                            collect.tag = `${labelIn}shorthand${labelOut}:  ${attributeValue.tag}`;
                        }
                        // si about
                        if (attributeValue?.about) {
                            collect.about = `- ${attributeValue.about}`;
                        }
                        // si keys
                        if (attributeValue?.keys) {

                            switch (isArrayOfType(attributeValue.keys)) {
                                case "strings":
                                case "numbers":
                                    collect.keys = `${labelIn}keys${labelOut}: ${attributeValue.keys.join('&nbsp;&nbsp;')}`;
                                    break;
                                case "arrays":
                                    collect.keys = `${labelIn}keys${labelOut}:${eol}` + attributeValue.keys.map((x) => x.join('&nbsp;&nbsp;')).join(eol)
                                    break;
                                case "objects":
                                    break;
                            }
                        }
                        // si levels
                        if (attributeValue?.levels) {
                            // si typeof level array => array of string or of arrays
                            if (Array.isArray(attributeValue.levels)) {
                                // if [][]
                                console.log(title, 'levels isArrayOfType ', isArrayOfType(attributeValue.levels))
                                switch (isArrayOfType(attributeValue.levels)) {
                                    case "strings":
                                    case "numbers":
                                        collect.levels = `${labelIn}levels${labelOut}: ${eol}${attributeValue.levels.join('&nbsp;&nbsp;')}`;
                                        break;
                                    case "arrays":
                                        collect.levels = `${labelIn}levels${labelOut}:${eol}` + attributeValue.levels.map((x) => x.join('&nbsp;&nbsp;')).join(eol)
                                        break;

                                }

                                // if {}[]
                                if (attributeValue.levels.every(x => typeof x === 'object' && !Array.isArray(x))) {
                                    collect.levels = `${labelIn}levels${labelOut}: ${eol}${attributeValue.levels.map((x) => x.join('&nbsp;&nbsp;')).join(eol)}`;
                                }

                            }
                            // si typeof level object
                            if (!Array.isArray(attributeValue.levels) && typeof (attributeValue.levels === "object")) {
                                nestedLevels.push(`${labelIn}level keys${labelOut}:`);
                                Object.keys(attributeValue.levels).forEach((levelKey) => {
                                    let levelValue = attributeValue.levels[levelKey].join('&nbsp;&nbsp;&nbsp;&nbsp;')
                                    // console.log(levelValue)
                                    nestedLevels.push(`${labelNestedIn}${levelKey}${labelNestedOut}: ${levelValue}`);
                                })
                                // [].concat(...arr));
                            }
                        }
                    }

                    if (collect.title) docContent.push({ h4: collect.title });
                    if (collect.about) docContent.push({ "p": collect.about });

                    if (collect.tag) collectContentList.push(collect.tag);
                    if (collect.keys) collectContentList.push(collect.keys);
                    if (collect.levels) collectContentList.push(collect.levels);

                    if (nestedLevels && nestedLevels.length) collectContentList.push(nestedLevels.join('<br/>'));

                    docContent.push({ "ul": collectContentList });

                    // docContent.push({"p":  "<br/>"}) ;

                });
                //docContent.push({p: '<br/><br/>'});

            }

            rows.push([title, description]);

        });

        function isArrayOfType(arr) {
            let ret = '';

            if (!Array.isArray(arr)) {
                console.log(Array.isArray(arr), { arr })
            }
            if (arr.every(x => Array.isArray(x))) ret = 'arrays'
            if (arr.every(x => typeof x === 'string')) ret = 'strings'
            if (arr.every(x => typeof x === 'number')) ret = 'numbers'
            if (arr.every(x => typeof x === 'object' && !Array.isArray(x))) ret = 'objects'

            return ret;
        }


        table.rows = rows;

        out.push({ table: table })
        out.push({ p: "<br/>" });
        out.push({ ul: content });
        out.push({ p: "<br/>" });
        out.push({ h3: "More details" });
        out = out.concat(docContent);

        return json2md(out);
    },

    /**
     * transform scss to json file with all modules variables
     * @param file
     * @returns {string}
     */
    fabricSassToJson: (file) => {
        let { file_content, file_info } = file;

        let obj;
        obj = file_content.obj;
        obj = obj.split("|").filter(n => n);

        const redPath = "";
        const redModulePath = fabricModuleDir + "/";

        let header = '';
        let footer = '';

        let importExport = `@import  "./src/${redPath}vendor/sass-json-export/stylesheets/sass-json-export.scss";`;


        Object.values(obj).forEach((v, k, a) => {
            let module_path = redModulePath + v;
            let module_name = v
                .replace("_", "")
                .split("/")
                ?.pop()
                .split(".")?.[0]
                .replace("-vars", "");

            if (v) {
                header += makeHeader(module_path, module_name);
                footer += makeFooter(module_name);
            }
        });

        // return ""

        let out = header;
        out += "\r\n\r\n" + importExport + "\r\n\r\n" + importExport + "\r\n";
        out += footer;

        function makeHeader(path, module_name) {
            // form is module-vars.$module-config
            return '@use "' + path + '.scss" as  ' + module_name + "; \r\n";
        }

        function makeFooter(module_name) {
            // form is module.$module-(config|*)
            let out1 = ` ( _data: ${module_name}.$${module_name}-config , _metadata :${module_name}.$${module_name}-metadata , _docs :${module_name}.$${module_name}-docs )`;

            return (
                "@include json-encode(" + out1 + ",comment," + module_name + ");\r\n"
            );
        }


        return out;
    },
    // todo use regexp
    fabricCssVarExportFile: (filePath) => {
        let module_path = filePath
            .split("modules/")[1]
            .replace("modules", "")
            .replace(".scss", "");

        let module_filename = filePath
            .substring(filePath.lastIndexOf("/"))
            .replace(".scss", "")
            .replace("/", "");

        let module_name = filePath
            .substring(filePath.lastIndexOf("/_"))
            .replace(".scss", "")
            .replace("-vars", "")
            .replace("_", "")
            .replace("/", "");

        return `|{"module_path" : "${module_path}","module_filename" : "${module_filename}","module_name" : "${module_name}"}`;
    },

    /**
     * list a directory using a glob pattern : glob.sync(pattern, options)
     * convert each file content to a string with append and prepend options
     * use doFabric.fabricSassToJson to cast file content to json
     * 
     */
    task_varsExport_replacement: async function() {
        const listFiles = globSync(fabricModuleDir + "/**/_*-vars.scss", {
            nodir: true,
            pwd: process.cwd(),
            absolute: true
        });
        const cleanFiles = listFiles.map(filePath => {
            const relativePath = path.relative(fabricModuleDir, filePath);
            const modulePath = path.dirname(relativePath);
            const moduleName = path.basename(filePath, '.scss');

            return `${modulePath}/${moduleName}`;
        }).join('|');


        let scssContent = doFabric.fabricSassToJson({ file_content: { obj: cleanFiles }, file_info: '' });
        // write scss to file
        fs.writeFileSync('temp.scss', scssContent,{ flag: 'w' });

        const comp = dartSass.compile('temp.scss')
        fs.removeSync('temp.scss');
        const content = comp.css;
        const start = '{"cssfabric":{"modules":{';
        const end = " }}}";

        const regexIn = /\/\*\! json-encode: {/gm;
        const regexOut = /} \*\//gm;

        let exp = content
            .replace(regexIn, "")
            .replace(regexOut, ",")
            .replace(/,\s*$/, "");

        let fileContents = `${start}${exp}${end}`

        // write to fabricGeneratedDir with fileName cssFabric.vars.json
        fs.ensureFileSync(fabricGeneratedDir + '/cssFabric.vars.json');
        fs.writeFileSync(fabricGeneratedDir + '/cssFabric.vars.json', fileContents, { flag: 'w' });
    },
}

export function task_readme_new(cb) {
    // reads cssFabric.vars.json in fabricGeneratedDir   
    globSync(fabricGeneratedDir + "/cssFabric.vars.json").forEach(filePath => {

        let file_content = fs.readFileSync(filePath, "utf8");

        let readMeVal = doFabric.fabricReadmeFile(JSON.parse(file_content));

        fs.writeFileSync(filePath.replace('.json', '.md'), readMeVal, { flag: 'w' });
    })
}

async function transformSass2css() {


    // ensure directory fabricStylesDir exists, using fs-extra
    fs.ensureDirSync(fabricStylesDir);
    // list all files from  `${fabricModuleDir}/**/*.scss`
    // exclusion pattern : exclude `**/*css-fabric*` and exclude `**/*_*` 
    const files = globSync(`${fabricModuleDir}/**/*.scss`, { ignore: [`**/*css-fabric*`, `**/*!(_)*`], nodir: true });

    console.log('List files')  
    // for each file
    const promises = []
    files.sort((a,b)=>{
        return a > b
    }).forEach(file => {
        // run sass({outputStyle: "expanded"}).on("error", sass.logError) on the file
        const css = dartSass.renderSync({ file: file, outputStyle: "expanded" }).css.toString();
        const cssCompressed = dartSass.renderSync({ file: file, outputStyle: "compressed" }).css.toString();

        const finalFileName = path.basename(file).replace("-", ".").replace('.scss', '.css')
        // extract the file.basename and the file.path by removing ${fabricModuleDir}
        const newFileObj = {
            basename: finalFileName,
            path: `${fabricStylesDir}` + path.dirname(file.replace(fabricModuleDir, ""))
        }
        const newFileObjCompressed = {
            basename: finalFileName.replace('.css', '.min.css'),
            path: `${fabricStylesDir}` + path.dirname(file.replace(fabricModuleDir, ""))
        }

        if (!newFileObj.basename.includes("_") && !newFileObj.basename.includes("css.fabric")) {
            fs.ensureDirSync(newFileObj.path)
            promises.push(fs.writeFile(`${newFileObj.path}/${newFileObj.basename}`, '\r\n/**---------------------'+newFileObj.basename+"---------------------*/\r\n" + css,{flag:'w'}).then(res => res))
            promises.push(fs.writeFile(`${newFileObjCompressed.path}/${newFileObjCompressed.basename}`, cssCompressed,{flag:'w'}).then(res => res));
        }
    });

    await Promise.all(promises);

    console.log('write modules')
        // normal stylesheets
    const normalPattern = ['**/*.css', '!**/*responsive*.css', '!**/*min*.css', '!**/*cssfabric*.css', '!**/*temp*.css'];
    // normal minified stylesheets
    const miniFiedPattern = [`**/*min.css`, `!**/*responsive*.css`, '!**/*cssfabric*.css', '!**/*temp*.css']
    // responsive stylesheets
    const responsivePattern = ['**/*responsive.css*', '!**/*cssfabric*.css', '!**/*temp*.css']
    // responsive minified stylesheets
    const responsiveMinPattern = [`**/*responsive.min.css`, '!**/*cssfabric*.css', '!**/*temp*.css'];

    // files have now been writed down in the /lib folder
    // we can now merge them into 3 files : cssfabric.css, cssfabric.min.css, cssfabric.responsive.css
    // and cssfabric.responsive.min.css
    const libFiles = globSync(`${fabricStylesDir}/**/*.css`);
    const fileCollector = { normalPattern: [], miniFiedPattern: [], responsivePattern: [], responsiveMinPattern: [] };
    const fileNames = { normalPattern: 'cssfabric.css', miniFiedPattern: 'cssfabric.min.css', responsivePattern: 'cssfabric.responsive.css', responsiveMinPattern: 'cssfabric.responsive.min.css' };

    libFiles.forEach(file => {
        //  console.log(file,normalPattern);
        const fileContent = fs.readFileSync(file, 'utf8');
        const fileNotDot = file.replace('./', '');
 
        if (micromatch.all(fileNotDot, normalPattern)) { 
            fileCollector.normalPattern.push(fileContent);
        }
        if (micromatch.all(fileNotDot, miniFiedPattern)) {
            fileCollector.miniFiedPattern.push(fileContent);
        }
        if (micromatch.all(fileNotDot, responsivePattern)) {
            fileCollector.responsivePattern.push(fileContent);
        }
        if (micromatch.all(fileNotDot, responsiveMinPattern)) {
            fileCollector.responsiveMinPattern.push(fileContent);
        }
    });
    // console.log(fileCollector);
    // return;
    console.log('write main files')
    // 
    Object.keys(fileCollector).forEach(key => {
        fs.ensureDirSync(`${fabricStylesDir}/`);
        fs.writeFileSync(`${fabricStylesDir}/${fileNames[key]}`, fileCollector[key].join(''),{ flag: 'w' });
    })
    console.log('Done')

}


export function watchSass() {
    doIt()
    const watcher = chokidar.watch(fabricModuleDir + "/**/*.scss", {
        ignored: /(^|[\/\\])temp\.scss$/, // ignore temp.scss
        persistent: true,
    });


    console.log('watchSass, listening for changes')

    watcher
        .on('start', (path) => doIt())
        .on('change', (path) => doIt())
        .on('unlink', (path) => doIt());

    function doIt() {
        transformSass2css();
        doFabric.task_varsExport_replacement();
        task_readme_new();
    }

}

watchSass();
