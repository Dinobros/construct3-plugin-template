import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

async function getEntries(directory: string)
{
  const dirPath = fileURLToPath(new URL(directory, import.meta.url));
  const files = await readdir(dirPath, { recursive: true });
  
  const entries = { } as Record<string, string>;
  for (const file of files)
  {
    const filePath = join(dirPath, file);

    if (file.endsWith(".d.ts")) { continue; }
    if (file.endsWith(".ts"))
    {
      const relativePath = relative("src/", filePath);
      const entryName = relativePath.replace(/\.ts$/, "");

      console.log(`Found entry: ${filePath}`);
      console.log(`Adding entry: ${entryName}`);

      entries[entryName] = filePath;
    }
  }

  return entries;
}

const entries = await getEntries("src/");

export default defineConfig({
  build: {
    lib: {
      entry: entries
    },
    rollupOptions: {
      output: {
        dir: "dist"
      }
    },
    sourcemap: true
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("src/", import.meta.url)) }
  }
});