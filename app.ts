import express, { urlencoded, static as _static, type Express, json } from "express";
import { dirname, join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { mw, setup } from "@server/support/express/setup.js";
import { fileURLToPath } from "url";
import { controlRowsApiRoute } from "@server/routes/api/rows.js";
import { controlLettersApiRoute } from "@server/routes/api/letters.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


const app: Express = express();

setup(app, {
    set: {
        "views": join(__dirname, "views"),
        "view engine": "pug",
        "port": 3000,
    },
    get: {
        "/api/rows": mw(controlRowsApiRoute),
        "/api/row/:alphabet/:slug": mw(controlLettersApiRoute),
        "*": mw(({ req, res, next }) => {
            if (req.path.startsWith('/static') ||
                req.path.startsWith('/api')) {
                return next();
            }

            return res.render("app.pug");
        }),
    },
    use: {
        "/static": _static(join(__dirname, "public")),
    },
    middlewares: [
        logger('dev'),
        urlencoded({ extended: false }),
        json(),
        cookieParser(),
    ],
    errors: [
        ({ res }) => res.status(500),
    ]
});


export default app;
