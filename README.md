66
==

Simple client-side router.

## Install

Install `66` via NPM or Bower.

## Usage

    var Router = require('66')
    var rt = require('66')
    rt.get('/', function(){
      // render the index page
    })
    
    rt.get('/post/:id', function(params)
      // render post page
      // you can get at the id via `params.id`
    })
