import MockServer from "../core/server";
import TestConfig from "./testConfig";

const server = new MockServer(TestConfig, 3001, "/mocksv2");
console.debug(server.app);
server.start();
