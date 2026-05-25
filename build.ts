import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

const context = await esbuild.context({
    entryPoints: ["src/client/app.tsx"],
    bundle: true,
    minify: true,
    treeShaking: true,
    mangleQuoted: true,

    jsx: 'automatic',
    jsxImportSource: 'react',

    outfile: "public/app.js",
    external: ['*.ttf', '*.woff', '*.woff2', '*.jpg', '*.png', '*.svg'],

    plugins: [
        sassPlugin({
            loadPaths: ['./src/sass'],
            type: 'style',
        }),
    ],
});

await context.watch();
console.log("Watching for frontend changes...");
