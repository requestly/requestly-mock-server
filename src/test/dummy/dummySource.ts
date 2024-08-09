import { dummyMock1, dummyMock2, dummyMock3, dummyMock4, getSelectorMap } from "./mock1";
import { ISource } from "../../interfaces/config";

export class DummySource implements ISource {
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
        else if(id === "3") {
            return dummyMock3;
        }
        else if(id === "4") {
            return dummyMock4;
        }

        return null;
    }
}