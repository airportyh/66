66
==

Simple client-side router.

## Install

Install `66` via NPM or Bower.

## Usage

    var Router = require('66'),
        rt = new Router();

    rt.get('/', function(){
      // render the index page
    });

    rt.get('/post/:id', function(params) {
      // render post page
      // you can get at the id via `params.id`
    });

    // start listening for changes
    rt.start();

    // capture all <a> tag clicks
    rt.captureAnchorTagClicks();
