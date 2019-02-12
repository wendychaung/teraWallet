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

var MAX_SUPER_VALUE_POW = 2 * (1 << 30);

function GetHashWithValues(r,t,e,n)
{
    var o;
    return (o = n ? r : r.slice())[0] = 255 & t, o[1] = t >>> 8 & 255, o[2] = t >>> 16 & 255, o[3] = t >>> 24 & 255, o[4] = 255 & e,
    o[5] = e >>> 8 & 255, o[6] = e >>> 16 & 255, o[7] = e >>> 24 & 255, shaarr(o);
};

function GetPowPower(r)
{
    for(var t = 0, e = 0; e < r.length; e++)
    {
        var n = Math.clz32(r[e]) - 24;
        if(t += n, 8 !== n)
            break;
    }
    return t;
};

function GetPowValue(r)
{
    var t = 2 * (r[0] << 23) + (r[1] << 16) + (r[2] << 8) + r[3];
    return t = 256 * (t = 256 * t + r[4]) + r[5];
};

function CreateNoncePOWExtern(r,t,e,n)
{
    for(var o = [], a = 0; a < r.length; a++)
        o[a] = r[a];
    n || (n = 0);
    for(var i = 0, E = MAX_SUPER_VALUE_POW, T = n; T <= n + e; T++)
    {
        var _ = GetPowValue(GetHashWithValues(o, T, t, !0));
        _ < E && (i = T, E = _);
    }
    return i;
};

function CreateHashBody(r,t,e)
{
    var n = r.length - 12;
    r[n + 0] = 255 & t, r[n + 1] = t >>> 8 & 255, r[n + 2] = t >>> 16 & 255, r[n + 3] = t >>> 24 & 255, r[n + 4] = 0, r[n + 5] = 0,
    r[(n = r.length - 6) + 0] = 255 & e, r[n + 1] = e >>> 8 & 255, r[n + 2] = e >>> 16 & 255, r[n + 3] = e >>> 24 & 255, r[n + 4] = 0,
    r[n + 5] = 0;
    for(var o = sha3(r), a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    i = 0; i < TR_TICKET_HASH_LENGTH; i++)
        a[i] = o[i];
    return WriteUintToArrOnPos(a, t, TR_TICKET_HASH_LENGTH), sha3(a);
};

function GetBlockNumTr(r)
{
    var t = window.DELTA_FOR_TIME_TX + GetCurrentBlockNumByTime();
    if(r[0] === TYPE_TRANSACTION_CREATE)
    {
        var e = 10 * Math.floor(t / 10);
        e < t && (e += 10), t = e;
    }
    return t;
};
window.TYPE_TRANSACTION_CREATE = 100, window.TR_TICKET_HASH_LENGTH = 10, window.DELTA_FOR_TIME_TX = 0, window.MIN_POWER_POW_TR = 0,
window.MIN_POWER_POW_ACC_CREATE = 0, window.CONSENSUS_PERIOD_TIME = 1e3, window.FIRST_TIME_BLOCK = 15304464e5, window.SetBlockChainConstant = function (r)
{
    var t = new Date - r.CurTime;
    r.DELTA_CURRENT_TIME || (r.DELTA_CURRENT_TIME = 0), window.DELTA_CURRENT_TIME2 = r.DELTA_CURRENT_TIME - t, window.MIN_POWER_POW_TR = r.MIN_POWER_POW_TR,
    window.MIN_POWER_POW_ACC_CREATE = r.MIN_POWER_POW_ACC_CREATE + 3, window.FIRST_TIME_BLOCK = r.FIRST_TIME_BLOCK, window.CONSENSUS_PERIOD_TIME = r.CONSENSUS_PERIOD_TIME,
    window.GetCurrentBlockNumByTime = function ()
    {
        var r = Date.now() + DELTA_CURRENT_TIME2 - FIRST_TIME_BLOCK;
        return Math.floor((r + CONSENSUS_PERIOD_TIME) / CONSENSUS_PERIOD_TIME);
    }, window.NWMODE = r.NWMODE;
}, window.GetCurrentBlockNumByTime = function ()
{
    return 0;
};
var LastCreatePOWTrType = 0, LastCreatePOWBlockNum = 0, LastCreatePOWHash = [255, 255, 255, 255];

