export type Api<P extends {}, R> = (payload: P) => Promise<R>;
export type ApiPayload<T extends Api<any, any>> = T extends Api<infer U, any>
  ? U
  : any;
export type ApiResponse<T extends Api<any, any>> = T extends Api<any, infer U>
  ? U
  : any;

export class HttpApi<T extends Api<any, any>> {
  readonly path: string;
  constructor(path: string) {
    this.path = path;
  }
}

export function setupHttpApi<T extends Api<any, any>>(path: string) {
  return new HttpApi<T>(path);
}

export function createFetch<P extends {}, T extends Api<P, any>>(
  api: HttpApi<T>,
  url: string = "",
  method?: "POST" | "GET",
  token?: ""
) {
  const fullPath = `${url}${api.path}`;
  return async (payload: P = {} as P): Promise<ApiResponse<T>> => {
    return fetch(fullPath, {
      method: method === "POST" ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: method === "GET" ? "" : JSON.stringify(payload),
    }).then((res) => res.json());
  };
}
