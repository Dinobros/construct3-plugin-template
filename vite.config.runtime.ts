import { defineConfig } from "vite";

import { ALIAS, OUT_DIR, TARGET, domSideIife, minifyChunks, realpath, watchPublic } from "./vite.shared.ts";

export default defineConfig({
    build: {
        target: TARGET,
        minify: "esbuild",
        outDir: OUT_DIR,
        emptyOutDir: false,
        lib: {
            entry: { "c3runtime/index": realpath("src/c3runtime/index.ts") },
            formats: ["es"]
        },
        rollupOptions: {
            output: {
                chunkFileNames: "c3runtime/[name].js",
                codeSplitting: {
                    groups: [{ name: "vendor", test: /node_modules/ }]
                }
            }
        },
        sourcemap: true
    },
    plugins: [watchPublic(), minifyChunks(), domSideIife()],
    resolve: { alias: ALIAS },
    server: { cors: true },
    preview: { cors: true }
});
