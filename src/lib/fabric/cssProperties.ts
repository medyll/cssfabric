import { cssFabricSheet } from './cssFabricSheet.js';
import fsExtra from 'fs-extra';
import { CssFabricVariations } from './cssVariationsAi.js';

export type CssFabricBlock = {
	[key: string]: {
		initial: string;
		syntax: string;
		fabric: Record<'classNames' | 'declinations' | 'variations', Record<string, string>>;
		variations: Record<string, string[] | string[][]>;
	};
};

export type CssFabricFragment = {
	description: string;
	syntax: string; // contains | as separator
	template: string;
	initial: string;
	appliesTo: string;
	fabric: Record<'classNames' | 'declinations' | 'variations', Record<string, string>>;
	variations: Record<string, string>;
};

function camelToUnderscore(str: string) {
	return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

type RenderMode = 'length' | 'percentage' | 'range' | 'number' | 'raw';

const syntaxDecodeTypeConfig: Record<
	string,
	[number, number, number, (string | [number, number])?, [number, number]?] | string[]
> = {
	length: [0, 52, 16, 'rem'],
	width: [0, 256, 32, 'rem', [2, 16]],
	'border-width': [0, 2, 0.5, 'px', [2, 16]],
	height: [0, 256, 32, 'rem', [2, 16]],
	percentage: [0, 100, 10, '%', [2, 16]],
	number: [0, 10, 1, 'px', [2, 16]],
	opacity: [0.1, 1.0, 0.2, [2, 16]],
	color: ['blue', 'red', 'yellow', 'orange', 'green', 'violet']
};

function cleanSyntaxKey(toClean: string): string {
	let cleaned = toClean.replace(/(em|px|%|rem)$/, '');
	cleaned = cleaned.endsWith('-') ? cleaned.slice(0, -1) : cleaned;
	return cleaned;
}

interface DecodedGroup {
	optional: boolean;
	repeatable: boolean;
	quantifier: { min: number; max: number } | null;
	optionalPart: string | null;
}

class SyntaxDecode {
	static hasProgression(...rest: string[]): boolean {
		return rest.some((value) => Boolean(syntaxDecodeTypeConfig[value]));
	}
	static generateValues(...title: string[]) {
		let result: Record<string, any> = {};
		let progression = syntaxDecodeTypeConfig[title[1]] ?? syntaxDecodeTypeConfig[title[0]];

		if (progression?.every((value: unknown) => typeof value === 'string')) {
			// presets iteration
			progression.forEach((value: string) => {
				let newKey = `${fabricTitle}-${value}`;
				result[cleanSyntaxKey(newKey)] = value;
			});
		} else {
			const unity = SyntaxDecode.getUnity(progression);
			let [from, to, increment, unit, [ease = 0, trigger] = []] = progression;

			for (
				let i = from;
				i <= to;
				i += i < trigger || i >= to - trigger ? increment / ease : increment
			) {
				let newKey = `${title[0]}-${i}`;
				result[cleanSyntaxKey(newKey)] = [i, unit];
			}
		}
		// return value,unity
		return result;
	}
	private static getUnity(arr: any[]): string | null {
		for (let i = arr?.length - 1; i >= 0; i--) {
			if (typeof arr[i] === 'string') {
				return arr[i];
			}
		}
		return null;
	}
}

class DistributionType {
	static detectDistributionType(
		fragment: CssFabricFragment,
		fabricKey: 'classNames' | 'declinations'
	): string {
		let fabricKeys = Object.keys(fragment.fabric[fabricKey]);
		let syntaxKeys = fragment.syntax.split('|').map((s: string) => s.trim());

		if (!fabricKeys.some((key) => syntaxKeys.includes(key))) {
			return 'detectionProgressive';
		}

		if (fabricKeys.every((key, index) => syntaxKeys[index] === key)) {
			return 'detectionFollowLine';
		}

		return 'unknown';
	}
}

class CSSFormalSyntaxDecoder {
	private syntax: string;
	private decodedSyntax: Record<string, DecodedGroup>;

	constructor() {
		this.syntax = '';
		this.decodedSyntax = {};
	}

	private decodeQuantifier(group: string) {
		const quantifierMatch = group.match(/\{(\d+),(\d+)\}/);
		if (quantifierMatch) {
			return { min: parseInt(quantifierMatch[1]), max: parseInt(quantifierMatch[2]) };
		}
		return null;
	}

	private getRenderMode(syntax: string): RenderMode {
		if (syntax.includes('length')) {
			return 'length';
		} else if (syntax.includes('percentage')) {
			return 'percentage';
		} else if (syntax.includes('range')) {
			return 'range';
		} else if (syntax.includes('number')) {
			return 'number';
		} else {
			return 'raw';
		}
	}

	private decodeFormalSyntax(syntax: string) {
		let decodedSyntax: any = {};

		// Split the syntax into groups
		let groups = syntax.split('|').map((g) => g.trim());

		groups.forEach((group) => {
			let optional = false;
			let repeatable = false;
			let quantifier = null;
			let optionalPart = null;

			// Check if the group is optional or repeatable
			if (group.endsWith('?')) {
				optional = true;
				group = group.slice(0, -1); // Remove the question mark
			}

			if (group.endsWith('+')) {
				repeatable = true;
				group = group.slice(0, -1); // Remove the plus sign
			}

			// Check for quantifiers like {1,4}
			quantifier = this.decodeQuantifier(group);
			if (quantifier) {
				group = group.replace(/\{\d+,\d+\}/, '').trim(); // Remove the quantifier part
			}

			// Check for optional parts
			const optionalPartMatch = group.match(/\[(.*?)\]/);
			if (optionalPartMatch) {
				optionalPart = optionalPartMatch[1];
				group = group.replace(optionalPartMatch[0], '').trim(); // Remove the optional part
			}

			// Remove brackets from the group
			group = group.replace(/\[|\]/g, '');

			decodedSyntax[group] = { optional, repeatable, quantifier, optionalPart };
		});

		return decodedSyntax;
	}

	decodeAndGenerateValue(
		fragmentPiece: { [key: string]: CssFabricFragment },
		key = '',
		followUp = ''
	) {
		let result: Record<string, any> = {};
		const fragmentTitle = Object.keys(fragmentPiece)[0];
		const fragment = fragmentPiece[fragmentTitle];

		let out: Record<string, any> = {};
		// 
		Object.keys(fragment?.fabric).forEach((fabricMode) => {
			switch (fabricMode) {
				case 'classNames':
					let classNames = this.applyClassNames(fragment, fabricMode); 

					if (Object.keys(classNames.classNames).length > 0) {
						// result = { ...result, [fragmentTitle]: { classNames: classNames.classNames } };
						result = { ...result, ...{ classNames: classNames.classNames } };
					}

					break;
				case 'vertical': 
					break;
				case 'variations':
					const ouh = { [fragmentTitle]: fragment.fabric };
					const tr = CSSFormalSyntaxDecoder.translateVariations(ouh);

					const gf = { [fragmentTitle]: { classNames: CssFabricVariations.loopVariations(tr) } };
					result = { ...result, ...gf };
					break;
				case 'colors':
					Object.assign(result, {});
					break;
			}
		});
 
		return result;
	}

	static translateVariations(cssBlock: CssFabricBlock) {
		let out: Record<string, any> = { ...cssBlock };
		const mdl = Object.keys(cssBlock)[0];

		Object.entries(cssBlock[mdl].variations).forEach(([key, value]) => { 
			out[mdl].variations[key] = value.split('|').map((v) => v.trim());
		});
		return out;
	}

	private applyClassNames(
		fragment: CssFabricFragment,
		fabricMode: 'classNames' | 'declinations' | 'colors'
	): Record<string, any> {
		let result: Record<string, any> = {};
		const fragmentTitle = Object.keys(fragment.fabric[fabricMode])[0];
		const fragmentPiece = fragment.fabric[fabricMode];
		 
		const distributionType = DistributionType.detectDistributionType(fragment, fabricMode);

		 
		Object.keys(fragmentPiece).forEach((fabricType) => {
			//const distributionType = DistributionType.detectDistributionType(fragment, fabricType);
			let syntax = fragment.syntax;
			let fabricTitle =
				fragmentTitle == fabricType ? fragmentTitle : `${fragmentTitle}-${fabricType}`;
			let decodedSyntax = this.decodeFormalSyntax(syntax);

			Object.keys(decodedSyntax).forEach((syntaxKey) => {
				let syntaxValue = decodedSyntax[syntaxKey];
				if (
					syntaxValue.optional ||
					syntaxValue.repeatable ||
					syntaxValue.quantifier ||
					syntaxValue.optionalPart
				) {
					// This is a complex syntax, we need to decode it further
					// ...
				} else {
					switch (distributionType) {
						case 'detectionProgressive':
							// Handle progressive distribution
							let progression =
								syntaxDecodeTypeConfig[syntaxKey] ?? syntaxDecodeTypeConfig[fabricTitle];

							let generatedValues: Record<string, any> = {};

							if (!progression) {
								let className = `.${fabricTitle}-${syntaxKey}`;
								generatedValues = {
									[className]: {
										[`--${fabricTitle}`]: `var(--${fabricTitle}-${syntaxKey});`,
										[`${fabricTitle}`]: `var(--${fabricTitle},${syntaxKey});`
									}
								};
							}
							if (SyntaxDecode.hasProgression(fabricTitle, syntaxKey)) {

								generatedValues = {};

								for (const [key, value] of Object.entries(
									SyntaxDecode.generateValues(fabricTitle, syntaxKey)
								)) {
									generatedValues[`.${key}`] = {
										[`--${fabricTitle}-${value[0]}`]: `${value[0]}${value[1]};`,
										[`${fabricTitle}`]: `var(--${fabricTitle}-${value[0]});`
									};
								}
							}

							Object.assign(result, generatedValues);
							break;
						case 'detectionFollowLine':
							// Handle follow line distribution
							// ...
							break;
						default:
							// Handle unknown distribution
							// ...
							break;
					}
				}
			});
		});
		return { [fabricMode]: result };
	}
}

export type CssFabricPropertyFragment = Record<string, CssFabricFragment>;
export type CssFabricPropertyCatalog = Record<
	string,
	CssFabricPropertyFragment | CssFabricFragment
>;

export class CSSProperties {
	private cssProperties: any;
	private onlyKeys: string[];

	constructor(cssProperties: any, onlyKeys: string[] = []) {
		this.cssProperties = cssProperties;
		this.onlyKeys = onlyKeys;
	}

	private chkValidity(cssProperties: any): boolean {
		if (cssProperties.fabric) return true;

		for (const key in cssProperties) {
			if (cssProperties.hasOwnProperty(key)) {
				const element = cssProperties[key];
				if (typeof element === 'object') {
					if (element.fabric) {
						return true;
					} else {
						return this.chkValidity(element);
					}
				}
				return false;
			}
		}
		return false;
	}

	private recursiveFabricSearch(
		cssProperties: CssFabricPropertyCatalog,
		parent: string = '',
		followUp: string[] = []
	): Record<string, any> {
		let out: Record<string, any> = {};
		for (let key in cssProperties) { 
			if (this.chkValidity(cssProperties[key]) && cssProperties.hasOwnProperty(key)) {
				key = camelToUnderscore(key); 

				const element = cssProperties[key];
				const elementTitle = Object.keys(cssProperties)[0];
				if (typeof element === 'object') {
					// migration to new syntax
					if (element.fabric && (!this.onlyKeys.length || this.onlyKeys.includes(key))) {
						followUp.push(key);
						try {
							let decoder = new CSSFormalSyntaxDecoder();
							let result = decoder.decodeAndGenerateValue({ [key]: element }, key, followUp);

							parent += key;
							if (!out[parent]) out[parent] = {};

							out[parent] = { ...out[parent], ...result };
							//followUp = '';
						} catch (err) {
							out[parent] = { cssError: key };
							// followUp = '';
						}
						// followUp = [];
					} else {
						out = { ...out, ...this.recursiveFabricSearch(element, key, followUp) };
						followUp = [];
						parent = '';
						//followUp = '';
					}
				}
			} else { 
			} 
			parent = '';
			// followUp = '';
		}
		return out;
	}

	public generateCSS(): Record<string, any> { 
		return this.recursiveFabricSearch(this.cssProperties);
	}
}
 

function modifyObject(obj: Record<string, any>, filepath: string) {
	for (let key in obj) {
		if (typeof obj[key] === 'object') {
			if (obj[key].fabric && !obj[key].fabric.classNames) {
				let tmp;
				tmp = obj[key].fabric;
				obj[key].fabric = {};
				obj[key].fabric.classNames = tmp;
			} else {
				modifyObject(obj[key], filepath);
			}
		} else {
		}
	}
}
