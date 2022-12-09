import { Mock } from "../types/mock";

class IStorageService {

    /**
     * 
     * @param id Mock Id
     * @param kwargs Contains extra val required for storage fetching. Eg. uid in case of firebaseStorageService
     * @returns Return the Mock definition
     */
    getMock = (id: string, kwargs?: any): Mock|null => {
        return null
    }
    

    /**
     * Get the mock selector map. Used to easily select the mock to apply.
     * - Firebase stores this in a doc
     * - Local JSON will process and return this in realtime.
     * 
     * {
     *      mockId: {
     *          route: "",
     *          method: "",
     *      }
     * }
     */
    getMockSelectorMap = (kwargs?: any): any => {
        return {}
    }
}

export default IStorageService;