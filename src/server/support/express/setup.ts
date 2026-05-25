import { Request, Response, NextFunction, type Express } from "express";

export type SetupSchema = {
    get?: Record<string, ExpressMiddleware>,
    post?: Record<string, ExpressMiddleware>,
    put?: Record<string, ExpressMiddleware>,
    patch?: Record<string, ExpressMiddleware>,
    delete?: Record<string, ExpressMiddleware>,
    use?: Record<string, ExpressMiddleware>,
    middlewares?: ExpressMiddleware[],
    errors?: AdapterErrorMiddleware[],
    set?: Record<string, any>,
};

export type AdapterMiddlewareParams = {
    req: Request,
    res: Response,
    next: NextFunction,
}

export type AdapterErrorMiddlewareParams = {
    err: unknown
} & AdapterMiddlewareParams;

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => any;
export type AdapterMiddleware = (params: AdapterMiddlewareParams) => any;
export type ExpressErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => any;
export type AdapterErrorMiddleware = (params: AdapterErrorMiddlewareParams) => any;

export function setup(app: Express, {
    middlewares = [],
    errors = [],
    set = {},
    ...routes
}: SetupSchema): void {
    for (const [setting, value] of Object.entries(set)) {
        app.set(setting, value);
    }

    for (const middleware of middlewares) {
        app.use(middleware);
    }

    for (const error of errors) {
        app.use(toExpressErrorMiddleware(error));
    }

    defineRoutes(app, 'use', routes.use);
    defineRoutes(app, 'get', routes.get);
    defineRoutes(app, 'post', routes.post);
    defineRoutes(app, 'put', routes.put);
    defineRoutes(app, 'patch', routes.patch);
    defineRoutes(app, 'delete', routes.delete);
}

function defineRoutes(app: Express, type: Exclude<keyof SetupSchema, 'middlewares' | 'errors' | 'set'>, map: Record<string, ExpressMiddleware> | undefined = {}) {
    for (const [path, middleware] of Object.entries(map)) {
        app[type](path, middleware);
    }
}

export function mw(middleware: AdapterMiddleware): ExpressMiddleware {
    return (req, res, next) => middleware({ req, res, next });
}

function toExpressErrorMiddleware(middleware: AdapterErrorMiddleware): ExpressErrorMiddleware {
    return (err, req, res, next) => middleware({ err, req, res, next });
}
