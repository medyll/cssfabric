import fs from 'fs';
import path from 'path';
import glob from 'glob';
import fsx from 'fs-extra';

function dotToCamelCase(str) {
	return str.replace(/\.(\w)/g, function (match, letter) {
		return letter.toUpperCase();
	});
}
class FileProcessor {
	path = './src/lib';
	pathAlias = '$lib';

	constructor(path, pathAlias) {
		this.path = path;
		this.pathAlias = pathAlias;
	}
	/**
	 *
	 * @param {string} directory
	 * @param {string} target
	 * @returns  {Array.<FileInfo>}
	 */
	_recursiveListSvelteFile(directory, target) {
		const files = glob.sync(directory + '/*', {
			ignore: [
				// directory + '/index.ts',
				directory + '/**.demo.*',
				directory + '/**Demo.*',
				directory + '/**preview.*',
				directory + '/**sitedata*',
				directory + '/**.md',
				directory + '/**.json',
				directory + '/**.cssf',
				//directory + '/**.scss*',
				directory + '/**wip*',
				directory + '/**Example.*',
				directory + '/**indexApi*',
				directory + '/**Readme*'
			]
		});

		let svelteFiles = [];
		files.forEach((file) => {
			if (fsx.statSync(file).isDirectory()) {
				svelteFiles = svelteFiles.concat(this._recursiveListSvelteFile(file, target));
			} else {
				let cleanPath = path.normalize(file.replace(target, ''));

				svelteFiles.push({
					path: cleanPath,
					file: path.basename(file),
					moduleName: path.basename(file).replace(/\.[^/.]+$/, '')
				});
			}
		});
		return svelteFiles;
	}

	/**
	 *
	 * @param {Array.<FileInfo>} fileInfoList
	 */
	_writeExportFromFileInfoList(fileInfoList) {
		let exportString = '// Reexport of entry components\n';
		fileInfoList.forEach((fileInfo) => {
			let file = fileInfo.file;
			let moduleName = this.dotToCamelCase(fileInfo.moduleName);
			let path = fileInfo.path.replace(/\\/g, '/').replace('.ts', '.js');
			let isSvelteFile = file.endsWith('.svelte');

			if (!isSvelteFile) {
				exportString += `export * from '${this.pathAlias}${path}';\n`;
			} else {
				exportString += `export { default as ${moduleName} } from '${this.pathAlias}${path}';\n`;
			}
			
		});
		fsx.writeFileSync(`${this.path}/index.ts`, exportString);
	}

	makeIndexFile() {
		let fileInfoList = this._recursiveListSvelteFile(this.path, this.path);
		this._writeExportFromFileInfoList(fileInfoList);
	}

	dotToCamelCase(str) {
		return str.replace(/\.([a-z])/g, function (g) {
			return g[1].toUpperCase();
		});
	}
}

function main() {
	new FileProcessor('./src/lib', '$lib').makeIndexFile();
}

main();
