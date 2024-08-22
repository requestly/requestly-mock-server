import MockServer from "../core/server";
import TestConfig from "./testConfig";

const server = new MockServer({
    port: 3001,
    pathPrefix: "/mocksv2",
    storageConfig: TestConfig
});
console.debug(server.app);
server.start();
