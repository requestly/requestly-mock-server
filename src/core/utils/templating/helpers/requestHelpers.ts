import { MockContextParams } from "../../../../types/internal";

const requestHelpers = (params: MockContextParams) => {
  const helpers = {
    urlParam: (param: string) => params.urlParams[param],
    method: () => params.method,
    statusCode: () => params.statusCode,
    header: (param: string, defaultValue: string = '') => {
      // handlebars passes object when no value is passed
      // {
      //   lookupProperty: [Function: lookupProperty],
      //   name: 'header',
      //   hash: {},
      //   data: { root: [Object] },
      //   loc: { start: [Object], end: [Object] }
      // }
      if(typeof defaultValue === 'object') {
        defaultValue = '';
      }
      
      if(typeof param === 'object') {
        return defaultValue
      }

      return params.headers[param] || defaultValue;
    },
  };
  return helpers;
};

export default requestHelpers;
