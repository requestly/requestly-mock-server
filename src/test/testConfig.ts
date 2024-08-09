
import { IConfig } from "../interfaces/config";
import { DummySource } from "./dummy/dummySource";
import { FileLogSink } from "./dummy/FileLogSink";

const testConfig = new IConfig(new DummySource(), new FileLogSink());
export default testConfig;

