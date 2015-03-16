What is nzbget-nodejs?
======================

It's a simple [NZBGet](http://nzbget.net/) JSON-RPC API wrapper for node.js

## Installation

  npm install nzbget-nodejs --save

## Usage

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

    my_ng.version(generic_handling);

    my_ng.status(generic_handling);

    my_ng.history(generic_handling);

    var appendOptions =
    {
      Content: "https://url.to/file.nzb",
      Category: "Open Source",
    };

    my_ng.append(appendOptions,generic_handling)
    snow_ng.append("https://url.to/file.nzb","Open Source",generic_handling);

## Tests

no tests currently available

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Submit Pull Request to support additional methods. Log issues if you run into trouble.

Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release