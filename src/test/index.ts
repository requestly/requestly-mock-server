import MockServer from "../core/server";
import firebaseConfigFetcher from "./firebaseConfigFetcher";

new MockServer(3000, firebaseConfigFetcher, "/mocksv2").start();
