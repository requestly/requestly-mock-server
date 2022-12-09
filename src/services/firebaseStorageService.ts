import { dummyMock1, dummyMock2, getSelectorMap } from "../dummy/mock1";
import IStorageService from "./storageServiceInterface";


// TODO: Fetch from Firestore and return
class FirebaseStorageService implements IStorageService {
    constructor() {
        // TODO init
    }

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

const firebaseStorageService = new FirebaseStorageService();
export default firebaseStorageService;
