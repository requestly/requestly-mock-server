"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = exports.RequestMethod = void 0;
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["POST"] = "POST";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["PATCH"] = "PATCH";
    RequestMethod["DELETE"] = "DELETE";
    RequestMethod["HEAD"] = "HEAD";
    RequestMethod["OPTIONS"] = "OPTIONS";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
var Mode;
(function (Mode) {
    Mode["FIREBASE"] = "FIREBASE";
})(Mode = exports.Mode || (exports.Mode = {}));
