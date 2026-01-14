import { colorConfig } from './config.js';
import type { CssFabricBlock } from './cssProperties.js';

export class CssFabricVariations {
	verticalModel: Record<string, any>;
	className: string;
	insert!: string;

	constructor(model: Record<string, any>, options: any = {}) {
		[this.className, this.verticalModel] = Object.entries(model)[0];
		// this.insert = insert;
	}

	generateCss(prefix: string = '') {
		this.generateRoot(this.verticalModel, prefix);
		return this.generateCombinations(this.verticalModel, prefix);
	}
	static loopVertical() {}
	static loopVariations(fragmentObj: CssFabricBlock) {
		const fragmentKey = Object.keys(fragmentObj)[0];
		const fragment = Object.values(fragmentObj)[0];

		let variations = fragment.variations;
		let variationValues = Object.values(variations);
		let firstVarKey = variationValues?.[0];
		let firstKey = Object.keys(variations)?.[0];

		let strap = firstVarKey?.[0];

		let remainingVariations = Object.fromEntries(Object.entries(variations).slice(1));

		// if (strap.includes('cssFab')) {
		let output: Record<string, any> = {};
		// loop on each array
		for (const value of [firstVarKey]) {
			// create CssModel
			value.forEach((element: string) => {
				// if enclosed by ()
				const enclosedValue = element.match(/\((.*?)\)/)?.[1];
				 
				// if contains cssFab.
				let modelData: Record<string, any> = {
					[fragmentKey]: { [firstKey]: [], ...remainingVariations }
				};

				const options: Record<string, any> = {};
				let theme: string;

				if (element.includes('cssFab.')) {
					// replace with cssFab.theme
					const fabTheme = element.split('cssFab.')[1].replace(')', '');
					// modelData[fabTheme] = {};
					modelData[fragmentKey][firstKey] = Object.keys(colorConfig[fabTheme] ?? {});
					if (enclosedValue) options[firstKey] = fabTheme;
					
					theme = fabTheme;
				} else {
					modelData[fragmentKey][firstKey] = value;
				}

				// create CssModel
				const cssModel = new CssFabricVariations(modelData, options);
				let results = cssModel.generateCss();
			 
				if (theme) {
					output[theme] = results;
				} else {
					output = results;
				}
			});
		}
		return output;
		// }
		/*  else {
			let modelData: Record<string, any> = {
				[fragmentKey]: { [firstKey]: [], ...remainingVariations }
			};
			//
			let objg = {};
			for (const value of firstVarKey) {
				objg[value] = firstVarKey;
			}
			return modelData; 
		} */
	}

	private generateRoot(obj: Record<string, string[]>, prefix: string = '') {
		let result: Record<string, any> = {};
		result[`.${this.className}`] = 'thin solid blue';
		const ref = Object.entries(obj).reduce(
			(acc: Record<string, string[]>, [style, propertyValues]) => {
				acc[style] = propertyValues;
				return acc;
			},
			{}
		);
	}

	private generateCombinations(
		obj: Record<string, string[]>,
		prefix: string = '',
		remainingCombinations: Record<string, string> = {}
	): Record<string, any> {
		let result: Record<string, any> = {};

		// if no more keys, return the remaining combinations
		if (Object.keys(remainingCombinations).length > 0) {
			result[prefix] = remainingCombinations;
		}

		for (const key in obj) {
			for (const value of obj[key]) {
				const newPrefix = prefix + (prefix ? '-' : '.' + this.className + '-') + value;
				let cssVar = `--var(${this.className}-${key},${value})`;
				const newCombination = {
					...remainingCombinations,
					[`${this.className}-${key}`]: cssVar,
					[`--${this.className}-${key}`]: value
				};

				const { [key]: _, ...remainingObj } = obj;
				const subCombinations = this.generateCombinations(remainingObj, newPrefix, newCombination);
				result = { ...result, ...subCombinations };
			}
			break; // S'arrêter après avoir traité la première clé
		}

		return result;
	}
}
