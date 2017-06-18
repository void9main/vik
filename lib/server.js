var url = require("url"),
	fs = require("fs"),
	http = require("http"),
	path = require("path");
	ejs = require("ejs");
var server = function(dirpath){
 http.createServer(function(req, res) {
		var pathname = dirpath+"/views"+ url.parse(req.url).pathname;
		var urlarr=pathname.split("/");
		var routename=urlarr[urlarr.length-1];
		//TODO
		if(path.extname(pathname) == "") {
			pathname += "/index.ejs";
			//TODO 默认路由
		}
		if(pathname.charAt(pathname.length - 1) == "/") {
			pathname += routename;
		}
		fs.exists(pathname, function(exists) {
			if(exists) {
				switch(path.extname(pathname)) {
					case ".ejs":
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						break;
					case ".js":
						res.writeHead(200, {
							"Content-Type": "text/javascript"
						});
						break;
					case ".css":
						res.writeHead(200, {
							"Content-Type": "text/css"
						});
						break;
					case ".gif":
						res.writeHead(200, {
							"Content-Type": "image/gif"
						});
						break;
					case ".jpg":
						res.writeHead(200, {
							"Content-Type": "image/jpeg"
						});
						break;
					case ".png":
						res.writeHead(200, {
							"Content-Type": "image/png"
						});
						break;
					default:
						res.writeHead(200, {
							"Content-Type": "application/octet-stream"
						});
				}

				fs.readFile(pathname, function(err, data) {
					res.end(data);
				});
			} else {
				var patherror = dirpath+"/views/error.ejs";
				res.writeHead(404, {
					"Content-Type": "text/html"
				});
				fs.readFile(patherror, function(err, data) {
					res.end(data);
				});
			}
		});
	}).listen(8888, "127.0.0.1");
	console.log("Server is running");
}
exports.server = server;