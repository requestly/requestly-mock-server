import IConfigFetcher from "../interfaces/configFetcherInterface";

class StorageService {
    configFetcher ?: IConfigFetcher|null = null;

    constructor(configFetcher ?: IConfigFetcher ) {
        this.configFetcher = configFetcher;
    }

    // TODO: This should be set when starting the mock server
    setConfigFetcher = (configFetcher: IConfigFetcher) => {
        this.configFetcher = configFetcher;
    }

    getMockSelectorMap = async (kwargs ?: any): Promise<any> => {
        return this.configFetcher?.getMockSelectorMap(kwargs);
    };

    getMock = async (id: string, kwargs?: any): Promise<any> => {
        return this.configFetcher?.getMock(id, kwargs);
    }
}

const storageService = new StorageService();
export default storageService;