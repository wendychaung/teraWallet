/*
 * @project: TERA
 * @version: Development (beta)
 * @copyright: Yuriy Ivanov 2017-2019 [progr76@gmail.com]
 * @license: MIT (not for evil)
 * Web: http://terafoundation.org
 * GitHub: https://github.com/terafoundation/wallet
 * Twitter: https://twitter.com/terafoundation
 * Telegram: https://web.telegram.org/#/im?p=@terafoundation
*/

var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.arrayIteratorImpl = function (t)
{
    var e = 0;
    return function ()
    {
        return e < t.length ? {done:!1, value:t[e++]} : {done:!0};
    };
}, $jscomp.arrayIterator = function (t)
{
    return {next:$jscomp.arrayIteratorImpl(t)};
}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t,e,r)
{
    t != Array.prototype && t != Object.prototype && (t[e] = r.value);
}, $jscomp.getGlobal = function (t)
{
    return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t;
}, $jscomp.global = $jscomp.getGlobal(this), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function ()
{
    $jscomp.initSymbol = function ()
    {
    }, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
}, $jscomp.Symbol = function ()
{
    var e = 0;
    return function (t)
    {
        return $jscomp.SYMBOL_PREFIX + (t || "") + e++;
    };
}(), $jscomp.initSymbolIterator = function ()
{
    $jscomp.initSymbol();
    var t = $jscomp.global.Symbol.iterator;
    t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype,
    t, {configurable:!0, writable:!0, value:function ()
        {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
        }}), $jscomp.initSymbolIterator = function ()
    {
    };
}, $jscomp.initSymbolAsyncIterator = function ()
{
    $jscomp.initSymbol();
    var t = $jscomp.global.Symbol.asyncIterator;
    t || (t = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator")), $jscomp.initSymbolAsyncIterator = function ()
    {
    };
}, $jscomp.iteratorPrototype = function (t)
{
    return $jscomp.initSymbolIterator(), (t = {next:t})[$jscomp.global.Symbol.iterator] = function ()
    {
        return this;
    }, t;
}, function i(n,s,o)
{
    
function a(e,t)
    {
        if(!s[e])
        {
            if(!n[e])
            {
                var r = "function" == typeof require && require;
                if(!t && r)
                    return r(e, !0);
                if(h)
                    return h(e, !0);
                throw (r = Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND", r;
            }
            r = s[e] = {exports:{}}, n[e][0].call(r.exports, function (t)
            {
                return a(n[e][1][t] || t);
            }, r, r.exports, i, n, s, o);
        }
        return s[e].exports;
    };
    for(var h = "function" == typeof require && require, t = 0; t < o.length; t++)
        a(o[t]);
    return a;
}({1:[function (t,e,r)
    {
        
function a(t)
        {
            var e = t.length;
            if(0 < e % 4)
                throw Error("Invalid string. Length must be a multiple of 4");
            return  - 1 === (t = t.indexOf("=")) && (t = e), [t, t === e ? 0 : 4 - t % 4];
        };
        
function o(t,e,r)
        {
            for(var i = [], n = e; n < r; n += 3)
                e = (t[n] << 16 & 16711680) + (t[n + 1] << 8 & 65280) + (255 & t[n + 2]), i.push(h[e >> 18 & 63] + h[e >> 12 & 63] + h[e >> 6 & 63] + h[63 & e]);
            return i.join("");
        };
        r.byteLength = function (t)
        {
            var e = (t = a(t))[1];
            return 3 * (t[0] + e) / 4 - e;
        }, r.toByteArray = function (t)
        {
            var e = a(t), r = e[0];
            e = e[1];
            for(var i = new l(3 * (r + e) / 4 - e), n = 0, s = 0 < e ? r - 4 : r, o = 0; o < s; o += 4)
                r = u[t.charCodeAt(o)] << 18 | u[t.charCodeAt(o + 1)] << 12 | u[t.charCodeAt(o + 2)] << 6 | u[t.charCodeAt(o + 3)], i[n++] = r >> 16 & 255,
                i[n++] = r >> 8 & 255, i[n++] = 255 & r;
            return 2 === e && (r = u[t.charCodeAt(o)] << 2 | u[t.charCodeAt(o + 1)] >> 4, i[n++] = 255 & r), 1 === e && (r = u[t.charCodeAt(o)] << 10 | u[t.charCodeAt(o + 1)] << 4 | u[t.charCodeAt(o + 2)] >> 2,
            i[n++] = r >> 8 & 255, i[n++] = 255 & r), i;
        }, r.fromByteArray = function (t)
        {
            for(var e = t.length, r = e % 3, i = [], n = 0, s = e - r; n < s; n += 16383)
                i.push(o(t, n, s < n + 16383 ? s : n + 16383));
            return 1 === r ? (t = t[e - 1], i.push(h[t >> 2] + h[t << 4 & 63] + "==")) : 2 === r && (t = (t[e - 2] << 8) + t[e - 1], i.push(h[t >> 10] + h[t >> 4 & 63] + h[t << 2 & 63] + "=")),
            i.join("");
        };
        var h = [], u = [], l = "undefined" != typeof Uint8Array ? Uint8Array : Array;
        for(t = 0; t < 64; ++t)
            h[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[t], u["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(t)] = t;
        u[45] = 62, u[95] = 63;
    }, {}], 2:[function (t,e,r)
    {
    }, {}], 3:[function (t,e,r)
    {
        
function n(t)
        {
            if(B < t)
                throw new RangeError("Invalid typed array length");
            return (t = new Uint8Array(t)).__proto__ = h.prototype, t;
        };
        
function h(t,e,r)
        {
            if("number" != typeof t)
                return i(t, e, r);
            if("string" == typeof e)
                throw Error("If encoding is specified then the first argument must be a string");
            return o(t);
        };
        
function i(t,e,r)
        {
            if("number" == typeof t)
                throw new TypeError('"value" argument must not be a number');
            if(S(t) || t && S(t.buffer))
            {
                if(e < 0 || t.byteLength < e)
                    throw new RangeError('"offset" is outside of buffer bounds');
                if(t.byteLength < e + (r || 0))
                    throw new RangeError('"length" is outside of buffer bounds');
                return (t = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r)).__proto__ = h.prototype,
                t;
            }
            if("string" != typeof t)
                return function (t)
                {
                    if(h.isBuffer(t))
                    {
                        var e = 0 | u(t.length), r = n(e);
                        return 0 === r.length || t.copy(r, 0, 0, e), r;
                    }
                    if(t)
                    {
                        if(ArrayBuffer.isView(t) || "length" in t)
                            return (e = "number" != typeof t.length) || (e = (e = t.length) != e), e ? n(0) : a(t);
                        if("Buffer" === t.type && Array.isArray(t.data))
                            return a(t.data);
                    }
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.");
                }(t);
            var i = e;
            if("string" == typeof i && "" !== i || (i = "utf8"), !h.isEncoding(i))
                throw new TypeError("Unknown encoding: " + i);
            return (t = (r = n(e = 0 | l(t, i))).write(t, i)) !== e && (r = r.slice(0, t)), r;
        };
        
function s(t)
        {
            if("number" != typeof t)
                throw new TypeError('"size" argument must be of type number');
            if(t < 0)
                throw new RangeError('"size" argument must not be negative');
        };
        
function o(t)
        {
            return s(t), n(t < 0 ? 0 : 0 | u(t));
        };
        
function a(t)
        {
            for(var e = t.length < 0 ? 0 : 0 | u(t.length), r = n(e), i = 0; i < e; i += 1)
                r[i] = 255 & t[i];
            return r;
        };
        
function u(t)
        {
            if(B <= t)
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + B.toString(16) + " bytes");
            return 0 | t;
        };
        
function l(t,e)
        {
            if(h.isBuffer(t))
                return t.length;
            if(ArrayBuffer.isView(t) || S(t))
                return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var r = t.length;
            if(0 === r)
                return 0;
            for(var i = !1; ; )
                switch(e)
                {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return v(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return I.toByteArray(w(t)).length;
                    default:
                        if(i)
                            return v(t).length;
                        e = ("" + e).toLowerCase(), i = !0;
                }
        };
        
function f(t,e,r)
        {
            var i = t[e];
            t[e] = t[r], t[r] = i;
        };
        
function c(t,e,r,i,n)
        {
            if(0 === t.length)
                return  - 1;
            if("string" == typeof r ? (i = r, r = 0) : 2147483647 < r ? r = 2147483647 : r <  - 2147483648 && (r =  - 2147483648), (r =  + r) != r && (r = n ? 0 : t.length - 1),
            r < 0 && (r = t.length + r), r >= t.length)
            {
                if(n)
                    return  - 1;
                r = t.length - 1;
            }
            else
                if(r < 0)
                {
                    if(!n)
                        return  - 1;
                    r = 0;
                }
            if("string" == typeof e && (e = h.from(e, i)), h.isBuffer(e))
                return 0 === e.length ?  - 1 : d(t, e, r, i, n);
            if("number" == typeof e)
                return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t,
                e, r) : d(t, [e], r, i, n);
            throw new TypeError("val must be string, number or Buffer");
        };
        
function d(t,e,r,i,n)
        {
            
function s(t,e)
            {
                return 1 === o ? t[e] : t.readUInt16BE(e * o);
            };
            var o = 1, a = t.length, h = e.length;
            if(void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i))
            {
                if(t.length < 2 || e.length < 2)
                    return  - 1;
                a /= o = 2, h /= 2, r /= 2;
            }
            if(n)
                for(i =  - 1; r < a; r++)
                    if(s(t, r) === s(e,  - 1 === i ? 0 : r - i))
                    {
                        if( - 1 === i && (i = r), r - i + 1 === h)
                            return i * o;
                    }
                    else
                         - 1 !== i && (r -= r - i), i =  - 1;
            else
                for(a < r + h && (r = a - h); 0 <= r; r--)
                {
                    for(a = !0, i = 0; i < h; i++)
                        if(s(t, r + i) !== s(e, i))
                        {
                            a = !1;
                            break;
                        }
                    if(a)
                        return r;
                }
            return  - 1;
        };
        
function p(t,e,r)
        {
            r = Math.min(t.length, r);
            for(var i = []; e < r; )
            {
                var n = t[e], s = null, o = 239 < n ? 4 : 223 < n ? 3 : 191 < n ? 2 : 1;
                if(e + o <= r)
                    switch(o)
                    {
                        case 1:
                            n < 128 && (s = n);
                            break;
                        case 2:
                            var a = t[e + 1];
                            128 == (192 & a) && (127 < (n = (31 & n) << 6 | 63 & a) && (s = n));
                            break;
                        case 3:
                            a = t[e + 1];
                            var h = t[e + 2];
                            128 == (192 & a) && 128 == (192 & h) && (2047 < (n = (15 & n) << 12 | (63 & a) << 6 | 63 & h) && (n < 55296 || 57343 < n) && (s = n));
                            break;
                        case 4:
                            a = t[e + 1], h = t[e + 2];
                            var u = t[e + 3];
                            128 == (192 & a) && 128 == (192 & h) && 128 == (192 & u) && (65535 < (n = (15 & n) << 18 | (63 & a) << 12 | (63 & h) << 6 | 63 & u) && n < 1114112 && (s = n));
                    }
                null === s ? (s = 65533, o = 1) : 65535 < s && (s -= 65536, i.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), i.push(s),
                e += o;
            }
            if((t = i.length) <= x)
                i = String.fromCharCode.apply(String, i);
            else
            {
                for(r = "", e = 0; e < t; )
                    r += String.fromCharCode.apply(String, i.slice(e, e += x));
                i = r;
            }
            return i;
        };
        
function m(t,e,r)
        {
            if(0 != t % 1 || t < 0)
                throw new RangeError("offset is not uint");
            if(r < t + e)
                throw new RangeError("Trying to access beyond buffer length");
        };
        
function _(t,e,r,i,n,s)
        {
            if(!h.isBuffer(t))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if(n < e || e < s)
                throw new RangeError('"value" argument is out of bounds');
            if(r + i > t.length)
                throw new RangeError("Index out of range");
        };
        
function g(t,e,r,i,n,s)
        {
            if(r + i > t.length)
                throw new RangeError("Index out of range");
            if(r < 0)
                throw new RangeError("Index out of range");
        };
        
function b(t,e,r,i,n)
        {
            return e =  + e, r >>>= 0, n || g(t, 0, r, 4), A.write(t, e, r, i, 23, 4), r + 4;
        };
        
function y(t,e,r,i,n)
        {
            return e =  + e, r >>>= 0, n || g(t, 0, r, 8), A.write(t, e, r, i, 52, 8), r + 8;
        };
        
function w(t)
        {
            if((t = (t = t.split("=")[0]).trim().replace(L, "")).length < 2)
                return "";
            for(; 0 != t.length % 4; )
                t += "=";
            return t;
        };
        
function v(t,e)
        {
            e = e || 1 / 0;
            for(var r, i = t.length, n = null, s = [], o = 0; o < i; ++o)
            {
                if(55295 < (r = t.charCodeAt(o)) && r < 57344)
                {
                    if(!n)
                    {
                        if(56319 < r)
                        {
                             - 1 < (e -= 3) && s.push(239, 191, 189);
                            continue;
                        }
                        if(o + 1 === i)
                        {
                             - 1 < (e -= 3) && s.push(239, 191, 189);
                            continue;
                        }
                        n = r;
                        continue;
                    }
                    if(r < 56320)
                    {
                         - 1 < (e -= 3) && s.push(239, 191, 189), n = r;
                        continue;
                    }
                    r = 65536 + (n - 55296 << 10 | r - 56320);
                }
                else
                    n &&  - 1 < (e -= 3) && s.push(239, 191, 189);
                if(n = null, r < 128)
                {
                    if(--e < 0)
                        break;
                    s.push(r);
                }
                else
                    if(r < 2048)
                    {
                        if((e -= 2) < 0)
                            break;
                        s.push(r >> 6 | 192, 63 & r | 128);
                    }
                    else
                        if(r < 65536)
                        {
                            if((e -= 3) < 0)
                                break;
                            s.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
                        }
                        else
                        {
                            if(!(r < 1114112))
                                throw Error("Invalid code point");
                            if((e -= 4) < 0)
                                break;
                            s.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
                        }
            }
            return s;
        };
        
function M(t)
        {
            for(var e = [], r = 0; r < t.length; ++r)
                e.push(255 & t.charCodeAt(r));
            return e;
        };
        
function E(t,e,r,i)
        {
            for(var n = 0; n < i && !(n + r >= e.length || n >= t.length); ++n)
                e[n + r] = t[n];
            return n;
        };
        
function S(t)
        {
            return t instanceof ArrayBuffer || null != t && null != t.constructor && "ArrayBuffer" === t.constructor.name && "number" == typeof t.byteLength;
        };
        var I = t("base64-js"), A = t("ieee754");
        r.Buffer = h, r.SlowBuffer = function (t)
        {
            return  + t != t && (t = 0), h.alloc( + t);
        }, r.INSPECT_MAX_BYTES = 50;
        var B = 2147483647;
        r.kMaxLength = B, (h.TYPED_ARRAY_SUPPORT = function ()
        {
            try
            {
                var t = new Uint8Array(1);
                return t.__proto__ = {__proto__:Uint8Array.prototype, foo:function ()
                    {
                        return 42;
                    }}, 42 === t.foo();
            }
            catch(t)
            {
                return !1;
            }
        }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
        Object.defineProperty(h.prototype, "parent", {get:function ()
            {
                if(this instanceof h)
                    return this.buffer;
            }}), Object.defineProperty(h.prototype, "offset", {get:function ()
            {
                if(this instanceof h)
                    return this.byteOffset;
            }}), $jscomp.initSymbol(), $jscomp.initSymbol(), $jscomp.initSymbol(), "undefined" != typeof Symbol && Symbol.species && h[Symbol.species] === h && ($jscomp.initSymbol(),
        Object.defineProperty(h, Symbol.species, {value:null, configurable:!0, enumerable:!1, writable:!1})), h.poolSize = 8192, h.from = function (t,e,r)
        {
            return i(t, e, r);
        }, h.prototype.__proto__ = Uint8Array.prototype, h.__proto__ = Uint8Array, h.alloc = function (t,e,r)
        {
            return s(t), t = t <= 0 ? n(t) : void 0 !== e ? "string" == typeof r ? n(t).fill(e, r) : n(t).fill(e) : n(t);
        }, h.allocUnsafe = function (t)
        {
            return o(t);
        }, h.allocUnsafeSlow = function (t)
        {
            return o(t);
        }, h.isBuffer = function (t)
        {
            return null != t && !0 === t._isBuffer;
        }, h.compare = function (t,e)
        {
            if(!h.isBuffer(t) || !h.isBuffer(e))
                throw new TypeError("Arguments must be Buffers");
            if(t === e)
                return 0;
            for(var r = t.length, i = e.length, n = 0, s = Math.min(r, i); n < s; ++n)
                if(t[n] !== e[n])
                {
                    r = t[n], i = e[n];
                    break;
                }
            return r < i ?  - 1 : i < r ? 1 : 0;
        }, h.isEncoding = function (t)
        {
            switch(String(t).toLowerCase())
            {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1;
            }
        }, h.concat = function (t,e)
        {
            if(!Array.isArray(t))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if(0 === t.length)
                return h.alloc(0);
            var r;
            if(void 0 === e)
                for(r = e = 0; r < t.length; ++r)
                    e += t[r].length;
            var i = h.allocUnsafe(e), n = 0;
            for(r = 0; r < t.length; ++r)
            {
                var s = t[r];
                if(ArrayBuffer.isView(s) && (s = h.from(s)), !h.isBuffer(s))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(i, n), n += s.length;
            }
            return i;
        }, h.byteLength = l, h.prototype._isBuffer = !0, h.prototype.swap16 = function ()
        {
            var t = this.length;
            if(0 != t % 2)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for(var e = 0; e < t; e += 2)
                f(this, e, e + 1);
            return this;
        }, h.prototype.swap32 = function ()
        {
            var t = this.length;
            if(0 != t % 4)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for(var e = 0; e < t; e += 4)
                f(this, e, e + 3), f(this, e + 1, e + 2);
            return this;
        }, h.prototype.swap64 = function ()
        {
            var t = this.length;
            if(0 != t % 8)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for(var e = 0; e < t; e += 8)
                f(this, e, e + 7), f(this, e + 1, e + 6), f(this, e + 2, e + 5), f(this, e + 3, e + 4);
            return this;
        }, h.prototype.toLocaleString = h.prototype.toString = function ()
        {
            var t = this.length;
            return 0 === t ? "" : 0 === arguments.length ? p(this, 0, t) : function (t,e,r)
            {
                var i = !1;
                if((void 0 === e || e < 0) && (e = 0), e > this.length)
                    return "";
                if((void 0 === r || r > this.length) && (r = this.length), r <= 0)
                    return "";
                if((r >>>= 0) <= (e >>>= 0))
                    return "";
                for(t || (t = "utf8"); ; )
                    switch(t)
                    {
                        case "hex":
                            for(t = e, e = r, r = this.length, (!t || t < 0) && (t = 0), (!e || e < 0 || r < e) && (e = r), i = "", r = t; r < e; ++r)
                                i = (t = i) + (i = (i = this[r]) < 16 ? "0" + i.toString(16) : i.toString(16));
                            return i;
                        case "utf8":
                        case "utf-8":
                            return p(this, e, r);
                        case "ascii":
                            for(t = "", r = Math.min(this.length, r); e < r; ++e)
                                t += String.fromCharCode(127 & this[e]);
                            return t;
                        case "latin1":
                        case "binary":
                            for(t = "", r = Math.min(this.length, r); e < r; ++e)
                                t += String.fromCharCode(this[e]);
                            return t;
                        case "base64":
                            return e = 0 === e && r === this.length ? I.fromByteArray(this) : I.fromByteArray(this.slice(e, r));
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            for(e = this.slice(e, r), r = "", t = 0; t < e.length; t += 2)
                                r += String.fromCharCode(e[t] + 256 * e[t + 1]);
                            return r;
                        default:
                            if(i)
                                throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), i = !0;
                    }
            }.apply(this, arguments);
        }, h.prototype.equals = function (t)
        {
            if(!h.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === h.compare(this, t);
        }, h.prototype.inspect = function ()
        {
            var t = "", e = r.INSPECT_MAX_BYTES;
            return 0 < this.length && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">";
        }, h.prototype.compare = function (t,e,r,i,n)
        {
            if(!h.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
            if(void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === i && (i = 0), void 0 === n && (n = this.length),
            e < 0 || r > t.length || i < 0 || n > this.length)
                throw new RangeError("out of range index");
            if(n <= i && r <= e)
                return 0;
            if(n <= i)
                return  - 1;
            if(r <= e)
                return 1;
            if(this === t)
                return 0;
            var s = (n >>>= 0) - (i >>>= 0), o = (r >>>= 0) - (e >>>= 0), a = Math.min(s, o);
            for(i = this.slice(i, n), t = t.slice(e, r), e = 0; e < a; ++e)
                if(i[e] !== t[e])
                {
                    s = i[e], o = t[e];
                    break;
                }
            return s < o ?  - 1 : o < s ? 1 : 0;
        }, h.prototype.includes = function (t,e,r)
        {
            return  - 1 !== this.indexOf(t, e, r);
        }, h.prototype.indexOf = function (t,e,r)
        {
            return c(this, t, e, r, !0);
        }, h.prototype.lastIndexOf = function (t,e,r)
        {
            return c(this, t, e, r, !1);
        }, h.prototype.write = function (t,e,r,i)
        {
            if(void 0 === e)
                i = "utf8", r = this.length, e = 0;
            else
                if(void 0 === r && "string" == typeof e)
                    i = e, r = this.length, e = 0;
                else
                {
                    if(!isFinite(e))
                        throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === i && (i = "utf8")) : (i = r, r = void 0);
                }
            var n = this.length - e;
            if((void 0 === r || n < r) && (r = n), 0 < t.length && (r < 0 || e < 0) || e > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            for(i || (i = "utf8"), n = !1; ; )
                switch(i)
                {
                    case "hex":
                        t:
                        {
                            for(e = Number(e) || 0, i = this.length - e, r ? i < (r = Number(r)) && (r = i) : r = i, (i = t.length) / 2 < r && (r = i / 2),
                            i = 0; i < r; ++i)
                            {
                                if((n = parseInt(t.substr(2 * i, 2), 16)) != n)
                                {
                                    t = i;
                                    break t;
                                }
                                this[e + i] = n;
                            }
                            t = i;
                        }
                        return t;
                    case "utf8":
                    case "utf-8":
                        return E(v(t, this.length - e), this, e, r);
                    case "ascii":
                        return E(M(t), this, e, r);
                    case "latin1":
                    case "binary":
                        return E(M(t), this, e, r);
                    case "base64":
                        return E(I.toByteArray(w(t)), this, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        i = t, n = this.length - e;
                        for(var s = [], o = 0; o < i.length && !((n -= 2) < 0); ++o)
                        {
                            var a = i.charCodeAt(o);
                            t = a >> 8, a %= 256, s.push(a), s.push(t);
                        }
                        return E(s, this, e, r);
                    default:
                        if(n)
                            throw new TypeError("Unknown encoding: " + i);
                        i = ("" + i).toLowerCase(), n = !0;
                }
        }, h.prototype.toJSON = function ()
        {
            return {type:"Buffer", data:Array.prototype.slice.call(this._arr || this, 0)};
        };
        var x = 4096;
        h.prototype.slice = function (t,e)
        {
            var r = this.length;
            return (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r),
            e < t && (e = t), (r = this.subarray(t, e)).__proto__ = h.prototype, r;
        }, h.prototype.readUIntLE = function (t,e,r)
        {
            t >>>= 0, e >>>= 0, r || m(t, e, this.length), r = this[t];
            for(var i = 1, n = 0; ++n < e && (i *= 256); )
                r += this[t + n] * i;
            return r;
        }, h.prototype.readUIntBE = function (t,e,r)
        {
            t >>>= 0, e >>>= 0, r || m(t, e, this.length), r = this[t + --e];
            for(var i = 1; 0 < e && (i *= 256); )
                r += this[t + --e] * i;
            return r;
        }, h.prototype.readUInt8 = function (t,e)
        {
            return t >>>= 0, e || m(t, 1, this.length), this[t];
        }, h.prototype.readUInt16LE = function (t,e)
        {
            return t >>>= 0, e || m(t, 2, this.length), this[t] | this[t + 1] << 8;
        }, h.prototype.readUInt16BE = function (t,e)
        {
            return t >>>= 0, e || m(t, 2, this.length), this[t] << 8 | this[t + 1];
        }, h.prototype.readUInt32LE = function (t,e)
        {
            return t >>>= 0, e || m(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
        }, h.prototype.readUInt32BE = function (t,e)
        {
            return t >>>= 0, e || m(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
        }, h.prototype.readIntLE = function (t,e,r)
        {
            t >>>= 0, e >>>= 0, r || m(t, e, this.length), r = this[t];
            for(var i = 1, n = 0; ++n < e && (i *= 256); )
                r += this[t + n] * i;
            return 128 * i <= r && (r -= Math.pow(2, 8 * e)), r;
        }, h.prototype.readIntBE = function (t,e,r)
        {
            t >>>= 0, e >>>= 0, r || m(t, e, this.length), r = e;
            for(var i = 1, n = this[t + --r]; 0 < r && (i *= 256); )
                n += this[t + --r] * i;
            return 128 * i <= n && (n -= Math.pow(2, 8 * e)), n;
        }, h.prototype.readInt8 = function (t,e)
        {
            return t >>>= 0, e || m(t, 1, this.length), 128 & this[t] ?  - 1 * (255 - this[t] + 1) : this[t];
        }, h.prototype.readInt16LE = function (t,e)
        {
            t >>>= 0, e || m(t, 2, this.length);
            var r = this[t] | this[t + 1] << 8;
            return 32768 & r ? 4294901760 | r : r;
        }, h.prototype.readInt16BE = function (t,e)
        {
            t >>>= 0, e || m(t, 2, this.length);
            var r = this[t + 1] | this[t] << 8;
            return 32768 & r ? 4294901760 | r : r;
        }, h.prototype.readInt32LE = function (t,e)
        {
            return t >>>= 0, e || m(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
        }, h.prototype.readInt32BE = function (t,e)
        {
            return t >>>= 0, e || m(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
        }, h.prototype.readFloatLE = function (t,e)
        {
            return t >>>= 0, e || m(t, 4, this.length), A.read(this, t, !0, 23, 4);
        }, h.prototype.readFloatBE = function (t,e)
        {
            return t >>>= 0, e || m(t, 4, this.length), A.read(this, t, !1, 23, 4);
        }, h.prototype.readDoubleLE = function (t,e)
        {
            return t >>>= 0, e || m(t, 8, this.length), A.read(this, t, !0, 52, 8);
        }, h.prototype.readDoubleBE = function (t,e)
        {
            return t >>>= 0, e || m(t, 8, this.length), A.read(this, t, !1, 52, 8);
        }, h.prototype.writeUIntLE = function (t,e,r,i)
        {
            t =  + t, e >>>= 0, r >>>= 0, i || _(this, t, e, r, Math.pow(2, 8 * r) - 1, 0), i = 1;
            var n = 0;
            for(this[e] = 255 & t; ++n < r && (i *= 256); )
                this[e + n] = t / i & 255;
            return e + r;
        }, h.prototype.writeUIntBE = function (t,e,r,i)
        {
            t =  + t, e >>>= 0, r >>>= 0, i || _(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var n = 1;
            for(this[e + (i = r - 1)] = 255 & t; 0 <= --i && (n *= 256); )
                this[e + i] = t / n & 255;
            return e + r;
        }, h.prototype.writeUInt8 = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1;
        }, h.prototype.writeUInt16LE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
        }, h.prototype.writeUInt16BE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
        }, h.prototype.writeUInt32LE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8,
            this[e] = 255 & t, e + 4;
        }, h.prototype.writeUInt32BE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8,
            this[e + 3] = 255 & t, e + 4;
        }, h.prototype.writeIntLE = function (t,e,r,i)
        {
            t =  + t, e >>>= 0, i || _(this, t, e, r, (i = Math.pow(2, 8 * r - 1)) - 1,  - i);
            var n = 1, s = i = 0;
            for(this[e] = 255 & t; ++i < r && (n *= 256); )
                t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1), this[e + i] = (t / n >> 0) - s & 255;
            return e + r;
        }, h.prototype.writeIntBE = function (t,e,r,i)
        {
            t =  + t, e >>>= 0, i || _(this, t, e, r, (i = Math.pow(2, 8 * r - 1)) - 1,  - i);
            var n = 1, s = 0;
            for(this[e + (i = r - 1)] = 255 & t; 0 <= --i && (n *= 256); )
                t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1), this[e + i] = (t / n >> 0) - s & 255;
            return e + r;
        }, h.prototype.writeInt8 = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 1, 127,  - 128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
        }, h.prototype.writeInt16LE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 2, 32767,  - 32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
        }, h.prototype.writeInt16BE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 2, 32767,  - 32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
        }, h.prototype.writeInt32LE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 4, 2147483647,  - 2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16,
            this[e + 3] = t >>> 24, e + 4;
        }, h.prototype.writeInt32BE = function (t,e,r)
        {
            return t =  + t, e >>>= 0, r || _(this, t, e, 4, 2147483647,  - 2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24,
            this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4;
        }, h.prototype.writeFloatLE = function (t,e,r)
        {
            return b(this, t, e, !0, r);
        }, h.prototype.writeFloatBE = function (t,e,r)
        {
            return b(this, t, e, !1, r);
        }, h.prototype.writeDoubleLE = function (t,e,r)
        {
            return y(this, t, e, !0, r);
        }, h.prototype.writeDoubleBE = function (t,e,r)
        {
            return y(this, t, e, !1, r);
        }, h.prototype.copy = function (t,e,r,i)
        {
            if(!h.isBuffer(t))
                throw new TypeError("argument should be a Buffer");
            if(r || (r = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), 0 < i && i < r && (i = r),
            i === r || 0 === t.length || 0 === this.length)
                return 0;
            if(e < 0)
                throw new RangeError("targetStart out of bounds");
            if(r < 0 || r >= this.length)
                throw new RangeError("Index out of range");
            if(i < 0)
                throw new RangeError("sourceEnd out of bounds");
            i > this.length && (i = this.length), t.length - e < i - r && (i = t.length - e + r);
            var n = i - r;
            if(this === t && "function" == typeof Uint8Array.prototype.copyWithin)
                this.copyWithin(e, r, i);
            else
                if(this === t && r < e && e < i)
                    for(i = n - 1; 0 <= i; --i)
                        t[i + e] = this[i + r];
                else
                    Uint8Array.prototype.set.call(t, this.subarray(r, i), e);
            return n;
        }, h.prototype.fill = function (t,e,r,i)
        {
            if("string" == typeof t)
            {
                if("string" == typeof e ? (i = e, e = 0, r = this.length) : "string" == typeof r && (i = r, r = this.length), void 0 !== i && "string" != typeof i)
                    throw new TypeError("encoding must be a string");
                if("string" == typeof i && !h.isEncoding(i))
                    throw new TypeError("Unknown encoding: " + i);
                if(1 === t.length)
                {
                    var n = t.charCodeAt(0);
                    ("utf8" === i && n < 128 || "latin1" === i) && (t = n);
                }
            }
            else
                "number" == typeof t && (t &= 255);
            if(e < 0 || this.length < e || this.length < r)
                throw new RangeError("Out of range index");
            if(r <= e)
                return this;
            if(e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
                for(i = e; i < r; ++i)
                    this[i] = t;
            else
            {
                var s = (n = h.isBuffer(t) ? t : new h(t, i)).length;
                if(0 === s)
                    throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                for(i = 0; i < r - e; ++i)
                    this[i + e] = n[i % s];
            }
            return this;
        };
        var L = /[^+/0-9A-Za-z-_]/g;
    }, {"base64-js":1, ieee754:6}], 4:[function (t,e,r)
    {
        (function (t)
        {
            r.isArray = function (t)
            {
                return Array.isArray ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t);
            }, r.isBoolean = function (t)
            {
                return "boolean" == typeof t;
            }, r.isNull = function (t)
            {
                return null === t;
            }, r.isNullOrUndefined = function (t)
            {
                return null == t;
            }, r.isNumber = function (t)
            {
                return "number" == typeof t;
            }, r.isString = function (t)
            {
                return "string" == typeof t;
            }, r.isSymbol = function (t)
            {
                return "symbol" == typeof t;
            }, r.isUndefined = function (t)
            {
                return void 0 === t;
            }, r.isRegExp = function (t)
            {
                return "[object RegExp]" === Object.prototype.toString.call(t);
            }, r.isObject = function (t)
            {
                return "object" == typeof t && null !== t;
            }, r.isDate = function (t)
            {
                return "[object Date]" === Object.prototype.toString.call(t);
            }, r.isError = function (t)
            {
                return "[object Error]" === Object.prototype.toString.call(t) || t instanceof Error;
            }, r.isFunction = function (t)
            {
                return "function" == typeof t;
            }, r.isPrimitive = function (t)
            {
                return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t;
            }, r.isBuffer = t.isBuffer;
        }).call(this, {isBuffer:t("../../is-buffer/index.js")});
    }, {"../../is-buffer/index.js":8}], 5:[function (t,e,r)
    {
        
function o()
        {
            this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = l(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
        };
        
function i(t,e,r,i)
        {
            var n;
            if("function" != typeof r)
                throw new TypeError('"listener" argument must be a function');
            if(n = t._events)
            {
                n.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), n = t._events);
                var s = n[e];
            }
            else
                n = t._events = l(null), t._eventsCount = 0;
            return s ? ("function" == typeof s ? s = n[e] = i ? [r, s] : [s, r] : i ? s.unshift(r) : s.push(r), s.warned || (r = void 0 === t._maxListeners ? o.defaultMaxListeners : t._maxListeners) && 0 < r && s.length > r && (s.warned = !0,
            (r = Error("Possible EventEmitter memory leak detected. " + s.length + ' "' + String(e) + '" listeners added. Use emitter.setMaxListeners() to increase limit.')).name = "MaxListenersExceededWarning",
            r.emitter = t, r.type = e, r.count = s.length, "object" == typeof console && console.warn && console.warn("%s: %s", r.name,
            r.message))) : (n[e] = r, ++t._eventsCount), t;
        };
        
function n()
        {
            if(!this.fired)
                switch(this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length)
                {
                    case 0:
                        return this.listener.call(this.target);
                    case 1:
                        return this.listener.call(this.target, arguments[0]);
                    case 2:
                        return this.listener.call(this.target, arguments[0], arguments[1]);
                    case 3:
                        return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
                    default:
                        for(var t = Array(arguments.length), e = 0; e < t.length; ++e)
                            t[e] = arguments[e];
                        this.listener.apply(this.target, t);
                }
        };
        
function s(t,e,r)
        {
            return t = {fired:!1, wrapFn:void 0, target:t, type:e, listener:r}, (e = c.call(n, t)).listener = r, t.wrapFn = e;
        };
        
function a(t,e,r)
        {
            if(!(t = t._events))
                return [];
            if(!(e = t[e]))
                return [];
            if("function" == typeof e)
                return r ? [e.listener || e] : [e];
            if(r)
                for(r = Array(e.length), t = 0; t < r.length; ++t)
                    r[t] = e[t].listener || e[t];
            else
                r = u(e, e.length);
            return r;
        };
        
function h(t)
        {
            var e = this._events;
            if(e)
            {
                if("function" == typeof (t = e[t]))
                    return 1;
                if(t)
                    return t.length;
            }
            return 0;
        };
        
function u(t,e)
        {
            for(var r = Array(e), i = 0; i < e; ++i)
                r[i] = t[i];
            return r;
        };
        var l = Object.create || function (t)
        {
            var e = function ()
            {
            };
            return e.prototype = t, new e;
        }, f = Object.keys || function (t)
        {
            var e, r = [];
            for(e in t)
                Object.prototype.hasOwnProperty.call(t, e) && r.push(e);
            return e;
        }, c = Function.prototype.bind || function (t)
        {
            var e = this;
            return function ()
            {
                return e.apply(t, arguments);
            };
        };
        ((e.exports = o).EventEmitter = o).prototype._events = void 0, o.prototype._maxListeners = void 0;
        var d = 10;
        try
        {
            t = {}, Object.defineProperty && Object.defineProperty(t, "x", {value:0});
            var p = 0 === t.x;
        }
        catch(t)
        {
            p = !1;
        }
        p ? Object.defineProperty(o, "defaultMaxListeners", {enumerable:!0, get:function ()
            {
                return d;
            }, set:function (t)
            {
                if("number" != typeof t || t < 0 || t != t)
                    throw new TypeError('"defaultMaxListeners" must be a positive number');
                d = t;
            }}) : o.defaultMaxListeners = d, o.prototype.setMaxListeners = function (t)
        {
            if("number" != typeof t || t < 0 || isNaN(t))
                throw new TypeError('"n" argument must be a positive number');
            return this._maxListeners = t, this;
        }, o.prototype.getMaxListeners = function ()
        {
            return void 0 === this._maxListeners ? o.defaultMaxListeners : this._maxListeners;
        }, o.prototype.emit = function (t)
        {
            var e, r, i, n = "error" === t;
            if(i = this._events)
                n = n && null == i.error;
            else
                if(!n)
                    return !1;
            if(n)
            {
                if(1 < arguments.length && (e = arguments[1]), e instanceof Error)
                    throw e;
                throw (i = Error('Unhandled "error" event. (' + e + ")")).context = e, i;
            }
            if(!(e = i[t]))
                return !1;
            i = "function" == typeof e;
            var s = arguments.length;
            switch(s)
            {
                case 1:
                    if(i)
                        e.call(this);
                    else
                        for(e = u(e, i = e.length), n = 0; n < i; ++n)
                            e[n].call(this);
                    break;
                case 2:
                    if(n = arguments[1], i)
                        e.call(this, n);
                    else
                        for(e = u(e, i = e.length), s = 0; s < i; ++s)
                            e[s].call(this, n);
                    break;
                case 3:
                    if(n = arguments[1], s = arguments[2], i)
                        e.call(this, n, s);
                    else
                        for(e = u(e, i = e.length), r = 0; r < i; ++r)
                            e[r].call(this, n, s);
                    break;
                case 4:
                    if(n = arguments[1], s = arguments[2], r = arguments[3], i)
                        e.call(this, n, s, r);
                    else
                    {
                        e = u(e, i = e.length);
                        for(var o = 0; o < i; ++o)
                            e[o].call(this, n, s, r);
                    }
                    break;
                default:
                    for(n = Array(s - 1), r = 1; r < s; r++)
                        n[r - 1] = arguments[r];
                    if(i)
                        e.apply(this, n);
                    else
                        for(e = u(e, i = e.length), s = 0; s < i; ++s)
                            e[s].apply(this, n);
            }
            return !0;
        }, o.prototype.on = o.prototype.addListener = function (t,e)
        {
            return i(this, t, e, !1);
        }, o.prototype.prependListener = function (t,e)
        {
            return i(this, t, e, !0);
        }, o.prototype.once = function (t,e)
        {
            if("function" != typeof e)
                throw new TypeError('"listener" argument must be a function');
            return this.on(t, s(this, t, e)), this;
        }, o.prototype.prependOnceListener = function (t,e)
        {
            if("function" != typeof e)
                throw new TypeError('"listener" argument must be a function');
            return this.prependListener(t, s(this, t, e)), this;
        }, o.prototype.removeListener = function (t,e)
        {
            var r;
            if("function" != typeof e)
                throw new TypeError('"listener" argument must be a function');
            var i = this._events;
            if(!i)
                return this;
            var n = i[t];
            if(!n)
                return this;
            if(n === e || n.listener === e)
                0 == --this._eventsCount ? this._events = l(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, n.listener || e));
            else
                if("function" != typeof n)
                {
                    var s =  - 1;
                    for(r = n.length - 1; 0 <= r; r--)
                        if(n[r] === e || n[r].listener === e)
                        {
                            var o = n[r].listener;
                            s = r;
                            break;
                        }
                    if(s < 0)
                        return this;
                    if(0 === s)
                        n.shift();
                    else
                    {
                        r = s + 1;
                        for(var a = n.length; r < a; s += 1, r += 1)
                            n[s] = n[r];
                        n.pop();
                    }
                    1 === n.length && (i[t] = n[0]), i.removeListener && this.emit("removeListener", t, o || e);
                }
            return this;
        }, o.prototype.removeAllListeners = function (t)
        {
            var e = this._events;
            if(!e)
                return this;
            if(!e.removeListener)
                return 0 === arguments.length ? (this._events = l(null), this._eventsCount = 0) : e[t] && (0 == --this._eventsCount ? this._events = l(null) : delete e[t]),
                this;
            if(0 === arguments.length)
            {
                var r = f(e);
                for(e = 0; e < r.length; ++e)
                {
                    var i = r[e];
                    "removeListener" !== i && this.removeAllListeners(i);
                }
                return this.removeAllListeners("removeListener"), this._events = l(null), this._eventsCount = 0, this;
            }
            if("function" == typeof (r = e[t]))
                this.removeListener(t, r);
            else
                if(r)
                    for(e = r.length - 1; 0 <= e; e--)
                        this.removeListener(t, r[e]);
            return this;
        }, o.prototype.listeners = function (t)
        {
            return a(this, t, !0);
        }, o.prototype.rawListeners = function (t)
        {
            return a(this, t, !1);
        }, o.listenerCount = function (t,e)
        {
            return "function" == typeof t.listenerCount ? t.listenerCount(e) : h.call(t, e);
        }, o.prototype.listenerCount = h, o.prototype.eventNames = function ()
        {
            return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : [];
        };
    }, {}], 6:[function (t,e,r)
    {
        r.read = function (t,e,r,i,n)
        {
            var s = 8 * n - i - 1, o = (1 << s) - 1, a = o >> 1, h =  - 7, u = r ?  - 1 : 1, l = t[e + (n = r ? n - 1 : 0)];
            for(n += u, r = l & (1 <<  - h) - 1, l >>=  - h, h += s; 0 < h; r = 256 * r + t[e + n], n += u, h -= 8);
            for(s = r & (1 <<  - h) - 1, r >>=  - h, h += i; 0 < h; s = 256 * s + t[e + n], n += u, h -= 8);
            if(0 === r)
                r = 1 - a;
            else
            {
                if(r === o)
                    return s ? NaN : 1 / 0 * (l ?  - 1 : 1);
                s += Math.pow(2, i), r -= a;
            }
            return (l ?  - 1 : 1) * s * Math.pow(2, r - i);
        }, r.write = function (t,e,r,i,n,s)
        {
            var o, a = 8 * s - n - 1, h = (1 << a) - 1, u = h >> 1, l = 23 === n ? Math.pow(2,  - 24) - Math.pow(2,  - 77) : 0;
            s = i ? 0 : s - 1;
            var f = i ? 1 :  - 1, c = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for(e = Math.abs(e), isNaN(e) || 1 / 0 === e ? (e = isNaN(e) ? 1 : 0, i = h) : (i = Math.floor(Math.log(e) / Math.LN2), e * (o = Math.pow(2,
             - i)) < 1 && (i--, o *= 2), 2 <= (e = 1 <= i + u ? e + l / o : e + l * Math.pow(2, 1 - u)) * o && (i++, o /= 2), h <= i + u ? (e = 0,
            i = h) : 1 <= i + u ? (e = (e * o - 1) * Math.pow(2, n), i += u) : (e = e * Math.pow(2, u - 1) * Math.pow(2, n), i = 0)); 8 <= n; t[r + s] = 255 & e,
            s += f, e /= 256, n -= 8);
            for(i = i << n | e, a += n; 0 < a; t[r + s] = 255 & i, s += f, i /= 256, a -= 8);
            t[r + s - f] |= 128 * c;
        };
    }, {}], 7:[function (t,e,r)
    {
        e.exports = "function" == typeof Object.create ? function (t,e)
        {
            t.super_ = e, t.prototype = Object.create(e.prototype, {constructor:{value:t, enumerable:!1, writable:!0, configurable:!0}});
        } : function (t,e)
        {
            t.super_ = e;
            var r = function ()
            {
            };
            r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t;
        };
    }, {}], 8:[function (t,e,r)
    {
        
function i(t)
        {
            return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t);
        };
        e.exports = function (t)
        {
            return null != t && (i(t) || "function" == typeof t.readFloatLE && "function" == typeof t.slice && i(t.slice(0, 0)) || !!t._isBuffer);
        };
    }, {}], 9:[function (t,e,r)
    {
        var i = {}.toString;
        e.exports = Array.isArray || function (t)
        {
            return "[object Array]" == i.call(t);
        };
    }, {}], 10:[function (t,e,r)
    {
        (function (o)
        {
            !o.version || 0 === o.version.indexOf("v0.") || 0 === o.version.indexOf("v1.") && 0 !== o.version.indexOf("v1.8.") ? e.exports = {nextTick:function (t,e,r,i)
                {
                    if("function" != typeof t)
                        throw new TypeError('"callback" argument must be a function');
                    var n = arguments.length;
                    switch(n)
                    {
                        case 0:
                        case 1:
                            return o.nextTick(t);
                        case 2:
                            return o.nextTick(function ()
                            {
                                t.call(null, e);
                            });
                        case 3:
                            return o.nextTick(function ()
                            {
                                t.call(null, e, r);
                            });
                        case 4:
                            return o.nextTick(function ()
                            {
                                t.call(null, e, r, i);
                            });
                        default:
                            var s = Array(n - 1);
                            for(n = 0; n < s.length; )
                                s[n++] = arguments[n];
                            return o.nextTick(function ()
                            {
                                t.apply(null, s);
                            });
                    }
                }} : e.exports = o;
        }).call(this, t("_process"));
    }, {_process:11}], 11:[function (t,e,r)
    {
        
function i()
        {
            throw Error("setTimeout has not been defined");
        };
        
function n()
        {
            throw Error("clearTimeout has not been defined");
        };
        
function s(e)
        {
            if(l === setTimeout)
                return setTimeout(e, 0);
            if((l === i || !l) && setTimeout)
                return l = setTimeout, setTimeout(e, 0);
            try
            {
                return l(e, 0);
            }
            catch(t)
            {
                try
                {
                    return l.call(null, e, 0);
                }
                catch(t)
                {
                    return l.call(this, e, 0);
                }
            }
        };
        
function o()
        {
            p && c && (p = !1, c.length ? d = c.concat(d) : m =  - 1, d.length && a());
        };
        
function a()
        {
            if(!p)
            {
                var t = s(o);
                p = !0;
                for(var e = d.length; e; )
                {
                    for(c = d, d = []; ++m < e; )
                        c && c[m].run();
                    m =  - 1, e = d.length;
                }
                c = null, p = !1, function (e)
                {
                    if(f === clearTimeout)
                        return clearTimeout(e);
                    if((f === n || !f) && clearTimeout)
                        return f = clearTimeout, clearTimeout(e);
                    try
                    {
                        f(e);
                    }
                    catch(t)
                    {
                        try
                        {
                            return f.call(null, e);
                        }
                        catch(t)
                        {
                            return f.call(this, e);
                        }
                    }
                }(t);
            }
        };
        
function h(t,e)
        {
            this.fun = t, this.array = e;
        };
        
function u()
        {
        };
        t = e.exports = {};
        try
        {
            var l = "function" == typeof setTimeout ? setTimeout : i;
        }
        catch(t)
        {
            l = i;
        }
        try
        {
            var f = "function" == typeof clearTimeout ? clearTimeout : n;
        }
        catch(t)
        {
            f = n;
        }
        var c, d = [], p = !1, m =  - 1;
        t.nextTick = function (t)
        {
            var e = Array(arguments.length - 1);
            if(1 < arguments.length)
                for(var r = 1; r < arguments.length; r++)
                    e[r - 1] = arguments[r];
            d.push(new h(t, e)), 1 !== d.length || p || s(a);
        }, h.prototype.run = function ()
        {
            this.fun.apply(null, this.array);
        }, t.title = "browser", t.browser = !0, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = u, t.addListener = u,
        t.once = u, t.off = u, t.removeListener = u, t.removeAllListeners = u, t.emit = u, t.prependListener = u, t.prependOnceListener = u,
        t.listeners = function (t)
        {
            return [];
        }, t.binding = function (t)
        {
            throw Error("process.binding is not supported");
        }, t.cwd = function ()
        {
            return "/";
        }, t.chdir = function (t)
        {
            throw Error("process.chdir is not supported");
        }, t.umask = function ()
        {
            return 0;
        };
    }, {}], 12:[function (t,e,r)
    {
        e.exports = t("./lib/_stream_duplex.js");
    }, {"./lib/_stream_duplex.js":13}], 13:[function (t,e,r)
    {
        
function i(t)
        {
            if(!(this instanceof i))
                return new i(t);
            a.call(this, t), h.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1),
            this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", n);
        };
        
function n()
        {
            this.allowHalfOpen || this._writableState.ended || o.nextTick(s, this);
        };
        
function s(t)
        {
            t.end();
        };
        var o = t("process-nextick-args");
        r = Object.keys || function (t)
        {
            var e, r = [];
            for(e in t)
                r.push(e);
            return r;
        }, e.exports = i, (e = t("core-util-is")).inherits = t("inherits");
        var a = t("./_stream_readable"), h = t("./_stream_writable");
        for(e.inherits(i, a), t = r(h.prototype), e = 0; e < t.length; e++)
            r = t[e], i.prototype[r] || (i.prototype[r] = h.prototype[r]);
        Object.defineProperty(i.prototype, "writableHighWaterMark", {enumerable:!1, get:function ()
            {
                return this._writableState.highWaterMark;
            }}), Object.defineProperty(i.prototype, "destroyed", {get:function ()
            {
                return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed);
            }, set:function (t)
            {
                void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t);
            }}), i.prototype._destroy = function (t,e)
        {
            this.push(null), this.end(), o.nextTick(e, t);
        };
    }, {"./_stream_readable":15, "./_stream_writable":17, "core-util-is":4, inherits:7, "process-nextick-args":10}], 14:[function (t,e,r)
    {
        
function i(t)
        {
            if(!(this instanceof i))
                return new i(t);
            n.call(this, t);
        };
        e.exports = i;
        var n = t("./_stream_transform");
        (e = t("core-util-is")).inherits = t("inherits"), e.inherits(i, n), i.prototype._transform = function (t,e,r)
        {
            r(null, t);
        };
    }, {"./_stream_transform":16, "core-util-is":4, inherits:7}], 15:[function (L,k,t)
    {
        (function (m,t)
        {
            
function e(t,e)
            {
                t = t || {};
                var r = e instanceof (p = p || L("./_stream_duplex"));
                this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode);
                var i = t.highWaterMark, n = t.readableHighWaterMark, s = this.objectMode ? 16 : 16384;
                this.highWaterMark = i || 0 === i ? i : r && (n || 0 === n) ? n : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new B,
                this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.reading = this.endEmitted = this.ended = !1,
                this.sync = !0, this.destroyed = this.resumeScheduled = this.readableListening = this.emittedReadable = this.needReadable = !1,
                this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.encoding = this.decoder = null,
                t.encoding && (A || (A = L("string_decoder/").StringDecoder), this.decoder = new A(t.encoding), this.encoding = t.encoding);
            };
            
function r(t)
            {
                if(p = p || L("./_stream_duplex"), !(this instanceof r))
                    return new r(t);
                this._readableState = new e(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)),
                w.call(this);
            };
            
function n(t,e,r,i,n)
            {
                var s = t._readableState;
                if(null === e)
                    s.reading = !1, s.ended || (s.decoder && (e = s.decoder.end()) && e.length && (s.buffer.push(e), s.length += s.objectMode ? 1 : e.length),
                    s.ended = !0, u(t));
                else
                {
                    if(!n)
                    {
                        var o;
                        n = e, v.isBuffer(n) || n instanceof M || "string" == typeof n || void 0 === n || s.objectMode || (o = new TypeError("Invalid non-string/buffer chunk"));
                        var a = o;
                    }
                    a ? t.emit("error", a) : s.objectMode || e && 0 < e.length ? ("string" == typeof e || s.objectMode || Object.getPrototypeOf(e) === v.prototype || (e = v.from(e)),
                    i ? s.endEmitted ? t.emit("error", Error("stream.unshift() after end event")) : h(t, s, e, !0) : s.ended ? t.emit("error",
                    Error("stream.push() after EOF")) : (s.reading = !1, s.decoder && !r ? (e = s.decoder.write(e), s.objectMode || 0 !== e.length ? h(t,
                    s, e, !1) : s.readingMore || (s.readingMore = !0, b.nextTick(l, t, s))) : h(t, s, e, !1))) : i || (s.reading = !1);
                }
                return !s.ended && (s.needReadable || s.length < s.highWaterMark || 0 === s.length);
            };
            
function h(t,e,r,i)
            {
                e.flowing && 0 === e.length && !e.sync ? (t.emit("data", r), t.read(0)) : (e.length += e.objectMode ? 1 : r.length, i ? e.buffer.unshift(r) : e.buffer.push(r),
                e.needReadable && u(t)), e.readingMore || (e.readingMore = !0, b.nextTick(l, t, e));
            };
            
function s(t,e)
            {
                if(t <= 0 || 0 === e.length && e.ended)
                    return 0;
                if(e.objectMode)
                    return 1;
                if(t != t)
                    return e.flowing && e.length ? e.buffer.head.data.length : e.length;
                if(t > e.highWaterMark)
                {
                    var r = t;
                    8388608 <= r ? r = 8388608 : (r--, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r++), e.highWaterMark = r;
                }
                return t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0);
            };
            
function u(t)
            {
                var e = t._readableState;
                e.needReadable = !1, e.emittedReadable || (I("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? b.nextTick(i, t) : i(t));
            };
            
function i(t)
            {
                I("emit readable"), t.emit("readable"), _(t);
            };
            
function l(t,e)
            {
                for(var r = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (I("maybeReadMore read 0"), t.read(0),
                r !== e.length); )
                    r = e.length;
                e.readingMore = !1;
            };
            
function o(t)
            {
                I("readable nexttick read 0"), t.read(0);
            };
            
function a(t,e)
            {
                e.reading || (I("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), _(t), e.flowing && !e.reading && t.read(0);
            };
            
function _(t)
            {
                var e = t._readableState;
                for(I("flow", e.flowing); e.flowing && null !== t.read(); );
            };
            
function f(t,e)
            {
                if(0 === e.length)
                    return null;
                if(e.objectMode)
                    var r = e.buffer.shift();
                else
                    if(!t || t >= e.length)
                        r = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear();
                    else
                    {
                        r = e.buffer;
                        var i = e.decoder;
                        if(t < r.head.data.length)
                            i = r.head.data.slice(0, t), r.head.data = r.head.data.slice(t);
                        else
                        {
                            if(t === r.head.data.length)
                                r = r.shift();
                            else
                                if(i)
                                {
                                    var n = r.head, s = 1, o = n.data;
                                    for(i = t - o.length; n = n.next; )
                                    {
                                        var a = n.data, h = i > a.length ? a.length : i;
                                        if(o = h === a.length ? o + a : o + a.slice(0, i), 0 === (i -= h))
                                        {
                                            h === a.length ? (++s, r.head = n.next ? n.next : r.tail = null) : (r.head = n).data = a.slice(h);
                                            break;
                                        }
                                        ++s;
                                    }
                                    r.length -= s, r = o;
                                }
                                else
                                {
                                    for(i = t, n = v.allocUnsafe(i), o = 1, (s = r.head).data.copy(n), i -= s.data.length; s = s.next; )
                                    {
                                        if(h = i > (a = s.data).length ? a.length : i, a.copy(n, n.length - i, 0, h), 0 === (i -= h))
                                        {
                                            h === a.length ? (++o, r.head = s.next ? s.next : r.tail = null) : (r.head = s).data = a.slice(h);
                                            break;
                                        }
                                        ++o;
                                    }
                                    r.length -= o, r = n;
                                }
                            i = r;
                        }
                        r = i;
                    }
                return r;
            };
            
function c(t)
            {
                var e = t._readableState;
                if(0 < e.length)
                    throw Error('"endReadable()" called on non-empty stream');
                e.endEmitted || (e.ended = !0, b.nextTick(d, e, t));
            };
            
function d(t,e)
            {
                t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"));
            };
            
function g(t,e)
            {
                for(var r = 0, i = t.length; r < i; r++)
                    if(t[r] === e)
                        return r;
                return  - 1;
            };
            var b = L("process-nextick-args");
            k.exports = r;
            var p, y = L("isarray");
            r.ReadableState = e, L("events");
            var w = L("./internal/streams/stream"), v = L("safe-buffer").Buffer, M = t.Uint8Array || function ()
            {
            }, E = L("core-util-is");
            E.inherits = L("inherits");
            var S = L("util"), I = void 0;
            I = S && S.debuglog ? S.debuglog("stream") : function ()
            {
            };
            var A, B = L("./internal/streams/BufferList");
            S = L("./internal/streams/destroy"), E.inherits(r, w);
            var x = ["error", "close", "destroy", "pause", "resume"];
            Object.defineProperty(r.prototype, "destroyed", {get:function ()
                {
                    return void 0 !== this._readableState && this._readableState.destroyed;
                }, set:function (t)
                {
                    this._readableState && (this._readableState.destroyed = t);
                }}), r.prototype.destroy = S.destroy, r.prototype._undestroy = S.undestroy, r.prototype._destroy = function (t,e)
            {
                this.push(null), e(t);
            }, r.prototype.push = function (t,e)
            {
                var r = this._readableState;
                if(r.objectMode)
                    var i = !0;
                else
                    "string" == typeof t && ((e = e || r.defaultEncoding) !== r.encoding && (t = v.from(t, e), e = ""), i = !0);
                return n(this, t, e, !1, i);
            }, r.prototype.unshift = function (t)
            {
                return n(this, t, null, !0, !1);
            }, r.prototype.isPaused = function ()
            {
                return !1 === this._readableState.flowing;
            }, r.prototype.setEncoding = function (t)
            {
                return A || (A = L("string_decoder/").StringDecoder), this._readableState.decoder = new A(t), this._readableState.encoding = t,
                this;
            }, r.prototype.read = function (t)
            {
                I("read", t), t = parseInt(t, 10);
                var e = this._readableState, r = t;
                if(0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended))
                    return I("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? c(this) : u(this), null;
                if(0 === (t = s(t, e)) && e.ended)
                    return 0 === e.length && c(this), null;
                var i = e.needReadable;
                return I("need readable", i), (0 === e.length || e.length - t < e.highWaterMark) && I("length less than watermark", i = !0),
                e.ended || e.reading ? I("reading or ended", !1) : i && (I("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0),
                this._read(e.highWaterMark), e.sync = !1, e.reading || (t = s(r, e))), null === (i = 0 < t ? f(t, e) : null) ? (e.needReadable = !0,
                t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), r !== t && e.ended && c(this)), null !== i && this.emit("data",
                i), i;
            }, r.prototype._read = function (t)
            {
                this.emit("error", Error("_read() is not implemented"));
            }, r.prototype.pipe = function (i,t)
            {
                
function n()
                {
                    I("onend"), i.end();
                };
                
function s(t)
                {
                    I("ondata"), (p = !1) !== i.write(t) || p || ((1 === f.pipesCount && f.pipes === i || 1 < f.pipesCount &&  - 1 !== g(f.pipes,
                    i)) && !d && (I("false write response, pause", l._readableState.awaitDrain), l._readableState.awaitDrain++, p = !0), l.pause());
                };
                
function o(t)
                {
                    I("onerror", t), u(), i.removeListener("error", o), 0 === i.listeners("error").length && i.emit("error", t);
                };
                
function a()
                {
                    i.removeListener("finish", h), u();
                };
                
function h()
                {
                    I("onfinish"), i.removeListener("close", a), u();
                };
                
function u()
                {
                    I("unpipe"), l.unpipe(i);
                };
                var l = this, f = this._readableState;
                switch(f.pipesCount)
                {
                    case 0:
                        f.pipes = i;
                        break;
                    case 1:
                        f.pipes = [f.pipes, i];
                        break;
                    default:
                        f.pipes.push(i);
                }
                f.pipesCount += 1, I("pipe count=%d opts=%j", f.pipesCount, t);
                var e = t && !1 === t.end || i === m.stdout || i === m.stderr ? u : n;
                f.endEmitted ? b.nextTick(e) : l.once("end", e), i.on("unpipe", function t(e,r)
                {
                    I("onunpipe"), e === l && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, I("cleanup"), i.removeListener("close", a), i.removeListener("finish",
                    h), i.removeListener("drain", c), i.removeListener("error", o), i.removeListener("unpipe", t), l.removeListener("end", n),
                    l.removeListener("end", u), l.removeListener("data", s), d = !0, !f.awaitDrain || i._writableState && !i._writableState.needDrain || c());
                });
                var r, c = (r = l, function ()
                {
                    var t = r._readableState;
                    I("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && r.listeners("data").length && (t.flowing = !0,
                    _(r));
                });
                i.on("drain", c);
                var d = !1, p = !1;
                return l.on("data", s), function (t,e,r)
                {
                    if("function" == typeof t.prependListener)
                        return t.prependListener(e, r);
                    t._events && t._events[e] ? y(t._events[e]) ? t._events[e].unshift(r) : t._events[e] = [r, t._events[e]] : t.on(e, r);
                }(i, "error", o), i.once("close", a), i.once("finish", h), i.emit("pipe", l), f.flowing || (I("pipe resume"), l.resume()),
                i;
            }, r.prototype.unpipe = function (t)
            {
                var e = this._readableState, r = {hasUnpiped:!1};
                if(0 === e.pipesCount)
                    return this;
                if(1 === e.pipesCount)
                    return t && t !== e.pipes || (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this,
                    r)), this;
                if(t)
                    return  - 1 === (i = g(e.pipes, t)) || (e.pipes.splice(i, 1), --e.pipesCount, 1 === e.pipesCount && (e.pipes = e.pipes[0]),
                    t.emit("unpipe", this, r)), this;
                t = e.pipes;
                var i = e.pipesCount;
                for(e.pipes = null, e.pipesCount = 0, e.flowing = !1, e = 0; e < i; e++)
                    t[e].emit("unpipe", this, r);
                return this;
            }, r.prototype.addListener = r.prototype.on = function (t,e)
            {
                var r = w.prototype.on.call(this, t, e);
                if("data" === t)
                    !1 !== this._readableState.flowing && this.resume();
                else
                    if("readable" === t)
                    {
                        var i = this._readableState;
                        i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.emittedReadable = !1, i.reading ? i.length && u(this) : b.nextTick(o,
                        this));
                    }
                return r;
            }, r.prototype.resume = function ()
            {
                var t = this._readableState;
                return t.flowing || (I("resume"), t.flowing = !0, t.resumeScheduled || (t.resumeScheduled = !0, b.nextTick(a, this, t))), this;
            }, r.prototype.pause = function ()
            {
                return I("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (I("pause"), this._readableState.flowing = !1,
                this.emit("pause")), this;
            }, r.prototype.wrap = function (e)
            {
                var r = this, i = this._readableState, n = !1;
                for(var t in e.on("end", function ()
                {
                    if(I("wrapped end"), i.decoder && !i.ended)
                    {
                        var t = i.decoder.end();
                        t && t.length && r.push(t);
                    }
                    r.push(null);
                }), e.on("data", function (t)
                {
                    I("wrapped data"), i.decoder && (t = i.decoder.write(t)), i.objectMode && null == t || !(i.objectMode || t && t.length) || r.push(t) || (n = !0,
                    e.pause());
                }), e)
                    void 0 === this[t] && "function" == typeof e[t] && (this[t] = function (t)
                    {
                        return function ()
                        {
                            return e[t].apply(e, arguments);
                        };
                    }(t));
                for(t = 0; t < x.length; t++)
                    e.on(x[t], this.emit.bind(this, x[t]));
                return this._read = function (t)
                {
                    I("wrapped _read", t), n && (n = !1, e.resume());
                }, this;
            }, Object.defineProperty(r.prototype, "readableHighWaterMark", {enumerable:!1, get:function ()
                {
                    return this._readableState.highWaterMark;
                }}), r._fromList = f;
        }).call(this, L("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {"./_stream_duplex":13, "./internal/streams/BufferList":18, "./internal/streams/destroy":19, "./internal/streams/stream":20,
        _process:11, "core-util-is":4, events:5, inherits:7, isarray:9, "process-nextick-args":10, "safe-buffer":25, "string_decoder/":27,
        util:2}], 16:[function (t,e,r)
    {
        
function i(t)
        {
            if(!(this instanceof i))
                return new i(t);
            o.call(this, t), this._transformState = {afterTransform:function (t,e)
                {
                    var r = this._transformState;
                    r.transforming = !1;
                    var i = r.writecb;
                    if(!i)
                        return this.emit("error", Error("write callback called multiple times"));
                    r.writechunk = null, (r.writecb = null) != e && this.push(e), i(t), (r = this._readableState).reading = !1, (r.needReadable || r.length < r.highWaterMark) && this._read(r.highWaterMark);
                }.bind(this), needTransform:!1, transforming:!1, writecb:null, writechunk:null, writeencoding:null}, this._readableState.needReadable = !0,
            this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)),
            this.on("prefinish", n);
        };
        
