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


function meshhash(t,r)
{
    for(var e = [t[3], t[2], t[1], t[0]], a = [], n = 0; n < 16; n++)
        a[n] = t[2 * n] + (t[2 * n + 1] << 8);
    var s = 0, i = 0;
    for(n = 0; n < 64; n++)
    {
        var o = t[31 & i];
        i++;
        var u = o >> 4 & 15, h = 15 & o, f = 3 & o;
        switch(u)
        {
            case 0:
                e[0] = e[0] + e[f];
                break;
            case 1:
                e[0] = e[0] * e[f];
                break;
            case 2:
                e[0] = e[0] | e[f];
                break;
            case 3:
                e[0] = e[0] & e[f];
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                e[0] = e[0] + e[1] + e[2] + e[3];
                break;
            case 8:
                (65535 & e[0]) < 32768 && !s && (i = 32 + i - h, s = 1);
                break;
            case 9:
                32768 < (65535 & e[0]) && !s && (i += h, s = 1);
                break;
            default:
                e[u % 4] = a[h];
        }
        var c = 15 & e[0], p = e[0] >> 8 & 15;
        if(c !== p)
        {
            var d = a[c];
            a[c] = a[p], a[p] = d;
        }
    }
    var y = [];
    for(n = 0; n < 16; n++)
        y[2 * n] = 255 & a[n], y[2 * n + 1] = a[n] >> 8;
    return sha3_array_256(y);
};
!function ()
{
    "use strict";
    var f = "object" == typeof window ? window : {};
    !f.JS_SHA3_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node && !f.RUN_NW_CLIENT && (f = global),
    f.RUN_CLIENT && (f = window);
    !f.JS_SHA3_NO_COMMON_JS && "object" == typeof module && module.exports;
    var c = !f.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, u = "0123456789abcdef".split(""), t = [4, 1024, 262144,
    67108864], r = [6, 1536, 393216, 100663296], p = [0, 8, 16, 24], ft = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648,
    32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555,
    0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
    2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], e = [224, 256, 384, 512], a = [128, 256],
    i = ["hex", "buffer", "arrayBuffer", "array"], o = {128:168, 256:136};
    !f.JS_SHA3_NO_NODE_JS && Array.isArray || (Array.isArray = function (t)
    {
        return "[object Array]" === Object.prototype.toString.call(t);
    });
    for(var n = function (r,e,a)
    {
        return function (t)
        {
            return new m(r, e, r).update(t)[a]();
        };
    }, s = function (e,a,n)
    {
        return function (t,r)
        {
            return new m(e, a, r).update(t)[n]();
        };
    }, h = function (n,t,s)
    {
        return function (t,r,e,a)
        {
            return _["cshake" + n].update(t, r, e, a)[s]();
        };
    }, d = function (n,t,s)
    {
        return function (t,r,e,a)
        {
            return _["kmac" + n].update(t, r, e, a)[s]();
        };
    }, y = function (t,r,e,a)
    {
        for(var n = 0; n < i.length; ++n)
        {
            var s = i[n];
            t[s] = r(e, a, s);
        }
        return t;
    }, l = function (t,r,e)
    {
        var a = n(t, r, e);
        return a.create = function ()
        {
            return new m(t, r, t);
        }, a.update = function (t)
        {
            return a.create().update(t);
        }, y(a, n, t, r);
    }, b = [{name:"keccak", padding:[1, 256, 65536, 16777216], bits:e, createMethod:l}, {name:"sha3", padding:r, bits:e, createMethod:l,
        outputs:"hex"}, {name:"sha3_array", padding:r, bits:e, createMethod:l, outputs:"array"}, {name:"sha3_buf", padding:r, bits:e,
        createMethod:l, outputs:"buffer"}, {name:"shake", padding:[31, 7936, 2031616, 520093696], bits:a, createMethod:function (r,e)
        {
            var a = s(r, e, "hex");
            return a.create = function (t)
            {
                return new m(r, e, t);
            }, a.update = function (t,r)
            {
                return a.create(r).update(t);
            }, y(a, s, r, e);
        }}, {name:"cshake", padding:t, bits:a, createMethod:function (a,n)
        {
            var s = o[a], i = h(a, 0, "hex");
            return i.create = function (t,r,e)
            {
                return r || e ? new m(a, n, t).bytepad([r, e], s) : _["shake" + a].create(t);
            }, i.update = function (t,r,e,a)
            {
                return i.create(r, e, a).update(t);
            }, y(i, h, a, n);
        }}, {name:"kmac", padding:t, bits:a, createMethod:function (a,n)
        {
            var s = o[a], i = d(a, 0, "hex");
            return i.create = function (t,r,e)
            {
                return new w(a, n, r).bytepad(["KMAC", e], s).bytepad([t], s);
            }, i.update = function (t,r,e,a)
            {
                return i.create(t, e, a).update(r);
            }, y(i, d, a, n);
        }}], _ = {}, v = [], A = 0; A < b.length; ++A)
        for(var k = b[A], g = k.bits, B = 0; B < g.length; ++B)
        {
            var O = k.name + "_" + g[B];
            if(v.push(O), _[O] = k.createMethod(g[B], k.padding, k.outputs), "sha3" !== k.name)
            {
                var R = k.name + g[B];
                v.push(R), _[R] = _[O];
            }
        }
    
