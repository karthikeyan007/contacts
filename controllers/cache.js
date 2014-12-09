var fs = require('fs');

var zcache;

exports.populateCache = function () {
    if (typeof zcache === "undefined") {
        zcache = { 'index.html': '' };
    }
    //  Local cache for static content.
    zcache['index.html'] = fs.readFileSync('./index.html');
}

/**
 *  Retrieve entry (content) from cache.
 *  @param {string} key  Key identifying content to retrieve from cache.
 */
exports.get_cache = function (key) {
    return zcache[key];
};

