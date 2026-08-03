import { lstat, readdir } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";

import { build, transform } from "esbuild";
import type { Plugin, ResolvedConfig } from "vite";

export const TARGET = "es2020";
export const OUT_DIR = ".build";

export const realpath = (input: string) => fileURLToPath(new URL(input, import.meta.url));
export const ALIAS = { "@": realpath("src/") };

const _mapSourcemap = (value: boolean | "inline" | "hidden") => (value === "hidden") ? "external" : value;

async function* _listFiles(path: string): AsyncGenerator<string>
{
    const publicDir = realpath(path);
    const publicFiles = await readdir(publicDir, { recursive: true });

    for (const filePath of publicFiles.map((fileName) => `${publicDir}/${fileName}`))
    {
        const stats = await lstat(filePath);
        if (stats.isDirectory()) { continue; }

        yield filePath;
    }
};

export function watchPublic(): Plugin
{
    return {
        name: "watch:public",
        buildStart: async function(): Promise<void>
        {
            for await (const file of _listFiles("public")) { this.addWatchFile(file); }
        }
    };
}

export function minifyChunks(): Plugin
{
    return {
        name: "chunks:minify",
        renderChunk: async function(code)
        {
            const result = await transform(code, {
                minify: true,
                target: TARGET,
                sourcemap: true
            });

            return { code: result.code, map: result.map };
        }
    };
}

export function domSideIife(): Plugin
{
    let _sourcemap: boolean | "inline" | "hidden" = false;

    return {
        name: "domSide:iife",
        configResolved: function(config: ResolvedConfig): void { _sourcemap = config.build.sourcemap; },
        generateBundle: async function(): Promise<void>
        {
            const result = await build({
                entryPoints: [realpath("src/c3runtime/domSide.ts")],
                bundle: true,
                format: "iife",
                platform: "browser",
                outfile: `${OUT_DIR}/c3runtime/domSide.js`,
                target: TARGET,
                minify: true,
                alias: ALIAS,
                write: false,
                sourcemap: _mapSourcemap(_sourcemap)
            });

            for (const file of result.outputFiles)
            {
                const isMap = file.path.endsWith(".map");

                let source: string;
                if (isMap)
                {
                    const map = JSON.parse(file.text);

                    const fileName = map.file ?? "domSide.js";
                    const names = map.names ?? [];

                    const { version, ...rest } = map;

                    source = JSON.stringify({
                        version: version,
                        file: fileName,
                        names: names,

                        ...rest
                    });
                }
                else { source = file.text; }

                this.emitFile({
                    type: "asset",
                    fileName: isMap ? "c3runtime/domSide.js.map" : "c3runtime/domSide.js",
                    source: source
                });
            }
        }
    };
}
