function n(t, r) {
    var e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
    if (r instanceof Array) for (var o = 0, i = r.length; o < i; o++) n(t, r[o], e);
    for (var o in r) !e && o in t || (t[o] = r[o]);
    return t;
}

function t(n) {
    if (null == n || "object" != (void 0 === n ? "undefined" : r(n))) return n;
    if (n instanceof Array) {
        for (var e = [], o = n.length, i = 0; i < o; ++i) e[i] = t(n[i]);
        return e;
    }
    if (n instanceof Object) {
        e = {};
        for (var f in n) n.hasOwnProperty(f) && (e[f] = t(n[f]));
        return e;
    }
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

module.exports = {
    merge: n,
    isEmptyObject: function(n) {
        var t;
        for (t in n) return !1;
        return !0;
    },
    clone: t,
    isEmpty: function(n) {
        return "" == n || void 0 == n || null == n;
    },
    version: function(n, t) {
        for (var r = n.split("."), e = t.split("."), o = Math.min(r.length, e.length), i = 0, f = 0; i < o && 0 == (f = parseInt(r[i]) - parseInt(e[i])); ) i++;
        return f > 0 ? 1 : 0 == f ? 0 : -1;
    },
    time: function() {
        return Date.parse(new Date()) / 1e3;
    }
};