function n()
        {
            var r = this;
            "function" == typeof this._flush ? this._flush(function (t,e)
            {
                s(r, t, e);
            }) : s(this, null, null);
        };
        
function s(t,e,r)
        {
            if(e)
                return t.emit("error", e);
            if(null != r && t.push(r), t._writableState.length)
                throw Error("Calling transform done when ws.length != 0");
            if(t._transformState.transforming)
                throw Error("Calling transform done when still transforming");
            return t.push(null);
        };
        e.exports = i;
        var o = t("./_stream_duplex");
        (e = t("core-util-is")).inherits = t("inherits"), e.inherits(i, o), i.prototype.push = function (t,e)
        {
            return this._transformState.needTransform = !1, o.prototype.push.call(this, t, e);
        }, i.prototype._transform = function (t,e,r)
        {
            throw Error("_transform() is not implemented");
        }, i.prototype._write = function (t,e,r)
        {
            var i = this._transformState;
            i.writecb = r, i.writechunk = t, i.writeencoding = e, i.transforming || (t = this._readableState, (i.needTransform || t.needReadable || t.length < t.highWaterMark) && this._read(t.highWaterMark));
        }, i.prototype._read = function (t)
        {
            null !== (t = this._transformState).writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk,
            t.writeencoding, t.afterTransform)) : t.needTransform = !0;
        }, i.prototype._destroy = function (t,e)
        {
            var r = this;
            o.prototype._destroy.call(this, t, function (t)
            {
                e(t), r.emit("close");
            });
        };
    }, {"./_stream_duplex":13, "core-util-is":4, inherits:7}], 17:[function (v,M,t)
    {
        (function (t,e,r)
        {
            
function a(r)
            {
                var i = this;
                this.entry = this.next = null, this.finish = function ()
                {
                    var t = i.entry;
                    for(i.entry = null; t; )
                    {
                        var e = t.callback;
                        r.pendingcb--, e(void 0), t = t.next;
                    }
                    r.corkedRequestsFree ? r.corkedRequestsFree.next = i : r.corkedRequestsFree = i;
                };
            };
            
function l()
            {
            };
            
function i(t,n)
            {
                p = p || v("./_stream_duplex"), t = t || {};
                var e = n instanceof p;
                this.objectMode = !!t.objectMode, e && (this.objectMode = this.objectMode || !!t.writableObjectMode);
                var r = t.highWaterMark, i = t.writableHighWaterMark, s = this.objectMode ? 16 : 16384;
                this.highWaterMark = r || 0 === r ? r : e && (i || 0 === i) ? i : s, this.highWaterMark = Math.floor(this.highWaterMark), this.destroyed = this.finished = this.ended = this.ending = this.needDrain = this.finalCalled = !1,
                this.decodeStrings = !1 !== t.decodeStrings, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1,
                this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (t)
                {
                    var e = n._writableState, r = e.sync, i = e.writecb;
                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0, t ? (--e.pendingcb, r ? (d.nextTick(i, t), d.nextTick(c,
                    n, e), n._writableState.errorEmitted = !0, n.emit("error", t)) : (i(t), n._writableState.errorEmitted = !0, n.emit("error",
                    t), c(n, e))) : ((t = u(e)) || e.corked || e.bufferProcessing || !e.bufferedRequest || h(n, e), r ? m(o, n, e, t, i) : o(n,
                    e, t, i));
                }, this.writecb = null, this.writelen = 0, this.lastBufferedRequest = this.bufferedRequest = null, this.pendingcb = 0, this.errorEmitted = this.prefinished = !1,
                this.bufferedRequestCount = 0, this.corkedRequestsFree = new a(this);
            };
            
function n(t)
            {
                if(p = p || v("./_stream_duplex"), !(w.call(n, this) || this instanceof p))
                    return new n(t);
                this._writableState = new i(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev),
                "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), g.call(this);
            };
            
function f(t,e,r,i,n,s,o)
            {
                e.writelen = i, e.writecb = o, e.writing = !0, e.sync = !0, r ? t._writev(n, e.onwrite) : t._write(n, s, e.onwrite), e.sync = !1;
            };
            
function o(t,e,r,i)
            {
                !r && 0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain")), e.pendingcb--, i(), c(t, e);
            };
            
function h(t,e)
            {
                e.bufferProcessing = !0;
                var r = e.bufferedRequest;
                if(t._writev && r && r.next)
                {
                    var i = Array(e.bufferedRequestCount), n = e.corkedRequestsFree;
                    n.entry = r;
                    for(var s = 0, o = !0; r; )
                        (i[s] = r).isBuf || (o = !1), r = r.next, s += 1;
                    i.allBuffers = o, f(t, e, !0, e.length, i, "", n.finish), e.pendingcb++, e.lastBufferedRequest = null, n.next ? (e.corkedRequestsFree = n.next,
                    n.next = null) : e.corkedRequestsFree = new a(e), e.bufferedRequestCount = 0;
                }
                else
                {
                    for(; r && (i = r.chunk, f(t, e, !1, e.objectMode ? 1 : i.length, i, r.encoding, r.callback), r = r.next, e.bufferedRequestCount--,
                    !e.writing); );
                    null === r && (e.lastBufferedRequest = null);
                }
                e.bufferedRequest = r, e.bufferProcessing = !1;
            };
            
function u(t)
            {
                return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing;
            };
            
function s(e,r)
            {
                e._final(function (t)
                {
                    r.pendingcb--, t && e.emit("error", t), r.prefinished = !0, e.emit("prefinish"), c(e, r);
                });
            };
            
function c(t,e)
            {
                var r = u(e);
                return r && (e.prefinished || e.finalCalled || ("function" == typeof t._final ? (e.pendingcb++, e.finalCalled = !0, d.nextTick(s,
                t, e)) : (e.prefinished = !0, t.emit("prefinish"))), 0 === e.pendingcb && (e.finished = !0, t.emit("finish"))), r;
            };
            var d = v("process-nextick-args");
            M.exports = n;
            var p, m = !t.browser &&  - 1 < ["v0.10", "v0.9."].indexOf(t.version.slice(0, 5)) ? r : d.nextTick;
            n.WritableState = i, (t = v("core-util-is")).inherits = v("inherits");
            var _ = {deprecate:v("util-deprecate")}, g = v("./internal/streams/stream"), b = v("safe-buffer").Buffer, y = e.Uint8Array || function ()
            {
            };
            if(e = v("./internal/streams/destroy"), t.inherits(n, g), i.prototype.getBuffer = function ()
            {
                for(var t = this.bufferedRequest, e = []; t; )
                    e.push(t), t = t.next;
                return e;
            }, function ()
            {
                try
                {
                    Object.defineProperty(i.prototype, "buffer", {get:_.deprecate(function ()
                        {
                            return this.getBuffer();
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")});
                }
                catch(t)
                {
                }
            }(), $jscomp.initSymbol(), $jscomp.initSymbol(), $jscomp.initSymbol(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance])
            {
                $jscomp.initSymbol();
                var w = Function.prototype[Symbol.hasInstance];
                $jscomp.initSymbol(), Object.defineProperty(n, Symbol.hasInstance, {value:function (t)
                    {
                        return !!w.call(this, t) || this === n && (t && t._writableState instanceof i);
                    }});
            }
            else
                w = function (t)
                {
                    return t instanceof this;
                };
            n.prototype.pipe = function ()
            {
                this.emit("error", Error("Cannot pipe, not readable"));
            }, n.prototype.write = function (t,e,r)
            {
                var i, n = this._writableState, s = !1;
                if((i = !n.objectMode) && (i = t, i = b.isBuffer(i) || i instanceof y), i && !b.isBuffer(t) && (t = b.from(t)), "function" == typeof e && (r = e,
                e = null), i ? e = "buffer" : e || (e = n.defaultEncoding), "function" != typeof r && (r = l), n.ended)
                    n = r, r = Error("write after end"), this.emit("error", r), d.nextTick(n, r);
                else
                {
                    var o;
                    if(!(o = i))
                    {
                        var a = r, h = !0, u = !1;
                        null === (o = t) ? u = new TypeError("May not write null values to stream") : "string" == typeof o || void 0 === o || n.objectMode || (u = new TypeError("Invalid non-string/buffer chunk")),
                        u && (this.emit("error", u), d.nextTick(a, u), h = !1), o = h;
                    }
                    o && (n.pendingcb++, (s = i) || (i = t, n.objectMode || !1 === n.decodeStrings || "string" != typeof i || (i = b.from(i, e)),
                    t !== i && (s = !0, e = "buffer", t = i)), o = n.objectMode ? 1 : t.length, n.length += o, (i = n.length < n.highWaterMark) || (n.needDrain = !0),
                    n.writing || n.corked ? (o = n.lastBufferedRequest, n.lastBufferedRequest = {chunk:t, encoding:e, isBuf:s, callback:r, next:null},
                    o ? o.next = n.lastBufferedRequest : n.bufferedRequest = n.lastBufferedRequest, n.bufferedRequestCount += 1) : f(this, n, !1,
                    o, t, e, r), s = i);
                }
                return s;
            }, n.prototype.cork = function ()
            {
                this._writableState.corked++;
            }, n.prototype.uncork = function ()
            {
                var t = this._writableState;
                t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || h(this, t));
            }, n.prototype.setDefaultEncoding = function (t)
            {
                if("string" == typeof t && (t = t.toLowerCase()), !( - 1 < "hex utf8 utf-8 ascii binary base64 ucs2 ucs-2 utf16le utf-16le raw".split(" ").indexOf((t + "").toLowerCase())))
                    throw new TypeError("Unknown encoding: " + t);
                return this._writableState.defaultEncoding = t, this;
            }, Object.defineProperty(n.prototype, "writableHighWaterMark", {enumerable:!1, get:function ()
                {
                    return this._writableState.highWaterMark;
                }}), n.prototype._write = function (t,e,r)
            {
                r(Error("_write() is not implemented"));
            }, n.prototype._writev = null, n.prototype.end = function (t,e,r)
            {
                var i = this._writableState;
                "function" == typeof t ? (r = t, e = t = null) : "function" == typeof e && (r = e, e = null), null != t && this.write(t, e),
                i.corked && (i.corked = 1, this.uncork()), i.ending || i.finished || (t = r, i.ending = !0, c(this, i), t && (i.finished ? d.nextTick(t) : this.once("finish",
                t)), i.ended = !0, this.writable = !1);
            }, Object.defineProperty(n.prototype, "destroyed", {get:function ()
                {
                    return void 0 !== this._writableState && this._writableState.destroyed;
                }, set:function (t)
                {
                    this._writableState && (this._writableState.destroyed = t);
                }}), n.prototype.destroy = e.destroy, n.prototype._undestroy = e.undestroy, n.prototype._destroy = function (t,e)
            {
                this.end(), e(t);
            };
        }).call(this, v("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {},
        v("timers").setImmediate);
    }, {"./_stream_duplex":13, "./internal/streams/destroy":19, "./internal/streams/stream":20, _process:11, "core-util-is":4,
        inherits:7, "process-nextick-args":10, "safe-buffer":25, timers:28, "util-deprecate":29}], 18:[function (t,e,r)
    {
        var i = t("safe-buffer").Buffer, n = t("util");
        e.exports = function ()
        {
            
function t()
            {
                if(!(this instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                this.tail = this.head = null, this.length = 0;
            };
            return t.prototype.push = function (t)
            {
                t = {data:t, next:null}, 0 < this.length ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
            }, t.prototype.unshift = function (t)
            {
                t = {data:t, next:this.head}, 0 === this.length && (this.tail = t), this.head = t, ++this.length;
            }, t.prototype.shift = function ()
            {
                if(0 !== this.length)
                {
                    var t = this.head.data;
                    return this.head = 1 === this.length ? this.tail = null : this.head.next, --this.length, t;
                }
            }, t.prototype.clear = function ()
            {
                this.head = this.tail = null, this.length = 0;
            }, t.prototype.join = function (t)
            {
                if(0 === this.length)
                    return "";
                for(var e = this.head, r = "" + e.data; e = e.next; )
                    r += t + e.data;
                return r;
            }, t.prototype.concat = function (t)
            {
                if(0 === this.length)
                    return i.alloc(0);
                if(1 === this.length)
                    return this.head.data;
                t = i.allocUnsafe(t >>> 0);
                for(var e = this.head, r = 0; e; )
                    e.data.copy(t, r), r += e.data.length, e = e.next;
                return t;
            }, t;
        }(), n && n.inspect && n.inspect.custom && (e.exports.prototype[n.inspect.custom] = function ()
        {
            var t = n.inspect({length:this.length});
            return this.constructor.name + " " + t;
        });
    }, {"safe-buffer":25, util:2}], 19:[function (t,e,r)
    {
        
function n(t,e)
        {
            t.emit("error", e);
        };
        var s = t("process-nextick-args");
        e.exports = {destroy:function (t,e)
            {
                var r = this, i = this._writableState && this._writableState.destroyed;
                return this._readableState && this._readableState.destroyed || i ? e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || s.nextTick(n,
                this, t) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0),
                this._destroy(t || null, function (t)
                {
                    !e && t ? (s.nextTick(n, r, t), r._writableState && (r._writableState.errorEmitted = !0)) : e && e(t);
                })), this;
            }, undestroy:function ()
            {
                this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1,
                this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1,
                this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
            }};
    }, {"process-nextick-args":10}], 20:[function (t,e,r)
    {
        e.exports = t("events").EventEmitter;
    }, {events:5}], 21:[function (t,e,r)
    {
        e.exports = t("./readable").PassThrough;
    }, {"./readable":22}], 22:[function (t,e,r)
    {
        (((r = e.exports = t("./lib/_stream_readable.js")).Stream = r).Readable = r).Writable = t("./lib/_stream_writable.js"), r.Duplex = t("./lib/_stream_duplex.js"),
        r.Transform = t("./lib/_stream_transform.js"), r.PassThrough = t("./lib/_stream_passthrough.js");
    }, {"./lib/_stream_duplex.js":13, "./lib/_stream_passthrough.js":14, "./lib/_stream_readable.js":15, "./lib/_stream_transform.js":16,
        "./lib/_stream_writable.js":17}], 23:[function (t,e,r)
    {
        e.exports = t("./readable").Transform;
    }, {"./readable":22}], 24:[function (t,e,r)
    {
        e.exports = t("./lib/_stream_writable.js");
    }, {"./lib/_stream_writable.js":17}], 25:[function (t,e,r)
    {
        
function i(t,e)
        {
            for(var r in t)
                e[r] = t[r];
        };
        
function n(t,e,r)
        {
            return o(t, e, r);
        };
        var s = t("buffer"), o = s.Buffer;
        o.from && o.alloc && o.allocUnsafe && o.allocUnsafeSlow ? e.exports = s : (i(s, r), r.Buffer = n), i(o, n), n.from = function (t,e,r)
        {
            if("number" == typeof t)
                throw new TypeError("Argument must not be a number");
            return o(t, e, r);
        }, n.alloc = function (t,e,r)
        {
            if("number" != typeof t)
                throw new TypeError("Argument must be a number");
            return t = o(t), void 0 !== e ? "string" == typeof r ? t.fill(e, r) : t.fill(e) : t.fill(0), t;
        }, n.allocUnsafe = function (t)
        {
            if("number" != typeof t)
                throw new TypeError("Argument must be a number");
            return o(t);
        }, n.allocUnsafeSlow = function (t)
        {
            if("number" != typeof t)
                throw new TypeError("Argument must be a number");
            return s.SlowBuffer(t);
        };
    }, {buffer:3}], 26:[function (t,e,r)
    {
        
function i()
        {
            l.call(this);
        };
        e.exports = i;
        var l = t("events").EventEmitter;
        t("inherits")(i, l), i.Readable = t("readable-stream/readable.js"), i.Writable = t("readable-stream/writable.js"), i.Duplex = t("readable-stream/duplex.js"),
        i.Transform = t("readable-stream/transform.js"), i.PassThrough = t("readable-stream/passthrough.js"), (i.Stream = i).prototype.pipe = function (e,t)
        {
            
function r(t)
            {
                e.writable && !1 === e.write(t) && h.pause && h.pause();
            };
            
function i()
            {
                h.readable && h.resume && h.resume();
            };
            
function n()
            {
                u || (u = !0, e.end());
            };
            
function s()
            {
                u || (u = !0, "function" == typeof e.destroy && e.destroy());
            };
            
function o(t)
            {
                if(a(), 0 === l.listenerCount(this, "error"))
                    throw t;
            };
            
function a()
            {
                h.removeListener("data", r), e.removeListener("drain", i), h.removeListener("end", n), h.removeListener("close", s), h.removeListener("error",
                o), e.removeListener("error", o), h.removeListener("end", a), h.removeListener("close", a), e.removeListener("close", a);
            };
            var h = this;
            h.on("data", r), e.on("drain", i), e._isStdio || t && !1 === t.end || (h.on("end", n), h.on("close", s));
            var u = !1;
            return h.on("error", o), e.on("error", o), h.on("end", a), h.on("close", a), e.on("close", a), e.emit("pipe", h), e;
        };
    }, {events:5, inherits:7, "readable-stream/duplex.js":12, "readable-stream/passthrough.js":21, "readable-stream/readable.js":22,
        "readable-stream/transform.js":23, "readable-stream/writable.js":24}], 27:[function (t,e,r)
    {
        
function i(t)
        {
            var e = function (t)
            {
                if(!t)
                    return "utf8";
                for(var e; ; )
                    switch(t)
                    {
                        case "utf8":
                        case "utf-8":
                            return "utf8";
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return "utf16le";
                        case "latin1":
                        case "binary":
                            return "latin1";
                        case "base64":
                        case "ascii":
                        case "hex":
                            return t;
                        default:
                            if(e)
                                return ;
                            t = ("" + t).toLowerCase(), e = !0;
                    }
            }(t);
            if("string" != typeof e && (c.isEncoding === d || !d(t)))
                throw Error("Unknown encoding: " + t);
            switch(this.encoding = e || t, this.encoding)
            {
                case "utf16le":
                    this.text = o, this.end = a, t = 4;
                    break;
                case "utf8":
                    this.fillLast = n, t = 4;
                    break;
                case "base64":
                    this.text = h, this.end = u, t = 3;
                    break;
                default:
                    return this.write = l, void (this.end = f);
            }
            this.lastTotal = this.lastNeed = 0, this.lastChar = c.allocUnsafe(t);
        };
        
function s(t)
        {
            return t <= 127 ? 0 : 6 == t >> 5 ? 2 : 14 == t >> 4 ? 3 : 30 == t >> 3 ? 4 : 2 == t >> 6 ?  - 1 :  - 2;
        };
        
function n(t)
        {
            var e = this.lastTotal - this.lastNeed;
            t:
            if(128 != (192 & t[0]))
            {
                this.lastNeed = 0;
                var r = "�";
            }
            else
            {
                if(1 < this.lastNeed && 1 < t.length)
                {
                    if(128 != (192 & t[1]))
                    {
                        this.lastNeed = 1, r = "�";
                        break t;
                    }
                    if(2 < this.lastNeed && 2 < t.length && 128 != (192 & t[2]))
                    {
                        this.lastNeed = 2, r = "�";
                        break t;
                    }
                }
                r = void 0;
            }
            return void 0 !== r ? r : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding,
            0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void (this.lastNeed -= t.length));
        };
        
function o(t,e)
        {
            if(0 != (t.length - e) % 2)
                return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1);
            var r = t.toString("utf16le", e);
            if(r)
            {
                var i = r.charCodeAt(r.length - 1);
                if(55296 <= i && i <= 56319)
                    return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], r.slice(0,
                     - 1);
            }
            return r;
        };
        
function a(t)
        {
            return t = t && t.length ? this.write(t) : "", this.lastNeed ? t + this.lastChar.toString("utf16le", 0, this.lastTotal - this.lastNeed) : t;
        };
        
function h(t,e)
        {
            var r = (t.length - e) % 3;
            return 0 === r ? t.toString("base64", e) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2],
            this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - r));
        };
        
