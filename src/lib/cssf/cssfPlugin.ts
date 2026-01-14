import postcss from 'postcss';
import { CssfClass } from './cssfLib.js';

export const myPlugin = () => (root: postcss.Root) => {
	const cssfClass = new CssfClass();
	root.walkDecls((decl) => {
		const parent = decl?.parent?.selector as keyof CssfClass;
		const value = decl.value;
		const prop = decl.prop;

		const method = cssfClass?.[parent];
		if (method) {
		}

		//decl.prop = 'my-fed-' + decl.prop;
		// if (decl?.parent) decl.parent.append({ prop: 'my-prefix-' + decl.prop, value: decl.value });
	});
};

export const cssfProcessor = postcss([myPlugin()]);

cssfProcessor
	.process(
		`{
			
			element {
				position: top() left() right() bottom() margin();		
				box: border() shadow() radius() overflow( x auto, y hidden);	
				gutter: type() gap() padding();
				size: width() height() ratio();
				typography: font() size() style() underline() shadow();
				color: text() bg() opacity();
				animate: transition() all() duration() timing() delay();
			}
			 
			  
			 

		`
	)
	.then((result) => {
	});
