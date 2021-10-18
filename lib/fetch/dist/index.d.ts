export declare type Api<P extends {}, R> = (payload: P) => Promise<R>;
export declare type ApiPayload<T extends Api<any, any>> = T extends Api<infer U, any> ? U : any;
export declare type ApiResponse<T extends Api<any, any>> = T extends Api<any, infer U> ? U : any;
export declare class HttpApi<T extends Api<any, any>> {
    readonly path: string;
    constructor(path: string);
}
export declare function setupHttpApi<T extends Api<any, any>>(path: string): HttpApi<T>;
export declare function createFetch<P extends {}, T extends Api<P, any>>(api: HttpApi<T>, url?: string, method?: 'POST' | 'GET'): (payload?: P) => Promise<ApiResponse<T>>;