function u(t)
        {
            return t = t && t.length ? this.write(t) : "", this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
        };
        
function l(t)
        {
            return t.toString(this.encoding);
        };
        
function f(t)
        {
            return t && t.length ? this.write(t) : "";
        };
        var c = t("safe-buffer").Buffer, d = c.isEncoding || function (t)
        {
            switch((t = "" + t) && t.toLowerCase())
            {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                    return !0;
                default:
                    return !1;
            }
        };
        (r.StringDecoder = i).prototype.write = function (t)
        {
            if(0 === t.length)
                return "";
            if(this.lastNeed)
            {
                var e = this.fillLast(t);
                if(void 0 === e)
                    return "";
                var r = this.lastNeed;
                this.lastNeed = 0;
            }
            else
                r = 0;
            return r < t.length ? e ? e + this.text(t, r) : this.text(t, r) : e || "";
        }, i.prototype.end = function (t)
        {
            return t = t && t.length ? this.write(t) : "", this.lastNeed ? t + "�" : t;
        }, i.prototype.text = function (t,e)
        {
            var r = function (t,e,r)
            {
                var i = e.length - 1;
                if(i < r)
                    return 0;
                var n = s(e[i]);
                return 0 <= n ? (0 < n && (t.lastNeed = n - 1), n) : --i < r ||  - 2 === n ? 0 : 0 <= (n = s(e[i])) ? (0 < n && (t.lastNeed = n - 2),
                n) : --i < r ||  - 2 === n ? 0 : 0 <= (n = s(e[i])) ? (0 < n && (2 === n ? n = 0 : t.lastNeed = n - 3), n) : 0;
            }(this, t, e);
            return this.lastNeed ? (this.lastTotal = r, r = t.length - (r - this.lastNeed), t.copy(this.lastChar, 0, r), t.toString("utf8",
            e, r)) : t.toString("utf8", e);
        }, i.prototype.fillLast = function (t)
        {
            if(this.lastNeed <= t.length)
                return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length;
        };
    }, {"safe-buffer":25}], 28:[function (h,t,u)
    {
        (function (t,e)
        {
            
function r(t,e)
            {
                this._id = t, this._clearFn = e;
            };
            var i = h("process/browser.js").nextTick, n = Function.prototype.apply, s = Array.prototype.slice, o = {}, a = 0;
            u.setTimeout = function ()
            {
                return new r(n.call(setTimeout, window, arguments), clearTimeout);
            }, u.setInterval = function ()
            {
                return new r(n.call(setInterval, window, arguments), clearInterval);
            }, u.clearTimeout = u.clearInterval = function (t)
            {
                t.close();
            }, r.prototype.unref = r.prototype.ref = function ()
            {
            }, r.prototype.close = function ()
            {
                this._clearFn.call(window, this._id);
            }, u.enroll = function (t,e)
            {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
            }, u.unenroll = function (t)
            {
                clearTimeout(t._idleTimeoutId), t._idleTimeout =  - 1;
            }, u._unrefActive = u.active = function (t)
            {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                0 <= e && (t._idleTimeoutId = setTimeout(function ()
                {
                    t._onTimeout && t._onTimeout();
                }, e));
            }, u.setImmediate = "function" == typeof t ? t : function (t)
            {
                var e = a++, r = !(arguments.length < 2) && s.call(arguments, 1);
                return o[e] = !0, i(function ()
                {
                    o[e] && (r ? t.apply(null, r) : t.call(null), u.clearImmediate(e));
                }), e;
            }, u.clearImmediate = "function" == typeof e ? e : function (t)
            {
                delete o[t];
            };
        }).call(this, h("timers").setImmediate, h("timers").clearImmediate);
    }, {"process/browser.js":11, timers:28}], 29:[function (t,r,e)
    {
        (function (e)
        {
            
function i(t)
            {
                try
                {
                    if(!e.localStorage)
                        return !1;
                }
                catch(t)
                {
                    return !1;
                }
                return null != (t = e.localStorage[t]) && "true" === String(t).toLowerCase();
            };
            r.exports = function (t,e)
            {
                if(i("noDeprecation"))
                    return t;
                var r = !1;
                return function ()
                {
                    if(!r)
                    {
                        if(i("throwDeprecation"))
                            throw Error(e);
                        i("traceDeprecation") ? console.trace(e) : console.warn(e), r = !0;
                    }
                    return t.apply(this, arguments);
                };
            };
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 30:[function (t,e,r)
    {
        window.SignLib = t("secp256k1/lib/js"), window.Buffer = t("safe-buffer").Buffer;
    }, {"safe-buffer":42, "secp256k1/lib/js":48}], 31:[function (t,e,r)
    {
        
function i(t)
        {
            s.call(this), (this.hashMode = "string" == typeof t) ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final,
            this._final = null), this._encoding = this._decoder = null;
        };
        var n = t("safe-buffer").Buffer, s = t("stream").Transform, o = t("string_decoder").StringDecoder;
        t("inherits")(i, s), i.prototype.update = function (t,e,r)
        {
            return "string" == typeof t && (t = n.from(t, e)), t = this._update(t), this.hashMode ? this : (r && (t = this._toString(t,
            r)), t);
        }, i.prototype.setAutoPadding = function ()
        {
        }, i.prototype.getAuthTag = function ()
        {
            throw Error("trying to get auth tag in unsupported state");
        }, i.prototype.setAuthTag = function ()
        {
            throw Error("trying to set auth tag in unsupported state");
        }, i.prototype.setAAD = function ()
        {
            throw Error("trying to set aad in unsupported state");
        }, i.prototype._transform = function (t,e,r)
        {
            try
            {
                this.hashMode ? this._update(t) : this.push(this._update(t));
            }
            catch(t)
            {
                var i = t;
            }
            finally
            {
                r(i);
            }
        }, i.prototype._flush = function (t)
        {
            try
            {
                this.push(this.__final());
            }
            catch(t)
            {
                var e = t;
            }
            t(e);
        }, i.prototype._finalOrDigest = function (t)
        {
            var e = this.__final() || n.alloc(0);
            return t && (e = this._toString(e, t, !0)), e;
        }, i.prototype._toString = function (t,e,r)
        {
            if(this._decoder || (this._decoder = new o(e), this._encoding = e), this._encoding !== e)
                throw Error("can't switch encodings");
            return t = this._decoder.write(t), r && (t += this._decoder.end()), t;
        }, e.exports = i;
    }, {inherits:39, "safe-buffer":42, stream:26, string_decoder:27}], 32:[function (t,e,r)
    {
        
function i(t)
        {
            a.call(this, "digest"), this._hash = t;
        };
        r = t("inherits");
        var n = t("md5.js"), s = t("ripemd160"), o = t("sha.js"), a = t("cipher-base");
        r(i, a), i.prototype._update = function (t)
        {
            this._hash.update(t);
        }, i.prototype._final = function ()
        {
            return this._hash.digest();
        }, e.exports = function (t)
        {
            return "md5" === (t = t.toLowerCase()) ? new n : "rmd160" === t || "ripemd160" === t ? new s : new i(o(t));
        };
    }, {"cipher-base":31, inherits:39, "md5.js":40, ripemd160:41, "sha.js":51}], 33:[function (t,e,r)
    {
        var i = t("md5.js");
        e.exports = function (t)
        {
            return (new i).update(t).digest();
        };
    }, {"md5.js":40}], 34:[function (t,e,r)
    {
        
function i(t,e)
        {
            o.call(this, "digest"), "string" == typeof e && (e = a.from(e));
            var r = "sha512" === t || "sha384" === t ? 128 : 64;
            this._alg = t, (this._key = e).length > r ? e = ("rmd160" === t ? new h : u(t)).update(e).digest() : e.length < r && (e = a.concat([e,
            l], r));
            for(var i = this._ipad = a.allocUnsafe(r), n = this._opad = a.allocUnsafe(r), s = 0; s < r; s++)
                i[s] = 54 ^ e[s], n[s] = 92 ^ e[s];
            this._hash = "rmd160" === t ? new h : u(t), this._hash.update(i);
        };
        r = t("inherits");
        var n = t("./legacy"), o = t("cipher-base"), a = t("safe-buffer").Buffer, s = t("create-hash/md5"), h = t("ripemd160"), u = t("sha.js"),
        l = a.alloc(128);
        r(i, o), i.prototype._update = function (t)
        {
            this._hash.update(t);
        }, i.prototype._final = function ()
        {
            var t = this._hash.digest();
            return ("rmd160" === this._alg ? new h : u(this._alg)).update(this._opad).update(t).digest();
        }, e.exports = function (t,e)
        {
            return "rmd160" === (t = t.toLowerCase()) || "ripemd160" === t ? new i("rmd160", e) : "md5" === t ? new n(s, e) : new i(t,
            e);
        };
    }, {"./legacy":35, "cipher-base":31, "create-hash/md5":33, inherits:39, ripemd160:41, "safe-buffer":42, "sha.js":51}], 35:[function (t,e,r)
    {
        
function i(t,e)
        {
            o.call(this, "digest"), "string" == typeof e && (e = s.from(e)), this._alg = t, 64 < (this._key = e).length ? e = t(e) : e.length < 64 && (e = s.concat([e,
            a], 64));
            for(var r = this._ipad = s.allocUnsafe(64), i = this._opad = s.allocUnsafe(64), n = 0; n < 64; n++)
                r[n] = 54 ^ e[n], i[n] = 92 ^ e[n];
            this._hash = [r];
        };
        r = t("inherits");
        var s = t("safe-buffer").Buffer, o = t("cipher-base"), a = s.alloc(128);
        r(i, o), i.prototype._update = function (t)
        {
            this._hash.push(t);
        }, i.prototype._final = function ()
        {
            var t = this._alg(s.concat(this._hash));
            return this._alg(s.concat([this._opad, t]));
        }, e.exports = i;
    }, {"cipher-base":31, inherits:39, "safe-buffer":42}], 36:[function (e,h,t)
    {
        (function (n)
        {
            
function t(t,e,r,i)
            {
                var n = s[t];
                if(void 0 === n)
                    throw Error("hash " + t + " is not supported");
                this._algo = t, this._securityStrength = n.securityStrength / 8, this._outlen = n.outlen / 8, this._reseedInterval = 281474976710656,
                this._init(e, r, i);
            };
            var i = e("create-hmac"), s = e("./lib/hash-info.json"), o = new n(0), r = new n([0]), a = new n([1]);
            t.prototype._update = function (t)
            {
                var e = i(this._algo, this._K).update(this._V).update(r);
                t && e.update(t), this._K = e.digest(), this._V = i(this._algo, this._K).update(this._V).digest(), t && (this._K = i(this._algo,
                this._K).update(this._V).update(a).update(t).digest(), this._V = i(this._algo, this._K).update(this._V).digest());
            }, t.prototype._init = function (t,e,r)
            {
                if(t.length < this._securityStrength)
                    throw Error("Not enough entropy");
                this._K = new n(this._outlen), this._V = new n(this._outlen);
                for(var i = 0; i < this._K.length; ++i)
                    this._K[i] = 0, this._V[i] = 1;
                this._update(n.concat([t, e, r || o])), this._reseed = 1;
            }, t.prototype.reseed = function (t,e)
            {
                if(t.length < this._securityStrength)
                    throw Error("Not enough entropy");
                this._update(n.concat([t, e || o])), this._reseed = 1;
            }, t.prototype.generate = function (t,e)
            {
                if(this._reseed > this._reseedInterval)
                    throw Error("Reseed is required");
                e && 0 === e.length && (e = void 0), e && this._update(e);
                for(var r = new n(0); r.length < t; )
                    this._V = i(this._algo, this._K).update(this._V).digest(), r = n.concat([r, this._V]);
                return this._update(e), this._reseed += 1, r.slice(0, t);
            }, h.exports = t;
        }).call(this, e("buffer").Buffer);
    }, {"./lib/hash-info.json":37, buffer:3, "create-hmac":34}], 37:[function (t,e,r)
    {
        e.exports = {sha1:{securityStrength:128, outlen:160, seedlen:440}, sha224:{securityStrength:192, outlen:224, seedlen:440},
            sha256:{securityStrength:256, outlen:256, seedlen:440}, sha384:{securityStrength:256, outlen:384, seedlen:888}, sha512:{securityStrength:256,
                outlen:512, seedlen:888}};
    }, {}], 38:[function (t,e,r)
    {
        
function i(t)
        {
            n.call(this), this._block = s.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
        };
        var s = t("safe-buffer").Buffer, n = t("stream").Transform;
        t("inherits")(i, n), i.prototype._transform = function (t,e,r)
        {
            var i = null;
            try
            {
                this.update(t, e);
            }
            catch(t)
            {
                i = t;
            }
            r(i);
        }, i.prototype._flush = function (t)
        {
            var e = null;
            try
            {
                this.push(this.digest());
            }
            catch(t)
            {
                e = t;
            }
            t(e);
        }, i.prototype.update = function (t,e)
        {
            var r = t;
            if(!s.isBuffer(r) && "string" != typeof r)
                throw new TypeError("Data must be a string or a buffer");
            if(this._finalized)
                throw Error("Digest already called");
            s.isBuffer(t) || (t = s.from(t, e)), r = this._block;
            for(var i = 0; this._blockOffset + t.length - i >= this._blockSize; )
            {
                for(var n = this._blockOffset; n < this._blockSize; )
                    r[n++] = t[i++];
                this._update(), this._blockOffset = 0;
            }
            for(; i < t.length; )
                r[this._blockOffset++] = t[i++];
            for(r = 0, i = 8 * t.length; 0 < i; ++r)
                this._length[r] += i, 0 < (i = this._length[r] / 4294967296 | 0) && (this._length[r] -= 4294967296 * i);
            return this;
        }, i.prototype._update = function ()
        {
            throw Error("_update is not implemented");
        }, i.prototype.digest = function (t)
        {
            if(this._finalized)
                throw Error("Digest already called");
            this._finalized = !0;
            var e = this._digest();
            for(void 0 !== t && (e = e.toString(t)), this._block.fill(0), t = this._blockOffset = 0; t < 4; ++t)
                this._length[t] = 0;
            return e;
        }, i.prototype._digest = function ()
        {
            throw Error("_digest is not implemented");
        }, e.exports = i;
    }, {inherits:39, "safe-buffer":42, stream:26}], 39:[function (t,e,r)
    {
        arguments[4][7][0].apply(r, arguments);
    }, {dup:7}], 40:[function (l,f,t)
    {
        (function (e)
        {
            
function t()
            {
                i.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878;
            };
            
function a(t,e)
            {
                return t << e | t >>> 32 - e;
            };
            
function n(t,e,r,i,n,s,o)
            {
                return a(t + (e & r | ~e & i) + n + s | 0, o) + e | 0;
            };
            
function s(t,e,r,i,n,s,o)
            {
                return a(t + (e & i | r & ~i) + n + s | 0, o) + e | 0;
            };
            
function o(t,e,r,i,n,s,o)
            {
                return a(t + (e ^ r ^ i) + n + s | 0, o) + e | 0;
            };
            
function h(t,e,r,i,n,s,o)
            {
                return a(t + (r ^ (e | ~i)) + n + s | 0, o) + e | 0;
            };
            var r = l("inherits"), i = l("hash-base"), u = Array(16);
            r(t, i), t.prototype._update = function ()
            {
                for(var t = 0; t < 16; ++t)
                    u[t] = this._block.readInt32LE(4 * t);
                t = this._a;
                var e = this._b, r = this._c, i = this._d;
                e = h(e = h(e = h(e = h(e = o(e = o(e = o(e = o(e = s(e = s(e = s(e = s(e = n(e = n(e = n(e = n(e, r = n(r, i = n(i, t = n(t,
                e, r, i, u[0], 3614090360, 7), e, r, u[1], 3905402710, 12), t, e, u[2], 606105819, 17), i, t, u[3], 3250441966, 22), r = n(r,
                i = n(i, t = n(t, e, r, i, u[4], 4118548399, 7), e, r, u[5], 1200080426, 12), t, e, u[6], 2821735955, 17), i, t, u[7], 4249261313,
                22), r = n(r, i = n(i, t = n(t, e, r, i, u[8], 1770035416, 7), e, r, u[9], 2336552879, 12), t, e, u[10], 4294925233, 17), i,
                t, u[11], 2304563134, 22), r = n(r, i = n(i, t = n(t, e, r, i, u[12], 1804603682, 7), e, r, u[13], 4254626195, 12), t, e, u[14],
                2792965006, 17), i, t, u[15], 1236535329, 22), r = s(r, i = s(i, t = s(t, e, r, i, u[1], 4129170786, 5), e, r, u[6], 3225465664,
                9), t, e, u[11], 643717713, 14), i, t, u[0], 3921069994, 20), r = s(r, i = s(i, t = s(t, e, r, i, u[5], 3593408605, 5), e,
                r, u[10], 38016083, 9), t, e, u[15], 3634488961, 14), i, t, u[4], 3889429448, 20), r = s(r, i = s(i, t = s(t, e, r, i, u[9],
                568446438, 5), e, r, u[14], 3275163606, 9), t, e, u[3], 4107603335, 14), i, t, u[8], 1163531501, 20), r = s(r, i = s(i, t = s(t,
                e, r, i, u[13], 2850285829, 5), e, r, u[2], 4243563512, 9), t, e, u[7], 1735328473, 14), i, t, u[12], 2368359562, 20), r = o(r,
                i = o(i, t = o(t, e, r, i, u[5], 4294588738, 4), e, r, u[8], 2272392833, 11), t, e, u[11], 1839030562, 16), i, t, u[14], 4259657740,
                23), r = o(r, i = o(i, t = o(t, e, r, i, u[1], 2763975236, 4), e, r, u[4], 1272893353, 11), t, e, u[7], 4139469664, 16), i,
                t, u[10], 3200236656, 23), r = o(r, i = o(i, t = o(t, e, r, i, u[13], 681279174, 4), e, r, u[0], 3936430074, 11), t, e, u[3],
                3572445317, 16), i, t, u[6], 76029189, 23), r = o(r, i = o(i, t = o(t, e, r, i, u[9], 3654602809, 4), e, r, u[12], 3873151461,
                11), t, e, u[15], 530742520, 16), i, t, u[2], 3299628645, 23), r = h(r, i = h(i, t = h(t, e, r, i, u[0], 4096336452, 6), e,
                r, u[7], 1126891415, 10), t, e, u[14], 2878612391, 15), i, t, u[5], 4237533241, 21), r = h(r, i = h(i, t = h(t, e, r, i, u[12],
                1700485571, 6), e, r, u[3], 2399980690, 10), t, e, u[10], 4293915773, 15), i, t, u[1], 2240044497, 21), r = h(r, i = h(i, t = h(t,
                e, r, i, u[8], 1873313359, 6), e, r, u[15], 4264355552, 10), t, e, u[6], 2734768916, 15), i, t, u[13], 1309151649, 21), r = h(r,
                i = h(i, t = h(t, e, r, i, u[4], 4149444226, 6), e, r, u[11], 3174756917, 10), t, e, u[2], 718787259, 15), i, t, u[9], 3951481745,
                21), this._a = this._a + t | 0, this._b = this._b + e | 0, this._c = this._c + r | 0, this._d = this._d + i | 0;
            }, t.prototype._digest = function ()
            {
                this._block[this._blockOffset++] = 128, 56 < this._blockOffset && (this._block.fill(0, this._blockOffset, 64), this._update(),
                this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1],
                60), this._update();
                var t = new e(16);
                return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t;
            }, f.exports = t;
        }).call(this, l("buffer").Buffer);
    }, {buffer:3, "hash-base":38, inherits:39}], 41:[function (t,e,r)
    {
        
function i()
        {
            s.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520;
        };
        
function d(t,e)
        {
            return t << e | t >>> 32 - e;
        };
        var n = t("buffer").Buffer;
        r = t("inherits");
        var s = t("hash-base"), p = Array(16), m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3,
        12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14,
        5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], _ = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
        6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3,
        11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], g = [11, 14, 15, 12, 5, 8, 7,
        9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8,
        13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11,
        8, 5, 6], b = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13,
        11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12,
        9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11], y = [0, 1518500249, 1859775393, 2400959708, 2840853838], w = [1352829926, 1548603684,
        1836072691, 2053994217, 0];
        r(i, s), i.prototype._update = function ()
        {
            for(var t = 0; t < 16; ++t)
                p[t] = this._block.readInt32LE(4 * t);
            var e = 0 | this._a;
            t = 0 | this._b;
            for(var r = 0 | this._c, i = 0 | this._d, n = 0 | this._e, s = 0 | this._a, o = 0 | this._b, a = 0 | this._c, h = 0 | this._d,
            u = 0 | this._e, l = 0; l < 80; l += 1)
            {
                if(l < 16)
                {
                    var f = n;
                    f = d(e + (t ^ r ^ i) + p[m[l]] + y[0] | 0, g[l]) + f | 0, e = u;
                    var c = d(s + (o ^ (a | ~h)) + p[_[l]] + w[0] | 0, b[l]) + e | 0;
                }
                else
                    c = l < 32 ? (f = n, f = d(e + (t & r | ~t & i) + p[m[l]] + y[1] | 0, g[l]) + f | 0, e = u, d(s + (o & h | a & ~h) + p[_[l]] + w[1] | 0,
                    b[l]) + e | 0) : l < 48 ? (f = n, f = d(e + ((t | ~r) ^ i) + p[m[l]] + y[2] | 0, g[l]) + f | 0, e = u, d(s + ((o | ~a) ^ h) + p[_[l]] + w[2] | 0,
                    b[l]) + e | 0) : l < 64 ? (f = n, f = d(e + (t & i | r & ~i) + p[m[l]] + y[3] | 0, g[l]) + f | 0, e = u, d(s + (o & a | ~o & h) + p[_[l]] + w[3] | 0,
                    b[l]) + e | 0) : (f = n, f = d(e + (t ^ (r | ~i)) + p[m[l]] + y[4] | 0, g[l]) + f | 0, e = u, d(s + (o ^ a ^ h) + p[_[l]] + w[4] | 0,
                    b[l]) + e | 0);
                e = n, n = i, i = d(r, 10), r = t, t = f, s = u, u = h, h = d(a, 10), a = o, o = c;
            }
            r = this._b + r + h | 0, this._b = this._c + i + u | 0, this._c = this._d + n + s | 0, this._d = this._e + e + o | 0, this._e = this._a + t + a | 0,
            this._a = r;
        }, i.prototype._digest = function ()
        {
            this._block[this._blockOffset++] = 128, 56 < this._blockOffset && (this._block.fill(0, this._blockOffset, 64), this._update(),
            this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1],
            60), this._update();
            var t = n.alloc ? n.alloc(20) : new n(20);
            return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t.writeInt32LE(this._e,
            16), t;
        }, e.exports = i;
    }, {buffer:3, "hash-base":38, inherits:39}], 42:[function (t,e,r)
    {
        arguments[4][25][0].apply(r, arguments);
    }, {buffer:3, dup:25}], 43:[function (t,e,r)
    {
        
function l()
        {
            this.negative = 0, this.words = null, this.length = 0;
        };
        var i = t("safe-buffer").Buffer;
        t = t("./optimized"), l.fromNumber = function (t)
        {
            var e = new l;
            return e.words = [67108863 & t], e.length = 1, e;
        }, l.fromBuffer = function (t)
        {
            var e = new l;
            return e.words = Array(10), e.words[0] = (3 & t[28]) << 24 | t[29] << 16 | t[30] << 8 | t[31], e.words[1] = (15 & t[25]) << 22 | t[26] << 14 | t[27] << 6 | t[28] >>> 2,
            e.words[2] = (63 & t[22]) << 20 | t[23] << 12 | t[24] << 4 | t[25] >>> 4, e.words[3] = (255 & t[19]) << 18 | t[20] << 10 | t[21] << 2 | t[22] >>> 6,
            e.words[4] = (3 & t[15]) << 24 | t[16] << 16 | t[17] << 8 | t[18], e.words[5] = (15 & t[12]) << 22 | t[13] << 14 | t[14] << 6 | t[15] >>> 2,
            e.words[6] = (63 & t[9]) << 20 | t[10] << 12 | t[11] << 4 | t[12] >>> 4, e.words[7] = (255 & t[6]) << 18 | t[7] << 10 | t[8] << 2 | t[9] >>> 6,
            e.words[8] = (3 & t[2]) << 24 | t[3] << 16 | t[4] << 8 | t[5], e.words[9] = t[0] << 14 | t[1] << 6 | t[2] >>> 2, e.length = 10,
            e.strip();
        }, l.prototype.toBuffer = function ()
        {
            for(var t = this.words, e = this.length; e < 10; ++e)
                t[e] = 0;
            return i.from([t[9] >>> 14 & 255, t[9] >>> 6 & 255, (63 & t[9]) << 2 | t[8] >>> 24 & 3, t[8] >>> 16 & 255, t[8] >>> 8 & 255,
            255 & t[8], t[7] >>> 18 & 255, t[7] >>> 10 & 255, t[7] >>> 2 & 255, (3 & t[7]) << 6 | t[6] >>> 20 & 63, t[6] >>> 12 & 255,
            t[6] >>> 4 & 255, (15 & t[6]) << 4 | t[5] >>> 22 & 15, t[5] >>> 14 & 255, t[5] >>> 6 & 255, (63 & t[5]) << 2 | t[4] >>> 24 & 3,
            t[4] >>> 16 & 255, t[4] >>> 8 & 255, 255 & t[4], t[3] >>> 18 & 255, t[3] >>> 10 & 255, t[3] >>> 2 & 255, (3 & t[3]) << 6 | t[2] >>> 20 & 63,
            t[2] >>> 12 & 255, t[2] >>> 4 & 255, (15 & t[2]) << 4 | t[1] >>> 22 & 15, t[1] >>> 14 & 255, t[1] >>> 6 & 255, (63 & t[1]) << 2 | t[0] >>> 24 & 3,
            t[0] >>> 16 & 255, t[0] >>> 8 & 255, 255 & t[0]]);
        }, l.prototype.clone = function ()
        {
            var t = new l;
            t.words = Array(this.length);
            for(var e = 0; e < this.length; e++)
                t.words[e] = this.words[e];
            return t.length = this.length, t.negative = this.negative, t;
        }, l.prototype.strip = function ()
        {
            for(; 1 < this.length && 0 == (0 | this.words[this.length - 1]); )
                this.length--;
            return this;
        }, l.prototype.normSign = function ()
        {
            return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
        }, l.prototype.isEven = function ()
        {
            return 0 == (1 & this.words[0]);
        }, l.prototype.isOdd = function ()
        {
            return 1 == (1 & this.words[0]);
        }, l.prototype.isZero = function ()
        {
            return 1 === this.length && 0 === this.words[0];
        }, l.prototype.ucmp = function (t)
        {
            if(this.length !== t.length)
                return this.length > t.length ? 1 :  - 1;
            for(var e = this.length - 1; 0 <= e; --e)
                if(this.words[e] !== t.words[e])
                    return this.words[e] > t.words[e] ? 1 :  - 1;
            return 0;
        }, l.prototype.gtOne = function ()
        {
            return 1 < this.length || 1 < this.words[0];
        }, l.prototype.isOverflow = function ()
        {
            return 0 <= this.ucmp(l.n);
        }, l.prototype.isHigh = function ()
        {
            return 1 === this.ucmp(l.nh);
        }, l.prototype.bitLengthGT256 = function ()
        {
            return 10 < this.length || 10 === this.length && 4194303 < this.words[9];
        }, l.prototype.iuaddn = function (t)
        {
            for(this.words[0] += t, t = 0; 67108863 < this.words[t] && t < this.length; ++t)
                this.words[t] -= 67108864, this.words[t + 1] += 1;
            return t === this.length && (this.words[t] = 1, this.length += 1), this;
        }, l.prototype.iadd = function (t)
        {
            if(this.negative !== t.negative)
                return 0 !== this.negative ? (this.negative = 0, this.isub(t), this.negative ^= 1) : (t.negative = 0, this.isub(t), t.negative = 1),
                this.normSign();
            if(this.length > t.length)
                var e = this;
            else
                e = t, t = this;
            for(var r = 0, i = 0; r < t.length; ++r)
                i = e.words[r] + t.words[r] + i, this.words[r] = 67108863 & i, i >>>= 26;
            for(; 0 !== i && r < e.length; ++r)
                i = e.words[r] + i, this.words[r] = 67108863 & i, i >>>= 26;
            if(this.length = e.length, 0 !== i)
                this.words[this.length++] = i;
            else
                if(e !== this)
                    for(; r < e.length; ++r)
                        this.words[r] = e.words[r];
            return this;
        }, l.prototype.add = function (t)
        {
            return this.clone().iadd(t);
        }, l.prototype.isub = function (t)
        {
            if(this.negative !== t.negative)
                return 0 !== this.negative ? (this.negative = 0, this.iadd(t), this.negative = 1) : (t.negative = 0, this.iadd(t), t.negative = 1),
                this.normSign();
            var e = this.ucmp(t);
            if(0 === e)
                return this.negative = 0, this.words[0] = 0, this.length = 1, this;
            0 < e ? e = this : (e = t, t = this);
            for(var r = 0, i = 0; r < t.length; ++r)
            {
                var n = e.words[r] - t.words[r] + i;
                i = n >> 26, this.words[r] = 67108863 & n;
            }
            for(; 0 !== i && r < e.length; ++r)
                i = (n = e.words[r] + i) >> 26, this.words[r] = 67108863 & n;
            if(0 === i && r < e.length && e !== this)
                for(; r < e.length; ++r)
                    this.words[r] = e.words[r];
            return this.length = Math.max(this.length, r), e !== this && (this.negative ^= 1), this.strip().normSign();
        }, l.prototype.sub = function (t)
        {
            return this.clone().isub(t);
        }, l.umulTo = function (t,e,r)
        {
            r.length = t.length + e.length - 1;
            var i = t.words[0] * e.words[0], n = i / 67108864 | 0;
            r.words[0] = 67108863 & i, i = 1;
            for(var s = r.length; i < s; i++)
            {
                var o = n >>> 26, a = 67108863 & n;
                n = Math.max(0, i - t.length + 1);
                for(var h = Math.min(i, e.length - 1); n <= h; n++)
                    o += (a = t.words[i - n] * e.words[n] + a) / 67108864 | 0, a &= 67108863;
                r.words[i] = a, n = o;
            }
            return 0 !== n && (r.words[r.length++] = n), r.strip();
        }, l.umulTo10x10 = Math.imul ? t.umulTo10x10 : l.umulTo, l.umulnTo = function (t,e,r)
        {
            if(0 === e)
                return r.words = [0], r.length = 1, r;
            for(var i = 0, n = 0; i < t.length; ++i)
                n = t.words[i] * e + n, r.words[i] = 67108863 & n, n = n / 67108864 | 0;
            return r.length = 0 < n ? (r.words[i] = n, t.length + 1) : t.length, r;
        }, l.prototype.umul = function (t)
        {
            var e = new l;
            return e.words = Array(this.length + t.length), 10 === this.length && 10 === t.length ? l.umulTo10x10(this, t, e) : 1 === this.length ? l.umulnTo(t,
            this.words[0], e) : 1 === t.length ? l.umulnTo(this, t.words[0], e) : l.umulTo(this, t, e);
        }, l.prototype.isplit = function (t)
        {
            t.length = Math.min(this.length, 9);
            for(var e = 0; e < t.length; ++e)
                t.words[e] = this.words[e];
            if(this.length <= 9)
                return this.words[0] = 0, this.length = 1, this;
            var r = this.words[9];
            for(t.words[t.length++] = 4194303 & r, e = 10; e < this.length; ++e)
                t = this.words[e], this.words[e - 10] = (4194303 & t) << 4 | r >>> 22, r = t;
            return r >>>= 22, this.words[e - 10] = r, this.length = 0 === r && 10 < this.length ? this.length - 10 : this.length - 9, this;
        }, l.prototype.fireduce = function ()
        {
            return this.isOverflow() && this.isub(l.n), this;
        }, l.prototype.ureduce = function ()
        {
            var t = this.clone().isplit(l.tmp).umul(l.nc).iadd(l.tmp);
            return t.bitLengthGT256() && ((t = t.isplit(l.tmp).umul(l.nc).iadd(l.tmp)).bitLengthGT256() && (t = t.isplit(l.tmp).umul(l.nc).iadd(l.tmp))),
            t.fireduce();
        }, l.prototype.ishrn = function (t)
        {
            for(var e = (1 << t) - 1, r = 26 - t, i = this.length - 1, n = 0; 0 <= i; --i)
            {
                var s = this.words[i];
                this.words[i] = n << r | s >>> t, n = s & e;
            }
            return 1 < this.length && 0 === this.words[this.length - 1] && --this.length, this;
        }, l.prototype.uinvm = function ()
        {
            for(var t = this.clone(), e = l.n.clone(), r = l.fromNumber(1), i = l.fromNumber(0), n = l.fromNumber(0), s = l.fromNumber(1); t.isEven() && e.isEven(); )
            {
                for(var o = 1, a = 1; 0 == (t.words[0] & a) && 0 == (e.words[0] & a) && o < 26; ++o, a <<= 1);
                t.ishrn(o), e.ishrn(o);
            }
            for(o = e.clone(), a = t.clone(); !t.isZero(); )
            {
                for(var h = 0, u = 1; 0 == (t.words[0] & u) && h < 26; ++h, u <<= 1);
                if(0 < h)
                    for(t.ishrn(h); 0 < h--; )
                        (r.isOdd() || i.isOdd()) && (r.iadd(o), i.isub(a)), r.ishrn(1), i.ishrn(1);
                for(h = 0, u = 1; 0 == (e.words[0] & u) && h < 26; ++h, u <<= 1);
                if(0 < h)
                    for(e.ishrn(h); 0 < h--; )
                        (n.isOdd() || s.isOdd()) && (n.iadd(o), s.isub(a)), n.ishrn(1), s.ishrn(1);
                0 <= t.ucmp(e) ? (t.isub(e), r.isub(n), i.isub(s)) : (e.isub(t), n.isub(r), s.isub(i));
            }
            return 1 === n.negative ? (n.negative = 0, (t = n.ureduce()).negative ^= 1, t.normSign().iadd(l.n)) : n.ureduce();
        }, l.prototype.imulK = function ()
        {
            this.words[this.length] = 0, this.words[this.length + 1] = 0, this.length += 2;
            for(var t = 0, e = 0; t < this.length; ++t)
            {
                var r = 0 | this.words[t];
                e += 977 * r, this.words[t] = 67108863 & e, e = 64 * r + (e / 67108864 | 0);
            }
            return 0 === this.words[this.length - 1] && (--this.length, 0 === this.words[this.length - 1] && --this.length), this;
        }, l.prototype.redIReduce = function ()
        {
            this.isplit(l.tmp).imulK().iadd(l.tmp), this.bitLengthGT256() && this.isplit(l.tmp).imulK().iadd(l.tmp);
            var t = this.ucmp(l.p);
            return 0 === t ? (this.words[0] = 0, this.length = 1) : 0 < t ? this.isub(l.p) : this.strip(), this;
        }, l.prototype.redNeg = function ()
        {
            return this.isZero() ? l.fromNumber(0) : l.p.sub(this);
        }, l.prototype.redAdd = function (t)
        {
            return this.clone().redIAdd(t);
        }, l.prototype.redIAdd = function (t)
        {
            return this.iadd(t), 0 <= this.ucmp(l.p) && this.isub(l.p), this;
        }, l.prototype.redIAdd7 = function ()
        {
            return this.iuaddn(7), 0 <= this.ucmp(l.p) && this.isub(l.p), this;
        }, l.prototype.redSub = function (t)
        {
            return this.clone().redISub(t);
        }, l.prototype.redISub = function (t)
        {
            return this.isub(t), 0 !== this.negative && this.iadd(l.p), this;
        }, l.prototype.redMul = function (t)
        {
            return this.umul(t).redIReduce();
        }, l.prototype.redSqr = function ()
        {
            return this.umul(this).redIReduce();
        }, l.prototype.redSqrt = function ()
        {
            if(this.isZero())
                return this.clone();
            for(var t = this.redSqr(), e = t.redSqr(), r = (t = (e = e.redSqr().redMul(e)).redMul(t)).redMul(this), i = r, n = 0; n < 54; ++n)
                i = i.redSqr().redSqr().redSqr().redSqr().redMul(r);
            for(i = i.redSqr().redSqr().redSqr().redSqr().redMul(t), n = 0; n < 5; ++n)
                i = i.redSqr().redSqr().redSqr().redSqr().redMul(r);
            return 0 === (i = (i = i.redSqr().redSqr().redSqr().redSqr().redMul(e)).redSqr().redSqr().redSqr().redSqr().redSqr().redSqr().redMul(e)).redSqr().ucmp(this) ? i : null;
        }, l.prototype.redInvm = function ()
        {
            for(var t = this.clone(), e = l.p.clone(), r = l.fromNumber(1), i = l.fromNumber(0); t.gtOne() && e.gtOne(); )
            {
                for(var n = 0, s = 1; 0 == (t.words[0] & s) && n < 26; ++n, s <<= 1);
                if(0 < n)
                    for(t.ishrn(n); 0 < n--; )
                        r.isOdd() && r.iadd(l.p), r.ishrn(1);
                for(n = 0, s = 1; 0 == (e.words[0] & s) && n < 26; ++n, s <<= 1);
                if(0 < n)
                    for(e.ishrn(n); 0 < n--; )
                        i.isOdd() && i.iadd(l.p), i.ishrn(1);
                0 <= t.ucmp(e) ? (t.isub(e), r.isub(i)) : (e.isub(t), i.isub(r));
            }
            return 0 !== (t = 1 === t.length && 1 === t.words[0] ? r : i).negative && t.iadd(l.p), 0 !== t.negative ? (t.negative = 0,
            t.redIReduce().redNeg()) : t.redIReduce();
        }, l.prototype.getNAF = function (t)
        {
            var e = [], r = 1 << t + 1, i = r - 1;
            r >>= 1;
            for(var n = this.clone(); !n.isZero(); )
            {
                for(var s = 0, o = 1; 0 == (n.words[0] & o) && s < 26; ++s, o <<= 1)
                    e.push(0);
                if(0 !== s)
                    n.ishrn(s);
                else
                    if(r <= (s = n.words[0] & i))
                        e.push(r - s), n.iuaddn(s - r).ishrn(1);
                    else
                        if(e.push(s), n.words[0] -= s, !n.isZero())
                        {
                            for(s = t - 1; 0 < s; --s)
                                e.push(0);
                            n.ishrn(t);
                        }
            }
            return e;
        }, l.prototype.inspect = function ()
        {
            if(this.isZero())
                return "0";
            for(var t = this.toBuffer().toString("hex"), e = 0; "0" === t[e]; ++e);
            return t.slice(e);
        }, l.n = l.fromBuffer(i.from("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "hex")), l.nh = l.n.clone().ishrn(1),
        l.nc = l.fromBuffer(i.from("000000000000000000000000000000014551231950B75FC4402DA1732FC9BEBF", "hex")), l.p = l.fromBuffer(i.from("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F",
        "hex")), l.psn = l.p.sub(l.n), (l.tmp = new l).words = Array(10), l.fromNumber(1).words[3] = 0, e.exports = l;
    }, {"./optimized":44, "safe-buffer":42}], 44:[function (t,e,r)
    {
        r.umulTo10x10 = function (t,e,r)
        {
            var i = t.words, n = e.words;
            e = r.words;
            var s = (t = 0) | i[0], o = 8191 & s, a = s >>> 13, h = 0 | i[1];
            s = 8191 & h;
            var u = h >>> 13, l = 0 | i[2];
            h = 8191 & l;
            var f = l >>> 13, c = 0 | i[3];
            l = 8191 & c;
            var d = c >>> 13, p = 0 | i[4];
            c = 8191 & p;
            var m = p >>> 13, _ = 0 | i[5];
            p = 8191 & _;
            var g = _ >>> 13, b = 0 | i[6];
            _ = 8191 & b;
            var y = b >>> 13, w = 0 | i[7];
            b = 8191 & w;
            var v = w >>> 13, M = 0 | i[8];
            w = 8191 & M, M >>>= 13;
            var E = 0 | i[9];
            i = 8191 & E, E >>>= 13;
            var S = 0 | n[0], I = 8191 & S, A = S >>> 13, B = 0 | n[1];
            S = 8191 & B;
            var x = B >>> 13, L = 0 | n[2];
            B = 8191 & L;
            var k = L >>> 13, T = 0 | n[3];
            L = 8191 & T;
            var C = T >>> 13, F = 0 | n[4];
            T = 8191 & F;
            var j = F >>> 13, O = 0 | n[5];
            F = 8191 & O;
            var R = O >>> 13, N = 0 | n[6];
            O = 8191 & N;
            var P = N >>> 13, U = 0 | n[7];
            N = 8191 & U;
            var D = U >>> 13, q = 0 | n[8];
            U = 8191 & q;
            var K = q >>> 13, V = 8191 & (n = 0 | n[9]), Y = n >>> 13;
            r.length = 19;
            var z = Math.imul(o, I);
            n = Math.imul(o, A);
            var $ = t + z + ((8191 & (n += Math.imul(a, I))) << 13);
            t = (q = Math.imul(a, A)) + (n >>> 13) + ($ >>> 26), $ &= 67108863, z = Math.imul(s, I), n = Math.imul(s, A), n += Math.imul(u,
            I), q = Math.imul(u, A), z += Math.imul(o, S), n += Math.imul(o, x);
            var W = t + z + ((8191 & (n += Math.imul(a, S))) << 13);
            t = (q += Math.imul(a, x)) + (n >>> 13) + (W >>> 26), W &= 67108863, z = Math.imul(h, I), n = Math.imul(h, A), n += Math.imul(f,
            I), q = Math.imul(f, A), z += Math.imul(s, S), n += Math.imul(s, x), n += Math.imul(u, S), q += Math.imul(u, x), z += Math.imul(o,
            B), n += Math.imul(o, k);
            var Z = t + z + ((8191 & (n += Math.imul(a, B))) << 13);
            t = (q += Math.imul(a, k)) + (n >>> 13) + (Z >>> 26), Z &= 67108863, z = Math.imul(l, I), n = Math.imul(l, A), n += Math.imul(d,
            I), q = Math.imul(d, A), z += Math.imul(h, S), n += Math.imul(h, x), n += Math.imul(f, S), q += Math.imul(f, x), z += Math.imul(s,
            B), n += Math.imul(s, k), n += Math.imul(u, B), q += Math.imul(u, k), z += Math.imul(o, L), n += Math.imul(o, C);
            var G = t + z + ((8191 & (n += Math.imul(a, L))) << 13);
            t = (q += Math.imul(a, C)) + (n >>> 13) + (G >>> 26), G &= 67108863, z = Math.imul(c, I), n = Math.imul(c, A), n += Math.imul(m,
            I), q = Math.imul(m, A), z += Math.imul(l, S), n += Math.imul(l, x), n += Math.imul(d, S), q += Math.imul(d, x), z += Math.imul(h,
            B), n += Math.imul(h, k), n += Math.imul(f, B), q += Math.imul(f, k), z += Math.imul(s, L), n += Math.imul(s, C), n += Math.imul(u,
            L), q += Math.imul(u, C), z += Math.imul(o, T), n += Math.imul(o, j);
            var H = t + z + ((8191 & (n += Math.imul(a, T))) << 13);
            t = (q += Math.imul(a, j)) + (n >>> 13) + (H >>> 26), H &= 67108863, z = Math.imul(p, I), n = Math.imul(p, A), n += Math.imul(g,
            I), q = Math.imul(g, A), z += Math.imul(c, S), n += Math.imul(c, x), n += Math.imul(m, S), q += Math.imul(m, x), z += Math.imul(l,
            B), n += Math.imul(l, k), n += Math.imul(d, B), q += Math.imul(d, k), z += Math.imul(h, L), n += Math.imul(h, C), n += Math.imul(f,
            L), q += Math.imul(f, C), z += Math.imul(s, T), n += Math.imul(s, j), n += Math.imul(u, T), q += Math.imul(u, j), z += Math.imul(o,
            F), n += Math.imul(o, R);
            var J = t + z + ((8191 & (n += Math.imul(a, F))) << 13);
            t = (q += Math.imul(a, R)) + (n >>> 13) + (J >>> 26), J &= 67108863, z = Math.imul(_, I), n = Math.imul(_, A), n += Math.imul(y,
            I), q = Math.imul(y, A), z += Math.imul(p, S), n += Math.imul(p, x), n += Math.imul(g, S), q += Math.imul(g, x), z += Math.imul(c,
            B), n += Math.imul(c, k), n += Math.imul(m, B), q += Math.imul(m, k), z += Math.imul(l, L), n += Math.imul(l, C), n += Math.imul(d,
            L), q += Math.imul(d, C), z += Math.imul(h, T), n += Math.imul(h, j), n += Math.imul(f, T), q += Math.imul(f, j), z += Math.imul(s,
            F), n += Math.imul(s, R), n += Math.imul(u, F), q += Math.imul(u, R), z += Math.imul(o, O), n += Math.imul(o, P);
            var X = t + z + ((8191 & (n += Math.imul(a, O))) << 13);
            t = (q += Math.imul(a, P)) + (n >>> 13) + (X >>> 26), X &= 67108863, z = Math.imul(b, I), n = Math.imul(b, A), n += Math.imul(v,
            I), q = Math.imul(v, A), z += Math.imul(_, S), n += Math.imul(_, x), n += Math.imul(y, S), q += Math.imul(y, x), z += Math.imul(p,
            B), n += Math.imul(p, k), n += Math.imul(g, B), q += Math.imul(g, k), z += Math.imul(c, L), n += Math.imul(c, C), n += Math.imul(m,
            L), q += Math.imul(m, C), z += Math.imul(l, T), n += Math.imul(l, j), n += Math.imul(d, T), q += Math.imul(d, j), z += Math.imul(h,
            F), n += Math.imul(h, R), n += Math.imul(f, F), q += Math.imul(f, R), z += Math.imul(s, O), n += Math.imul(s, P), n += Math.imul(u,
            O), q += Math.imul(u, P), z += Math.imul(o, N), n += Math.imul(o, D);
            var Q = t + z + ((8191 & (n += Math.imul(a, N))) << 13);
            t = (q += Math.imul(a, D)) + (n >>> 13) + (Q >>> 26), Q &= 67108863, z = Math.imul(w, I), n = Math.imul(w, A), n += Math.imul(M,
            I), q = Math.imul(M, A), z += Math.imul(b, S), n += Math.imul(b, x), n += Math.imul(v, S), q += Math.imul(v, x), z += Math.imul(_,
            B), n += Math.imul(_, k), n += Math.imul(y, B), q += Math.imul(y, k), z += Math.imul(p, L), n += Math.imul(p, C), n += Math.imul(g,
            L), q += Math.imul(g, C), z += Math.imul(c, T), n += Math.imul(c, j), n += Math.imul(m, T), q += Math.imul(m, j), z += Math.imul(l,
            F), n += Math.imul(l, R), n += Math.imul(d, F), q += Math.imul(d, R), z += Math.imul(h, O), n += Math.imul(h, P), n += Math.imul(f,
            O), q += Math.imul(f, P), z += Math.imul(s, N), n += Math.imul(s, D), n += Math.imul(u, N), q += Math.imul(u, D), z += Math.imul(o,
            U), n += Math.imul(o, K);
            var tt = t + z + ((8191 & (n += Math.imul(a, U))) << 13);
            return t = (q += Math.imul(a, K)) + (n >>> 13) + (tt >>> 26), tt &= 67108863, z = Math.imul(i, I), n = Math.imul(i, A), n += Math.imul(E,
            I), q = Math.imul(E, A), z += Math.imul(w, S), n += Math.imul(w, x), n += Math.imul(M, S), q += Math.imul(M, x), z += Math.imul(b,
            B), n += Math.imul(b, k), n += Math.imul(v, B), q += Math.imul(v, k), z += Math.imul(_, L), n += Math.imul(_, C), n += Math.imul(y,
            L), q += Math.imul(y, C), z += Math.imul(p, T), n += Math.imul(p, j), n += Math.imul(g, T), q += Math.imul(g, j), z += Math.imul(c,
            F), n += Math.imul(c, R), n += Math.imul(m, F), q += Math.imul(m, R), z += Math.imul(l, O), n += Math.imul(l, P), n += Math.imul(d,
            O), q += Math.imul(d, P), z += Math.imul(h, N), n += Math.imul(h, D), n += Math.imul(f, N), q += Math.imul(f, D), z += Math.imul(s,
            U), n += Math.imul(s, K), n += Math.imul(u, U), q += Math.imul(u, K), z += Math.imul(o, V), n += Math.imul(o, Y), n += Math.imul(a,
            V), t = (q += Math.imul(a, Y)) + (n >>> 13) + ((o = t + z + ((8191 & n) << 13)) >>> 26), o &= 67108863, z = Math.imul(i, S),
            n = Math.imul(i, x), n += Math.imul(E, S), q = Math.imul(E, x), z += Math.imul(w, B), n += Math.imul(w, k), n += Math.imul(M,
            B), q += Math.imul(M, k), z += Math.imul(b, L), n += Math.imul(b, C), n += Math.imul(v, L), q += Math.imul(v, C), z += Math.imul(_,
            T), n += Math.imul(_, j), n += Math.imul(y, T), q += Math.imul(y, j), z += Math.imul(p, F), n += Math.imul(p, R), n += Math.imul(g,
            F), q += Math.imul(g, R), z += Math.imul(c, O), n += Math.imul(c, P), n += Math.imul(m, O), q += Math.imul(m, P), z += Math.imul(l,
            N), n += Math.imul(l, D), n += Math.imul(d, N), q += Math.imul(d, D), z += Math.imul(h, U), n += Math.imul(h, K), n += Math.imul(f,
            U), q += Math.imul(f, K), z += Math.imul(s, V), n += Math.imul(s, Y), n += Math.imul(u, V), t = (q += Math.imul(u, Y)) + (n >>> 13) + ((s = t + z + ((8191 & n) << 13)) >>> 26),
            s &= 67108863, z = Math.imul(i, B), n = Math.imul(i, k), n += Math.imul(E, B), q = Math.imul(E, k), z += Math.imul(w, L), n += Math.imul(w,
            C), n += Math.imul(M, L), q += Math.imul(M, C), z += Math.imul(b, T), n += Math.imul(b, j), n += Math.imul(v, T), q += Math.imul(v,
            j), z += Math.imul(_, F), n += Math.imul(_, R), n += Math.imul(y, F), q += Math.imul(y, R), z += Math.imul(p, O), n += Math.imul(p,
            P), n += Math.imul(g, O), q += Math.imul(g, P), z += Math.imul(c, N), n += Math.imul(c, D), n += Math.imul(m, N), q += Math.imul(m,
            D), z += Math.imul(l, U), n += Math.imul(l, K), n += Math.imul(d, U), q += Math.imul(d, K), z += Math.imul(h, V), n += Math.imul(h,
            Y), n += Math.imul(f, V), t = (q += Math.imul(f, Y)) + (n >>> 13) + ((h = t + z + ((8191 & n) << 13)) >>> 26), h &= 67108863,
            z = Math.imul(i, L), n = Math.imul(i, C), n += Math.imul(E, L), q = Math.imul(E, C), z += Math.imul(w, T), n += Math.imul(w,
            j), n += Math.imul(M, T), q += Math.imul(M, j), z += Math.imul(b, F), n += Math.imul(b, R), n += Math.imul(v, F), q += Math.imul(v,
            R), z += Math.imul(_, O), n += Math.imul(_, P), n += Math.imul(y, O), q += Math.imul(y, P), z += Math.imul(p, N), n += Math.imul(p,
            D), n += Math.imul(g, N), q += Math.imul(g, D), z += Math.imul(c, U), n += Math.imul(c, K), n += Math.imul(m, U), q += Math.imul(m,
            K), z += Math.imul(l, V), n += Math.imul(l, Y), n += Math.imul(d, V), t = (q += Math.imul(d, Y)) + (n >>> 13) + ((l = t + z + ((8191 & n) << 13)) >>> 26),
            l &= 67108863, z = Math.imul(i, T), n = Math.imul(i, j), n += Math.imul(E, T), q = Math.imul(E, j), z += Math.imul(w, F), n += Math.imul(w,
            R), n += Math.imul(M, F), q += Math.imul(M, R), z += Math.imul(b, O), n += Math.imul(b, P), n += Math.imul(v, O), q += Math.imul(v,
            P), z += Math.imul(_, N), n += Math.imul(_, D), n += Math.imul(y, N), q += Math.imul(y, D), z += Math.imul(p, U), n += Math.imul(p,
            K), n += Math.imul(g, U), q += Math.imul(g, K), z += Math.imul(c, V), n += Math.imul(c, Y), n += Math.imul(m, V), t = (q += Math.imul(m,
            Y)) + (n >>> 13) + ((c = t + z + ((8191 & n) << 13)) >>> 26), c &= 67108863, z = Math.imul(i, F), n = Math.imul(i, R), n += Math.imul(E,
            F), q = Math.imul(E, R), z += Math.imul(w, O), n += Math.imul(w, P), n += Math.imul(M, O), q += Math.imul(M, P), z += Math.imul(b,
            N), n += Math.imul(b, D), n += Math.imul(v, N), q += Math.imul(v, D), z += Math.imul(_, U), n += Math.imul(_, K), n += Math.imul(y,
            U), q += Math.imul(y, K), z += Math.imul(p, V), n += Math.imul(p, Y), n += Math.imul(g, V), t = (q += Math.imul(g, Y)) + (n >>> 13) + ((p = t + z + ((8191 & n) << 13)) >>> 26),
            p &= 67108863, z = Math.imul(i, O), n = Math.imul(i, P), n += Math.imul(E, O), q = Math.imul(E, P), z += Math.imul(w, N), n += Math.imul(w,
            D), n += Math.imul(M, N), q += Math.imul(M, D), z += Math.imul(b, U), n += Math.imul(b, K), n += Math.imul(v, U), q += Math.imul(v,
            K), z += Math.imul(_, V), n += Math.imul(_, Y), n += Math.imul(y, V), t = (q += Math.imul(y, Y)) + (n >>> 13) + ((_ = t + z + ((8191 & n) << 13)) >>> 26),
            _ &= 67108863, z = Math.imul(i, N), n = Math.imul(i, D), n += Math.imul(E, N), q = Math.imul(E, D), z += Math.imul(w, U), n += Math.imul(w,
            K), n += Math.imul(M, U), q += Math.imul(M, K), z += Math.imul(b, V), n += Math.imul(b, Y), n += Math.imul(v, V), t = (q += Math.imul(v,
            Y)) + (n >>> 13) + ((b = t + z + ((8191 & n) << 13)) >>> 26), b &= 67108863, z = Math.imul(i, U), n = Math.imul(i, K), n += Math.imul(E,
            U), q = Math.imul(E, K), z += Math.imul(w, V), n += Math.imul(w, Y), n += Math.imul(M, V), t = (q += Math.imul(M, Y)) + (n >>> 13) + ((w = t + z + ((8191 & n) << 13)) >>> 26),
            w &= 67108863, z = Math.imul(i, V), n = Math.imul(i, Y), n += Math.imul(E, V), t = (q = Math.imul(E, Y)) + (n >>> 13) + ((a = t + z + ((8191 & n) << 13)) >>> 26),
            e[0] = $, e[1] = W, e[2] = Z, e[3] = G, e[4] = H, e[5] = J, e[6] = X, e[7] = Q, e[8] = tt, e[9] = o, e[10] = s, e[11] = h,
            e[12] = l, e[13] = c, e[14] = p, e[15] = _, e[16] = b, e[17] = w, e[18] = 67108863 & a, 0 !== t && (e[19] = t, r.length++),
            r;
        };
    }, {}], 45:[function (t,e,r)
    {
        
function a(t,e,r)
        {
            this.z = null === t && null === e && null === r ? (this.y = this.x = a.one, a.zero) : (this.x = t, this.y = e, r), this.zOne = this.z === a.one;
        };
        t = t("./bn"), a.zero = t.fromNumber(0), a.one = t.fromNumber(1), a.prototype.neg = function ()
        {
            return this.inf ? this : new a(this.x, this.y.redNeg(), this.z);
        }, a.prototype.add = function (t)
        {
            if(this.inf)
                return t;
            if(t.inf)
                return this;
            var e = t.z.redSqr(), r = this.z.redSqr(), i = this.x.redMul(e), n = t.x.redMul(r);
            if(e = this.y.redMul(e).redMul(t.z), r = t.y.redMul(r).redMul(this.z), n = i.redSub(n), r = e.redSub(r), n.isZero())
                return r.isZero() ? this.dbl() : new a(null, null, null);
            var s = n.redSqr(), o = i.redMul(s);
            return s = s.redMul(n), new a(i = r.redSqr().redIAdd(s).redISub(o).redISub(o), e = r.redMul(o.redISub(i)).redISub(e.redMul(s)),
            t = this.z.redMul(t.z).redMul(n));
        }, a.prototype.mixedAdd = function (t)
        {
            if(this.inf)
                return t.toECJPoint();
            if(t.inf)
                return this;
            var e = this.z.redSqr(), r = this.x, i = t.x.redMul(e), n = this.y;
            if(t = t.y.redMul(e).redMul(this.z), i = r.redSub(i), t = n.redSub(t), i.isZero())
                return t.isZero() ? this.dbl() : new a(null, null, null);
            var s = i.redSqr();
            return e = r.redMul(s), s = s.redMul(i), new a(r = t.redSqr().redIAdd(s).redISub(e).redISub(e), n = t.redMul(e.redISub(r)).redISub(n.redMul(s)),
            i = this.z.redMul(i));
        }, a.prototype.dbl = function ()
        {
            if(this.inf)
                return this;
            if(this.zOne)
            {
                var t = this.x.redSqr(), e = this.y.redSqr(), r = e.redSqr();
                e = (e = this.x.redAdd(e).redSqr().redISub(t).redISub(r)).redIAdd(e);
                var i = (t = t.redAdd(t).redIAdd(t)).redSqr().redISub(e).redISub(e), n = r.redIAdd(r).redIAdd(r).redIAdd(r);
                r = i, e = t.redMul(e.redISub(i)).redISub(n), t = this.y.redAdd(this.y);
            }
            else
                t = this.x.redSqr(), r = (e = this.y.redSqr()).redSqr(), e = (e = this.x.redAdd(e).redSqr().redISub(t).redISub(r)).redIAdd(e),
                i = (t = t.redAdd(t).redIAdd(t)).redSqr(), n = r.redIAdd(r).redIAdd(r).redIAdd(r), r = i.redISub(e).redISub(e), e = t.redMul(e.redISub(r)).redISub(n),
                t = (t = this.y.redMul(this.z)).redIAdd(t);
            return new a(r, e, t);
        }, a.prototype.dblp = function (t)
        {
            if(0 === t || this.inf)
                return this;
            for(var e = this, r = 0; r < t; r++)
                e = e.dbl();
            return e;
        }, Object.defineProperty(a.prototype, "inf", {enumerable:!0, get:function ()
            {
                return this.z.isZero();
            }}), e.exports = a;
    }, {"./bn":43}], 46:[function (t,e,r)
    {
        
function s(t,e)
        {
            this.inf = null === t && null === e ? (this.x = this.y = null, !0) : (this.x = t, this.y = e, !1);
        };
        var i = t("safe-buffer").Buffer, n = t("./bn"), o = t("./ecjpoint");
        s.fromPublicKey = function (t)
        {
            var e = t[0];
            if(33 !== t.length || 2 !== e && 3 !== e)
                return 65 !== t.length || 4 !== e && 6 !== e && 7 !== e ? null : (r = n.fromBuffer(t.slice(1, 33)), t = n.fromBuffer(t.slice(33,
                65)), 0 <= r.ucmp(n.p) || 0 <= t.ucmp(n.p) || (6 === e || 7 === e) && t.isOdd() !== (7 === e) || 0 !== r.redSqr().redMul(r).redIAdd7().ucmp(t.redSqr()) ? null : new s(r,
                t));
            var r = n.fromBuffer(t.slice(1, 33));
            return 0 <= r.ucmp(n.p) ? null : null === (t = r.redSqr().redMul(r).redIAdd7().redSqrt()) ? null : (3 === e !== t.isOdd() && (t = t.redNeg()),
            new s(r, t));
        }, s.prototype.toPublicKey = function (t)
        {
            var e = this.x, r = this.y;
            return t ? ((t = i.alloc(33))[0] = r.isOdd() ? 3 : 2, e.toBuffer().copy(t, 1)) : ((t = i.alloc(65))[0] = 4, e.toBuffer().copy(t,
            1), r.toBuffer().copy(t, 33)), t;
        }, s.fromECJPoint = function (t)
        {
            if(t.inf)
                return new s(null, null);
            var e = t.z.redInvm(), r = e.redSqr();
            return new s(t.x.redMul(r), t = t.y.redMul(r).redMul(e));
        }, s.prototype.toECJPoint = function ()
        {
            return this.inf ? new o(null, null, null) : new o(this.x, this.y, o.one);
        }, s.prototype.neg = function ()
        {
            return this.inf ? this : new s(this.x, this.y.redNeg());
        }, s.prototype.add = function (t)
        {
            if(this.inf)
                return t;
            if(t.inf)
                return this;
            if(0 === this.x.ucmp(t.x))
                return 0 === this.y.ucmp(t.y) ? this.dbl() : new s(null, null);
            var e = this.y.redSub(t.y);
            return e.isZero() || (e = e.redMul(this.x.redSub(t.x).redInvm())), new s(t = e.redSqr().redISub(this.x).redISub(t.x), e = e.redMul(this.x.redSub(t)).redISub(this.y));
        }, s.prototype.dbl = function ()
        {
            if(this.inf)
                return this;
            var t = this.y.redAdd(this.y);
            if(t.isZero())
                return new s(null, null);
            var e = this.x.redSqr();
            return new s(t = (e = e.redAdd(e).redIAdd(e).redMul(t.redInvm())).redSqr().redISub(this.x.redAdd(this.x)), e = e.redMul(this.x.redSub(t)).redISub(this.y));
        }, s.prototype.mul = function (t)
        {
            var e = this._getNAFPoints(4), r = e.points;
            t = t.getNAF(e.wnd), e = new o(null, null, null);
            for(var i = t.length - 1; 0 <= i; i--)
            {
                for(var n = 0; 0 <= i && 0 === t[i]; i--, ++n);
                if(0 <= i && (n += 1), e = e.dblp(n), i < 0)
                    break;
                e = 0 < (n = t[i]) ? e.mixedAdd(r[n - 1 >> 1]) : e.mixedAdd(r[ - n - 1 >> 1].neg());
            }
            return s.fromECJPoint(e);
        }, s.prototype._getNAFPoints1 = function ()
        {
            return {wnd:1, points:[this]};
        }, s.prototype._getNAFPoints = function (t)
        {
            for(var e = Array((1 << t) - 1), r = (e[0] = this).dbl(), i = 1; i < e.length; ++i)
                e[i] = e[i - 1].add(r);
            return {wnd:t, points:e};
        }, e.exports = s;
    }, {"./bn":43, "./ecjpoint":45, "safe-buffer":42}], 47:[function (t,e,r)
    {
        
function i()
        {
            this.x = s.fromBuffer(n.from("79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "hex")), this.y = s.fromBuffer(n.from("483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",
            "hex")), this.inf = !1, this._precompute();
        };
        var n = t("safe-buffer").Buffer, s = t("./bn"), u = t("./ecpoint"), l = t("./ecjpoint");
        i.prototype._precompute = function ()
        {
            for(var t = new u(this.x, this.y), e = Array(66), r = e[0] = t, i = 1; i < e.length; ++i)
            {
                for(var n = 0; n < 4; n++)
                    r = r.dbl();
                e[i] = r;
            }
            this.precomputed = {naf:t._getNAFPoints(7), doubles:{step:4, points:e, negpoints:e.map(function (t)
                    {
                        return t.neg();
                    })}};
        }, i.prototype.mul = function (t)
        {
            var e = this.precomputed.doubles.step, r = this.precomputed.doubles.points, i = this.precomputed.doubles.negpoints, n = t.getNAF(1),
            s = ((1 << e + 1) - (0 == e % 2 ? 2 : 1)) / 3;
            t = [];
            for(var o = 0; o < n.length; o += e)
            {
                for(var a = 0, h = o + e - 1; o <= h; h--)
                    a = (a << 1) + n[h];
                t.push(a);
            }
            for(e = new l(null, null, null), n = new l(null, null, null); 0 < s; s--)
            {
                for(o = 0; o < t.length; o++)
                    t[o] === s ? n = n.mixedAdd(r[o]) : t[o] ===  - s && (n = n.mixedAdd(i[o]));
                e = e.add(n);
            }
            return u.fromECJPoint(e);
        }, i.prototype.mulAdd = function (t,e,r)
        {
            var i = this.precomputed.naf, n = e._getNAFPoints1();
            for(e = [i.points, n.points], t = [t.getNAF(i.wnd), r.getNAF(n.wnd)], r = new l(null, null, null), i = [null, null], n = Math.max(t[0].length,
            t[1].length); 0 <= n; n--)
            {
                for(var s = 0; 0 <= n && (i[0] = 0 | t[0][n], i[1] = 0 | t[1][n], 0 === i[0] && 0 === i[1]); ++s, --n);
                if(0 <= n && (s += 1), r = r.dblp(s), n < 0)
                    break;
                for(s = 0; s < 2; s++)
                {
                    var o, a = i[s];
                    0 !== a && (0 < a ? o = e[s][a >> 1] : a < 0 && (o = e[s][ - a >> 1].neg()), r = void 0 === o.z ? r.mixedAdd(o) : r.add(o));
                }
            }
            return r;
        }, e.exports = new i;
    }, {"./bn":43, "./ecjpoint":45, "./ecpoint":46, "safe-buffer":42}], 48:[function (t,e,i)
    {
        var f = t("safe-buffer").Buffer, n = t("create-hash"), c = t("drbg.js/hmac"), d = t("../messages.json"), p = t("./bn"), o = t("./ecpoint"),
        m = t("./ecpointg");
        i.privateKeyVerify = function (t)
        {
            return !((t = p.fromBuffer(t)).isOverflow() || t.isZero());
        }, i.privateKeyExport = function (t,e)
        {
            var r = p.fromBuffer(t);
            if(r.isOverflow() || r.isZero())
                throw Error(d.EC_PRIVATE_KEY_EXPORT_DER_FAIL);
            return m.mul(r).toPublicKey(e);
        }, i.privateKeyNegate = function (t)
        {
            return (t = p.fromBuffer(t)).isZero() ? f.alloc(32) : (0 < t.ucmp(p.n) && t.isub(p.n), p.n.sub(t).toBuffer());
        }, i.privateKeyModInverse = function (t)
        {
            if((t = p.fromBuffer(t)).isOverflow() || t.isZero())
                throw Error(d.EC_PRIVATE_KEY_RANGE_INVALID);
            return t.uinvm().toBuffer();
        }, i.privateKeyTweakAdd = function (t,e)
        {
            var r = p.fromBuffer(e);
            if(r.isOverflow())
                throw Error(d.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);
            if(r.iadd(p.fromBuffer(t)), r.isOverflow() && r.isub(p.n), r.isZero())
                throw Error(d.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);
            return r.toBuffer();
        }, i.privateKeyTweakMul = function (t,e)
        {
            var r = p.fromBuffer(e);
            if(r.isOverflow() || r.isZero())
                throw Error(d.EC_PRIVATE_KEY_TWEAK_MUL_FAIL);
            var i = p.fromBuffer(t);
            return r.umul(i).ureduce().toBuffer();
        }, i.publicKeyCreate = function (t,e)
        {
            var r = p.fromBuffer(t);
            if(r.isOverflow() || r.isZero())
                throw Error(d.EC_PUBLIC_KEY_CREATE_FAIL);
            return m.mul(r).toPublicKey(e);
        }, i.publicKeyConvert = function (t,e)
        {
            var r = o.fromPublicKey(t);
            if(null === r)
                throw Error(d.EC_PUBLIC_KEY_PARSE_FAIL);
            return r.toPublicKey(e);
        }, i.publicKeyVerify = function (t)
        {
            return null !== o.fromPublicKey(t);
        }, i.publicKeyTweakAdd = function (t,e,r)
        {
            if(null === (t = o.fromPublicKey(t)))
                throw Error(d.EC_PUBLIC_KEY_PARSE_FAIL);
            if((e = p.fromBuffer(e)).isOverflow())
                throw Error(d.EC_PUBLIC_KEY_TWEAK_ADD_FAIL);
            return m.mul(e).add(t).toPublicKey(r);
        }, i.publicKeyTweakMul = function (t,e,r)
        {
            if(null === (t = o.fromPublicKey(t)))
                throw Error(d.EC_PUBLIC_KEY_PARSE_FAIL);
            if((e = p.fromBuffer(e)).isOverflow() || e.isZero())
                throw Error(d.EC_PUBLIC_KEY_TWEAK_MUL_FAIL);
            return t.mul(e).toPublicKey(r);
        }, i.publicKeyCombine = function (t,e)
        {
            for(var r = Array(t.length), i = 0; i < t.length; ++i)
                if(r[i] = o.fromPublicKey(t[i]), null === r[i])
                    throw Error(d.EC_PUBLIC_KEY_PARSE_FAIL);
            i = r[0];
            for(var n = 1; n < r.length; ++n)
                i = i.add(r[n]);
            if(i.inf)
                throw Error(d.EC_PUBLIC_KEY_COMBINE_FAIL);
            return i.toPublicKey(e);
        }, i.signatureNormalize = function (t)
        {
            var e = p.fromBuffer(t.slice(0, 32)), r = p.fromBuffer(t.slice(32, 64));
            if(e.isOverflow() || r.isOverflow())
                throw Error(d.ECDSA_SIGNATURE_PARSE_FAIL);
            return t = f.from(t), r.isHigh() && p.n.sub(r).toBuffer().copy(t, 32), t;
        }, i.signatureExport = function (t)
        {
            var e = t.slice(0, 32);
            if(t = t.slice(32, 64), p.fromBuffer(e).isOverflow() || p.fromBuffer(t).isOverflow())
                throw Error(d.ECDSA_SIGNATURE_PARSE_FAIL);
            return {r:e, s:t};
        }, i.signatureImport = function (t)
        {
            var e = p.fromBuffer(t.r);
            return e.isOverflow() && (e = p.fromNumber(0)), (t = p.fromBuffer(t.s)).isOverflow() && (t = p.fromNumber(0)), f.concat([e.toBuffer(),
            t.toBuffer()]);
        }, i.sign = function (t,e,r,i)
        {
            var n = p.fromBuffer(e);
            if(n.isOverflow() || n.isZero())
                throw Error(d.ECDSA_SIGN_FAIL);
            if(null === r)
            {
                var s = new c("sha256", e, t, i);
                r = function ()
                {
                    return s.generate(32);
                };
            }
            for(var o = p.fromBuffer(t), a = 0; ; ++a)
            {
                var h = r(t, e, null, i, a);
                if(!f.isBuffer(h) || 32 !== h.length)
                    throw Error(d.ECDSA_SIGN_FAIL);
                var u = p.fromBuffer(h);
                if(!u.isOverflow() && !u.isZero())
                {
                    var l = m.mul(u);
                    if(!(h = l.x.fireduce()).isZero() && !(u = u.uinvm().umul(h.umul(n).ureduce().iadd(o).fireduce()).ureduce()).isZero())
                        return t = (0 !== l.x.ucmp(h) ? 2 : 0) | (l.y.isOdd() ? 1 : 0), u.isHigh() && (u = p.n.sub(u), t ^= 1), {signature:f.concat([h.toBuffer(),
                            u.toBuffer()]), recovery:t};
                }
            }
        }, i.verify = function (t,e,r)
        {
            var i = p.fromBuffer(e.slice(0, 32));
            if(e = p.fromBuffer(e.slice(32, 64)), i.isOverflow() || e.isOverflow())
                throw Error(d.ECDSA_SIGNATURE_PARSE_FAIL);
            if(e.isHigh() || i.isZero() || e.isZero())
                return !1;
            if(null === (r = o.fromPublicKey(r)))
                throw Error(d.EC_PUBLIC_KEY_PARSE_FAIL);
            return t = (e = e.uinvm()).umul(p.fromBuffer(t)).ureduce(), e = e.umul(i).ureduce(), !(t = m.mulAdd(t, r, e)).inf && (r = t.z.redSqr(),
            0 === i.redMul(r).ucmp(t.x) || !(0 <= i.ucmp(p.psn)) && 0 === i.iadd(p.psn).redMul(r).ucmp(t.x));
        }, i.recover = function (t,e,r,i)
        {
            var n = p.fromBuffer(e.slice(0, 32));
            if(e = p.fromBuffer(e.slice(32, 64)), n.isOverflow() || e.isOverflow())
                throw Error(d.ECDSA_SIGNATURE_PARSE_FAIL);
            do
            {
                if(!n.isZero() && !e.isZero())
                {
                    var s = n;
                    if(r >> 1)
                    {
                        if(0 <= s.ucmp(p.psn))
                            break;
                        s = n.add(p.n);
                    }
                    if(s = f.concat([f.from([2 + (1 & r)]), s.toBuffer()]), null !== (s = o.fromPublicKey(s)))
                        return r = n.uinvm(), t = p.n.sub(p.fromBuffer(t)).umul(r).ureduce(), e = e.umul(r).ureduce(), o.fromECJPoint(m.mulAdd(t, s,
                        e)).toPublicKey(i);
                }
            }
            while(0);
            throw Error(d.ECDSA_RECOVER_FAIL);
        }, i.ecdh = function (t,e)
        {
            var r = i.ecdhUnsafe(t, e, !0);
            return n("sha256").update(r).digest();
        }, i.ecdhUnsafe = function (t,e,r)
        {
            if(null === (t = o.fromPublicKey(t)))
                throw Error(d.EC_PUBLIC_KEY_PARSE_FAIL);
            if((e = p.fromBuffer(e)).isOverflow() || e.isZero())
                throw Error(d.ECDH_FAIL);
            return t.mul(e).toPublicKey(r);
        };
    }, {"../messages.json":49, "./bn":43, "./ecpoint":46, "./ecpointg":47, "create-hash":32, "drbg.js/hmac":36, "safe-buffer":42}],
    49:[function (t,e,r)
    {
        e.exports = {COMPRESSED_TYPE_INVALID:"compressed should be a boolean", EC_PRIVATE_KEY_TYPE_INVALID:"private key should be a Buffer",
            EC_PRIVATE_KEY_LENGTH_INVALID:"private key length is invalid", EC_PRIVATE_KEY_RANGE_INVALID:"private key range is invalid",
            EC_PRIVATE_KEY_TWEAK_ADD_FAIL:"tweak out of range or resulting private key is invalid", EC_PRIVATE_KEY_TWEAK_MUL_FAIL:"tweak out of range",
            EC_PRIVATE_KEY_EXPORT_DER_FAIL:"couldn't export to DER format", EC_PRIVATE_KEY_IMPORT_DER_FAIL:"couldn't import from DER format",
            EC_PUBLIC_KEYS_TYPE_INVALID:"public keys should be an Array", EC_PUBLIC_KEYS_LENGTH_INVALID:"public keys Array should have at least 1 element",
            EC_PUBLIC_KEY_TYPE_INVALID:"public key should be a Buffer", EC_PUBLIC_KEY_LENGTH_INVALID:"public key length is invalid", EC_PUBLIC_KEY_PARSE_FAIL:"the public key could not be parsed or is invalid",
            EC_PUBLIC_KEY_CREATE_FAIL:"private was invalid, try again", EC_PUBLIC_KEY_TWEAK_ADD_FAIL:"tweak out of range or resulting public key is invalid",
            EC_PUBLIC_KEY_TWEAK_MUL_FAIL:"tweak out of range", EC_PUBLIC_KEY_COMBINE_FAIL:"the sum of the public keys is not valid", ECDH_FAIL:"scalar was invalid (zero or overflow)",
            ECDSA_SIGNATURE_TYPE_INVALID:"signature should be a Buffer", ECDSA_SIGNATURE_LENGTH_INVALID:"signature length is invalid",
            ECDSA_SIGNATURE_PARSE_FAIL:"couldn't parse signature", ECDSA_SIGNATURE_PARSE_DER_FAIL:"couldn't parse DER signature", ECDSA_SIGNATURE_SERIALIZE_DER_FAIL:"couldn't serialize signature to DER format",
            ECDSA_SIGN_FAIL:"nonce generation function failed or private key is invalid", ECDSA_RECOVER_FAIL:"couldn't recover public key from signature",
            MSG32_TYPE_INVALID:"message should be a Buffer", MSG32_LENGTH_INVALID:"message length is invalid", OPTIONS_TYPE_INVALID:"options should be an Object",
            OPTIONS_DATA_TYPE_INVALID:"options.data should be a Buffer", OPTIONS_DATA_LENGTH_INVALID:"options.data length is invalid",
            OPTIONS_NONCEFN_TYPE_INVALID:"options.noncefn should be a Function", RECOVERY_ID_TYPE_INVALID:"recovery should be a Number",
            RECOVERY_ID_VALUE_INVALID:"recovery should have value between -1 and 4", TWEAK_TYPE_INVALID:"tweak should be a Buffer", TWEAK_LENGTH_INVALID:"tweak length is invalid"};
    }, {}], 50:[function (t,e,r)
    {
        
function i(t,e)
        {
            this._block = l.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0;
        };
        var l = t("safe-buffer").Buffer;
        i.prototype.update = function (t,e)
        {
            "string" == typeof t && (t = l.from(t, e || "utf8"));
            for(var r = this._block, i = this._blockSize, n = t.length, s = this._len, o = 0; o < n; )
            {
                for(var a = s % i, h = Math.min(n - o, i - a), u = 0; u < h; u++)
                    r[a + u] = t[o + u];
                o += h, 0 == (s += h) % i && this._update(r);
            }
            return this._len += n, this;
        }, i.prototype.digest = function (t)
        {
            var e = this._len % this._blockSize;
            if(this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this._block), this._block.fill(0)),
            (e = 8 * this._len) <= 4294967295)
                this._block.writeUInt32BE(e, this._blockSize - 4);
            else
            {
                var r = (4294967295 & e) >>> 0;
                this._block.writeUInt32BE((e - r) / 4294967296, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4);
            }
            return this._update(this._block), e = this._hash(), t ? e.toString(t) : e;
        }, i.prototype._update = function ()
        {
            throw Error("_update must be implemented by subclass");
        }, e.exports = i;
    }, {"safe-buffer":42}], 51:[function (t,e,r)
    {
        (r = e.exports = function (t)
        {
            t = t.toLowerCase();
            var e = r[t];
            if(!e)
                throw Error(t + " is not supported (we accept pull requests)");
            return new e;
        }).sha = t("./sha"), r.sha1 = t("./sha1"), r.sha224 = t("./sha224"), r.sha256 = t("./sha256"), r.sha384 = t("./sha384"), r.sha512 = t("./sha512");
    }, {"./sha":52, "./sha1":53, "./sha224":54, "./sha256":55, "./sha384":56, "./sha512":57}], 52:[function (t,e,r)
    {
        
function i()
        {
            this.init(), this._w = o, n.call(this, 64, 56);
        };
        r = t("inherits");
        var n = t("./hash"), s = t("safe-buffer").Buffer, h = [1518500249, 1859775393,  - 1894007588,  - 899497514], o = Array(80);
        r(i, n), i.prototype.init = function ()
        {
            return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
        }, i.prototype._update = function (t)
        {
            for(var e = this._w, r = 0 | this._a, i = 0 | this._b, n = 0 | this._c, s = 0 | this._d, o = 0 | this._e, a = 0; a < 16; ++a)
                e[a] = t.readInt32BE(4 * a);
            for(; a < 80; ++a)
                e[a] = e[a - 3] ^ e[a - 8] ^ e[a - 14] ^ e[a - 16];
            for(t = 0; t < 80; ++t)
            {
                a = (r << 5 | r >>> 27) + (0 === (a = ~~(t / 20)) ? i & n | ~i & s : 2 === a ? i & n | i & s | n & s : i ^ n ^ s) + o + e[t] + h[a] | 0,
                o = s, s = n, n = i << 30 | i >>> 2, i = r, r = a;
            }
            this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = n + this._c | 0, this._d = s + this._d | 0, this._e = o + this._e | 0;
        }, i.prototype._hash = function ()
        {
            var t = s.allocUnsafe(20);
            return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d,
            12), t.writeInt32BE(0 | this._e, 16), t;
        }, e.exports = i;
    }, {"./hash":50, inherits:39, "safe-buffer":42}], 53:[function (t,e,r)
    {
        
function i()
        {
            this.init(), this._w = o, n.call(this, 64, 56);
        };
        r = t("inherits");
        var n = t("./hash"), s = t("safe-buffer").Buffer, h = [1518500249, 1859775393,  - 1894007588,  - 899497514], o = Array(80);
        r(i, n), i.prototype.init = function ()
        {
            return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
        }, i.prototype._update = function (t)
        {
            for(var e = this._w, r = 0 | this._a, i = 0 | this._b, n = 0 | this._c, s = 0 | this._d, o = 0 | this._e, a = 0; a < 16; ++a)
                e[a] = t.readInt32BE(4 * a);
            for(; a < 80; ++a)
                t = e[a - 3] ^ e[a - 8] ^ e[a - 14] ^ e[a - 16], e[a] = t << 1 | t >>> 31;
            for(a = 0; a < 80; ++a)
            {
                t = (r << 5 | r >>> 27) + (0 === (t = ~~(a / 20)) ? i & n | ~i & s : 2 === t ? i & n | i & s | n & s : i ^ n ^ s) + o + e[a] + h[t] | 0,
                o = s, s = n, n = i << 30 | i >>> 2, i = r, r = t;
            }
            this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = n + this._c | 0, this._d = s + this._d | 0, this._e = o + this._e | 0;
        }, i.prototype._hash = function ()
        {
            var t = s.allocUnsafe(20);
            return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d,
            12), t.writeInt32BE(0 | this._e, 16), t;
        }, e.exports = i;
    }, {"./hash":50, inherits:39, "safe-buffer":42}], 54:[function (t,e,r)
    {
        
function i()
        {
            this.init(), this._w = a, s.call(this, 64, 56);
        };
        r = t("inherits");
        var n = t("./sha256"), s = t("./hash"), o = t("safe-buffer").Buffer, a = Array(64);
        r(i, n), i.prototype.init = function ()
        {
            return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025,
            this._g = 1694076839, this._h = 3204075428, this;
        }, i.prototype._hash = function ()
        {
            var t = o.allocUnsafe(28);
            return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e,
            16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t;
        }, e.exports = i;
    }, {"./hash":50, "./sha256":55, inherits:39, "safe-buffer":42}], 55:[function (t,e,r)
    {
        
function i()
        {
            this.init(), this._w = o, n.call(this, 64, 56);
        };
        r = t("inherits");
        var n = t("./hash"), s = t("safe-buffer").Buffer, c = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
        4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
        3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
        2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
        659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
        2756734187, 3204031479, 3329325298], o = Array(64);
        r(i, n), i.prototype.init = function ()
        {
            return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924,
            this._g = 528734635, this._h = 1541459225, this;
        }, i.prototype._update = function (t)
        {
            for(var e = this._w, r = 0 | this._a, i = 0 | this._b, n = 0 | this._c, s = 0 | this._d, o = 0 | this._e, a = 0 | this._f,
            h = 0 | this._g, u = 0 | this._h, l = 0; l < 16; ++l)
                e[l] = t.readInt32BE(4 * l);
            for(; l < 64; ++l)
            {
                t = e[l - 2];
                var f = e[l - 15];
                e[l] = ((t >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10) + e[l - 7] + ((f >>> 7 | f << 25) ^ (f >>> 18 | f << 14) ^ f >>> 3) + e[l - 16] | 0;
            }
            for(l = 0; l < 64; ++l)
                t = u + ((o >>> 6 | o << 26) ^ (o >>> 11 | o << 21) ^ (o >>> 25 | o << 7)) + (h ^ o & (a ^ h)) + c[l] + e[l] | 0, f = ((r >>> 2 | r << 30) ^ (r >>> 13 | r << 19) ^ (r >>> 22 | r << 10)) + (r & i | n & (r | i)) | 0,
                u = h, h = a, a = o, o = s + t | 0, s = n, n = i, i = r, r = t + f | 0;
            this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = n + this._c | 0, this._d = s + this._d | 0, this._e = o + this._e | 0,
            this._f = a + this._f | 0, this._g = h + this._g | 0, this._h = u + this._h | 0;
        }, i.prototype._hash = function ()
        {
            var t = s.allocUnsafe(32);
            return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e,
            16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t;
        }, e.exports = i;
    }, {"./hash":50, inherits:39, "safe-buffer":42}], 56:[function (t,e,r)
    {
        
function i()
        {
            this.init(), this._w = a, s.call(this, 128, 112);
        };
        r = t("inherits");
        var n = t("./sha512"), s = t("./hash"), o = t("safe-buffer").Buffer, a = Array(160);
        r(i, n), i.prototype.init = function ()
        {
            return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231,
            this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697,
            this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this;
        }, i.prototype._hash = function ()
        {
            
function t(t,e,r)
            {
                i.writeInt32BE(t, r), i.writeInt32BE(e, r + 4);
            };
            var i = o.allocUnsafe(48);
            return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh,
            this._el, 32), t(this._fh, this._fl, 40), i;
        }, e.exports = i;
    }, {"./hash":50, "./sha512":57, inherits:39, "safe-buffer":42}], 57:[function (t,e,r)
    {
        
function i()
        {
            this.init(), this._w = o, n.call(this, 128, 112);
        };
        
function k(t,e)
        {
            return t >>> 0 < e >>> 0 ? 1 : 0;
        };
        r = t("inherits");
        var n = t("./hash"), s = t("safe-buffer").Buffer, T = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
        3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080,
        2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113,
        2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628,
        2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339,
        2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993,
        3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
        1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411,
        3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594,
        275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571,
        3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928,
        2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298,
        3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
        174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298,
        365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
        o = Array(160);
        r(i, n), i.prototype.init = function ()
        {
            return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924,
            this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129,
            this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this;
        }, i.prototype._update = function (t)
        {
            for(var e = this._w, r = 0 | this._ah, i = 0 | this._bh, n = 0 | this._ch, s = 0 | this._dh, o = 0 | this._eh, a = 0 | this._fh,
            h = 0 | this._gh, u = 0 | this._hh, l = 0 | this._al, f = 0 | this._bl, c = 0 | this._cl, d = 0 | this._dl, p = 0 | this._el,
            m = 0 | this._fl, _ = 0 | this._gl, g = 0 | this._hl, b = 0; b < 32; b += 2)
                e[b] = t.readInt32BE(4 * b), e[b + 1] = t.readInt32BE(4 * b + 4);
            for(; b < 160; b += 2)
            {
                t = e[b - 30];
                var y = e[b - 30 + 1], w = (t >>> 1 | y << 31) ^ (t >>> 8 | y << 24) ^ t >>> 7, v = (y >>> 1 | t << 31) ^ (y >>> 8 | t << 24) ^ (y >>> 7 | t << 25),
                M = ((t = e[b - 4]) >>> 19 | (y = e[b - 4 + 1]) << 13) ^ (y >>> 29 | t << 3) ^ t >>> 6;
                y = (y >>> 19 | t << 13) ^ (t >>> 29 | y << 3) ^ (y >>> 6 | t << 26);
                var E = e[b - 32], S = e[b - 32 + 1];
                t = v + e[b - 14 + 1] | 0, w = (w = (w = w + e[b - 14] + k(t, v) | 0) + M + k(t = t + y | 0, y) | 0) + E + k(t = t + S | 0,
                S) | 0, e[b] = w, e[b + 1] = t;
            }
            for(b = 0; b < 160; b += 2)
            {
                w = e[b], t = e[b + 1], y = r & i | n & (r | i);
                var I = l & f | c & (l | f);
                E = (r >>> 28 | l << 4) ^ (l >>> 2 | r << 30) ^ (l >>> 7 | r << 25), S = (l >>> 28 | r << 4) ^ (r >>> 2 | l << 30) ^ (r >>> 7 | l << 25);
                var A = T[b], B = T[b + 1], x = h ^ o & (a ^ h), L = _ ^ p & (m ^ _);
                v = (v = (v = (v = u + ((o >>> 14 | p << 18) ^ (o >>> 18 | p << 14) ^ (p >>> 9 | o << 23)) + k(M = g + ((p >>> 14 | o << 18) ^ (p >>> 18 | o << 14) ^ (o >>> 9 | p << 23)) | 0,
                g) | 0) + x + k(M = M + L | 0, L) | 0) + A + k(M = M + B | 0, B) | 0) + w + k(M = M + t | 0, t) | 0, w = E + y + k(t = S + I | 0,
                S) | 0, u = h, g = _, h = a, _ = m, a = o, m = p, o = s + v + k(p = d + M | 0, d) | 0, s = n, d = c, n = i, c = f, i = r, f = l,
                r = v + w + k(l = M + t | 0, M) | 0;
            }
            this._al = this._al + l | 0, this._bl = this._bl + f | 0, this._cl = this._cl + c | 0, this._dl = this._dl + d | 0, this._el = this._el + p | 0,
            this._fl = this._fl + m | 0, this._gl = this._gl + _ | 0, this._hl = this._hl + g | 0, this._ah = this._ah + r + k(this._al,
            l) | 0, this._bh = this._bh + i + k(this._bl, f) | 0, this._ch = this._ch + n + k(this._cl, c) | 0, this._dh = this._dh + s + k(this._dl,
            d) | 0, this._eh = this._eh + o + k(this._el, p) | 0, this._fh = this._fh + a + k(this._fl, m) | 0, this._gh = this._gh + h + k(this._gl,
            _) | 0, this._hh = this._hh + u + k(this._hl, g) | 0;
        }, i.prototype._hash = function ()
        {
            
function t(t,e,r)
            {
                i.writeInt32BE(t, r), i.writeInt32BE(e, r + 4);
            };
            var i = s.allocUnsafe(64);
            return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh,
            this._el, 32), t(this._fh, this._fl, 40), t(this._gh, this._gl, 48), t(this._hh, this._hl, 56), i;
        }, e.exports = i;
    }, {"./hash":50, inherits:39, "safe-buffer":42}]}, {}, [30]);
