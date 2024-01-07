import fsExtra from 'fs-extra';
import { harmony, triad, complement } from 'simpler-color';

type Steps = [number, number, number];
type Maskdd = [Ease, EaseTrigger];
type Mask = string;
type ToMask = string;
type CssRule = string;
type EaseTrigger = number;
type Ease = number;

class CssFabricExport {
	private cssFabricModel: string;

	exportPaths: Record<'css' | 'json', string> = {
		css: './css-fabric.css',
		json: './cssFabric.json'
	};

	constructor(cssFabricModel: cssFabricModelType, exportPaths?: CssFabricExport['exportPaths']) {
		this.cssFabricModel = JSON.stringify(cssFabricModel);
		this.exportPaths = { ...exportPaths, ...this.exportPaths };

		return this;
	}

	public export(options: CssFabricExport['exportPaths']) {
		this.exportPaths = { ...this.exportPaths, ...options };
		this.createCssFile();
		this.createJsonModel();
	}

	private createCssFile() {
		fsExtra.writeFile(this.exportPaths.css, this.cssFabricModel, (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('File created successfully.');
		});
	}
	private createJsonModel() {
		fsExtra.writeFile(this.exportPaths.json, this.cssFabricModel, (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('File created successfully.');
		});
	}
}

class CssFabricBuilder {
	// defaultVariationSteps
	cssFabricBuilderParams: CssFabricBuilderParams;

	constructor() {
		this.cssFabricBuilderParams = new CssFabricBuilderParams();
	}

