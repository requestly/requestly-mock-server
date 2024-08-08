import fs from 'fs';

import ILogSink from "../interfaces/logSinkInterface";
import { Log } from "../types";


class FileLogSink implements ILogSink {
    store = async (log: Log): Promise<void> => {
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

const fileLogSink = new FileLogSink();
export default fileLogSink;
