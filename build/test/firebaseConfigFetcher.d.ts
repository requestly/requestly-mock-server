import IConfigFetcher from "../interfaces/configFetcherInterface";
declare class FirebaseConfigFetcher implements IConfigFetcher {
    getMockSelectorMap: (kwargs?: any) => any;
    getMock: (id: string, kwargs?: any) => import("..").MockSchema | null;
}
declare const firebaseConfigFetcher: FirebaseConfigFetcher;
export default firebaseConfigFetcher;
