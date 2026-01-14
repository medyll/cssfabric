import type { cssFabricModelType } from './types.js';
import fsExtra from 'fs-extra';

export class CssFabricExport {
	private cssFabricModel: cssFabricModelType;

	exportPaths: Record<'css' | 'json', string> = {
		css: './css-fabric.css',
		json: './cssFabric.json'
	};

	constructor(cssFabricModel: cssFabricModelType, exportPaths?: CssFabricExport['exportPaths']) {
		this.cssFabricModel = cssFabricModel;
		this.exportPaths = { ...exportPaths, ...this.exportPaths };

		return this;
	}

	public export(options: CssFabricExport['exportPaths']) {
		this.exportPaths = { ...this.exportPaths, ...options };

		this.createCssFile();
		this.createJsonModel();
	}

	private createCssFile() {
		//this.parseModel(this.cssFabricModel);
		fsExtra.ensureFileSync(this.exportPaths.css);
		fsExtra.writeFile(this.exportPaths.css, this.parseModel(this.cssFabricModel), (err) => {
			if (err) {
				console.error(err);
				return;
			} 
		});
	}
	private createJsonModel() {
		fsExtra.ensureFileSync(this.exportPaths.json);
		fsExtra.writeFile(this.exportPaths.json, JSON.stringify(this.cssFabricModel), (err) => {
			if (err) {
				console.error(err);
				return;
			} 
		});
	}

	private parseModel(json: Record<string, any>, parentKey = '') {
		let css = parse(json, parentKey);
		return `:root{\n${css}}`;
		function parse(json: Record<string, any>, parentKey = '', titre = '') {
			let css = '';
			for (const key in json) {
				if (typeof json[key] === 'object') {
					css += `\n/* ${key} */ `;
					//titre += `/* ----${key}--- */ `;
					css += parse(json[key], '', titre);
				} else {
					css += titre;
					css += `\n${parentKey}${key}: ${json[key]}`;
					titre = '';
				}
			}
			return css;
		}
	}
}
