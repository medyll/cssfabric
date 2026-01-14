import fs from 'fs-extra';
import { CssGuide } from './cssfGuide.js';
import { cssfModelTypes, cssfModel } from './cssfModel.js';

 

const cssGuide = new CssGuide(cssfModelTypes);
const { meta, interfaces, classMethods, classTypes, transformerTypes } =
	cssGuide.generate(cssfModel);
fs.writeFileSync(
	'src/lib/cssf/cssfLib.ts',
	meta + classTypes + transformerTypes + interfaces + classMethods
);
