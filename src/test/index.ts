import MockServer from "../core/server";
import firebaseConfigFetcher from "./firebaseConfigFetcher";
import fileLogSink from "./FileLogSink";

const server = new MockServer(3000, firebaseConfigFetcher, fileLogSink, "/mocksv2");
console.log(server.app);
server.start();
