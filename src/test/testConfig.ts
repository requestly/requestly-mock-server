
import { IConfig } from "../interfaces/config";
import { DummySource } from "./dummy/dummySource";
import { FileLogSink } from "./dummy/FileLogSink";

const testConfig: IConfig = {
    src: new DummySource(),
    sink: new FileLogSink(),
}
export default testConfig;

