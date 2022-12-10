"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock1_1 = require("./dummy/mock1");
// TODO: Fetch from Firestore and return
class FirebaseConfigFetcher {
    constructor() {
        this.getMockSelectorMap = (kwargs) => {
            return (0, mock1_1.getSelectorMap)();
        };
        this.getMock = (id, kwargs) => {
            if (id === "1") {
                return mock1_1.dummyMock1;
            }
            else if (id === "2") {
                return mock1_1.dummyMock2;
            }
            return null;
        };
    }
}
const firebaseConfigFetcher = new FirebaseConfigFetcher();
exports.default = firebaseConfigFetcher;
