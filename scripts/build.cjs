const { buildSync } = require("esbuild");
const fs = require("node:fs");
const path = require("node:path");

const result = buildSync({
  entryPoints: ["src/gif-worker.js", "src/background-gif-worker.js", "src/design-worker.js", "src/watermark-worker.js", "src/tools.js"],
  bundle: true, minify: true, format: "iife", target: "es2020", outdir: "assets", metafile: true,
  external: ["fs", "path"],
});
fs.copyFileSync(require.resolve("pathkit-wasm/bin/pathkit.wasm"), "assets/pathkit.wasm");
fs.chmodSync("assets/pathkit.wasm", 0o644);

const packages = new Map();
for (const input of Object.keys(result.metafile.inputs)) {
  if (!input.includes("node_modules/")) continue;
  let directory = path.dirname(path.resolve(input));
  let name;
  while (!name) {
    const manifest = path.join(directory, "package.json");
    if (fs.existsSync(manifest)) name = JSON.parse(fs.readFileSync(manifest, "utf8")).name;
    if (name) break;
    const parent = path.dirname(directory);
    if (parent === directory) throw new Error(`Package not found: ${input}`);
    directory = parent;
  }
  packages.set(name, directory);
}
const licenses = [...packages].sort(([a], [b]) => a.localeCompare(b)).map(([name, directory]) => {
  if (name.startsWith("@open-pencil/")) return `${name}\n${fs.readFileSync("licenses/OpenPencil-MIT.txt", "utf8")}`;
  const filename = ["LICENSE", "LICENSE.md", "LICENSE.txt"].find((candidate) => fs.existsSync(path.join(directory, candidate)));
  if (!filename) throw new Error(`License not found: ${name}`);
  return `${name}\n${fs.readFileSync(path.join(directory, filename), "utf8")}`;
});
fs.writeFileSync("assets/THIRD_PARTY_LICENSES.txt", licenses.join("\n\n"));
console.log("Built tools and local conversion workers, including third-party licenses.");
