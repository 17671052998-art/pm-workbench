import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
export const pathKitOptions = () => ({ wasmBinary: readFileSync(require.resolve("pathkit-wasm/bin/pathkit.wasm")) });
