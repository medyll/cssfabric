// ## WIP

import gulp from "gulp";
import jsonTransform from "gulp-json-transform"
import cache from "gulp-cached"
import gulFileList from "gulp-filelist"
import gulpConcat from "gulp-concat-util"
import gulpRename from "gulp-rename"
import json2md from "json2md"
import gulpIgnore from "gulp-ignore"
import {cssFabricSassConf} from "./cssfabric.sass.js";
import {Transform} from "stream";
import util from "util";

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import through2 from "through2";
const sass = gulpSass(dartSass);

const {
    fabricRootDir,
    fabricStylesDir,
    fabricConfDir,
    fabricModuleDir,
    fabricGeneratedDir,
} = cssFabricSassConf;


const tr = new Transform({writableObjectMode: true, readableObjectMode: true});


function TransformStream(transformFunction) {
    // Set the objectMode flag here if you're planning to iterate through a set of objects rather than bytes
    Transform.call(this, { objectMode: true });
    this.transformFunction = transformFunction;
}

util.inherits(TransformStream, Transform);

TransformStream.prototype._transform = function(obj, enc, done) {
    return this.transformFunction(this, obj, done);
};



const doFabric = {
    /**
     * build readme fragment from _generated json file
     * @param file_content
     * @param file_info
     * @returns {{}}
     */
    fabricReadmeFile: (file_content, file_info) => {
        // name of the module, from path
        const fileContent = file_content || {}
        const moduleList = fileContent?.cssfabric?.modules;

        let out = [];
        const content = [];
        const docContent = [];

        const table = {headers: ["modules", ""]};
        const rows = [];

        const labelIn = "<span style='width:80px;display:inline-block;overflow:visible'><b>";
        const labelOut = "</b></span>";

        const labelNestedIn = "<span style='margin-left:20px;width:80px;display:inline-block;overflow:visible'>- ";
        const labelNestedOut = "</span>";

        const eol = '<br>&nbsp;&nbsp;-&nbsp;&nbsp;';

        out.push({h1: "Welcome to cssfabric"});
        out.push({p: "Willing to bring my utility-first 2011 css framework to a more decent life !"});
        out.push({p: "This is also a learning point about gulp, webpack, packages and friends."});
        out.push({blockquote: "yaocf !"});
        out.push({p: "<br/>"});
        out.push({h2: "Incoming features"});
        out.push({p: "<br/>"});

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

                docContent.push({hr: ''});
                docContent.push({h4: `<strong>module ${title}</strong>`});


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
                            console.log(title, 'keys isArrayOfType ', isArrayOfType(attributeValue.keys))
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

                                // if {}[] ..... ?
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

                    if (collect.title) docContent.push({h4: collect.title});
                    if (collect.about) docContent.push({"p": collect.about});

                    if (collect.tag) collectContentList.push(collect.tag);
                    if (collect.keys) collectContentList.push(collect.keys);
                    if (collect.levels) collectContentList.push(collect.levels);

                    if (nestedLevels && nestedLevels.length) collectContentList.push(nestedLevels.join('<br/>'));

                    docContent.push({"ul": collectContentList});

                    // docContent.push({"p":  "<br/>"}) ;

                });
                //docContent.push({p: '<br/><br/>'});

            }

            rows.push([title, description]);

        });

        function isArrayOfType(arr) {
            let ret = '';

            if (!Array.isArray(arr)) {
                console.log(Array.isArray(arr), {arr})
            }
            if (arr.every(x => Array.isArray(x))) ret = 'arrays'
            if (arr.every(x => typeof x === 'string')) ret = 'strings'
            if (arr.every(x => typeof x === 'number')) ret = 'numbers'
            if (arr.every(x => typeof x === 'object' && !Array.isArray(x))) ret = 'objects'

            return ret;
        }


        table.rows = rows;

        out.push({table: table})
        out.push({p: "<br/>"});
        out.push({ul: content});
        out.push({p: "<br/>"});
        out.push({h3: "More details"});
        out = out.concat(docContent);

        return json2md(out);
    },

    /**
     * transform scss to json file with all modules variables
     * @param file
     * @returns {string}
     */
    fabricSassToJson: (file) => {
        let {file_content, file_info} = file;

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
        out += "\r\n" + importExport + "\r\n";
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
    }
}


function fabricVarExportFile(filePath) {
    // name of the module, from path
    let module_name = filePath
        .substring(filePath.lastIndexOf("modules/"))
        .split("\\")
        ?.pop()
        .split(".")?.[0]
        .replace("modules/", "");

    return module_name + "|";
}


