import { Mode } from "../types";
import firebaseStorageService from "./firebaseStorageService";
import IStorageService from "./storageServiceInterface";

class StorageService implements IStorageService {
    mode ?: Mode|null = null;

    constructor(mode ?: Mode ) {
        this.mode = mode;
    }

    // TODO: This should be set when starting the mock server
    setMode = (mode: Mode) => {
        this.mode = mode;
    }

    getMockSelectorMap = (kwargs ?: any): any => {
        switch(this.mode) {
            case Mode.FIREBASE: {
                return firebaseStorageService.getMockSelectorMap(kwargs);
            }
            default: {
                return null
            }
        }
    };

    getMock = (id: string, kwargs?: any) => {
        switch(this.mode) {
            case Mode.FIREBASE: {
                return firebaseStorageService.getMock(id, kwargs);
            }
            default: {
                return null
            }
        }
    }
}

const storageService = new StorageService();
export default storageService;