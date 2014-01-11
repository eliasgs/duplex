var Readable = require('stream').Readable;
var Duplex = require('stream').Duplex;
var src = new Readable();
src._read = function () {
  this.push(new Date().toISOString() + "\n");
};
var _queue = [];
var queue = new Duplex();
queue._write = function (chunk, _, cb) {
  _queue.push(chunk);
  cb();
};
queue._read = function () {
  setTimeout(function () {
    queue.push(_queue.pop());
  }, 1000);
};
src.pipe(queue).pipe(process.stdout);
