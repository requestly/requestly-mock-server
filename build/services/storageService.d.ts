import IConfigFetcher from "../interfaces/configFetcherInterface";
declare class StorageService {
    configFetcher?: IConfigFetcher | null;
    constructor(configFetcher?: IConfigFetcher);
    setConfigFetcher: (configFetcher: IConfigFetcher) => void;
    getMockSelectorMap: (kwargs?: any) => Promise<any>;
    getMock: (id: string, kwargs?: any) => Promise<any>;
}
declare const storageService: StorageService;
export default storageService;
