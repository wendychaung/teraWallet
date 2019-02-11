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

var DELTA_LONG_MINING = 5e3, BLOCKNUM_ALGO2 = 656e4, BLOCKNUM_HASH_NEW = 10195e3, BLOCKNUM_TICKET_ALGO = 1607e4;

function GetHashFromSeqAddr(r,o,a,e,t)
{
    if(a < BLOCKNUM_ALGO2)
    {
        var n = shaarrblock2(r, o, a);
        return {Hash:n, PowHash:n, Hash1:n, Hash2:n};
    }
    var i = ReadUintFromArr(o, 0), l = ReadUintFromArr(o, 6), A = ReadUintFromArr(o, 12), s = ReadUintFromArr(o, 18), u = ReadUint16FromArr(o,
    24), h = ReadUint16FromArr(o, 26), f = GetHash(r, ReadUint32FromArr(e || o, 28), a, i, l, A, s, u, h);
    return t && (o[17] === t && o[23] === t || (f.PowHash = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])), f;
};

function GetHash(r,o,a,e,t,n,i,l,A)
{
    DELTA_LONG_MINING < l && (l = 0), DELTA_LONG_MINING < A && (A = 0);
    var s = GetHashFromNum2(a, o), u = GetHashFromArrNum2(r, e, t), h = GetHashFromNum3(a - l, e, n), f = GetHashFromNum3(a - A,
    e, i), m = XORArr(s, h), H = XORArr(u, f), c = {Hash:H, Hash1:m, Hash2:H};
    return 0 < CompareArr(m, H) ? c.PowHash = m : c.PowHash = H, BLOCKNUM_HASH_NEW <= a && (c.Hash = BLOCKNUM_TICKET_ALGO <= a ? sha3arr2(m,
    H) : shaarr2(m, H)), c;
};

function CalcHashBlockFromSeqAddr(r,o,a)
{
    var e = GetHashFromSeqAddr(r.SeqHash, r.AddrHash, r.BlockNum, o, a);
    r.Hash = e.Hash, r.PowHash = e.PowHash;
};

function XORArr(r,o)
{
    for(var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < 32; e++)
        a[e] = r[e] ^ o[e];
    return a;
};

function GetHashFromNum2(r,o)
{
    var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return WriteUintToArrOnPos(a, r, 0), WriteUintToArrOnPos(a, o, 6), sha3(a);
};

function GetHashFromArrNum2(r,o,a)
{
    var e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0];
    return WriteArrToArrOnPos(e, r, 0, 32), WriteUintToArrOnPos(e, o, 32), WriteUintToArrOnPos(e, a, 38), sha3(e);
};

function GetHashFromNum3(r,o,a)
{
    var e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return WriteUintToArrOnPos(e, r, 0), WriteUintToArrOnPos(e, o, 6), WriteUintToArrOnPos(e, a, 12), sha3(e);
};

function ReadUintFromArr(r,o)
{
    void 0 === o && (o = r.len, r.len += 6);
    var a = 2 * (r[o + 5] << 23) + (r[o + 4] << 16) + (r[o + 3] << 8) + r[o + 2];
    return a = 256 * (a = 256 * a + r[o + 1]) + r[o];
};

function ReadUint32FromArr(r,o)
{
    return void 0 === o && (o = r.len, r.len += 4), 2 * (r[o + 3] << 23) + (r[o + 2] << 16) + (r[o + 1] << 8) + r[o];
};

function ReadUint16FromArr(r,o)
{
    return void 0 === o && (o = r.len, r.len += 2), (r[o + 1] << 8) + r[o];
};

function ReadArrFromArr(r,o)
{
    for(var a = [], e = r.len, t = 0; t < o; t++)
        a[t] = r[e + t];
    return r.len += o, a;
};

function WriteUintToArr(r,o)
{
    var a = r.length;
    r[a] = 255 & o, r[a + 1] = o >>> 8 & 255, r[a + 2] = o >>> 16 & 255, r[a + 3] = o >>> 24 & 255;
    var e = Math.floor(o / 4294967296);
    r[a + 4] = 255 & e, r[a + 5] = e >>> 8 & 255;
};

function WriteUintToArrOnPos(r,o,a)
{
    r[a] = 255 & o, r[a + 1] = o >>> 8 & 255, r[a + 2] = o >>> 16 & 255, r[a + 3] = o >>> 24 & 255;
    var e = Math.floor(o / 4294967296);
    r[a + 4] = 255 & e, r[a + 5] = e >>> 8 & 255;
};

function WriteUint32ToArr(r,o)
{
    var a = r.length;
    r[a] = 255 & o, r[a + 1] = o >>> 8 & 255, r[a + 2] = o >>> 16 & 255, r[a + 3] = o >>> 24 & 255;
};

function WriteUint32ToArrOnPos(r,o,a)
{
    r[a] = 255 & o, r[a + 1] = o >>> 8 & 255, r[a + 2] = o >>> 16 & 255, r[a + 3] = o >>> 24 & 255;
};

function WriteUint16ToArrOnPos(r,o,a)
{
    r[a] = 255 & o, r[a + 1] = o >>> 8 & 255;
};

function WriteArrToArr(r,o,a)
{
    for(var e = r.length, t = 0; t < a; t++)
        r[e + t] = o[t];
};

function WriteArrToArrOnPos(r,o,a,e)
{
    for(var t = 0; t < e; t++)
        r[a + t] = o[t];
};

function WriteArrToArrHOnPos(r,o,a,e)
{
    for(var t = 0; t < e; t++)
        r[a + t] |= o[t] << 8;
};

