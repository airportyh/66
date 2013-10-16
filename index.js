var supportsPushState = !!history.pushState

function Router(){
  var router = this
  router.routeMap = {}
  if (window.addEventListener){
    window.addEventListener('popstate', function(){
      router.goto(location.pathname)
    })
  }
}

Router.prototype = {
  get: function(pattern, handler){
    this.routeMap[pattern] = handler
  },
  goto: function(path){
    if (path !== location.pathname){
      if (supportsPushState){
        history.pushState({}, '', path)
      }else{
        window.location = path
        return
      }
    }
    for (var pattern in this.routeMap){
      var params
      if (params = this._match(pattern, path)){
        this.routeMap[pattern](params)
        break
      }
    }
  },
  start: function(){
    if (!supportsPushState){
      this.goto(location.pathname)
    }
  },
  _match: function(pattern, url){
    var varnames = pattern.match(/(:[a-zA-Z0-9]+)/g)
    var re = new RegExp('^' + pattern.replace(/(:[a-zA-Z0-9]+)/g, 
      '([a-zA-Z0-9]+)') + '$')
    var match = url.match(re)
    if (!match) return null
    var params = {}
    for (var i = 1; i < match.length; i++){
      var varname = varnames[i - 1].substring(1)
      params[varname] = match[i]
    }
    return params
  }
}

module.exports = Router