// exports sass maps to json
function task_varsExport(cb) {
    let sourceFiles = fabricModuleDir + "/**/_*-vars.scss";

    gulp
        .src(sourceFiles)
        //.pipe(cache(task_varsExport))
        .pipe(
            gulFileList("cssFabric-vars", {
                destRowTemplate: fabricVarExportFile,
                removeExtensions: false,
            })
        )
        .pipe(through2.obj(function(file, _, cb) {
            if (file.isBuffer()) {
                const content = file.contents.toString();
                const start = '{"obj":"';
                const end = "\"}";

                file.contents = Buffer.from(`${start}${content}${end}`)
            }
            cb(null, file);
        }))
        .pipe(
            jsonTransform(function (file_content, file_info) {
                return doFabric.fabricSassToJson({file_content: file_content, file_info});
            })
        )
        .pipe(cache(task_varsExport))
        .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
        .pipe(through2.obj(function(file, _, cb) {
            if (file.isBuffer()) {
                const content = file.contents.toString();
                const start = '{"cssfabric":{"modules":{';
                const end = " }}}";

                const regexIn = /\/\*\! json-encode: {/gm;
                const regexOut = /} \*\//gm;

                let exp = content
                    .replace(regexIn, "")
                    .replace(regexOut, ",")
                    .replace(/,\s*$/, "");

                file.contents = Buffer.from(`${start}${exp}${end}`)
            }
            cb(null, file);
        }))
        .pipe(
            gulpRename(function (path) {
                path.dirname = path.dirname;
                path.extname = ".json";
                path.basename = path.basename.replace("-", ".");
            })
        )
        .pipe(gulp.dest(fabricGeneratedDir))
        .on("end", () => {
            return cb();
        });

    return cb();
}

export function task_readme(cb) {
    gulp
        .src(fabricGeneratedDir + "/*.json")
        .pipe(
            jsonTransform(function (file_content, file_info) {
                return doFabric.fabricReadmeFile(file_content, file_info);
            })
        )
        .pipe(
            gulpRename(function (path) {
                path.dirname = path.dirname;
                path.extname = ".md";
                path.basename = path.basename.replace("-", ".");
            })
        )
        .pipe(gulp.dest(fabricGeneratedDir))
        .on("end", () => {
            return cb();
        });
}

/**
 * concatenate css files
 * by min | responsive | ...
 *
 * @param {function} cb gulp callback
 */
function task_mergeInclude(cb) {
    //
    const dest = fabricStylesDir;
    // const dir = fabricStylesDir + "/core";
    const dir = fabricStylesDir ;

    const steps = [];
    // normal stylesheets
    steps.push(
        gulp
            .src([
                `${dir}/**/*.css`,
                `!${dir}/**/*responsive*.css`,
                `!${dir}/**/*min*.css`,
            ])
            .pipe(gulpConcat("cssfabric.css"))
            .pipe(through2.obj(function(file, _, cb) {
                if (file.isBuffer()) {
                    const content = file.contents.toString();
                    const start = '/** Merged by Mydde */';
                    file.contents = Buffer.from(`${start}${content}`)
                }
                cb(null, file);
            }))
            .pipe(cache(task_mergeInclude))
            .pipe(gulp.dest(dest))
            .on("end", () => {
                return cb();
            })
    );

    // normal minified stylesheets
    steps.push(
        gulp
            .src([`${dir}/**/*min.css`, `!${dir}/**/*responsive*.css`])
            .pipe(gulpConcat("cssfabric.min.css"))
            .pipe(cache(task_mergeInclude))
            .pipe(gulp.dest(dest))
            .on("end", () => {
                return cb();
            })
    );

    // responsive stylesheets
    steps.push(
        gulp
            .src([`${dir}/**/*responsive.css`, `!${dir}/**/*min..css`])
            .pipe(gulpConcat("cssfabric.responsive.css"))
            .pipe(cache(task_mergeInclude))
            .pipe(gulp.dest(dest))
            .on("end", () => {
                return cb();
            })
    );

    // responsive minified stylesheets
    steps.push(
        gulp
            .src([`${dir}/**/*responsive.min.css`])
            .pipe(gulpConcat("cssfabric.responsive.min.css"))
            .pipe(cache(task_mergeInclude))
            .pipe(gulp.dest(dest))
            .on("end", () => {
                return cb();
            })
    );

    return [...steps];
}

/**
 * task_sass2css
 * transform scss to css
 * store files in /lib
 *
 * rename *-responsive to *.responsive, because not dot in sass file
 *
 * @param {function} cb
 * @returns function
 */
function task_sass2css(cb) {
    return (
        gulp
            .src(`${fabricModuleDir}/**/*.scss`)
            .pipe(gulpIgnore.exclude("**/*css-fabric*"))
            .pipe(
                gulpRename(function (path) {
                    path.basename = path.basename.replace("-", ".");
                })
            )
            // to css and to /core
            .pipe(
                sass({outputStyle: "expanded"}).on("error", sass.logError)
            )
            .pipe(gulp.dest(`${fabricStylesDir}`))
            // to css and minify and to /core
            .pipe(sass({outputStyle:'compressed'}))
            .pipe(
                gulpRename(function (path) {
                    path.extname = ".min.css";
                    path.basename = path.basename.replace("-", "."); 
                })
            )
            .pipe(gulp.dest(`${fabricStylesDir}`))
            .on("end", () => {
                return cb();
            })
    );
}


export function watchSass(cb) {
    gulp.watch(
        fabricModuleDir + "/**/*.scss",
        gulp.series(task_sass2css, task_mergeInclude, task_varsExport)
    );
    cb();
}

export function watchReadme(cb) {
    gulp.watch(
        [fabricModuleDir, "!" + fabricModuleDir + "/**/_*.scss"],
        task_readme
    );

    cb();
}