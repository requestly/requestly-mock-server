import MockServer from "../core/server";
import firebaseConfigFetcher from "./firebaseConfigFetcher";
import fileLogSink from "./FileLogSink";

const server = new MockServer(3001, firebaseConfigFetcher, fileLogSink, "/mocksv2");
console.debug(server.app);
server.start();
