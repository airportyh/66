var supportsPushState = !! history.pushState;

function Router() {
    var router = this;

    router.routeMap = {};

    if (window.addEventListener) {
        window.addEventListener('popstate', function() {
            router.goto(location.pathname);
        });
    }
}

Router.prototype = {

    get: function(pattern, handler) {
        this.routeMap[pattern] = handler
    },

    goto: function(path) {
        var params, pattern;

        if (path !== location.pathname) {
            if (supportsPushState) {
                history.pushState({}, '', path);
            } else {
                window.location = path;
                return;
            }
        }
        for (pattern in this.routeMap) {
            if (params = this._match(pattern, path)) {
                this.routeMap[pattern](params);
                break;
            }
        }
    },

    start: function() {
        this.goto(location.pathname);
    },

    captureAnchorTagClicks: function(element) {
        if (!element) {
            element = document;
        }

        element.addEventListener('click', this.handleClicks.bind(this));
    },

    handleClicks: function(e) {
        var element = e.target,
            href, target, isAnchor, isRelative, isLocal;

        if (element && element.nodeName == 'A') {
            href = element.attributes.href && element.attributes.href.textContent;
            target = element.attributes.target && element.attributes.target.textContent;
            isAnchor = href.indexOf('#') === 0;
            isRelative = href.indexOf('http') !== 0;
            isLocal = href.indexOf(location.origin) === 0;
            if (target !== '_blank' && (isRelative || isLocal) && !isAnchor) {
                // don't change page, use push state, return false for browsers with no preventDefault
                if (e.preventDefault) {
                    e.preventDefault();
                }

                this.goto(href);

                return false;
            }
        }
    },

    _match: function(pattern, url) {
        var varnames = pattern.match(/(:[a-zA-Z0-9]+)/g),
            re = new RegExp('^' + pattern.replace(/(:[a-zA-Z0-9]+)/g,
                '([a-zA-Z0-9]+)') + '$'),
            match = url.match(re),
            params = {},
            i = 1,
            varname;

        if (!match) {
            return null;
        }

        for (i = 1; i < match.length; i++) {
            varname = varnames[i - 1].substring(1)
            params[varname] = match[i]
        }

        return params
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Router;
} else if (typeof define === 'function') {
    define(function() {
        return Router;
    });
} else {
    window['66'] = Router;
}