	parseModel(json: Record<string, any>, parentKey = '') {
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

	createProgression(
		options: {
			property: string;
			steps: {
				steps: Steps;
				presets?: string[];
				ease: [Ease, EaseTrigger];
				reverseValue?: boolean;
			};
			iteratorMask: string;
			propertyValue?: {
				content: [Mask, ToMask];
				apply: string;
			};
		},
		format: 'css' | 'json' = 'css'
	) {
		const { property, iteratorMask, propertyValue } = options;
		const { presets } = options.steps ?? this.cssFabricBuilderParams.defaultVariationSteps;
		let [from, to, increment] = options.steps.steps;
		const [ease, trigger] = options.steps.ease;

		if (presets) {
			//sizeof prests becomes steps.
			// cancels ease
			if (presets) {
				increment = to / presets.length;
				options.steps.steps = [from, to, to / presets.length];
			}
		}

		let css = '';
		let cssKey = {};

		for (
			let i = from;
			i <= to;
			i += i < trigger || i >= to - trigger ? increment / ease : increment
		) {
			const iteratorTo = options.steps.reverseValue ? to - i : i;
			const prop = `${property}-${i}`;
			const content = propertyValue?.content[0]
				? `${propertyValue?.content[0].replace(
						'##',
						propertyValue.content[1]
					)} ${propertyValue?.apply}`
				: '';
			const newVal = `${iteratorMask.replace('##', iteratorTo.toString())}`;

			css += `${prop}-${i}: ${content} ${newVal};\rn`;
			cssKey[`${prop}`] = `${content} ${newVal}`;
		}
		return format === 'css' ? css : cssKey;
	}

	/**
	 * Dispatches elements based on the input mask.
	 *
	 * @template M - The type of the mask key.
	 * @template E - The type of the element.
	 * @template A - The type of the value.
	 *
	 * @param inputMask - The input mask.
	 * @param creatorFunction - The function to create the element based on the mask key.
	 * @param apply - The function to apply the value to the element.
	 */
	dispatchHandleElements<M extends string = string, E = Element, A = any>(
		inputMask: any[],
		creatorFunction: (maskKey: M, index: number) => E,
		apply: (element: E, value: A) => void
	) {
		inputMask.forEach((maskKey, index) => {
			const element = creatorFunction(inputMask[index], maskKey);
			apply(element, inputMask[index]);
		});
	}

	enqueue(callback: (callbackKey: string) => void, ...rest: string[][]) {
		const buildObject = (rootKeys, distributionKeys, index = 0) => {
			if (index >= distributionKeys.length) {
				return rootKeys.reduce((acc, key) => ({ ...acc, [key]: callback(key) }), {});
			}

			const currentDistribution = distributionKeys[index];
			return rootKeys.reduce((acc, key) => {
				const nestedObject = buildObject(currentDistribution, distributionKeys, index + 1);
				return { ...acc, [key]: nestedObject };
			}, {});
		};

		return buildObject(rest[0], rest.slice(1));
	}

	flattenIt(arr1: string[], arr2: string[], prefix: string = 'color-') {
		const legacy: Record<string, any> = {};
		arr1.forEach((themeColor) => {
			legacy[themeColor] = {};
			arr2.forEach((props2) => {
				if (!legacy[themeColor][props2]) legacy[themeColor][props2] = {};
				const tag = `${prefix}${[themeColor, props2].join('-')}`;
				legacy[themeColor][props2] = { [tag]: this.makeVariation(themeColor, props2) };
			});
		});
		return legacy;
	}

	makeVariation(themeColor: string, variation: string) {
		console.log(themeColor, variation);
		return this.cssFabricBuilderParams.variations?.[variation]
			? this.cssFabricBuilderParams.variations[variation].replace('##', themeColor)
			: themeColor;
	}

	makeDefaultVariations(
		arr1: string[],
		arr2: string[],
		prefix: string,
		vendor: string = '--cssfab-'
	) {
		const out: Record<string, any> = {};
		arr1.forEach((themeColor) => {
			out[themeColor] = {};
			arr2.forEach((props2) => {
				out[themeColor][props2] = this.createProgression(
					{
						property: `${vendor}${themeColor}-${props2}`,
						iteratorMask: `color-mix(in srgb, var(${prefix}${themeColor}) ${this.cssFabricBuilderParams.correspondances[props2]} ##%);`,
						steps: this.cssFabricBuilderParams.defaultVariationSteps
					},
					'json'
				);
			});
		});

		return out;
	}

	mainRule(vars: Record<string, any>, prefix: string) {
		const collect: Record<string, any> = {};
		Object.keys(vars).forEach((key) => {
			const val = vars[key];
			collect[key] = { [`${prefix}${key}`]: `${val};` };
		});

		return collect;
	}
}

export const config = {
	theme: {
		primary: '',
		secondary: '',
		accent: '',
		neutral: '',
		error: '',
		gray: '#323130'
	},
	palette: {
		yellow: '#ffb900',
		orange: '#d83b01',
		red: '#d13438',
		magenta: '#b4009e',
		purple: '#5c2d91',
		green: '#107c10',
		teal: '#008272',
		blue: '#0078d4',
		dark: '#323232'
	},
	scheme: {
		discrete: '#ccc',
		success: 'green',
		info: '#FFDD57FF',
		warning: 'hsl(48, 96%, 46%)',
		alert: 'hsl(27, 100%, 50%)',
		error: 'red'
	}
};

class CssFabricBuilderParams {
	variations = {
		none: 'var(theme-color-##);',
		light: 'color-mix(in srgb, var(theme-color-##) white ##%);',
		lighter: 'color-mix(in srgb, var(theme-color-##) white ##%);',
		dark: 'color-mix(in srgb, var(theme-color-##) black ##%);',
		darker: 'color-mix(in srgb, var(theme-color-##) black ##%);',
		complement: 'color-mix(in srgb, var(theme-color-##) black ##%);',
		invert: 'color-mix(in srgb, var(theme-color-##) black ##%);',
		'alpha-low': 'color-mix(in srgb, var(theme-color-##) transparent ##%);',
		alpha: 'color-mix(in srgb, var(theme-color-##) transparent ##%);',
		'alpha-high': 'color-mix(in srgb, var(theme-color-##) transparent ##%);'
	} as const;

	defaultVariationSteps = {
		steps: [0, 100, 10],
		ease: [2, 20]
	} as const;

	correspondances: Record<string, any> = {
		lighten: 'white',
		light: 'white',
		lighter: 'white',
		darken: 'black',
		dark: 'black',
		darker: 'black',
		gray: '#333',
		opacity: 'transparent',
		'alpha-high': 'transparent',
		'alpha-low': 'transparent',
		alpha: 'transparent'
	};

	baseColors: {
		primary: string;
		secondary: string;
		accent: string;
		neutral: string;
		error: string;
	};

	presets = [
		'light',
		'lighter',
		'dark',
		'darker',
		'complement',
		'invert',
		'alpha-low',
		'alpha',
		'alpha-high'
	];

	config: typeof config = {} as typeof config;

	constructor() {
		this.baseColors = harmony('#9e3902');
		this.config = this.deepMerge<typeof config>(config, { theme: harmony('#9e3902') });
		console.log(this.config);
		return this;
	}

	setVariations(variations: typeof CssFabricBuilderParams.prototype.variations) {
		this.variations = { ...this.variations, ...variations };
	}

	setDefaultVariationSteps(
		variationSteps: typeof CssFabricBuilderParams.prototype.defaultVariationSteps
	) {
		this.defaultVariationSteps = { ...this.defaultVariationSteps, ...variationSteps };
	}

