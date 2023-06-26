import storageService from "../../services/storageService";
import { RequestMethod } from "../../types";
import { Mock } from "../../types/mock";
import pathMatcher from "../utils/pathMatcher";


class MockSelector {
    // Selects and return the first mock which matches the current endpoint
    static selectMock = async (endpoint: string, method: RequestMethod, kwargs: any): Promise<Mock | null | undefined>=> {
        console.debug("[MockSelector]", endpoint, method, kwargs)

        const mockSelectorMap: any = await storageService.getMockSelectorMap(kwargs) || {};
        let mockId = null;

        mockId = Object.keys(mockSelectorMap).find((elem) => {
            return this.compareSelector(mockSelectorMap[elem], endpoint, method);
        })
    
        if(mockId) {
            console.debug(`[Debug][mockSelector] Mock Selected ${mockId}`);
            const mockData = await storageService.getMock(mockId, kwargs);
            return mockData;
        }
        
        console.debug(`[Debug][mockSelector] No Mock Selected`);

        return null;
    }

    // Return whether the endpoint matches the selector for a mock or not
    static compareSelector = (selector: any, endpoint: string, method: RequestMethod): Boolean => {
        const methodMatched = selector.method === method;
        const urlMatched = pathMatcher(selector.endpoint, endpoint).success || false;
        
        if(methodMatched && urlMatched) {
            return true;
        }

        return false;
    }
}

export default MockSelector;
