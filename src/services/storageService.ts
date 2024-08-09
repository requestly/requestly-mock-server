import {IConfig} from "../interfaces/config";
import { Log } from "../types";

class StorageService {
    config?: IConfig | null = null;

    constructor(config?: IConfig) {
        this.config = config;
    }

    // TODO: This should be set when starting the mock server
    setConfig = (config: IConfig) => {
        this.config = config;
    }

    getMockSelectorMap = async (kwargs ?: any): Promise<any> => {
        return this.config?.src.getMockSelectorMap(kwargs);
    };

    getMock = async (id: string, kwargs?: any): Promise<any> => {
        return this.config?.src.getMock(id, kwargs);
    }

    storeLog = async (log: Log): Promise<void> => {
        await this.config?.sink?.storeLog(log);
    }
}

const storageService = new StorageService();
export default storageService;