
import { Config } from "../interfaces/config";
import { DummySource } from "./dummy/dummySource";
import { FileLogSink } from "./dummy/FileLogSink";

const testConfig: Config = {
    src: new DummySource(),
    sink: new FileLogSink(),
}
export default testConfig;

