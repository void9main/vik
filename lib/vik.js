var libs =require("./server.js");
var app = function(dirpath) {
	libs.server(dirpath);
}
exports.app = app;