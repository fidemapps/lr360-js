/* version 0.1.0-test */
!function t(e, r, n) {
  function o(u, a) {
    if (!r[u]) {
      if (!e[u]) {
        var s = "function" == typeof require && require;
        if (!a && s)return s(u, !0);
        if (i)return i(u, !0);
        var l = new Error("Cannot find module '" + u + "'");
        throw l.code = "MODULE_NOT_FOUND", l
      }
      var c = r[u] = {exports: {}};
      e[u][0].call(c.exports, function (t) {
        var r = e[u][1][t];
        return o(r ? r : t)
      }, c, c.exports, t, e, r, n)
    }
    return r[u].exports
  }

  for (var i = "function" == typeof require && require, u = 0; u < n.length; u++)o(n[u]);
  return o
}({
  1: [function (t, e, r) {
    (function (r) {
      function n(t, e) {
        return t = "number" == typeof t || _.test(t) ? +t : -1, e = null == e ? b : e, t > -1 && t % 1 == 0 && e > t
      }

      function o(t, e, r) {
        var n = t[e];
        (!c(n, r) || c(n, w[e]) && !j.call(t, e) || void 0 === r && !(e in t)) && (t[e] = r)
      }

      function i(t) {
        return function (e) {
          return null == e ? void 0 : e[t]
        }
      }

      function u(t, e, r) {
        return a(t, e, r)
      }

      function a(t, e, r, n) {
        r || (r = {});
        for (var i = -1, u = e.length; ++i < u;) {
          var a = e[i], s = n ? n(r[a], t[a], a, r, t) : t[a];
          o(r, a, s)
        }
        return r
      }

      function s(t) {
        return v(function (e, r) {
          var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, u = o > 2 ? r[2] : void 0;
          for (i = "function" == typeof i ? (o--, i) : void 0, u && l(r[0], r[1], u) && (i = 3 > o ? void 0 : i, o = 1), e = Object(e); ++n < o;) {
            var a = r[n];
            a && t(e, a, n, i)
          }
          return e
        })
      }

      function l(t, e, r) {
        if (!h(r))return !1;
        var o = typeof e;
        return ("number" == o ? f(r) && n(e, r.length) : "string" == o && e in r) ? c(r[e], t) : !1
      }

      function c(t, e) {
        return t === e || t !== t && e !== e
      }

      function f(t) {
        return null != t && !("function" == typeof t && p(t)) && d(E(t))
      }

      function p(t) {
        var e = h(t) ? O.call(t) : "";
        return e == m || e == g
      }

      function d(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && b >= t
      }

      function h(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
      }

      var y = t("lodash.keys"), v = t("lodash.rest"), b = 9007199254740991, m = "[object Function]", g = "[object GeneratorFunction]", _ = /^(?:0|[1-9]\d*)$/, w = r.Object.prototype, j = w.hasOwnProperty, O = w.toString, E = i("length"), x = s(function (t, e) {
        u(e, y(e), t)
      });
      e.exports = x
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {"lodash.keys": 2, "lodash.rest": 3}],
  2: [function (t, e, r) {
    (function (t) {
      function r(t, e) {
        for (var r = -1, n = Array(t); ++r < t;)n[r] = e(r);
        return n
      }

      function n(t, e) {
        return t = "number" == typeof t || O.test(t) ? +t : -1, e = null == e ? m : e, t > -1 && t % 1 == 0 && e > t
      }

      function o(t, e) {
        return x.call(t, e) || "object" == typeof t && e in t && null === k(t)
      }

      function i(t) {
        return q(Object(t))
      }

      function u(t) {
        return function (e) {
          return null == e ? void 0 : e[t]
        }
      }

      function a(t) {
        var e = t ? t.length : void 0;
        return d(e) && (T(t) || v(t) || l(t)) ? r(e, String) : null
      }

      function s(t) {
        var e = t && t.constructor, r = "function" == typeof e && e.prototype || E;
        return t === r
      }

      function l(t) {
        return f(t) && x.call(t, "callee") && (!P.call(t, "callee") || M.call(t) == g)
      }

      function c(t) {
        return null != t && !("function" == typeof t && p(t)) && d(A(t))
      }

      function f(t) {
        return y(t) && c(t)
      }

      function p(t) {
        var e = h(t) ? M.call(t) : "";
        return e == _ || e == w
      }

      function d(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && m >= t
      }

      function h(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
      }

      function y(t) {
        return !!t && "object" == typeof t
      }

      function v(t) {
        return "string" == typeof t || !T(t) && y(t) && M.call(t) == j
      }

      function b(t) {
        var e = s(t);
        if (!e && !c(t))return i(t);
        var r = a(t), u = !!r, l = r || [], f = l.length;
        for (var p in t)!o(t, p) || u && ("length" == p || n(p, f)) || e && "constructor" == p || l.push(p);
        return l
      }

      var m = 9007199254740991, g = "[object Arguments]", _ = "[object Function]", w = "[object GeneratorFunction]", j = "[object String]", O = /^(?:0|[1-9]\d*)$/, E = t.Object.prototype, x = E.hasOwnProperty, M = E.toString, k = Object.getPrototypeOf, P = E.propertyIsEnumerable, q = Object.keys, A = u("length"), T = Array.isArray;
      e.exports = b
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {}],
  3: [function (t, e, r) {
    (function (t) {
      function r(t, e, r) {
        var n = r ? r.length : 0;
        switch (n) {
          case 0:
            return t.call(e);
          case 1:
            return t.call(e, r[0]);
          case 2:
            return t.call(e, r[0], r[1]);
          case 3:
            return t.call(e, r[0], r[1], r[2])
        }
        return t.apply(e, r)
      }

      function n(t, e) {
        if ("function" != typeof t)throw new TypeError(s);
        return e = w(void 0 === e ? t.length - 1 : u(e), 0), function () {
          for (var n = arguments, o = -1, i = w(n.length - e, 0), u = Array(i); ++o < i;)u[o] = n[e + o];
          switch (e) {
            case 0:
              return t.call(this, u);
            case 1:
              return t.call(this, n[0], u);
            case 2:
              return t.call(this, n[0], n[1], u)
          }
          var a = Array(e + 1);
          for (o = -1; ++o < e;)a[o] = n[o];
          return a[e] = u, r(t, this, a)
        }
      }

      function o(t) {
        var e = i(t) ? _.call(t) : "";
        return e == p || e == d
      }

      function i(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
      }

      function u(t) {
        if (!t)return 0 === t ? t : 0;
        if (t = a(t), t === l || t === -l) {
          var e = 0 > t ? -1 : 1;
          return e * c
        }
        var r = t % 1;
        return t === t ? r ? t - r : t : 0
      }

      function a(t) {
        if (i(t)) {
          var e = o(t.valueOf) ? t.valueOf() : t;
          t = i(e) ? e + "" : e
        }
        if ("string" != typeof t)return 0 === t ? t : +t;
        t = t.replace(h, "");
        var r = v.test(t);
        return r || b.test(t) ? m(t.slice(2), r ? 2 : 8) : y.test(t) ? f : +t
      }

      var s = "Expected a function", l = 1 / 0, c = 1.7976931348623157e308, f = NaN, p = "[object Function]", d = "[object GeneratorFunction]", h = /^\s+|\s+$/g, y = /^[-+]0x[0-9a-f]+$/i, v = /^0b[01]+$/i, b = /^0o[0-7]+$/i, m = parseInt, g = t.Object.prototype, _ = g.toString, w = Math.max;
      e.exports = n
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {}],
  4: [function (t, e, r) {
    (function (r) {
      function n(t, e) {
        return t.set(e[0], e[1]), t
      }

      function o(t, e) {
        return t.add(e), t
      }

      function i(t, e, r, n) {
        var o = -1, i = t.length;
        for (n && i && (r = t[++o]); ++o < i;)r = e(r, t[o], o, t);
        return r
      }

      function u(t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString)try {
          e = !!(t + "")
        } catch (r) {
        }
        return e
      }

      function a(t, e) {
        return t = "number" == typeof t || qt.test(t) ? +t : -1, e = null == e ? tt : e, t > -1 && t % 1 == 0 && e > t
      }

      function s(t) {
        var e = -1, r = Array(t.size);
        return t.forEach(function (t, n) {
          r[++e] = [n, t]
        }), r
      }

      function l(t) {
        var e = -1, r = Array(t.size);
        return t.forEach(function (t) {
          r[++e] = t
        }), r
      }

      function c(t, e, r) {
        (void 0 !== r && !D(t[e], r) || "number" == typeof e && void 0 === r && !(e in t)) && (t[e] = r)
      }

      function f(t, e, r) {
        var n = t[e];
        (!D(n, r) || D(n, St[e]) && !Rt.call(t, e) || void 0 === r && !(e in t)) && (t[e] = r)
      }

      function p(t, e) {
        return t && x(e, W(e), t)
      }

      function d(t, e, r, n, o, i) {
        var a;
        if (r && (a = o ? r(t, n, o, i) : r(t)), void 0 !== a)return a;
        if (!G(t))return t;
        var s = Kt(t);
        if (s) {
          if (a = T(t), !e)return E(t, a)
        } else {
          var l = A(t), c = l == ut || l == at;
          if (l != ct && l != et && (!c || o))return Tt[l] ? C(t, l, e) : o ? t : {};
          if (u(t))return o ? t : {};
          if (a = S(c ? {} : t), !e)return k(t, p(a, t))
        }
        i || (i = new Q);
        var y = i.get(t);
        return y ? y : (i.set(t, a), (s ? B : h)(t, function (n, o) {
          f(a, o, d(n, e, r, o, t, i))
        }), s ? a : k(t, a))
      }

      function h(t, e) {
        return t && J(t, e, W)
      }

      function y(t, e, r, n, o) {
        if (t !== e) {
          var i = Kt(e) || N(e) ? void 0 : V(e);
          B(i || e, function (u, a) {
            if (i && (a = u, u = e[a]), G(u))o || (o = new Q), v(t, e, a, r, y, n, o); else {
              var s = n ? n(t[a], u, a + "", t, e, o) : void 0;
              void 0 === s && (s = u), c(t, a, s)
            }
          })
        }
      }

      function v(t, e, r, n, o, i, u) {
        var a = t[r], s = e[r], l = u.get(s);
        if (l)return void c(t, r, l);
        var f = i ? i(a, s, r + "", t, e, u) : void 0, p = void 0 === f;
        p && (f = s, Kt(s) || N(s) ? Kt(a) ? f = n ? E(a) : a : $(a) ? f = E(a) : (p = !1, f = d(s)) : K(s) || Y(s) ? Y(a) ? f = z(a) : !G(a) || n && F(a) ? (p = !1, f = d(s)) : f = n ? d(a) : a : p = !1), u.set(s, f), p && o(f, s, n, i, u), c(t, r, f)
      }

      function b(t) {
        return function (e) {
          return null == e ? void 0 : e[t]
        }
      }

      function m(t) {
        var e = t.constructor, r = new e(t.byteLength), n = new Lt(r);
        return n.set(new Lt(t)), r
      }

      function g(t) {
        var e = t.constructor;
        return i(s(t), n, new e)
      }

      function _(t) {
        var e = t.constructor, r = new e(t.source, kt.exec(t));
        return r.lastIndex = t.lastIndex, r
      }

      function w(t) {
        var e = t.constructor;
        return i(l(t), o, new e)
      }

      function j(t) {
        return Yt ? Object(zt.call(t)) : {}
      }

      function O(t, e) {
        var r = t.buffer, n = t.constructor;
        return new n(e ? m(r) : r, t.byteOffset, t.length)
      }

      function E(t, e) {
        var r = -1, n = t.length;
        for (e || (e = Array(n)); ++r < n;)e[r] = t[r];
        return e
      }

      function x(t, e, r) {
        return M(t, e, r)
      }

      function M(t, e, r, n) {
        r || (r = {});
        for (var o = -1, i = e.length; ++o < i;) {
          var u = e[o], a = n ? n(r[u], t[u], u, r, t) : t[u];
          f(r, u, a)
        }
        return r
      }

      function k(t, e) {
        return x(t, Jt(t), e)
      }

      function P(t) {
        return Z(function (e, r) {
          var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, u = o > 2 ? r[2] : void 0;
          for (i = "function" == typeof i ? (o--, i) : void 0, u && R(r[0], r[1], u) && (i = 3 > o ? void 0 : i, o = 1), e = Object(e); ++n < o;) {
            var a = r[n];
            a && t(e, a, n, i)
          }
          return e
        })
      }

      function q(t, e) {
        var r = null == t ? void 0 : t[e];
        return X(r) ? r : void 0
      }

      function A(t) {
        return It.call(t)
      }

      function T(t) {
        var e = t.length, r = t.constructor(e);
        return e && "string" == typeof t[0] && Rt.call(t, "index") && (r.index = t.index, r.input = t.input), r
      }

      function S(t) {
        if (I(t))return {};
        var e = t.constructor;
        return Qt(F(e) ? e.prototype : void 0)
      }

      function C(t, e, r) {
        var n = t.constructor;
        switch (e) {
          case vt:
            return m(t);
          case nt:
          case ot:
            return new n(+t);
          case bt:
          case mt:
          case gt:
          case _t:
          case wt:
          case jt:
          case Ot:
          case Et:
          case xt:
            return O(t, r);
          case st:
            return g(t);
          case lt:
          case dt:
            return new n(t);
          case ft:
            return _(t);
          case pt:
            return w(t);
          case ht:
            return j(t)
        }
      }

      function R(t, e, r) {
        if (!G(r))return !1;
        var n = typeof e;
        return ("number" == n ? L(r) && a(e, r.length) : "string" == n && e in r) ? D(r[e], t) : !1
      }

      function I(t) {
        var e = t && t.constructor, r = "function" == typeof e && e.prototype || St;
        return t === r
      }

      function D(t, e) {
        return t === e || t !== t && e !== e
      }

      function Y(t) {
        return $(t) && Rt.call(t, "callee") && (!Ft.call(t, "callee") || It.call(t) == et)
      }

      function L(t) {
        return null != t && !("function" == typeof t && F(t)) && H(Bt(t))
      }

      function $(t) {
        return U(t) && L(t)
      }

      function F(t) {
        var e = G(t) ? It.call(t) : "";
        return e == ut || e == at
      }

      function H(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && tt >= t
      }

      function G(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
      }

      function U(t) {
        return !!t && "object" == typeof t
      }

      function X(t) {
        return null == t ? !1 : F(t) ? Dt.test(Ct.call(t)) : U(t) && (u(t) ? Dt : Pt).test(t)
      }

      function N(t) {
        return U(t) && H(t.length) && !!At[It.call(t)]
      }

      function z(t) {
        return x(t, V(t))
      }

      var Q = t("lodash._stack"), B = t("lodash._arrayeach"), J = t("lodash._basefor"), K = t("lodash.isplainobject"), W = t("lodash.keys"), V = t("lodash.keysin"), Z = t("lodash.rest"), tt = 9007199254740991, et = "[object Arguments]", rt = "[object Array]", nt = "[object Boolean]", ot = "[object Date]", it = "[object Error]", ut = "[object Function]", at = "[object GeneratorFunction]", st = "[object Map]", lt = "[object Number]", ct = "[object Object]", ft = "[object RegExp]", pt = "[object Set]", dt = "[object String]", ht = "[object Symbol]", yt = "[object WeakMap]", vt = "[object ArrayBuffer]", bt = "[object Float32Array]", mt = "[object Float64Array]", gt = "[object Int8Array]", _t = "[object Int16Array]", wt = "[object Int32Array]", jt = "[object Uint8Array]", Ot = "[object Uint8ClampedArray]", Et = "[object Uint16Array]", xt = "[object Uint32Array]", Mt = /[\\^$.*+?()[\]{}|]/g, kt = /\w*$/, Pt = /^\[object .+?Constructor\]$/, qt = /^(?:0|[1-9]\d*)$/, At = {};
      At[bt] = At[mt] = At[gt] = At[_t] = At[wt] = At[jt] = At[Ot] = At[Et] = At[xt] = !0, At[et] = At[rt] = At[vt] = At[nt] = At[ot] = At[it] = At[ut] = At[st] = At[lt] = At[ct] = At[ft] = At[pt] = At[dt] = At[yt] = !1;
      var Tt = {};
      Tt[et] = Tt[rt] = Tt[vt] = Tt[nt] = Tt[ot] = Tt[bt] = Tt[mt] = Tt[gt] = Tt[_t] = Tt[wt] = Tt[st] = Tt[lt] = Tt[ct] = Tt[ft] = Tt[pt] = Tt[dt] = Tt[ht] = Tt[jt] = Tt[Ot] = Tt[Et] = Tt[xt] = !0, Tt[it] = Tt[ut] = Tt[yt] = !1;
      var St = r.Object.prototype, Ct = r.Function.prototype.toString, Rt = St.hasOwnProperty, It = St.toString, Dt = RegExp("^" + Ct.call(Rt).replace(Mt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Yt = r.Symbol, Lt = r.Uint8Array, $t = Object.getOwnPropertySymbols, Ft = St.propertyIsEnumerable, Ht = q(r, "Map"), Gt = q(r, "Set"), Ut = Ht ? Ct.call(Ht) : "", Xt = Gt ? Ct.call(Gt) : "", Nt = Yt ? Yt.prototype : void 0, zt = Yt ? Nt.valueOf : void 0, Qt = function () {
        function t() {
        }

        return function (e) {
          if (G(e)) {
            t.prototype = e;
            var r = new t;
            t.prototype = void 0
          }
          return r || {}
        }
      }(), Bt = b("length"), Jt = $t || function () {
          return []
        };
      (Ht && A(new Ht) != st || Gt && A(new Gt) != pt) && (A = function (t) {
        var e = It.call(t), r = e == ct ? t.constructor : null, n = "function" == typeof r ? Ct.call(r) : "";
        if (n) {
          if (n == Ut)return st;
          if (n == Xt)return pt
        }
        return e
      });
      var Kt = Array.isArray, Wt = P(function (t, e, r) {
        y(t, e, r)
      });
      e.exports = Wt
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {
    "lodash._arrayeach": 5,
    "lodash._basefor": 6,
    "lodash._stack": 7,
    "lodash.isplainobject": 9,
    "lodash.keys": 10,
    "lodash.keysin": 11,
    "lodash.rest": 12
  }],
  5: [function (t, e, r) {
    function n(t, e) {
      for (var r = -1, n = t.length; ++r < n && e(t[r], r, t) !== !1;);
      return t
    }

    e.exports = n
  }, {}],
  6: [function (t, e, r) {
    function n(t) {
      return function (e, r, n) {
        for (var o = -1, i = Object(e), u = n(e), a = u.length; a--;) {
          var s = u[t ? a : ++o];
          if (r(i[s], s, i) === !1)break
        }
        return e
      }
    }

    var o = n();
    e.exports = o
  }, {}],
  7: [function (t, e, r) {
    (function (r) {
      function n(t) {
        var e = -1, r = t ? t.length : 0;
        for (this.clear(); ++e < r;) {
          var n = t[e];
          this.set(n[0], n[1])
        }
      }

      function o() {
        this.__data__ = {array: [], map: null}
      }

      function i(t) {
        var e = this.__data__, r = e.array;
        return r ? l(r, t) : e.map["delete"](t)
      }

      function u(t) {
        var e = this.__data__, r = e.array;
        return r ? c(r, t) : e.map.get(t)
      }

      function a(t) {
        var e = this.__data__, r = e.array;
        return r ? f(r, t) : e.map.has(t)
      }

      function s(t, e) {
        var r = this.__data__, n = r.array;
        n && (n.length < v - 1 ? d(n, t, e) : (r.array = null, r.map = new y(n)));
        var o = r.map;
        return o && o.set(t, e), this
      }

      function l(t, e) {
        var r = p(t, e);
        if (0 > r)return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : m.call(t, r, 1), !0
      }

      function c(t, e) {
        var r = p(t, e);
        return 0 > r ? void 0 : t[r][1]
      }

      function f(t, e) {
        return p(t, e) > -1
      }

      function p(t, e) {
        for (var r = t.length; r--;)if (h(t[r][0], e))return r;
        return -1
      }

      function d(t, e, r) {
        var n = p(t, e);
        0 > n ? t.push([e, r]) : t[n][1] = r
      }

      function h(t, e) {
        return t === e || t !== t && e !== e
      }

      var y = t("lodash._mapcache"), v = 200, b = r.Array.prototype, m = b.splice;
      n.prototype.clear = o, n.prototype["delete"] = i, n.prototype.get = u, n.prototype.has = a, n.prototype.set = s, e.exports = n
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {"lodash._mapcache": 8}],
  8: [function (t, e, r) {
    (function (t) {
      function r(t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString)try {
          e = !!(t + "")
        } catch (r) {
        }
        return e
      }

      function n() {
      }

      function o(t, e) {
        return u(t, e) && delete t[e]
      }

      function i(t, e) {
        if ($) {
          var r = t[e];
          return r === M ? void 0 : r
        }
        return R.call(t, e) ? t[e] : void 0
      }

      function u(t, e) {
        return $ ? void 0 !== t[e] : R.call(t, e)
      }

      function a(t, e, r) {
        t[e] = $ && void 0 === r ? M : r
      }

      function s(t) {
        var e = -1, r = t ? t.length : 0;
        for (this.clear(); ++e < r;) {
          var n = t[e];
          this.set(n[0], n[1])
        }
      }

      function l() {
        this.__data__ = {hash: new n, map: L ? new L : [], string: new n}
      }

      function c(t) {
        var e = this.__data__;
        return _(t) ? o("string" == typeof t ? e.string : e.hash, t) : L ? e.map["delete"](t) : h(e.map, t)
      }

      function f(t) {
        var e = this.__data__;
        return _(t) ? i("string" == typeof t ? e.string : e.hash, t) : L ? e.map.get(t) : y(e.map, t)
      }

      function p(t) {
        var e = this.__data__;
        return _(t) ? u("string" == typeof t ? e.string : e.hash, t) : L ? e.map.has(t) : v(e.map, t)
      }

      function d(t, e) {
        var r = this.__data__;
        return _(t) ? a("string" == typeof t ? r.string : r.hash, t, e) : L ? r.map.set(t, e) : m(r.map, t, e), this
      }

      function h(t, e) {
        var r = b(t, e);
        if (0 > r)return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : Y.call(t, r, 1), !0
      }

      function y(t, e) {
        var r = b(t, e);
        return 0 > r ? void 0 : t[r][1]
      }

      function v(t, e) {
        return b(t, e) > -1
      }

      function b(t, e) {
        for (var r = t.length; r--;)if (w(t[r][0], e))return r;
        return -1
      }

      function m(t, e, r) {
        var n = b(t, e);
        0 > n ? t.push([e, r]) : t[n][1] = r
      }

      function g(t, e) {
        var r = null == t ? void 0 : t[e];
        return x(r) ? r : void 0
      }

      function _(t) {
        var e = typeof t;
        return "number" == e || "boolean" == e || "string" == e && "__proto__" !== t || null == t
      }

      function w(t, e) {
        return t === e || t !== t && e !== e
      }

      function j(t) {
        var e = O(t) ? I.call(t) : "";
        return e == k || e == P
      }

      function O(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
      }

      function E(t) {
        return !!t && "object" == typeof t
      }

      function x(t) {
        return null == t ? !1 : j(t) ? D.test(C.call(t)) : E(t) && (r(t) ? D : A).test(t)
      }

      var M = "__lodash_hash_undefined__", k = "[object Function]", P = "[object GeneratorFunction]", q = /[\\^$.*+?()[\]{}|]/g, A = /^\[object .+?Constructor\]$/, T = t.Array.prototype, S = t.Object.prototype, C = t.Function.prototype.toString, R = S.hasOwnProperty, I = S.toString, D = RegExp("^" + C.call(R).replace(q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Y = T.splice, L = g(t, "Map"), $ = g(Object, "create");
      n.prototype = $ ? $(null) : S, s.prototype.clear = l, s.prototype["delete"] = c, s.prototype.get = f, s.prototype.has = p, s.prototype.set = d, e.exports = s
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {}],
  9: [function (t, e, r) {
    (function (t) {
      function r(t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString)try {
          e = !!(t + "")
        } catch (r) {
        }
        return e
      }

      function n(t) {
        return !!t && "object" == typeof t
      }

      function o(t) {
        if (!n(t) || l.call(t) != i || r(t))return !1;
        var e = u;
        if ("function" == typeof t.constructor && (e = c(t)), null === e)return !0;
        var o = e.constructor;
        return "function" == typeof o && o instanceof o && a.call(o) == s
      }

      var i = "[object Object]", u = t.Object.prototype, a = t.Function.prototype.toString, s = a.call(Object), l = u.toString, c = Object.getPrototypeOf;
      e.exports = o
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {}],
  10: [function (t, e, r) {
    arguments[4][2][0].apply(r, arguments)
  }, {dup: 2}],
  11: [function (t, e, r) {
    (function (t) {
      function r(t, e) {
        for (var r = -1, n = Array(t); ++r < t;)n[r] = e(r);
        return n
      }

      function n(t, e) {
        return t = "number" == typeof t || O.test(t) ? +t : -1, e = null == e ? m : e, t > -1 && t % 1 == 0 && e > t
      }

      function o(t) {
        for (var e, r = []; !(e = t.next()).done;)r.push(e.value);
        return r
      }

      function i(t) {
        t = null == t ? t : Object(t);
        var e = [];
        for (var r in t)e.push(r);
        return e
      }

      function u(t) {
        return function (e) {
          return null == e ? void 0 : e[t]
        }
      }

      function a(t) {
        var e = t ? t.length : void 0;
        return d(e) && (T(t) || v(t) || l(t)) ? r(e, String) : null
      }

      function s(t) {
        var e = t && t.constructor, r = "function" == typeof e && e.prototype || E;
        return t === r
      }

      function l(t) {
        return f(t) && x.call(t, "callee") && (!q.call(t, "callee") || M.call(t) == g)
      }

      function c(t) {
        return null != t && !("function" == typeof t && p(t)) && d(A(t))
      }

      function f(t) {
        return y(t) && c(t)
      }

      function p(t) {
        var e = h(t) ? M.call(t) : "";
        return e == _ || e == w
      }

      function d(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && m >= t
      }

      function h(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
      }

      function y(t) {
        return !!t && "object" == typeof t
      }

      function v(t) {
        return "string" == typeof t || !T(t) && y(t) && M.call(t) == j
      }

      function b(t) {
        for (var e = -1, r = s(t), o = i(t), u = o.length, l = a(t), c = !!l, f = l || [], p = f.length; ++e < u;) {
          var d = o[e];
          c && ("length" == d || n(d, p)) || "constructor" == d && (r || !x.call(t, d)) || f.push(d)
        }
        return f
      }

      var m = 9007199254740991, g = "[object Arguments]", _ = "[object Function]", w = "[object GeneratorFunction]", j = "[object String]", O = /^(?:0|[1-9]\d*)$/, E = t.Object.prototype, x = E.hasOwnProperty, M = E.toString, k = t.Reflect, P = k ? k.enumerate : void 0, q = E.propertyIsEnumerable;
      P && !q.call({valueOf: 1}, "valueOf") && (i = function (t) {
        return o(P(t))
      });
      var A = u("length"), T = Array.isArray;
      e.exports = b
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {}],
  12: [function (t, e, r) {
    arguments[4][3][0].apply(r, arguments)
  }, {dup: 3}],
  13: [function (t, e, r) {
    function n() {
    }

    function o(t) {
      var e = {}.toString.call(t);
      switch (e) {
        case"[object File]":
        case"[object Blob]":
        case"[object FormData]":
          return !0;
        default:
          return !1
      }
    }

    function i(t) {
      return t === Object(t)
    }

    function u(t) {
      if (!i(t))return t;
      var e = [];
      for (var r in t)null != t[r] && a(e, r, t[r]);
      return e.join("&")
    }

    function a(t, e, r) {
      return Array.isArray(r) ? r.forEach(function (r) {
        a(t, e, r)
      }) : void t.push(encodeURIComponent(e) + "=" + encodeURIComponent(r))
    }

    function s(t) {
      for (var e, r, n = {}, o = t.split("&"), i = 0, u = o.length; u > i; ++i)r = o[i], e = r.split("="), n[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
      return n
    }

    function l(t) {
      var e, r, n, o, i = t.split(/\r?\n/), u = {};
      i.pop();
      for (var a = 0, s = i.length; s > a; ++a)r = i[a], e = r.indexOf(":"), n = r.slice(0, e).toLowerCase(), o = _(r.slice(e + 1)), u[n] = o;
      return u
    }

    function c(t) {
      return /[\/+]json\b/.test(t)
    }

    function f(t) {
      return t.split(/ *; */).shift()
    }

    function p(t) {
      return g(t.split(/ *; */), function (t, e) {
        var r = e.split(/ *= */), n = r.shift(), o = r.shift();
        return n && o && (t[n] = o), t
      }, {})
    }

    function d(t, e) {
      e = e || {}, this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || "undefined" == typeof this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText, this.setStatusProperties(this.xhr.status), this.header = this.headers = l(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this.setHeaderProperties(this.header), this.body = "HEAD" != this.req.method ? this.parseBody(this.text ? this.text : this.xhr.response) : null
    }

    function h(t, e) {
      var r = this;
      m.call(this), this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function () {
        var t = null, e = null;
        try {
          e = new d(r)
        } catch (n) {
          return t = new Error("Parser is unable to parse the response"), t.parse = !0, t.original = n, t.rawResponse = r.xhr && r.xhr.responseText ? r.xhr.responseText : null, r.callback(t)
        }
        if (r.emit("response", e), t)return r.callback(t, e);
        if (e.status >= 200 && e.status < 300)return r.callback(t, e);
        var o = new Error(e.statusText || "Unsuccessful HTTP response");
        o.original = t, o.response = e, o.status = e.status, r.callback(o, e)
      })
    }

    function y(t, e) {
      return "function" == typeof e ? new h("GET", t).end(e) : 1 == arguments.length ? new h("GET", t) : new h(t, e)
    }

    function v(t, e) {
      var r = y("DELETE", t);
      return e && r.end(e), r
    }

    var b, m = t("emitter"), g = t("reduce");
    b = "undefined" != typeof window ? window : "undefined" != typeof self ? self : this, y.getXHR = function () {
      if (!(!b.XMLHttpRequest || b.location && "file:" == b.location.protocol && b.ActiveXObject))return new XMLHttpRequest;
      try {
        return new ActiveXObject("Microsoft.XMLHTTP")
      } catch (t) {
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0")
      } catch (t) {
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0")
      } catch (t) {
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP")
      } catch (t) {
      }
      return !1
    };
    var _ = "".trim ? function (t) {
      return t.trim()
    } : function (t) {
      return t.replace(/(^\s*|\s*$)/g, "")
    };
    y.serializeObject = u, y.parseString = s, y.types = {
      html: "text/html",
      json: "application/json",
      xml: "application/xml",
      urlencoded: "application/x-www-form-urlencoded",
      form: "application/x-www-form-urlencoded",
      "form-data": "application/x-www-form-urlencoded"
    }, y.serialize = {
      "application/x-www-form-urlencoded": u,
      "application/json": JSON.stringify
    }, y.parse = {
      "application/x-www-form-urlencoded": s,
      "application/json": JSON.parse
    }, d.prototype.get = function (t) {
      return this.header[t.toLowerCase()]
    }, d.prototype.setHeaderProperties = function (t) {
      var e = this.header["content-type"] || "";
      this.type = f(e);
      var r = p(e);
      for (var n in r)this[n] = r[n]
    }, d.prototype.parseBody = function (t) {
      var e = y.parse[this.type];
      return e && t && (t.length || t instanceof Object) ? e(t) : null
    }, d.prototype.setStatusProperties = function (t) {
      1223 === t && (t = 204);
      var e = t / 100 | 0;
      this.status = this.statusCode = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.clientError = 4 == e, this.serverError = 5 == e, this.error = 4 == e || 5 == e ? this.toError() : !1, this.accepted = 202 == t, this.noContent = 204 == t, this.badRequest = 400 == t, this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.notFound = 404 == t, this.forbidden = 403 == t
    }, d.prototype.toError = function () {
      var t = this.req, e = t.method, r = t.url, n = "cannot " + e + " " + r + " (" + this.status + ")", o = new Error(n);
      return o.status = this.status, o.method = e, o.url = r, o
    }, y.Response = d, m(h.prototype), h.prototype.use = function (t) {
      return t(this), this
    }, h.prototype.timeout = function (t) {
      return this._timeout = t, this
    }, h.prototype.clearTimeout = function () {
      return this._timeout = 0, clearTimeout(this._timer), this
    }, h.prototype.abort = function () {
      return this.aborted ? void 0 : (this.aborted = !0, this.xhr.abort(), this.clearTimeout(), this.emit("abort"), this)
    }, h.prototype.set = function (t, e) {
      if (i(t)) {
        for (var r in t)this.set(r, t[r]);
        return this
      }
      return this._header[t.toLowerCase()] = e, this.header[t] = e, this
    }, h.prototype.unset = function (t) {
      return delete this._header[t.toLowerCase()], delete this.header[t], this
    }, h.prototype.getHeader = function (t) {
      return this._header[t.toLowerCase()]
    }, h.prototype.type = function (t) {
      return this.set("Content-Type", y.types[t] || t), this
    }, h.prototype.parse = function (t) {
      return this._parser = t, this
    }, h.prototype.accept = function (t) {
      return this.set("Accept", y.types[t] || t), this
    }, h.prototype.auth = function (t, e) {
      var r = btoa(t + ":" + e);
      return this.set("Authorization", "Basic " + r), this
    }, h.prototype.query = function (t) {
      return "string" != typeof t && (t = u(t)), t && this._query.push(t), this
    }, h.prototype.field = function (t, e) {
      return this._formData || (this._formData = new b.FormData), this._formData.append(t, e), this
    }, h.prototype.attach = function (t, e, r) {
      return this._formData || (this._formData = new b.FormData), this._formData.append(t, e, r || e.name), this
    }, h.prototype.send = function (t) {
      var e = i(t), r = this.getHeader("Content-Type");
      if (e && i(this._data))for (var n in t)this._data[n] = t[n]; else"string" == typeof t ? (r || this.type("form"), r = this.getHeader("Content-Type"), "application/x-www-form-urlencoded" == r ? this._data = this._data ? this._data + "&" + t : t : this._data = (this._data || "") + t) : this._data = t;
      return !e || o(t) ? this : (r || this.type("json"), this)
    }, h.prototype.callback = function (t, e) {
      var r = this._callback;
      this.clearTimeout(), r(t, e)
    }, h.prototype.crossDomainError = function () {
      var t = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
      t.crossDomain = !0, t.status = this.status, t.method = this.method, t.url = this.url, this.callback(t)
    }, h.prototype.timeoutError = function () {
      var t = this._timeout, e = new Error("timeout of " + t + "ms exceeded");
      e.timeout = t, this.callback(e)
    }, h.prototype.withCredentials = function () {
      return this._withCredentials = !0, this
    }, h.prototype.end = function (t) {
      var e = this, r = this.xhr = y.getXHR(), i = this._query.join("&"), u = this._timeout, a = this._formData || this._data;
      this._callback = t || n, r.onreadystatechange = function () {
        if (4 == r.readyState) {
          var t;
          try {
            t = r.status
          } catch (n) {
            t = 0
          }
          if (0 == t) {
            if (e.timedout)return e.timeoutError();
            if (e.aborted)return;
            return e.crossDomainError()
          }
          e.emit("end")
        }
      };
      var s = function (t) {
        t.total > 0 && (t.percent = t.loaded / t.total * 100), t.direction = "download", e.emit("progress", t)
      };
      this.hasListeners("progress") && (r.onprogress = s);
      try {
        r.upload && this.hasListeners("progress") && (r.upload.onprogress = s)
      } catch (l) {
      }
      if (u && !this._timer && (this._timer = setTimeout(function () {
          e.timedout = !0, e.abort()
        }, u)), i && (i = y.serializeObject(i), this.url += ~this.url.indexOf("?") ? "&" + i : "?" + i), r.open(this.method, this.url, !0), this._withCredentials && (r.withCredentials = !0), "GET" != this.method && "HEAD" != this.method && "string" != typeof a && !o(a)) {
        var f = this.getHeader("Content-Type"), p = this._parser || y.serialize[f ? f.split(";")[0] : ""];
        !p && c(f) && (p = y.serialize["application/json"]), p && (a = p(a))
      }
      for (var d in this.header)null != this.header[d] && r.setRequestHeader(d, this.header[d]);
      return this.emit("request", this), r.send("undefined" != typeof a ? a : null), this
    }, h.prototype.then = function (t, e) {
      return this.end(function (r, n) {
        r ? e(r) : t(n)
      })
    }, y.Request = h, y.get = function (t, e, r) {
      var n = y("GET", t);
      return "function" == typeof e && (r = e, e = null), e && n.query(e), r && n.end(r), n
    }, y.head = function (t, e, r) {
      var n = y("HEAD", t);
      return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
    }, y.del = v, y["delete"] = v, y.patch = function (t, e, r) {
      var n = y("PATCH", t);
      return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
    }, y.post = function (t, e, r) {
      var n = y("POST", t);
      return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
    }, y.put = function (t, e, r) {
      var n = y("PUT", t);
      return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
    }, e.exports = y
  }, {emitter: 14, reduce: 15}],
  14: [function (t, e, r) {
    function n(t) {
      return t ? o(t) : void 0
    }

    function o(t) {
      for (var e in n.prototype)t[e] = n.prototype[e];
      return t
    }

    e.exports = n, n.prototype.on = n.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
    }, n.prototype.once = function (t, e) {
      function r() {
        this.off(t, r), e.apply(this, arguments)
      }

      return r.fn = e, this.on(t, r), this
    }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length)return this._callbacks = {}, this;
      var r = this._callbacks["$" + t];
      if (!r)return this;
      if (1 == arguments.length)return delete this._callbacks["$" + t], this;
      for (var n, o = 0; o < r.length; o++)if (n = r[o], n === e || n.fn === e) {
        r.splice(o, 1);
        break
      }
      return this
    }, n.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      var e = [].slice.call(arguments, 1), r = this._callbacks["$" + t];
      if (r) {
        r = r.slice(0);
        for (var n = 0, o = r.length; o > n; ++n)r[n].apply(this, e)
      }
      return this
    }, n.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
    }, n.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length
    }
  }, {}],
  15: [function (t, e, r) {
    e.exports = function (t, e, r) {
      for (var n = 0, o = t.length, i = 3 == arguments.length ? r : t[n++]; o > n;)i = e.call(null, i, t[n], ++n, t);
      return i
    }
  }, {}],
  16: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r["default"] = function () {
      var t = Array.prototype.slice.call(arguments), e = i["default"].getCallback(t);
      if (!e)return this.handleError(c, e);
      var r = i["default"].getMemberId.call(this, t);
      return r ? this.baseRequest({method: u, path: "" + a + r + s}, e) : this.handleError(l, e)
    };
    var o = t("../helper/helper"), i = n(o), u = "GET", a = "/api/members/", s = "/challenges/done", l = "You must provide a member ID.", c = "You must provide a callback."
  }, {"../helper/helper": 32}],
  17: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r["default"] = function () {
      var t = Array.prototype.slice.call(arguments), e = i["default"].getCallback(t);
      if (!e)return this.handleError(c, e);
      var r = i["default"].getMemberId.call(this, t);
      return r ? this.baseRequest({method: u, path: "" + a + r + s}, e) : this.handleError(l, e)
    };
    var o = t("../helper/helper"), i = n(o), u = "GET", a = "/api/members/", s = "/challenges", l = "You must provide a member ID.", c = "You must provide a callback."
  }, {"../helper/helper": 32}],
  18: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r["default"] = function () {
      var t = Array.prototype.slice.call(arguments), e = i["default"].getCallback(t);
      if (!e)return this.handleError(c, e);
      var r = i["default"].getMemberId.call(this, t);
      return r ? this.baseRequest({method: u, path: "" + a + r + s}, e) : this.handleError(l, e)
    };
    var o = t("../helper/helper"), i = n(o), u = "GET", a = "/api/members/", s = "/challenges/todo", l = "You must provide a member ID.", c = "You must provide a callback."
  }, {"../helper/helper": 32}],
  19: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r["default"] = function () {
      var t = this, e = Array.prototype.slice.call(arguments), r = i["default"].getCallback(e) || function () {
        }, n = function (e, n) {
        return t.memberId = null, r(e, n)
      };
      return this.baseRequest({method: u, path: "" + a, body: {}}, n)
    };
    var o = t("../helper/helper"), i = n(o), u = "DELETE", a = "/api/gamification/actions/identify-member"
  }, {"../helper/helper": 32}],
  20: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r["default"] = function () {
      var t = Array.prototype.slice.call(arguments), e = i["default"].getCallback(t);
      if (!e)return this.handleError(s, e);
      var r = i["default"].getMemberId.call(this, t), n = "";
      return r && (n = i["default"].getQueryParams(r)), this.baseRequest({method: u, path: "" + a + n}, e)
    };
    var o = t("../helper/helper"), i = n(o), u = "GET", a = "/api/contests", s = "You must provide a callback."
  }, {"../helper/helper": 32}],
  21: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r["default"] = function () {
      var t = Array.prototype.slice.call(arguments), e = i["default"].getCallback(t);
      if (!e)return this.handleError(l, e);
      var r = i["default"].getDeviceId(t);
      return this.baseRequest({method: u, path: "me" === r ? s + "/" + r : a + "/" + r}, e)
    };
    var o = t("../helper/helper"), i = n(o), u = "GET", a = "/api/devices", s = "/api/device", l = "You must provide a callback."
  }, {"../helper/helper": 32}],
  22: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    function o(t) {
      return t.externalId ? a({}, t, {external_id: t.externalId}) : t
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r["default"] = function (t, e) {
      var r = this;
      t = t || {}, u["default"].hasOneOfRequiredProperties(["memberId", "externalId", "email"], t) || this.handleError(c, e), t = o(t);
      var n = function (t, n) {
        return n && n.body && n.body.data && n.body.data.id && (r.memberId = n.body.data.id), e && "function" == typeof e ? e(t, n) : void 0
      };
      return this.baseRequest({method: s, body: t, path: l}, n)
    };
    var i = t("../helper/helper"), u = n(i), a = t("lodash.assign"), s = "POST", l = "/api/gamification/actions/identify-member", c = "You must provide either a member ID, an external ID or an email."
  }, {"../helper/helper": 32, "lodash.assign": 1}],
  23: [function (t, e, r) {
    "use strict";
    function n(t) {
      return t && t.__esModule ? t : {"default": t}
    }

    Object.defineProperty(r, "__esModule", {value: !0}), r.clientMethods = void 0;
    var o = t("./track.action.js"), i = n(o), u = t("./setup"), a = n(u), s = t("./identify.member.js"), l = n(s), c = t("./clear.member.js"), f = n(c), p = t("./member.profile.js"), d = n(p), h = t("./device.profile.js"), y = n(h), v = t("./challenges"), b = n(v), m = t("./challenges.done.js"), g = n(m), _ = t("./challenges.todo.js"), w = n(_), j = t("./menus"), O = n(j), E = t("./pages"), x = n(E), M = t("./news"), k = n(M), P = t("./contests"), q = n(P), A = t("../request/base.request.js");
r.clientMethods={setup:a["default"],trackAction:i["default"],baseRequest:A.baseRequest,identifyMember:l["default"],clearMember:f["default"],getMemberProfile:d["default"],getDeviceProfile:y["default"],getMemberChallenges:b["default"],getMemberChallengesDone:g["default"],getMemberChallengesTodo:w["default"],getMenus:O["default"],getPages:x["default"],getNews:k["default"],getContests:q["default"]}},{"../request/base.request.js":39,"./challenges":17,"./challenges.done.js":16,"./challenges.todo.js":18,"./clear.member.js":19,"./contests":20,"./device.profile.js":21,"./identify.member.js":22,"./member.profile.js":24,"./menus":25,"./news":26,"./pages":27,"./setup":29,"./track.action.js":30}],24:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(){var t=Array.prototype.slice.call(arguments),e=i["default"].getCallback(t);if(!e)return this.handleError(l,e);var r=i["default"].getMemberId.call(this,t);return r?this.baseRequest({method:u,path:a+"/"+r},e):this.handleError(s,e)};var o=t("../helper/helper"),i=n(o),u="GET",a="/api/members",s="You must provide a member ID.",l="You must provide a callback."},{"../helper/helper":32}],25:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(){var t=Array.prototype.slice.call(arguments),e=i["default"].getCallback(t);if(!e)return this.handleError(s,e);var r=i["default"].getMemberId.call(this,t),n="";return r&&(n=i["default"].getQueryParams(r)),this.baseRequest({method:u,path:""+a+n},e)};var o=t("../helper/helper"),i=n(o),u="GET",a="/api/content/menus",s="You must provide a callback."},{"../helper/helper":32}],26:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(t,e){if(!e||"function"!=typeof e)return this.handleError(l,e);if(t=t||{},!i["default"].hasRequiredProperties("newsListId",t))return this.handleError(s,e);var r=i["default"].getMemberId.call(this,[t]),n="";return r&&(n=i["default"].getQueryParams(r)),this.baseRequest({method:u,path:a+"/"+t.newsListId+n},e)};var o=t("../helper/helper"),i=n(o),u="GET",a="/api/content/newslists",s="You must provide a news list ID.",l="You must provide a callback."},{"../helper/helper":32}],27:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(t,e){if(!e||"function"!=typeof e)return this.handleError(l,e);if(t=t||{},!i["default"].hasRequiredProperties("pageId",t))return this.handleError(s,e);var r=i["default"].getMemberId.call(this,[t]),n="";return r&&(n=i["default"].getQueryParams(r)),this.baseRequest({method:u,path:a+"/"+t.pageId+n},e)};var o=t("../helper/helper"),i=n(o),u="GET",a="/api/content/pages",s="You must provide a page ID.",l="You must provide a callback."},{"../helper/helper":32}],28:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(r,"__esModule",{value:!0});var u=function(t){function e(t,r){n(this,e),t=t||{},r=r||"";try{t=JSON.parse(t)}catch(i){}var u=o(this,Object.getPrototypeOf(e).call(this,t.error));return u.body=t,u.statusCode=r,u}return i(e,t),e}(Error);r["default"]=u},{}],29:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(t){return t=t||{},i["default"].hasRequiredProperties("key",t)?void(this.config=u({},this.config,t)):this.handleError(a)};var o=t("../helper/helper"),i=n(o),u=t("lodash.assign"),a="You must provide a Key."},{"../helper/helper":32,"lodash.assign":1}],30:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t){return 1===t.length&&"string"==typeof t[0]||1===t.length&&"object"===s(t[0])||2===t.length&&"string"==typeof t[0]&&"function"==typeof t[1]||2===t.length&&"object"===s(t[0])&&"function"==typeof t[1]||2===t.length&&"string"==typeof t[0]&&"object"===s(t[1])||3===t.length&&"string"==typeof t[0]&&"object"===s(t[1])&&"function"==typeof t[2]}function i(t){var e=void 0;switch(t.length){case 1:e=u(t);break;case 2:e="function"==typeof t[1]?u(t):a(t);break;default:e=a(t)}return e}function u(t){return"string"==typeof t[0]?f({},{type:t[0]}):t[0]}function a(t){return f({},t[1],{type:t[0]})}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(){var t=Array.prototype.slice.call(arguments),e="function"==typeof t[t.length-1]?t[t.length-1]:null;if(!o(t))return this.handleError(y,e);var r=i(t);return c["default"].hasRequiredProperties("type",r)?this.baseRequest({method:p,body:r,path:d},e):this.handleError(h,e)};var l=t("../helper/helper"),c=n(l),f=t("lodash.assign"),p="POST",d="/api/gamification/actions",h="You must provide the type of action to be tracked.",y="You must provide the correct arguments to trackAction."},{"../helper/helper":32,"lodash.assign":1}],31:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();Object.defineProperty(r,"__esModule",{value:!0});var i=t("../client.methods/index"),u=t("lodash.assign"),a="services.fidemapps.com",s=function(){function t(){n(this,t),this.config={hostname:a,port:80,protocol:"http",dev:!1},this.memberId=null}return o(t,[{key:"handleError",value:function(t,e){t=t||"N/A";var r=void 0;if(r="string"==typeof t?new Error(t):t,e&&"string"==typeof e)return e(r);if(!this.config.dev&&console)return console.error(r.message);throw r}}]),t}();r["default"]=s,u(s.prototype,i.clientMethods)},{"../client.methods/index":23,"lodash.assign":1}],32:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();Object.defineProperty(r,"__esModule",{value:!0});var u=(t("lodash.assign"),function(){function t(){n(this,t)}return i(t,null,[{key:"getCallback",value:function(t){var e=null;return t&&t.length&&0!==t.length&&"function"==typeof t[t.length-1]&&(e=t[t.length-1]),e}},{key:"hasRequiredProperties",value:function(t,e){return"string"==typeof t&&(t=[t]),t.every(function(t){return!!e[t]})}},{key:"hasOneOfRequiredProperties",value:function(t,e){return t.some(function(t){return!!e[t]})}},{key:"getMemberId",value:function(t){var e=this.memberId||null;return t&&t[0]&&"object"===o(t[0])&&(e=t[0].memberId||e),e}},{key:"getDeviceId",value:function(t){var e="me";return t&&t[0]&&"object"===o(t[0])&&(e=t[0].deviceId||e),e}},{key:"getQueryParams",value:function(t){var e="";return!t||"string"!=typeof t&&"number"!=typeof t||(e="?memberId="+t),e}}]),t}());r["default"]=u},{"lodash.assign":1}],33:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(t,e){return t&&"string"==typeof t?e&&"function"==typeof e?lr360.client.baseRequest({method:n,path:t},e):lr360.client.handleError(i,e):lr360.client.handleError(o,e)};var n="DELETE",o="You must provide a endpoint.",i="You must provide a callback."},{}],34:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(t,e){return t&&"string"==typeof t?e&&"function"==typeof e?lr360.client.baseRequest({method:n,path:t},e):lr360.client.handleError(i,e):lr360.client.handleError(o,e)};var n="GET",o="You must provide a endpoint.",i="You must provide a callback."},{}],35:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(r,"__esModule",{value:!0}),r.httpMethods=void 0;var o=t("./get"),i=n(o),u=t("./post"),a=n(u),s=t("./put"),l=n(s),c=t("./delete"),f=n(c);r.httpMethods={get:i["default"],post:a["default"],put:l["default"],"delete":f["default"]}},{"./delete":33,"./get":34,"./post":36,"./put":37}],36:[function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(t,e,r){return t&&"string"==typeof t?e&&"object"===("undefined"==typeof e?"undefined":n(e))?r&&"function"==typeof r?lr360.client.baseRequest({method:o,path:t,body:e},r):lr360.client.handleError(a,r):lr360.client.handleError(u,r):lr360.client.handleError(i,r)};var o="POST",i="You must provide a endpoint.",u="You must provide a request body.",a="You must provide a callback."},{}],37:[function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=function(t,e,r){return t&&"string"==typeof t?e&&"object"===("undefined"==typeof e?"undefined":n(e))?r&&"function"==typeof r?lr360.client.baseRequest({method:o,path:t,body:e},r):lr360.client.handleError(a,r):lr360.client.handleError(u,r):lr360.client.handleError(i,r)};var o="PUT",i="You must provide a endpoint.",u="You must provide a request body.",a="You must provide a callback."},{}],38:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(){for(;window.lr360.queue&&window.lr360.queue.length;){var t=window.lr360.queue.shift();u(t)}}function i(){window.lr360.queue.push=u}function u(t){t=Array.prototype.slice.call(t);var e=t.shift();c[e].apply(c,t)}Object.defineProperty(r,"__esModule",{value:!0}),r.client=void 0,r.emptyQueue=o,r.replaceQueuePush=i;var a=t("./client/client"),s=n(a),l=t("./http.methods/index"),c=(t("lodash.assign"),r.client=new s["default"]);window.lr360=window.lr360||{},window.lr360.queue=window.lr360.queue||[],window.lr360.client=c,window.lr360.get=l.httpMethods.get,window.lr360.post=l.httpMethods.post,window.lr360.put=l.httpMethods.put,window.lr360["delete"]=l.httpMethods["delete"],o(),i()},{"./client/client":31,"./http.methods/index":35,"lodash.assign":1}],39:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){var r=this;return t=t||{},s["default"].hasRequiredProperties("key",this.config)&&s["default"].hasRequiredProperties("path",t)?i(t,function(t){var n=t.method.toLowerCase(),o=u(p({},t,r.config));f[n](o).set("X-Fidem-AccessApiKey",r.config.key||null).set("Accept","application/json").set("Content-Type","application/json").withCredentials().send(t&&t.body&&JSON.stringify(t.body)||null).end(function(t,n){var o=void 0;if(n&&n.statusCode>=299&&(o=new c["default"](n.body,n.statusCode)),e&&"function"==typeof e){var i=t||o||null;return e(i,n)}return t||o?r.handleError(t||o,e):void 0})}):this.handleError(h,e)}function i(t,e){function r(r){var n={lat:r.coords.latitude,"long":r.coords.longitude};e(d({},t,{body:{coordinates:n}}))}function n(){e(d({},t,{body:{coordinates:null}}))}return t.method&&-1!==["put","post"].indexOf(t.method.toLowerCase())&&"/api/gamification/actions"===t.path?void(window.navigator&&window.navigator.geolocation?window.navigator.geolocation.getCurrentPosition(r,n):n()):e(t)}function u(t){var e=t.path||"";return t.protocol+"://"+t.hostname+":"+t.port+e}Object.defineProperty(r,"__esModule",{value:!0}),r.baseRequest=o,r.addGeolocation=i;var a=t("../helper/helper"),s=n(a),l=t("../client.methods/request.error.js"),c=n(l),f=t("superagent"),p=t("lodash.assign"),d=t("lodash.merge"),h="You must provide a key and a path."},{"../client.methods/request.error.js":28,"../helper/helper":32,"lodash.assign":1,"lodash.merge":4,superagent:13}]},{},[38]);
