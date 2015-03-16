var rpc = require("node-json-rpc");

var nzbget = function(config) {
  this.username = config.username;
  this.password = config.password;
  this.host = config.host;
  this.port = config.port;

  var options = {
    port: this.port,
    host: this.host,
    path: "/jsonrpc",
    strict: true,
    login: this.username,
    hash: this.password
  };

  this.RPCClient = new rpc.Client(options);

};

module.exports = nzbget;

nzbget.prototype.cmd = function(command, args, callback) {

  this.RPCClient.call({
    "jsonrpc": "2.0",
    "method": command,
    "params": args,
    "id": 0
  }, function(err, res) {
    callback(err, res.result);
  });
};

nzbget.prototype.version = function(callback) {
  this.cmd("version", null, callback);
};
nzbget.prototype.status = function(callback) {
  this.cmd("status", null, callback);
};
nzbget.prototype.history = function(callback) {
  this.cmd("history", null, callback);
};

// This is provided as a convenience method, as this is not a straight JSON-RPC method for NZBGet
nzbget.prototype.appendURL = function(url,category,callback) {

var appendOptions =
{
  Content: url,
  Category: category
};

  this.prototype.append(appendOptions, callback);
};

nzbget.prototype.history = function(callback) {
  this.cmd("history", null, callback);
};


// append(string NZBFilename, string NZBContent, string Category, int Priority, bool AddToTop, bool AddPaused, string DupeKey, int DupeScore, string DupeMode)
nzbget.prototype.append = function(params, callback) {

  // NZBFilename - name of nzb-file. Server uses the name to build destination directory. This name can contain full path or only filename.
  // Content - content of nzb-file encoded with Base64 (see #Examples) or URL to fetch nzb-file from. V12 can not process URLs in this method and requires the usage of a separate method appendurl.
  // Category - category for nzb-file. Can be empty string.
  // Priority - priority for nzb-file. 0 for "normal priority", positive values for high priority and negative values for low priority. Downloads with priorities equal to or greater than 900 are downloaded and post-processed even if the program is in paused state (force mode). Default priorities are: -100 (very low), -50 (low), 0 (normal), 50 (high), 100 (very high), 900 (force).
  // AddToTop - true if the file should be added to the top of the download queue or "False" if to the end.
  // AddPaused - true if the file should be added in paused state.
  // DupeKey -  "" by default
  // DupeScore - 0 by default
  // DupeMode -- "Force by default"

  if (typeof params.Content === "undefined" || params.Content === null) {
    callback(new Error("NZBGet Append method Content parameter cannot be empty"), null);
    return;
  }

  var arrayParam = [
    (typeof params.NZBFilename !== "undefined" && params.NZBFilename !== null) ? params.NZBFilename : "",
    params.Content, (typeof params.Category !== "undefined" && params.Category !== null) ? params.Category : "", (typeof params.Priority !== "undefined" && params.Priority !== null) ? params.Priority : 0, (typeof params.AddToTop !== "undefined" && params.AddToTop !== null) ? params.AddToTop : false, (typeof params.AddPaused !== "undefined" && params.AddPaused !== null) ? params.AddPaused : false,

    (typeof params.DupeKey !== "undefined" && params.DupeKey !== null) ? params.DupeKey : "", (typeof params.DupeScore !== "undefined" && params.DupeScore !== null) ? params.DupeScore : 0, (typeof params.DupeMode !== "undefined" && params.DupeMode !== null) ? params.DupeMode : "FORCE"
  ];

  this.cmd("append", arrayParam, callback);
};
