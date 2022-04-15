

/** @type {import('./[moduleTag]/[modulePage]').Load} */
export async function load({params, fetch, session, stuff}) {
  // console.log(params, fetch, session, stuff);
  return {
    status: 200,
    props : {
      moduleTag : params.module,
      modulePage: params.page
    }
  };
}