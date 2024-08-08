import MockServer from "../core/server";
import TestConfig from "./testConfig";

const server = new MockServer(3001, TestConfig, "/mocksv2");
console.debug(server.app);
server.start();
