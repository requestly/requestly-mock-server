import storageService from "../services/storageService";
import { RequestMethod } from "../types";
import { Mock } from "../types/mock";
import urlMatcher from "./utils/urlMatcher";


class MockSelector {
    // Selects and return the first mock which matches the current endpoint
    static selectMock = (endpoint: string, method: RequestMethod): Mock | null=> {
        console.log("MockSelector", endpoint, method)

        const mockSelectorMap: any = storageService.getMockSelectorMap() || {};
        let mockId = null;

        mockId = Object.keys(mockSelectorMap).find((elem) => {
            return this.compareSelector(mockSelectorMap[elem], endpoint, method);
        })
    
        if(mockId) {
            const mockData = storageService.getMock(mockId);
            return mockData;
        }

        return null;
    }

    // Return whether the endpoint matches the selector for a mock or not
    static compareSelector = (selector: any, endpoint: string, method: RequestMethod): Boolean => {
        const methodMatched = selector.method === method;
        const urlMatched = urlMatcher(selector.endpoint, endpoint).success || false;
        
        if(methodMatched && urlMatched) {
            return true;
        }

        return false;
    }
}

export default MockSelector;
