import IConfig from "../interfaces/config";
import ILogSink from "../interfaces/logSinkInterface";
import { Log } from "../types";

class StorageService {
    config ?: IConfig|null = null;

    constructor(config ?: IConfig, logSink ?: ILogSink) {
        this.config = config;
    }

    // TODO: This should be set when starting the mock server
    setConfig = (config: IConfig) => {
        this.config = config;
    }

    getMockSelectorMap = async (kwargs ?: any): Promise<any> => {
        return this.config?.getMockSelectorMap(kwargs);
    };

    getMock = async (id: string, kwargs?: any): Promise<any> => {
        return this.config?.getMock(id, kwargs);
    }

    storeLog = async (log: Log): Promise<void> => {
        await this.config?.storeLog?.(log);
    }
}

const storageService = new StorageService();
export default storageService;