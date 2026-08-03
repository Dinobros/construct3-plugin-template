import { defineConfig } from "vite";

import { ALIAS, OUT_DIR, TARGET, minifyChunks, realpath } from "./vite.shared.ts";

export default defineConfig({
    publicDir: false,
    build: {
        target: TARGET,
        minify: "esbuild",
        outDir: OUT_DIR,
        emptyOutDir: false,
        lib: {
            entry: { "index": realpath("src/index.ts") },
            formats: ["es"]
        },
        rollupOptions: {
            output: { codeSplitting: false }
        },
        sourcemap: true
    },
    plugins: [minifyChunks()],
    resolve: { alias: ALIAS }
});
