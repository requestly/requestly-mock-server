import fs from 'fs';

import { ISink } from "../../interfaces/config";
import { Log } from "../../types";


export class FileLogSink implements ISink {
    sendLog = async (log: Log): Promise<void> => {
        const logLine = `${JSON.stringify(log.HarEntry)}\n`;
        fs.writeFile(`${log.mockId}.log`, logLine, { flag: 'a+' }, (err) => {
            if(err) {
                console.log("Error dumping log to file.");
                throw err;
            }
        });
    }
}
