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

      return params.headers[param?.toLowerCase()] || defaultValue;
    },
    body: (key: string) => { // passes key
      const rawData = params.data
      const defaultResponse = ''
      if(rawData && rawData.text) {
        try {
          // fix-me: handle url encoded params and other operations on body later
          const parsedData = JSON.parse(rawData.text)
          return parsedData[key] ?? defaultResponse
        } catch (error) {
          /* NOOP */
        }
      }
      return defaultResponse
    }
  };
  return helpers;
};

export default requestHelpers;