	private deepMerge<T>(...objects: T[]): T {
		function objectMerge(target: T, source: T) {
			for (const key of Object.keys(source)) {
				const currenttarget = target[key];
				const currentsource = source[key];

				if (currenttarget) {
					const objectsource = typeof currentsource === 'object';
					const objecttarget = typeof currenttarget === 'object';

					if (objectsource && objecttarget) {
						void (Array.isArray(currenttarget) && Array.isArray(currentsource)
							? void (target[key] = currenttarget.concat(currentsource))
							: void objectMerge(currenttarget, currentsource));

						continue;
					}
				}

				target[key] = currentsource;
			}

			return target;
		}
		return objects.reduce(function (prev, next) {
			return { ...prev, ...objectMerge(prev, next) };
		}, objects[0]);
	}
}

enum ModelConfigKeys {
	base,
	palette,
	presets,
	status,
	out,
	gray,
	out2
}
type cssFabricModelKey = keyof typeof ModelConfigKeys;
type cssFabricModelType = Record<cssFabricModelKey, any>;
class CssFabricCore {
	vendorName = '--cssfab-';
	vendor = (fragment: string = '') => `${this.vendorName}${fragment}`;

	cssFabricModel: cssFabricModelType = {} as cssFabricModelType;
	cssFabricBuilderParams: CssFabricBuilderParams;
	cssFabricBuilder: CssFabricBuilder;

	constructor() {
		this.cssFabricBuilder = new CssFabricBuilder();
		this.cssFabricBuilderParams = new CssFabricBuilderParams();
	}

	private cleanModelKey(modelKey: string): string {
		return modelKey.replace(/'/g, '');
	}

	setParams(params: Partial<CssFabricBuilderParams>) {
		this.cssFabricBuilderParams = {
			...this.cssFabricBuilderParams,
			...params
		} as CssFabricBuilderParams;
	}

	create(...args: cssFabricModelKey[]): CssFabricExport {
		args.forEach((modelKey) => {
			switch (this.cleanModelKey(modelKey)) {
				case 'base':
					this.cssFabricModel.base = this.cssFabricBuilder.mainRule(
						this.cssFabricBuilderParams.config.theme,
						this.vendor()
					);
					break;
				case 'palette':
					this.cssFabricModel.palette = this.cssFabricBuilder.mainRule(
						this.cssFabricBuilderParams.config.palette,
						this.vendor('palette-')
					);
					break;
				case 'presets':
					this.cssFabricModel.presets = this.cssFabricBuilder.flattenIt(
						['primary', 'secondary', 'tertiary', 'accent'],
						this.cssFabricBuilderParams.presets,
						this.vendor('presets-')
					);
					break;
				case 'status':
					this.cssFabricModel.status = this.cssFabricBuilder.mainRule(
						this.cssFabricBuilderParams.config.scheme,
						this.vendor('status-')
					);
					break;
				case 'out':
					// assombrir et rendre opaque  'primary', 'secondary', 'tertiary'
					this.cssFabricModel.out = this.cssFabricBuilder.makeDefaultVariations(
						['primary', 'secondary', 'tertiary'],
						['lighten', 'darken', 'opacity'],
						this.vendor()
					);
					break;
				case 'gray':
					this.cssFabricModel.gray = this.cssFabricBuilder.createProgression(
						{
							property: this.vendor(`color-gray`),
							iteratorMask: `color-mix(in srgb, ${this.vendor(`color-gray`)}  ${
								this.cssFabricBuilderParams.correspondances.gray
							} ##%);`,
							steps: this.cssFabricBuilderParams.defaultVariationSteps
						},
						'json'
					);
					break;
				case 'out2':
					// assombrir et rendre opaque  'primary', 'secondary', 'tertiary'
					this.cssFabricModel.out2 = this.cssFabricBuilder.makeDefaultVariations(
						['foreground', 'bg'],
						['lighten', 'darken', 'opacity'],
						this.vendor()
					);
					break;
				default:
					console.log('default', modelKey);
					break;
			}
		});
		return new CssFabricExport(this.cssFabricModel);
	}
}

const cssFabric = new CssFabricCore();

const model = cssFabric.create('base', 'palette', 'presets', 'status', 'out', 'gray', 'out2');
model.export({ css: './css-fabric.css', json: './cssFabric.json' });

console.log('...', model);

// receive a list of arguments as strings
// transform it to enum
class Utils {
	static list<T>(...args: string[]) {
		const enumObj: Record<string, string> = {};

		args.forEach((arg: string, index) => {
			enumObj[arg] = arg;
		});

		return enumObj;
	}
}

Utils.list('base', 'palette', 'presets', 'status', 'out', 'gray', 'out2');
