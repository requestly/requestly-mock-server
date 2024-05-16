import MockServer from "../core/server";
import firebaseConfigFetcher from "./firebaseConfigFetcher";

const server = new MockServer(3001, firebaseConfigFetcher, "/mocksv2");
console.log(server.app);
server.start();