function m(t,r,e)
    {
        this.blocks = [], this.s = [], this.padding = r, this.outputBits = e, this.reset = !0, this.block = 0, this.start = 0, this.blockCount = 1600 - (t << 1) >> 5,
        this.byteCount = this.blockCount << 2, this.outputBlocks = e >> 5, this.extraBytes = (31 & e) >> 3;
        for(var a = 0; a < 50; ++a)
            this.s[a] = 0;
    };
    
function w(t,r,e)
    {
        m.call(this, t, r, e);
    };
    m.prototype.update = function (t)
    {
        var r = "string" != typeof t;
        if(r && t.constructor === f.ArrayBuffer)
            return TO_ERROR_LOG("SHA3", 10, "ERROR: Error type ArrayBuffer, use Uint8Array instead!"), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var e = t.length;
        if(r && ("number" != typeof e || !Array.isArray(t) && (!c || !ArrayBuffer.isView(t))))
            return TO_ERROR_LOG("SHA3", 20, "ERROR: Input is invalid type, message=" + JSON.stringify(t)), [0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(var a, n, s = this.blocks, i = this.byteCount, o = this.blockCount, u = 0, h = this.s; u < e; )
        {
            if(this.reset)
                for(this.reset = !1, s[0] = this.block, a = 1; a < o + 1; ++a)
                    s[a] = 0;
            if(r)
                for(a = this.start; u < e && a < i; ++u)
                    s[a >> 2] |= t[u] << p[3 & a++];
            else
                for(a = this.start; u < e && a < i; ++u)
                    (n = t.charCodeAt(u)) < 128 ? s[a >> 2] |= n << p[3 & a++] : (n < 2048 ? s[a >> 2] |= (192 | n >> 6) << p[3 & a++] : (n < 55296 || 57344 <= n ? s[a >> 2] |= (224 | n >> 12) << p[3 & a++] : (n = 65536 + ((1023 & n) << 10 | 1023 & t.charCodeAt(++u)),
                    s[a >> 2] |= (240 | n >> 18) << p[3 & a++], s[a >> 2] |= (128 | n >> 12 & 63) << p[3 & a++]), s[a >> 2] |= (128 | n >> 6 & 63) << p[3 & a++]),
                    s[a >> 2] |= (128 | 63 & n) << p[3 & a++]);
            if(i <= (this.lastByteIndex = a))
            {
                for(this.start = a - i, this.block = s[o], a = 0; a < o; ++a)
                    h[a] ^= s[a];
                S(h), this.reset = !0;
            }
            else
                this.start = a;
        }
        return this;
    }, m.prototype.encode = function (t,r)
    {
        var e = 255 & t, a = 1, n = [e];
        for(e = 255 & (t >>= 8); 0 < e; )
            n.unshift(e), e = 255 & (t >>= 8), ++a;
        return r ? n.push(a) : n.unshift(a), this.update(n), n.length;
    }, m.prototype.encodeString = function (t)
    {
        var r = "string" != typeof (t = t || "");
        r && t.constructor === f.ArrayBuffer && (t = new Uint8Array(t));
        var e = t.length;
        if(r && ("number" != typeof e || !Array.isArray(t) && (!c || !ArrayBuffer.isView(t))))
            return TO_ERROR_LOG("SHA3", 30, "ERROR: Input is invalid type, str=" + JSON.stringify(t)), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var a = 0;
        if(r)
            a = e;
        else
            for(var n = 0; n < t.length; ++n)
            {
                var s = t.charCodeAt(n);
                s < 128 ? a += 1 : s < 2048 ? a += 2 : s < 55296 || 57344 <= s ? a += 3 : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++n)),
                a += 4);
            }
        return a += this.encode(8 * a), this.update(t), a;
    }, m.prototype.bytepad = function (t,r)
    {
        for(var e = this.encode(r), a = 0; a < t.length; ++a)
            e += this.encodeString(t[a]);
        var n = r - e % r, s = [];
        return s.length = n, this.update(s), this;
    }, m.prototype.finalize = function ()
    {
        var t = this.blocks, r = this.lastByteIndex, e = this.blockCount, a = this.s;
        if(t[r >> 2] |= this.padding[3 & r], this.lastByteIndex === this.byteCount)
            for(t[0] = t[e], r = 1; r < e + 1; ++r)
                t[r] = 0;
        for(t[e - 1] |= 2147483648, r = 0; r < e; ++r)
            a[r] ^= t[r];
        S(a);
    }, m.prototype.toString = m.prototype.hex = function ()
    {
        this.finalize();
        for(var t, r = this.blockCount, e = this.s, a = this.outputBlocks, n = this.extraBytes, s = 0, i = 0, o = ""; i < a; )
        {
            for(s = 0; s < r && i < a; ++s, ++i)
                t = e[s], o += u[t >> 4 & 15] + u[15 & t] + u[t >> 12 & 15] + u[t >> 8 & 15] + u[t >> 20 & 15] + u[t >> 16 & 15] + u[t >> 28 & 15] + u[t >> 24 & 15];
            i % r == 0 && (S(e), s = 0);
        }
        return n && (t = e[s], 0 < n && (o += u[t >> 4 & 15] + u[15 & t]), 1 < n && (o += u[t >> 12 & 15] + u[t >> 8 & 15]), 2 < n && (o += u[t >> 20 & 15] + u[t >> 16 & 15])),
        o;
    }, m.prototype.buffer = m.prototype.arrayBuffer = function ()
    {
        this.finalize();
        var t, r = this.blockCount, e = this.s, a = this.outputBlocks, n = this.extraBytes, s = 0, i = 0, o = this.outputBits >> 3;
        t = n ? new ArrayBuffer(a + 1 << 2) : new ArrayBuffer(o);
        for(var u = new Uint32Array(t); i < a; )
        {
            for(s = 0; s < r && i < a; ++s, ++i)
                u[i] = e[s];
            i % r == 0 && S(e);
        }
        return n && (u[s] = e[s], t = t.slice(0, o)), t;
    }, m.prototype.digest = m.prototype.array = function ()
    {
        this.finalize();
        for(var t, r, e = this.blockCount, a = this.s, n = this.outputBlocks, s = this.extraBytes, i = 0, o = 0, u = []; o < n; )
        {
            for(i = 0; i < e && o < n; ++i, ++o)
                t = o << 2, r = a[i], u[t] = 255 & r, u[t + 1] = r >> 8 & 255, u[t + 2] = r >> 16 & 255, u[t + 3] = r >> 24 & 255;
            o % e == 0 && S(a);
        }
        return s && (t = o << 2, r = a[i], 0 < s && (u[t] = 255 & r), 1 < s && (u[t + 1] = r >> 8 & 255), 2 < s && (u[t + 2] = r >> 16 & 255)),
        u;
    }, (w.prototype = new m).finalize = function ()
    {
        return this.encode(this.outputBits, !0), m.prototype.finalize.call(this);
    };
    var S = function (t)
    {
        var r, e, a, n, s, i, o, u, h, f, c, p, d, y, l, b, _, v, A, k, g, B, O, R, m, w, S, C, x, N, E, M, J, H, I, z, U, j, L, T,
        G, D, F, V, K, W, Y, q, P, Q, X, Z, $, tt, rt, et, at, nt, st, it, ot, ut, ht;
        for(a = 0; a < 48; a += 2)
            n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40], s = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41], i = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
            o = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43], u = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44], h = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
            f = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46], c = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47], r = (p = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^ (i << 1 | o >>> 31),
            e = (d = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^ (o << 1 | i >>> 31), t[0] ^= r, t[1] ^= e, t[10] ^= r, t[11] ^= e, t[20] ^= r,
            t[21] ^= e, t[30] ^= r, t[31] ^= e, t[40] ^= r, t[41] ^= e, r = n ^ (u << 1 | h >>> 31), e = s ^ (h << 1 | u >>> 31), t[2] ^= r,
            t[3] ^= e, t[12] ^= r, t[13] ^= e, t[22] ^= r, t[23] ^= e, t[32] ^= r, t[33] ^= e, t[42] ^= r, t[43] ^= e, r = i ^ (f << 1 | c >>> 31),
            e = o ^ (c << 1 | f >>> 31), t[4] ^= r, t[5] ^= e, t[14] ^= r, t[15] ^= e, t[24] ^= r, t[25] ^= e, t[34] ^= r, t[35] ^= e,
            t[44] ^= r, t[45] ^= e, r = u ^ (p << 1 | d >>> 31), e = h ^ (d << 1 | p >>> 31), t[6] ^= r, t[7] ^= e, t[16] ^= r, t[17] ^= e,
            t[26] ^= r, t[27] ^= e, t[36] ^= r, t[37] ^= e, t[46] ^= r, t[47] ^= e, r = f ^ (n << 1 | s >>> 31), e = c ^ (s << 1 | n >>> 31),
            t[8] ^= r, t[9] ^= e, t[18] ^= r, t[19] ^= e, t[28] ^= r, t[29] ^= e, t[38] ^= r, t[39] ^= e, t[48] ^= r, t[49] ^= e, y = t[0],
            l = t[1], W = t[11] << 4 | t[10] >>> 28, Y = t[10] << 4 | t[11] >>> 28, C = t[20] << 3 | t[21] >>> 29, x = t[21] << 3 | t[20] >>> 29,
            it = t[31] << 9 | t[30] >>> 23, ot = t[30] << 9 | t[31] >>> 23, D = t[40] << 18 | t[41] >>> 14, F = t[41] << 18 | t[40] >>> 14,
            H = t[2] << 1 | t[3] >>> 31, I = t[3] << 1 | t[2] >>> 31, b = t[13] << 12 | t[12] >>> 20, _ = t[12] << 12 | t[13] >>> 20, q = t[22] << 10 | t[23] >>> 22,
            P = t[23] << 10 | t[22] >>> 22, N = t[33] << 13 | t[32] >>> 19, E = t[32] << 13 | t[33] >>> 19, ut = t[42] << 2 | t[43] >>> 30,
            ht = t[43] << 2 | t[42] >>> 30, tt = t[5] << 30 | t[4] >>> 2, rt = t[4] << 30 | t[5] >>> 2, z = t[14] << 6 | t[15] >>> 26,
            U = t[15] << 6 | t[14] >>> 26, v = t[25] << 11 | t[24] >>> 21, A = t[24] << 11 | t[25] >>> 21, Q = t[34] << 15 | t[35] >>> 17,
            X = t[35] << 15 | t[34] >>> 17, M = t[45] << 29 | t[44] >>> 3, J = t[44] << 29 | t[45] >>> 3, R = t[6] << 28 | t[7] >>> 4,
            m = t[7] << 28 | t[6] >>> 4, et = t[17] << 23 | t[16] >>> 9, at = t[16] << 23 | t[17] >>> 9, j = t[26] << 25 | t[27] >>> 7,
            L = t[27] << 25 | t[26] >>> 7, k = t[36] << 21 | t[37] >>> 11, g = t[37] << 21 | t[36] >>> 11, Z = t[47] << 24 | t[46] >>> 8,
            $ = t[46] << 24 | t[47] >>> 8, V = t[8] << 27 | t[9] >>> 5, K = t[9] << 27 | t[8] >>> 5, w = t[18] << 20 | t[19] >>> 12, S = t[19] << 20 | t[18] >>> 12,
            nt = t[29] << 7 | t[28] >>> 25, st = t[28] << 7 | t[29] >>> 25, T = t[38] << 8 | t[39] >>> 24, G = t[39] << 8 | t[38] >>> 24,
            B = t[48] << 14 | t[49] >>> 18, O = t[49] << 14 | t[48] >>> 18, t[0] = y ^ ~b & v, t[1] = l ^ ~_ & A, t[10] = R ^ ~w & C, t[11] = m ^ ~S & x,
            t[20] = H ^ ~z & j, t[21] = I ^ ~U & L, t[30] = V ^ ~W & q, t[31] = K ^ ~Y & P, t[40] = tt ^ ~et & nt, t[41] = rt ^ ~at & st,
            t[2] = b ^ ~v & k, t[3] = _ ^ ~A & g, t[12] = w ^ ~C & N, t[13] = S ^ ~x & E, t[22] = z ^ ~j & T, t[23] = U ^ ~L & G, t[32] = W ^ ~q & Q,
            t[33] = Y ^ ~P & X, t[42] = et ^ ~nt & it, t[43] = at ^ ~st & ot, t[4] = v ^ ~k & B, t[5] = A ^ ~g & O, t[14] = C ^ ~N & M,
            t[15] = x ^ ~E & J, t[24] = j ^ ~T & D, t[25] = L ^ ~G & F, t[34] = q ^ ~Q & Z, t[35] = P ^ ~X & $, t[44] = nt ^ ~it & ut,
            t[45] = st ^ ~ot & ht, t[6] = k ^ ~B & y, t[7] = g ^ ~O & l, t[16] = N ^ ~M & R, t[17] = E ^ ~J & m, t[26] = T ^ ~D & H, t[27] = G ^ ~F & I,
            t[36] = Q ^ ~Z & V, t[37] = X ^ ~$ & K, t[46] = it ^ ~ut & tt, t[47] = ot ^ ~ht & rt, t[8] = B ^ ~y & b, t[9] = O ^ ~l & _,
            t[18] = M ^ ~R & w, t[19] = J ^ ~m & S, t[28] = D ^ ~H & z, t[29] = F ^ ~I & U, t[38] = Z ^ ~V & W, t[39] = $ ^ ~K & Y, t[48] = ut ^ ~tt & et,
            t[49] = ht ^ ~rt & at, t[0] ^= ft[a], t[1] ^= ft[a + 1];
    };
    f.sha3_str = _.sha3_256, f.sha3_array_256 = _.sha3_array_256, f.sha3 = _.sha3_array_256, f.sha = function (t)
    {
        return meshhash(_.sha3_256(t));
    }, f.shaarr = function (t)
    {
        return meshhash(_.sha3_array_256(t));
    }, f.shabuf = function (t)
    {
        return Buffer.from(shaarr(t));
    }, f.shaarrblock = function (t,r)
    {
        return meshhash(_.sha3_array_256(t), r);
    };
}();
