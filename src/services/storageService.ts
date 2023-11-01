import IConfigFetcher from "../interfaces/configFetcherInterface";
import ILogSink from "../interfaces/logSinkInterface";
import { Log } from "../types";

class StorageService {
    configFetcher ?: IConfigFetcher|null = null;
    logSink ?: ILogSink|null = null;

    constructor(configFetcher ?: IConfigFetcher, logSink ?: ILogSink) {
        this.configFetcher = configFetcher;
        this.logSink = logSink;
    }

    // TODO: This should be set when starting the mock server
    setConfigFetcher = (configFetcher: IConfigFetcher) => {
        this.configFetcher = configFetcher;
    }

    setLogSink(logSink: ILogSink) {
        this.logSink = logSink;
    }

    getMockSelectorMap = async (kwargs ?: any): Promise<any> => {
        return this.configFetcher?.getMockSelectorMap(kwargs);
    };

    getMock = async (id: string, kwargs?: any): Promise<any> => {
        return this.configFetcher?.getMock(id, kwargs);
    }

    storeLogs = async (log: Log): Promise<void> => {
        await this.logSink?.store(log);
    }
}

const storageService = new StorageService();
export default storageService;