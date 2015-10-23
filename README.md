NZBGet-nodejs
======================
## What is nzbget-nodejs?
It's a simple [NZBGet](http://nzbget.net/) JSON-RPC [API](http://nzbget.net/RPC_API_reference) wrapper for node.js

It currently supports, using JSON-RPC methods with and without parameters:
- version
- status
- history
- append
- appendURL (convenience method)

This was tested on NZBGet 14.1. Let us know if you've tested it on other versions with success.

## Installation

  npm install nzbget-nodejs --save

## Usage

### Setup

This uses a generic_handling function to handle the response but you'll want to customize that.

```javascript
var nzbget = require('nzbget-nodejs');
var my_ng = new nzbget({
  host: "my.host.com",
  port: 6789,
  username: 'admin',
  password: 'mypassword',
});

var generic_handling= function(err, res){
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
}
```
These three methods are pretty straightforward, they take no parameters and return a string or an object.
```javascript

my_ng.version(generic_handling);

my_ng.status(generic_handling);

my_ng.history(generic_handling);
```
*append* needs at least a URL. Supposedly you can also put the entire NZB file in the Content but I haven't tested that. These are the parameters:
- NZBFilename - name of nzb-file. Server uses the name to build destination directory. This name can contain full path or only filename. This works when empty, not sure what it's used for otherwise.
- Content - content of nzb-file encoded with Base64 or URL to fetch nzb-file from. **required**
- Category - category for nzb-file. Can be empty string.
- Priority - priority for nzb-file. 0 for "normal priority", positive values for high priority and negative values for low priority. Downloads with priorities equal to or greater than 900 are downloaded and post-processed even if the program is in paused state (force mode). Default priorities are: -100 (very low), -50 (low), 0 (normal), 50 (high), 100 (very high), 900 (force). Default is 0.
- AddToTop - true if the file should be added to the top of the download queue or "False" if to the end. *false* is default
- AddPaused - true if the file should be added in paused state. *false* is default
- DupeKey -  "" by default
- DupeScore - 0 by default
- DupeMode -- "Force by default"

```javascript
var appendOptions =
{
  Content: "https://url.to/file.nzb",
  Category: "Open Source"
};

my_ng.append(appendOptions,generic_handling)
```
*appendURL* is provided for convenience, using the defaults above:
```javascript
my_ng.appendURL("https://url.to/file.nzb","Open Source",generic_handling);
```

## Tests

No tests currently available.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Submit Pull Request to support additional methods. Log issues if you run into trouble.

Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release

## TODO ##
- Support additional methods
- Provide a choice between receiving an Object or String in the handler, instead of a JSON document. This might become the default
