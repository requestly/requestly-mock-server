import { Log } from "../types";

class ILogSink {
    store = async (log: Log): Promise<void> => {
        return;
    }
}

export default ILogSink;