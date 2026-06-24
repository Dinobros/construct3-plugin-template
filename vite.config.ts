import { lstat, readdir } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";

import { build, transform } from "esbuild";
import { defineConfig } from "vite";
import type { ResolvedConfig } from "vite";

const TARGET = "es2020";

const _realpath = (input: string) => fileURLToPath(new URL(input, import.meta.url));

let _sourcemap: boolean | "inline" | "hidden" = false;
const _mapSourcemap = (value: boolean | "inline" | "hidden") => (value === "hidden") ? "external" : value;

async function* _listFiles(path: string): AsyncGenerator<string>
{
  const publicDir = _realpath(path);
  const publicFiles = await readdir(publicDir, { recursive: true });

  for (const filePath of publicFiles.map((fileName) => `${publicDir}/${fileName}`))
  {
    const stats = await lstat(filePath);
    if (stats.isDirectory()) { continue; }

    yield filePath;
  }
};

export default defineConfig({
  build: {
    target: TARGET,
    minify: "esbuild",
    lib: {
      entry: {
        "index": _realpath("src/index.ts"),
        "c3runtime/index": _realpath("src/c3runtime/index.ts")
      },
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        dir: ".build",
        chunkFileNames: "c3runtime/[name].js",

        manualChunks: function(id)
        {
          if (id.includes("node_modules")) { return "vendor"; }

          return undefined;
        }
      }
    },
    sourcemap: true
  },
  plugins: [
    {
      name: "watch:public",
      buildStart: async function(): Promise<void>
      {
        for await (const file of _listFiles("public")) { this.addWatchFile(file); }
      }
    },
    {
      name: "vendor:minify",
      renderChunk: async function(code)
      {
        const result = await transform(code, {
          minify: true,
          target: TARGET,
          sourcemap: true
        });

        return { code: result.code, map: result.map };
      }
    },
    {
      name: "domSide:iife",
      configResolved: function(config: ResolvedConfig): void { _sourcemap = config.build.sourcemap; },
      generateBundle: async function(): Promise<void>
      {
        const result = await build({
          entryPoints: [_realpath("src/c3runtime/domSide.ts")],
          bundle: true,
          format: "iife",
          platform: "browser",
          outfile: ".build/c3runtime/domSide.js",
          target: TARGET,
          minify: true,
          alias: { "@": _realpath("src") },
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
    }
  ],
  resolve: { alias: { "@": _realpath("src/") } },
  server: { cors: true }
});
