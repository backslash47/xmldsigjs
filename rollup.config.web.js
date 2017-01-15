import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";
import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

let pkg = require("./package.json");
let external = Object.keys(pkg.dependencies);

let sourceMap = process.argv.some(item => item.toLowerCase() === "--dev");

export default {
    entry: "src/index.ts",
    plugins: [
        typescript({ typescript: require("typescript") }),
        nodeResolve({ jsnext: true, main: true }),
        // babel(babelrc()),
    ],
    targets: [
        {
            dest: "dist/xmldsig.js",
            format: "umd",
            moduleName: "XmlDSigJs",
            sourceMap
        }
    ]
};