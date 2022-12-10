"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IConfigFetcher {
    constructor() {
        /**
         *
         * @param id Mock Id
         * @param kwargs Contains extra val required for storage fetching. Eg. uid in case of firebaseStorageService
         * @returns Return the Mock definition
         */
        this.getMock = (id, kwargs) => {
            return null;
        };
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
        this.getMockSelectorMap = (kwargs) => {
            return {};
        };
    }
}
exports.default = IConfigFetcher;
