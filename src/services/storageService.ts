import {Config, ISink, ISource} from "../interfaces/config";
import { Log } from "../types";

class StorageService {
    source: ISource | null = null;
    sink: ISink | null = null;

    constructor(config?: Config) {
        this.source = config?.src || null;
        this.sink = config?.sink || null;
    }

    // TODO: This should be set when starting the mock server
    setConfig = (config: Config) => {
        this.source = config.src || null;
        this.sink = config.sink || null;
    }

    getMockSelectorMap = async (kwargs ?: any): Promise<any> => {
        return this.source?.getMockSelectorMap(kwargs);
    };

    getMock = async (id: string, kwargs?: any): Promise<any> => {
        return this.source?.getMock(id, kwargs);
    }

    storeLog = async (log: Log): Promise<void> => {
        await this.sink?.sendLog(log);
    }
}

const storageService = new StorageService();
export default storageService;