function ConvertBufferToStr(r)
{
    for(var o in r)
    {
        var a = r[o];
        a instanceof Buffer ? r[o] = GetHexFromArr(a) : "object" == typeof a && ConvertBufferToStr(a);
    }
};

function CopyObjValue(r,o)
{
    if(o && 5 < o)
        return r;
    var a = {};
    for(var e in r)
    {
        var t = r[e];
        "object" != typeof t || t instanceof Buffer || t instanceof ArrayBuffer || t instanceof Array || (t = CopyObjValue(t, o + 1)),
        a[e] = t;
    }
    return a;
};

function CopyArr(r)
{
    var o = [];
    if(r)
        for(var a = 0; a < r.length; a++)
            o[a] = r[a];
    return o;
};

function ParseNum(r)
{
    var o = parseInt(r);
    return o || (o = 0), isNaN(o) && (o = 0), o < 0 && (o = 0), o;
};

function CompareArr(r,o)
{
    for(var a = 0; a < r.length; a++)
        if(r[a] !== o[a])
            return r[a] - o[a];
    return 0;
};

function GetSeqHash(r,o,a)
{
    var e = [GetArrFromValue(r), o, a];
    return CalcHashFromArray(e, !0);
};

function arr2(r,o)
{
    for(var a = [], e = 0; e < r.length; e++)
        a.push(r[e]);
    for(e = 0; e < o.length; e++)
        a.push(o[e]);
    return a;
};

function shaarr2(r,o)
{
    return shaarr(arr2(r, o));
};

function sha3arr2(r,o)
{
    return sha3(arr2(r, o));
};

function GetBlockArrFromBuffer(r)
{
    if(!r || r.length < 10)
        return [];
    r.len = 0;
    var o, a = ReadUintFromArr(r), e = ReadUint32FromArr(r);
    if(e <= 0 || 560 + 64 * e !== r.length)
        return [];
    for(var t = [], n = 0; n < e + 16; n++)
    {
        if((u = {}).BlockNum = a + n, n < 16)
            u.Hash = ReadArrFromArr(r, 32);
        else
        {
            16 === n && (u.SumHash = ReadArrFromArr(r, 32), u.SumPow = ReadUintFromArr(r)), u.TreeHash = ReadArrFromArr(r, 32), u.AddrHash = ReadArrFromArr(r,
            32);
            for(var i = [], l = n - 16, A = 0; A < 8; A++)
            {
                var s = t[l + A];
                i.push(s.Hash);
            }
            if(u.PrevHash = CalcHashFromArray(i, !0), u.SeqHash = GetSeqHash(u.BlockNum, u.PrevHash, u.TreeHash), ReadUint32FromArr(u.PrevHash,
            28) !== ReadUint32FromArr(u.AddrHash, 28) && global.WATCHDOG_DEV)
                return ToError("Error on block load: " + u.BlockNum), [];
            CalcHashBlockFromSeqAddr(u, u.PrevHash), u.Power = GetPowPower(u.PowHash), o && (u.SumHash = shaarr2(o.SumHash, u.Hash)), o = u;
        }
        u.TrCount = 0, u.TrDataPos = 0, u.TrDataLen = 0, t.push(u);
    }
    for(n = t.length - 1; 0 <= n; n--)
    {
        var u;
        if(!(u = t[n]).SumHash)
        {
            t = t.slice(n + 1);
            break;
        }
    }
    return t;
};

function shaarrblock2(r,o,a)
{
    return shaarrblock(arr2(r, o), a);
};
"object" == typeof global && (global.GetHashFromSeqAddr = GetHashFromSeqAddr, global.CalcHashBlockFromSeqAddr = CalcHashBlockFromSeqAddr,
global.GetHashFromNum2 = GetHashFromNum2, global.GetHashFromNum3 = GetHashFromNum3, global.GetHashFromArrNum2 = GetHashFromArrNum2,
global.XORArr = XORArr, global.GetHash = GetHash, (global.LOCAL_RUN || global.TEST_NETWORK) && (BLOCKNUM_HASH_NEW = 1e3, BLOCKNUM_TICKET_ALGO = BLOCKNUM_ALGO2 = 0,
global.TEST_NETWORK && (global.BLOCKNUM_TICKET_ALGO = 1296300))), "object" == typeof global ? (global.ReadUint32FromArr = ReadUint32FromArr,
global.ReadUintFromArr = ReadUintFromArr, global.ReadUint16FromArr = ReadUint16FromArr, global.WriteUintToArr = WriteUintToArr,
global.WriteUint32ToArr = WriteUint32ToArr, global.WriteUint32ToArrOnPos = WriteUint32ToArrOnPos, global.WriteUint16ToArrOnPos = WriteUint16ToArrOnPos,
global.WriteUintToArrOnPos = WriteUintToArrOnPos, global.WriteArrToArr = WriteArrToArr, global.WriteArrToArrOnPos = WriteArrToArrOnPos,
global.WriteArrToArrHOnPos = WriteArrToArrHOnPos, global.ConvertBufferToStr = ConvertBufferToStr, global.CopyObjValue = CopyObjValue,
global.CopyArr = CopyArr, global.ParseNum = ParseNum, global.CompareArr = CompareArr, global.shaarr2 = shaarr2, global.sha3arr2 = sha3arr2,
global.arr2 = arr2, global.GetBlockArrFromBuffer = GetBlockArrFromBuffer, global.shaarrblock2 = shaarrblock2) : "object" == typeof window && (global = window);
