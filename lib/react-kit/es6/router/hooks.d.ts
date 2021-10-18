import { Router, ConfirmTransition } from './Router.js';
import { Route } from './Route.js';
export declare function useRoute(router: Router): Route<any>;
export declare function useRouter(): Router;
export declare function useRouteExit(beforeExit: ConfirmTransition): void;
