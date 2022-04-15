import cssfabric from '../lib/scripts/cssfabric';

const urlModule         = 'cssfabric-modules';
const pageDocsName      = 'docs';
const pageDemoName      = 'demo';
const pageDemoClassName = 'classnames';

export const fabricNavigation = {
  getHomePages           : () => {
    return `/${urlModule}`;
  },
  getModuleDocsPage      : (module: string) => {
    return `/${urlModule}/${module}/${pageDocsName}`;
  },
  getModuleClassNamesPage: (module: string) => {
    return `/${urlModule}/${module}/${pageDemoClassName}`;
  },
  getModuleDemoPage      : (module: string) => {
    return `/${urlModule}/${module}/${pageDemoName}`;
  },
  getActiveLinks         : (): string[] => {
    const cssfab = cssfabric.getModuleList();
    return Object.keys(cssfab).filter((link: string) => cssfab?.[link]?._docs?.attributes);
  }
};

