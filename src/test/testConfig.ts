import { dummyMock1, dummyMock2, dummyMock3, dummyMock4, getSelectorMap } from "./dummy/mock1";
import IConfig from "../interfaces/config";
import { Log } from "../types";
import fs from 'fs';



// TODO: Fetch from Firestore and return
class TestConfig implements IConfig {
    getMockSelectorMap = (kwargs?: any) => {
        return getSelectorMap();
    };
    
    getMock = (id: string, kwargs?: any) => {
        if(id === "1") {
            return dummyMock1;
        }
        else if(id === "2") {
            return dummyMock2;
        }
        else if(id === "3") {
            return dummyMock3;
        }
        else if(id === "4") {
            return dummyMock4;
        }

        return null;
    }

    // file log store
    storeLog = async (log: Log): Promise<void> => {
        const logLine = `${JSON.stringify(log.HarEntry)}\n`;
        fs.writeFile(`${log.mockId}.log`, logLine, { flag: 'a+' }, (err) => {
            if(err) {
                console.log("Error dumping log to file.");
                throw err;
            }
        });
        Promise.resolve();
    }
}

const testConfig = new TestConfig();
export default testConfig;
