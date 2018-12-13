console.warn("Runing: NodeJS");

var fs = require("fs");
var assert = require("assert");
var select = require("xpath-ts");
require("babel-polyfill");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var XPathEvaluator = require("xpath-ts").XPathEvaluator;
var XmlCore = require("@inqool/xml-core");
xmldsig = require("../");
var JSDOM = require('jsdom').JSDOM;


// xmldsig.install(new DOMParser(), new XMLSerializer(), new XPathEvaluator({}));
const jsdom = new JSDOM();
xmldsig.install(new jsdom.window.DOMParser(), new jsdom.window.XMLSerializer(), new XPathEvaluator({}));

var WebCrypto = require("node-webcrypto-ossl");
xmldsig.Application.setEngine("OpenSSL", new WebCrypto());
console.log("WebCrypto:", xmldsig.Application.crypto.name);

var readXml = function(path, cb) {
    fs.readFile(path, function(e, buf) {
        if (e)
            assert.equal(false, true, "Error on XML reading " + path);
        else {
            var doc = xmldsig.Parse(buf.toString());
            cb(doc);
        }
    })
}

module.exports = {
    select: select,
    xmldsig: xmldsig,
    readXml: readXml,
    assert: assert,
    XmlCore: XmlCore,
    crypto: new WebCrypto(),
}