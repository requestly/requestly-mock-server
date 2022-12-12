import { RequestMethod } from "../types";
import { Mock } from "../types/mock";
declare class MockSelector {
    static selectMock: (endpoint: string, method: RequestMethod, kwargs: any) => Promise<Mock | null | undefined>;
    static compareSelector: (selector: any, endpoint: string, method: RequestMethod) => Boolean;
}
export default MockSelector;