function CreateHashBodyPOWInnerMinPower(r,t)
{
    var e = r[0], n = GetBlockNumTr(r);
    void 0 === t && (t = MIN_POWER_POW_TR + Math.log2(r.length / 128));
    for(var o = 0; ; )
    {
        var a = CreateHashBody(r, n, o);
        if(t <= GetPowPower(a) && !(LastCreatePOWBlockNum === n && LastCreatePOWTrType === e && 0 < CompareArr(LastCreatePOWHash, a)))
            return LastCreatePOWBlockNum = n, LastCreatePOWTrType = e, LastCreatePOWHash = a, o;
        ++o % 2e3 == 0 && (n = GetBlockNumTr(r));
    }
};

function CalcHashFromArray(r,t)
{
    void 0 === t && r.sort(CompareArr);
    for(var e = [], n = 0; n < r.length; n++)
        for(var o = r[n], a = 0; a < o.length; a++)
            e.push(o[a]);
    return 0 === e.length ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 32 === e.length ? e : shaarr(e);
};

function GetArrFromValue(r)
{
    var t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    t[0] = 255 & r, t[1] = r >>> 8 & 255, t[2] = r >>> 16 & 255, t[3] = r >>> 24 & 255;
    var e = Math.floor(r / 4294967296);
    return t[4] = 255 & e, t[5] = e >>> 8 & 255, t;
};

function LoadLib(r)
{
    var t = document.createElement("script");
    t.type = "text/javascript", t.src = r, document.getElementsByTagName("head")[0].appendChild(t);
};

function IsMS()
{
    return 0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./) ? 1 : 0;
};

function LoadSignLib() {
    window.SignLib || LoadLib("./JS/sign-lib-min.js");
};

function ComputeSecretWithCheck(r,t,e)
{
    if(window.SignLib)
        if(IsHexStr(t) && 64 === t.length)
        {
            var n = Buffer.from(GetArrFromHex(t));
            if("string" == typeof r)
            {
                if(!IsHexStr(r) || 66 !== r.length)
                    return void SetError("Error PubKey");
                r = Buffer.from(GetArrFromHex(r));
            }
            var o = SignLib.ecdh(r, n);
            e(sha3(o));
        }
        else
            SetError("Error set PrivKey");
    else
        SetError("Error - SignLib not installed");
};

function ComputeSecret(t,e)
{
    localStorage.idPrivKey ? ComputeSecretWithCheck(t, localStorage.idPrivKey, e) : GetData("GetWalletInfo", {}, function (r)
    {
        r && r.result && ComputeSecretWithCheck(t, r.PrivateKey, e);
    });
};

function Encrypt(r,t,e,n)
{
    var o = sha3arr2(r, sha3(e + t));
    return DoSecret(toUTF8Array(n), o);
};

function Decrypt(r,t,e,n)
{
    if(!r)
        return "".padEnd(n.length / 2, ".");
    "string" == typeof n && (n = GetArrFromHex(n));
    var o = DoSecret(n, sha3arr2(r, sha3(e + t)));
    return Utf8ArrayToStr(o);
};

function DoSecret(r,t)
{
    for(var e = [], n = 0, o = 0; o < r.length; )
    {
        WriteUintToArrOnPos(t, ++n, 0);
        for(var a = sha3(t), i = 0; i < 32 && o < r.length; i++, o++)
            e[o] = r[o] ^ a[i];
    }
    return e;
};
var glEncryptInit = 0;

function EncryptInit()
{
    glEncryptInit++;
    var r = Date.now() - new Date(2019, 0, 1);
    return 100 * Math.floor(100 * r + 100 * Math.random()) + glEncryptInit;
};

function EncryptID(r,t,e)
{
    var n = $(e).value;
    return n = n.padEnd(n.length + random(5), " "), GetHexFromArr(Encrypt(r, t, e, n));
};

function EncryptFields(r,t,e)
{
    t.Crypto || (t.Crypto = EncryptInit());
    for(var n = 0; n < e.length; n++)
    {
        var o = e[n], a = t[o];
        a = a.padEnd(a.length + random(5), " "), t[o] = GetHexFromArr(Encrypt(r, t.Crypto, o, a));
    }
};

function DecryptFields(r,t,e)
{
    for(var n = 0; n < e.length; n++)
    {
        var o = e[n];
        t[o] ? t[o] = Decrypt(r, t.Crypto, o, GetArrFromHex(t[o])) : t[o] = "";
    }
};
