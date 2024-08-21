import {IConfig, ISink, ISource} from "../interfaces/config";
import { Log } from "../types";

class StorageService {
    src: ISource | null = null;
    sink: ISink | null = null;

    constructor(config?: IConfig) {
        this.src = config?.src || null;
        this.sink = config?.sink || null;
    }

    // TODO: This should be set when starting the mock server
    setConfig = (config: IConfig) => {
        this.src = config.src || null;
        this.sink = config.sink || null;
    }

    getMockSelectorMap = async (kwargs ?: any): Promise<any> => {
        return this.src?.getMockSelectorMap(kwargs);
    };

    getMock = async (id: string, kwargs?: any): Promise<any> => {
        return this.src?.getMock(id, kwargs);
    }

    storeLog = async (log: Log): Promise<void> => {
        await this.sink?.storeLog(log);
    }
}

const storageService = new StorageService();
export default storageService;