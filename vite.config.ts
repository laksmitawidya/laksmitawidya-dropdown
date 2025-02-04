import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    // Dev config
    return {
      plugins: [react(), tailwindcss()],
      root: path.resolve(__dirname, "dev"),
      build: {
        outDir: path.resolve(__dirname, "dist"),
      },
    };
  } else {
    // Build config
    return {
      plugins: [react(), dts({ insertTypesEntry: true }), tailwindcss()],
      build: {
        lib: {
          entry: path.resolve(__dirname, "src/index.ts"),
          name: "Dropdown",
          formats: ["es", "umd"],
          fileName: (format) => `dropdown.${format}.js`,
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          css: {
            preprocessorOptions: {
              css: {
                inject: true,
              },
            },
          },
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
    };
  }
});
function postcss(arg0: {
  extract: boolean; // Extract CSS into a separate file
  minimize: boolean;
}): import("rollup").InputPluginOption {
  throw new Error("Function not implemented.");
}
