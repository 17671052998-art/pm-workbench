const { buildSync } = require("esbuild");
const fs = require("node:fs");
const path = require("node:path");

buildSync({
  entryPoints: ["src/gif-worker.js", "src/tools.js"],
  bundle: true, minify: true, format: "iife", target: "es2020", outdir: "assets",
});

const licenses = ["gifuct-js", "js-binary-schema-parser", "pako", "protobufjs"].map((name) => {
  let directory = path.dirname(require.resolve(name, { paths: [process.cwd(), path.dirname(require.resolve("gifuct-js"))] }));
  while (!fs.existsSync(path.join(directory, "package.json"))) {
    const parent = path.dirname(directory);
    if (parent === directory) throw new Error(`Package not found: ${name}`);
    directory = parent;
  }
  const filename = ["LICENSE", "LICENSE.md", "LICENSE.txt"].find((candidate) => fs.existsSync(path.join(directory, candidate)));
  if (!filename) throw new Error(`License not found: ${name}`);
  return `${name}\n${fs.readFileSync(path.join(directory, filename), "utf8")}`;
});
fs.writeFileSync("assets/THIRD_PARTY_LICENSES.txt", licenses.join("\n\n"));
console.log("Built tools and conversion worker, including third-party licenses.");
