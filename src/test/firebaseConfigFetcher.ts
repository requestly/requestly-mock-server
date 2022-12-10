import { dummyMock1, dummyMock2, getSelectorMap } from "./dummy/mock1";
import IConfigFetcher from "../interfaces/configFetcherInterface";


// TODO: Fetch from Firestore and return
class FirebaseConfigFetcher implements IConfigFetcher {
    getMockSelectorMap = (kwargs?: any) => {
        return getSelectorMap();
    };
    
    getMock = (id: string, kwargs?: any) => {
        if(id === "1") {
            return dummyMock1;
        }
        else if(id === "2") {
            return dummyMock2;
        }

        return null;
    }
}

const firebaseConfigFetcher = new FirebaseConfigFetcher();
export default firebaseConfigFetcher;
