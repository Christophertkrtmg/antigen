"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class HttpApi {
    constructor(path) {
        this.path = path;
    }
}
exports.HttpApi = HttpApi;
function setupHttpApi(path) {
    return new HttpApi(path);
}
exports.setupHttpApi = setupHttpApi;
function createFetch(api, url = '', method) {
    const fullPath = `${url}${api.path}`;
    return (payload = {}) => __awaiter(this, void 0, void 0, function* () {
        return fetch(fullPath, {
            method: method === 'POST' ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: method === 'GET' ? '' : JSON.stringify(payload),
        }).then(res => res.json());
    });
}
exports.createFetch = createFetch;
//# sourceMappingURL=index.js.map