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


function $(e)
{
    return document.getElementById(e);
};
var ServerHTTP, MainServer;

function IsIPAddres(e)
{
    var t = e.split(".");
    if(3 !== t.length)
        return 0;
    for(var r = 0; r < t.length; r++)
        if(t[r] !== "" + ParseNum(t[r]))
            return 0;
    return 1;
};

function GetProtocolServerPath(e)
{
    return 443 === e.port ? "https://" + e.ip : 80 === e.port ? "http://" + e.ip : "http://" + e.ip + ":" + e.port;
};

function SUM_TO_STRING(e,t,r)
{
    var n;
    return n = e.SumCOIN || e.SumCENT ? r ? "" + FLOAT_FROM_COIN(e).toStringF() : e.SumCOIN + "." + Rigth("000000000" + e.SumCENT,
    9) : "", void 0 !== t && ("" === n && (n = "0"), n += " " + CurrencyName(t)), n;
};

function GetArrFromHex(e)
{
    for(var t = [], r = 0; e && r < e.length / 2; r++)
        t[r] = parseInt(e.substr(2 * r, 2), 16);
    return t;
};

function GetHexFromArr(e)
{
    e instanceof Array || !e.data || (e = e.data);
    for(var t = "", r = 0; e && r < e.length; r++)
        if(e[r])
        {
            var n = (255 & e[r]).toString(16);
            1 === n.length && (n = "0" + n), t += n;
        }
        else
            t += "00";
    return t.toUpperCase();
};

function GetStrFromAddr(e)
{
    return GetHexFromArr(e);
};

function GetHexFromArrBlock(e,t)
{
    for(var r = "", n = [], a = 0; a < e.length; a++)
        n[a % t] = e[a], n.length >= t && (r += GetHexFromArr(n) + "\n", n = []);
    return n.length && (r += GetHexFromArr(n)), r;
};

function Rigth(e,t)
{
    return e.length < t ? e : e.substr(e.length - t);
};

function toUTF8Array(e)
{
    for(var t = [], r = 0; r < e.length; r++)
    {
        var n = e.charCodeAt(r);
        n < 128 ? t.push(n) : n < 2048 ? t.push(192 | n >> 6, 128 | 63 & n) : n < 55296 || 57344 <= n ? t.push(224 | n >> 12, 128 | n >> 6 & 63,
        128 | 63 & n) : (r++, n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(r)), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63,
        128 | 63 & n));
    }
    return t;
};

function Utf8ArrayToStr(e)
{
    var t, r, n, a, o;
    for(t = "", r = e.length, i = 0; i < r; )
        switch((n = e[i++]) >> 4)
        {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                t += String.fromCharCode(n);
                break;
            case 12:
            case 13:
                a = e[i++], t += String.fromCharCode((31 & n) << 6 | 63 & a);
                break;
            case 14:
                a = e[i++], o = e[i++], t += String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | (63 & o) << 0);
        }
    for(var i = 0; i < t.length; i++)
        if(0 === t.charCodeAt(i))
        {
            t = t.substr(0, i);
            break;
        }
    return t;
};

function GetArr32FromStr(e)
{
    return GetArrFromStr(e, 32);
};

function GetArrFromStr(e,t)
{
    for(var r = toUTF8Array(e), n = r.length; n < t; n++)
        r[n] = 0;
    return r.slice(0, t);
};

function WriteByte(e,t)
{
    e[e.length] = 255 & t;
};

function WriteUint(e,t)
{
    var r = e.length;
    e[r] = 255 & t, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
    var n = Math.floor(t / 4294967296);
    e[r + 4] = 255 & n, e[r + 5] = n >>> 8 & 255;
};

function WriteUint16(e,t)
{
    var r = e.length;
    e[r] = 255 & t, e[r + 1] = t >>> 8 & 255;
};

function WriteUint32(e,t)
{
    var r = e.length;
    e[r] = 255 & t, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
};

function WriteStr(e,t,r)
{
    t || (t = "");
    var n, a = toUTF8Array(t), o = e.length;
    r ? n = r : (65535 < (n = a.length) && (n = 65535), e[o] = 255 & n, e[o + 1] = n >>> 8 & 255, o += 2);
    for(var i = 0; i < n; i++)
        e[o + i] = a[i];
};

function WriteArr(e,t,r)
{
    for(var n = e.length, a = 0; a < r; a++)
        e[n + a] = t[a];
};

function WriteTr(e,t)
{
    var r = t.length, n = e.length;
    e[n] = 255 & r, e[n + 1] = r >>> 8 & 255, n += 2;
    for(var a = 0; a < r; a++)
        e[n + a] = t[a];
};

function ReadUintFromArr(e,t)
{
    void 0 === t && (t = e.len, e.len += 6);
    var r = 2 * (e[t + 5] << 23) + (e[t + 4] << 16) + (e[t + 3] << 8) + e[t + 2];
    return r = 256 * (r = 256 * r + e[t + 1]) + e[t];
};

function ReadUint32FromArr(e,t)
{
    return void 0 === t && (t = e.len, e.len += 4), 2 * (e[t + 3] << 23) + (e[t + 3] << 16) + (e[t + 1] << 8) + e[t];
};

function ReadArr(e,t)
{
    for(var r = [], n = e.len, a = 0; a < t; a++)
        r[a] = e[n + a];
    return e.len += t, r;
};

function ReadStr(e)
{
    var t = e[e.len] + 256 * e[e.len + 1];
    e.len += 2;
    var r = Utf8ArrayToStr(e.slice(e.len, e.len + t));
    return e.len += t, r;
};

function ParseNum(e)
{
    var t = parseInt(e);
    return isNaN(t) && (t = 0), t || (t = 0), t < 0 && (t = 0), t;
};

function parseUint(e)
{
    var t = parseInt(e);
    return isNaN(t) && (t = 0), t || (t = 0), t < 0 && (t = 0), t;
};

function CopyObjKeys(e,t)
{
    for(var r in t)
        e[r] = t[r];
};

function SaveToArr(e,t)
{
    for(var r in t)
    {
        e[0]++;
        var n = t[r];
        switch(typeof n)
        {
            case "number":
                WriteByte(e, 241), WriteUint(e, n);
                break;
            case "string":
                WriteByte(e, 242), WriteStr(e, n);
                break;
            case "object":
                if(n && (0 < n.length || 0 === n.length) && n.length <= 240)
                {
                    WriteByte(e, n.length), WriteArr(e, n, n.length);
                    break;
                }
            default:
                WriteByte(e, 250);
        }
    }
};

function LoadFromArr(e,t)
{
    if(!e.length)
        return !1;
    var r = e[0];
    for(var n in e.len = 1, t)
    {
        if(!r)
            break;
        r--;
        var a = e[e.len];
        switch(e.len++, a)
        {
            case 241:
                t[n] = ReadUintFromArr(e);
                break;
            case 242:
                t[n] = ReadStr(e);
                break;
            default:
                if(a <= 240)
                {
                    var o = a;
                    t[n] = ReadArr(e, o);
                    break;
                }
                t[n] = void 0;
        }
    }
    return !!e[0];
};
window.nw ? (window.Open = function (e,t,r,n)
{
    var a = {width:r = r || 840, height:n = n || 1e3};
    t && (a.icon = "../HTML/PIC/" + t + ".png"), window.nw.Window.open(e, a, function (e)
    {
    });
}, window.GetData = function (e,t,r)
{
    window.nw.global.RunRPC({path:e, obj:t}, r);
}, global.RunRPC = function (e,t)
{
    ServerHTTP || (ServerHTTP = require("../core/html-server"));
    var r = ServerHTTP.SendData(e);
    t && t(r);
}) : (window.Open = function (e,t,r,n)
{
    if(window.NWMODE)
    {
        r = r || 840, n = n || 1e3;
        var a = "left=" + (screen.width - r) / 2 + ",top=24,menubar=no,location=no,resizable=yes,scrollbars=no,status=no";
        a += ",width=" + r, a += ",height=" + n;
        window.open(e, void 0, a);
    }
    else
        window.open(e);
}, window.GetData = function (e,t,r)
{
    if("http" !== e.substr(0, 4))
        if("/" !== e.substr(0, 1) && (e = "/" + e), MainServer)
            e = GetProtocolServerPath(MainServer) + e;
        else
            if(!window.location.hostname)
                return ;
    var n = null, a = new XMLHttpRequest;
    if(null === t)
        throw "ERROR GET-TYPE";
    n = JSON.stringify(t), a.open("POST", e, !0);
    var o = "" + (new Error).stack;
    a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.onreadystatechange = function ()
    {
        if(4 == a.readyState)
            if(200 == a.status)
            {
                if(r)
                {
                    var e;
                    try
                    {
                        e = JSON.parse(a.responseText);
                    }
                    catch(e)
                    {
                        console.log("Error parsing: " + e), console.log(a.responseText), console.log(o);
                    }
                    r(e, a.responseText);
                }
            }
            else
                r && r(void 0, void 0);
    }, a.send(n);
});
var entityMap = {"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;", "/":"&#x2F;", "\n":"<BR>", " ":"&nbsp;"};

function escapeHtml(e)
{
    return e = (e = e.replace(/\\n/g, "\n")).replace(/\\"/g, '"'), String(e).replace(/[\s\n&<>"'\/]/g, function (e)
    {
        return entityMap[e];
    });
};

function InsertAfter(e,t)
{
    var r = t.parentNode, n = t.nextSibling;
    return n ? r.insertBefore(e, n) : r.appendChild(e);
};

function MoveUp(e)
{
    for(var t = e.parentNode, r = 0; r < t.children.length; r++)
    {
        var n = t.children[r];
        if(n.id && void 0 !== n.id)
            return t.insertBefore(e, n);
    }
};

function ViewGrid(e,t,r,n,a)
{
    GetData(e, t, function (e)
    {
        e && e.result && SetGridData(e.arr, r, a, n);
    });
};

function CheckNewSearch(e)
{
    $(e.FilterName).value && ($(e.NumName).value = "0");
};

function ViewCurrent(e,t,r)
{
    if(e.BlockName)
    {
        var n = $(e.BlockName);
        if(t)
        {
            var a = IsVisibleBlock(e.BlockName);
            a || MoveUp(n), SetVisibleBlock(e.BlockName, !a);
        }
        else
            SetVisibleBlock(e.BlockName, !0);
        var o = IsVisibleBlock(e.BlockName);
        if(r && r.className && (r.className = r.className.replace("btpress", ""), o && (r.className += " btpress")), !o)
            return ;
    }
    var i = $(e.NumName), u = "", l = "";
    e.FilterName && (u = $(e.FilterName).value), e.FilterName2 && (l = $(e.FilterName2).value), e.Param3 || (e.Param3 = ""), ViewGrid(e.APIName,
        {StartNum:ParseNum(i.value), CountNum:GetCountViewRows(e), Param3:e.Param3, Filter:u, Filter2:l}, e.TabName, 1, e.TotalSum),
    SaveValues(), r && SetImg(r, e.BlockName);
};

function ViewPrev(e)
{
    var t = document.getElementById(e.NumName), r = ParseNum(t.value);
    (r -= GetCountViewRows(e)) < 0 && (r = 0), t.value = r, ViewCurrent(e);
};

function ViewNext(e,t)
{
    var r = document.getElementById(e.NumName), n = ParseNum(r.value);
    n += GetCountViewRows(e), e.FilterName && document.getElementById(e.FilterName).value && (n = document.getElementById(e.TabName).MaxNum + 1),
    r.value = n < t ? n : t - t % GetCountViewRows(e), ViewCurrent(e);
};

function ViewBegin(e)
{
    document.getElementById(e.NumName).value = 0, ViewCurrent(e);
};

function ViewEnd(e,t,r)
{
    document.getElementById(e.NumName).value = t - t % GetCountViewRows(e), r || ViewCurrent(e);
};

function GetCountViewRows(e)
{
    return e.CountViewRows ? e.CountViewRows : CountViewRows;
};

function DoStableScroll()
{
    var e = $("idStableScroll");
    if(e)
    {
        var t = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight);
        t -= Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight), e.style.top = t + "px";
    }
};
var glEvalMap = {};

function CreateEval(formula,StrParams)
{
    var Ret = glEvalMap[formula];
    return Ret || (eval("function M(" + StrParams + "){return " + formula + "}; Ret=M;"), glEvalMap[formula] = Ret), Ret;
};
var glWorkNum = 0, CUR_ROW;

function SetGridData(e,t,r,n,a)
{
    var o = document.getElementById(t);
    n && ClearTable(o), o.ItemsMap || (o.ItemsMap = {}, o.RowCount = 0);
    var i = o.ItemsMap;
    glWorkNum++;
    for(var u = {SumCOIN:0, SumCENT:0}, l = o.rows[0].cells, c = l.length, s = 0; e && s < e.length; s++)
    {
        var m = e[s], g = m.Num;
        if(o.MaxNum = m.Num, !(y = i[g]))
        {
            o.RowCount++, y = a ? o.insertRow(1) : o.insertRow( - 1), i[g] = y;
            for(var p = 0; p < c; p++)
            {
                if("" != (v = l[p]).innerText)
                    v.F = CreateEval(v.id, "Item"), "(" === v.id.substr(0, 1) && (v.H = 1), (f = y.insertCell(p)).className = v.className;
            }
        }
        y.Work = glWorkNum, CUR_ROW = y;
        for(p = 0; p < c; p++)
        {
            var f, v, S;
            if(f = y.cells[p])
                if((v = l[p]).H)
                    (S = "" + v.F(m)).trim(), f.innerHTML !== S && (f.innerHTML = S);
                else
                    (S = "" + v.F(m)).trim(), f.innerText !== S && (f.innerText = S);
        }
        r && 0 === m.Currency && ADD(u, m.Value);
    }
    for(var d in i)
    {
        var y;
        (y = i[d]).Work !== glWorkNum && (o.deleteRow(y.rowIndex), delete i[d]);
    }
    r && (document.getElementById(r).innerText = "Total: " + SUM_TO_STRING(u, 0));
    DoStableScroll();
};

function ClearTable(e)
{
    for(var t = e.rows.length - 1; 0 < t; t--)
        e.deleteRow(t);
    e.ItemsMap = {}, e.RowCount = 0;
};

function RetOpenBlock(e,t)
{
    return e && t ? '<button onclick="ViewTransaction(' + e + ')" class="openblock">' + e + "</button>" : "<strong>" + e + "</strong>";
};

function RetBool(e)
{
    return e ? "<img src='images/yes.png' />" : "";
};

function RetNumDapp(e)
{
    return e.Num;
};

function RetIconDapp(e)
{
    if(e.IconBlockNum)
    {
        var t = "";
        return MainServer && (t = GetProtocolServerPath(MainServer)), '<img src="' + t + "/file/" + e.IconBlockNum + "/" + e.IconTrNum + '" style="vertical-align:middle; max-width: 32px;"> ';
    }
    return "";
};

function RetOpenDapps(e,t,r)
{
    var n = escapeHtml(e.Name);
    if(t && (n = e.Num + "." + n), 0 < e.HTMLLength)
    {
        var a = RetIconDapp(e) + n;
        return '<button class="bt_open_dapp" style="margin: -2px 0 0 0" onclick="OpenDapps(' + e.Num + "," + r + ')">' + a + "</button>";
    }
    return RetIconDapp(e) + n;
};

function RetDirect(e)
{
    return "-" === e ? "<B style='color:red'>-</B>" : "+" === e ? "<B style='color:green;'>+</B>" : "";
};

function RetCategory(e)
{
    var t = "", r = 0;
    return e.Category1 && MapCategory[e.Category1] && (t += ++r + "." + MapCategory[e.Category1] + "<BR>"), e.Category2 && MapCategory[e.Category2] && (t += ++r + "." + MapCategory[e.Category2] + "<BR>"),
    e.Category3 && MapCategory[e.Category3] && (t += ++r + "." + MapCategory[e.Category3] + "<BR>"), t = t.substr(0, t.length - 4);
};

function RetChangeSmart(e)
{
    var t = "", r = "", n = 0;
    e.SmartObj && (e.SmartObj.HTMLLength ? (t = RetOpenDapps(e.SmartObj, 1, e.Num), n = 1) : t = e.SmartObj.Num + "." + escapeHtml(e.SmartObj.Name) + "<BR>",
    window.DEBUG_WALLET && (r = "<BR>State:" + JSON.stringify(e.SmartState)));
    var a = 20;
    return n && (a = 40), '<DIV style="width: 204px;">' + t + '<button onclick="ChangeSmart(' + e.Num + "," + e.Value.Smart + ')" class="setsmart" style="height: ' + a + "px;min-height: " + a + 'px;">Set</button>' + r + "</DIV>";
};

function RetBaseAccount(e)
{
    var t = "" + e.Account;
    return 1 < e.AccountLength && (t += "-" + (e.Account + e.AccountLength - 1)), t;
};

function ViewTransaction(e)
{
    window.Open("/HTML/blockviewer.html#" + e, "viewer", 800, 800);
};

function DateFromBlock(e)
{
    var t;
    window.FIRST_TIME_BLOCK ? t = (t = (t = new Date(window.FIRST_TIME_BLOCK + 1e3 * e).toISOString()).substr(0, t.indexOf("."))).replace("T",
    " ") : t = "";
    return t;
};

function SetCheckPoint(e)
{
    e ? GetData("SetCheckPoint", e, function (e)
    {
        e && SetStatus(e.text, !e.result);
    }) : SetError("Not set BlockNum");
};

function AddDiagramToArr(e,t)
{
    for(var r = 0, n = 0; n < e.length; n++)
        if(e[n].name === t.name)
        {
            t.Delete = 0, e[n] = t, r = 1;
            break;
        }
    r || (t.num = e.length, e.push(t));
};

function SetVisibleBlock(e,t)
{
    var r = document.getElementById(e);
    return t && "string" == typeof t ? r.style.display = t : t ? (r.style.display = "block", DoStableScroll()) : r.style.display = "none",
    r;
};

function SetVisibleBlock2(e) {
  $(e).style.display = ($(e).style.display == "none" ? "block":"none");
  // return t ? (r.style.display = "block", DoStableScroll()) : r.style.display = "none",
  //   r;
};
function IsVisibleBlock(e)
{
    var t = document.getElementById(e);
    return "block" === t.style.display || "table-row" === t.style.display;
};

function LoadValuesByArr(e,t)
{
    if(t || (t = ""), "3" !== localStorage.VerSave)
        return 0;
    for(var r = 0; r < e.length; r++)
    {
        var n = e[r], a = document.getElementById(n), o = t + n;
        "checkbox" === a.type ? a.checked = parseInt(localStorage.getItem(o)) : a.value = localStorage.getItem(o);
    }
    return 1;
};

function SaveValuesByArr(e,t)
{
    t || (t = ""), localStorage.VerSave = "3";
    for(var r = 0; r < e.length; r++)
    {
        var n = e[r], a = t + n, o = $(n);
        "checkbox" === o.type ? window.localStorage.setItem(a, 0 + o.checked) : window.localStorage.setItem(a, o.value);
    }
};
var MapCurrency = {0:"TERA", 16:"BTC"}, MapCategory = {};

function GetTokenName(e,t)
{
    return t || (t = "Token"), "(" + e + "." + t + ")";
};

function CurrencyNameItem(e)
{
    var t = MapCurrency[e.Currency];
    return t || (t = e.CurrencyObj ? GetTokenName(e.Currency, e.CurrencyObj.ShortName) : GetTokenName(e.Currency, ""), MapCurrency[e.Currency] = t),
    t;
};

function CurrencyName(e)
{
    var r = MapCurrency[e];
    return r || (GetData("GetDappList", {StartNum:e, CountNum:1}, function (e)
    {
        if(e && e.result)
        {
            var t = e.arr[0];
            r = GetTokenName(t.Num, t.ShortName), MapCurrency[t.Num] = r;
        }
    }), r = GetTokenName(e, "")), r;
};

function FillCurrencyAsync(a,e)
{
    e || (e = 8);
    GetData("DappSmartList", {StartNum:e, CountNum:20, TokenGenerate:1}, function (e)
    {
        if(e && e.result && e.arr)
        {
            for(var t = 0, r = 0; r < e.arr.length; r++)
            {
                var n = e.arr[r];
                MapCurrency[n.Num] || (Name = GetTokenName(n.Num, n.ShortName), MapCurrency[n.Num] = Name), n.Num > t && (t = n.Num);
            }
            FillSelect(a, MapCurrency, 1), 20 === e.arr.length && t && (SetStatus("Cet currency in next iteration: " + (t + 1)), FillCurrencyAsync(a,
            t + 1));
        }
    });
};

function FillSelect(e,t,r)
{
    var n = $(e), a = n.value, o = n.options, i = JSON.stringify(t);
    if(n.strJSON !== i)
    {
        n.strJSON = i;
        a = n.value;
        if(r)
            for(var u in o.length = 0, t)
            {
                var l = t[u];
                o[o.length] = new Option(l, u), u == a && (n.value = u);
            }
        else
        {
            for(var c = o.length = 0; c < t.length; c++)
            {
                var s = t[c];
                o[o.length] = new Option(s.text, s.value), s.value == a && (n.value = s.value);
            }
            if(!t.length)
                for(var u in t)
                {
                    s = t[u];
                    o[o.length] = new Option(s.text, s.value), s.value == a && (n.value = s.value);
                }
        }
    }
};

function GetArrFromSelect(e)
{
    for(var t = $(e).options, r = [], n = 0; n < t.length; n++)
    {
        var a = t[n];
        r.push({text:a.text, value:a.value});
    }
    return r;
};

function FillCategory(e)
{
    var t = [];
    for(var r in MapCategory)
        t.push({sort:MapCategory[r].toUpperCase(), text:MapCategory[r], value:r});
    t.sort(function (e,t)
    {
        return e.sort < t.sort ?  - 1 : e.sort > t.sort ? 1 : 0;
    }), FillSelect(e, t);
};

function AddToInvoiceList(e)
{
    var t, r = localStorage.InvoiceList;
    (t = r ? JSON.parse(r) : []).unshift(e), localStorage.InvoiceList = JSON.stringify(t);
};

function OpenDapps(e,t)
{
    var r = "/dapp/" + e;
    "file:" === window.location.protocol && (r = "./dapp-frame.html?dapp=" + e), t && (r += "#" + t), window.Open(r, "dapp", 1200);
};

function ParseFileName(e)
{
    var t = {BlockNum:0, TrNum:0}, r = e.indexOf("file/");
    if(r)
    {
        var n = e.indexOf("/", r + 6);
        t.BlockNum = parseInt(e.substr(r + 5, n - r - 5)), t.TrNum = parseInt(e.substr(n + 1));
    }
    return t;
};
MapCategory[0] = "-", MapCategory[1] = "Art & Music", MapCategory[2] = "Big Data & AI", MapCategory[3] = "Business", MapCategory[4] = "Commerce & Advertising",
MapCategory[5] = "Communications", MapCategory[6] = "Content Management", MapCategory[7] = "Crowdfunding", MapCategory[8] = "Data Storage",
MapCategory[9] = "Drugs & Healthcare", MapCategory[10] = "Education", MapCategory[11] = "Energy & Utilities", MapCategory[12] = "Events & Entertainment",
MapCategory[13] = "eСommerce", MapCategory[14] = "Finance", MapCategory[15] = "Gambling & Betting", MapCategory[16] = "Gaming & VR",
MapCategory[17] = "Healthcare", MapCategory[18] = "Identity & Reputation", MapCategory[19] = "Industry", MapCategory[20] = "Infrastructure",
MapCategory[21] = "Investment", MapCategory[22] = "Live Streaming", MapCategory[23] = "Machine Learning & AI", MapCategory[24] = "Marketing",
MapCategory[25] = "Media", MapCategory[26] = "Mining", MapCategory[27] = "Payments", MapCategory[28] = "Platform", MapCategory[29] = "Provenance & Notary",
MapCategory[30] = "Real Estate", MapCategory[31] = "Recruitment", MapCategory[32] = "Service", MapCategory[33] = "Social Network",
MapCategory[34] = "Social project", MapCategory[35] = "Supply & Logistics", MapCategory[36] = "Trading & Investing", MapCategory[37] = "Transport",
MapCategory[38] = "Travel & Tourisim", MapCategory[39] = "Bounty", MapCategory[40] = "Code-library", MapCategory[41] = "Development",
MapCategory[42] = "Exchanges", MapCategory[43] = "Security", MapCategory[44] = "Governance", MapCategory[45] = "Property",
MapCategory[46] = "Insurance";
var glTrSendNum = 0;

function SendTransaction(o,i,u,l)
{
    if(16e3 < o.length)
        return window.SetStatus && SetStatus("Error length transaction =" + o.length + " (max size=16000)"), void (l && l(1, i, o));
    glTrSendNum++, window.SetStatus && SetStatus("Prepare to sending..."), function r(e,t)
    {
        var n = t;
        e && (n = CreateHashBodyPOWInnerMinPower(o, u));
        var a = GetHexFromArr(o);
        GetData("SendTransactionHex", {Hex:a}, function (e)
        {
            if(e)
            {
                var t = GetHexFromArr(sha3(o));
                if(window.SetStatus && SetStatus("Send '" + t.substr(0, 16) + "' result:" + e.text), "Not add" === e.text)
                    r(1, n + 1);
                else
                    if("Bad time" === e.text)
                        window.DELTA_FOR_TIME_TX < 6 && (window.DELTA_FOR_TIME_TX++, console.log("New set Delta time: " + window.DELTA_FOR_TIME_TX),
                        r(1, 0));
                    else
                    {
                        var t = GetHexFromArr(sha3(o));
                        MapSendTransaction[t] = i, l && l(0, i, o);
                    }
            }
            else
                window.SetStatus && SetStatus("Error Data");
        });
    }(1, 0);
};
window.MapSendTransaction = {};
var MapSendID = {};

function SendCallMethod(e,t,r,n,a)
{
    var o = {Type:135}, i = [o.Type];
    WriteUint(i, e), WriteStr(i, t), WriteStr(i, JSON.stringify(r)), WriteUint(i, n), n ? GetData("GetAccount", n, function (e)
    {
        var t;
        e && 1 === e.result && e.Item ? e.Item.Num == n ? e.Item.Value.Smart === a ? (MapSendID[n] ? (t = MapSendID[n].OperationID,
        8e3 < new Date - MapSendID[n].Date && (t += 20)) : (t = e.Item.Value.OperationID + 10, MapSendID[n] = {}), t++, t++, MapSendID[n].OperationID = t,
        MapSendID[n].Date = Date.now(), WriteUint(i, t), i.length += 10, SendTrArrayWithSign(i, n, o)) : SetStatus("Error - The account:" + n + " does not belong to a smart contract:" + a + " (have: " + e.Item.Value.Smart + ")") : SetStatus("Error read from account number: " + n + " read data=" + e.Item.Num) : SetStatus("Error account number: " + n);
    }) : (WriteUint(i, 0), i.length += 10, i.length += 64, i.length += 12, SendTransaction(i, o));
};

function SendTrArrayWithSign(r,e,n)
{
    if(MainServer || CanClientSign())
    {
        var t = GetArrFromHex(GetSignFromArr(r));
        WriteArr(r, t, 64), r.length += 12, SendTransaction(r, n);
    }
    else
    {
        var a = GetHexFromArr(r);
        GetData("GetSignFromHEX", {Hex:a, Account:e}, function (e)
        {
            if(e && e.result)
            {
                var t = GetArrFromHex(e.Sign);
                WriteArr(r, t, 64), r.length += 12, SendTransaction(r, n);
            }
        });
    }
};

function GetTrCreateAcc(e,t,r,n,a)
{
    return {Type:TYPE_TRANSACTION_CREATE, Currency:e, PubKey:t, Name:r, Adviser:n, Smart:a};
};

function GetBodyCreateAcc(e)
{
    var t = [];
    return WriteByte(t, e.Type), WriteUint(t, e.Currency), WriteArr(t, GetArrFromHex(e.PubKey), 33), WriteStr(t, e.Name, 40), WriteUint(t,
    e.Adviser), WriteUint32(t, e.Smart), t.length += 3, t.length += 12, t;
};

function GetArrFromTR(e)
{
    MaxBlockNum = GetCurrentBlockNumByTime();
    var t = [];
    WriteByte(t, e.Type), WriteByte(t, e.Version), WriteUint(t, 0), WriteUint(t, e.FromID), WriteUint32(t, e.To.length);
    for(var r = 0; r < e.To.length; r++)
    {
        var n = e.To[r];
        3 <= e.Version && WriteTr(t, n.PubKey), WriteUint(t, n.ID), WriteUint(t, n.SumCOIN), WriteUint32(t, n.SumCENT), MapAccounts && MapAccounts[n.ID] && (MapAccounts[n.ID].MustUpdate = MaxBlockNum + 10);
    }
    return WriteStr(t, e.Description), WriteUint(t, e.OperationID), 3 <= e.Version && (e.Body ? WriteTr(t, e.Body) : (WriteByte(t,
    0), WriteByte(t, 0))), t;
};

function GetSignTransaction(a,o)
{
    if(window.SignLib)
        if(3 === a.Version)
            for(var i = [], u = 0, e = 0; e < a.To.length; e++)
            {
                var t = a.To[e];
                GetData("GetAccountList", {StartNum:t.ID}, function (e)
                {
                    if(e && 1 === e.result && e.arr.length)
                    {
                        u++;
                        for(var t = e.arr[0].PubKey.data, r = 0; r < 33; r++)
                            i[i.length] = t[r];
                        if(u === a.To.length)
                        {
                            var n = GetArrFromTR(a);
                            for(r = 0; r < n.length; r++)
                                i[i.length] = n[r];
                            a.Sign = GetArrFromHex(GetSignFromArr(i)), o(a);
                        }
                    }
                });
            }
        else
            a.Sign = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            o(a);
    else
        GetData("GetSignTransaction", a, function (e)
        {
            e && 1 === e.result && (a.Sign = GetArrFromHex(e.Sign), o(a));
        });
};

function GetSignFromArr(e,t)
{
    if(t || (t = localStorage.idPrivKey), !IsHexStr(t) || 64 !== t.length)
        return "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    var r = GetArrFromHex(t), n = shaarr(e);
    return GetHexFromArr(SignLib.sign(Buffer.from(n), Buffer.from(r), null, null).signature);
};

function IsHexStr(e)
{
    return !!e && GetHexFromArr(GetArrFromHex(e)) === e.toUpperCase();
};

function RetJSON(e)
{
    return JSON.stringify(e);
};

function CanClientSign()
{
    var e = localStorage.idPrivKey;
    return IsHexStr(e) && 64 === e.length ? 1 : 0;
};

function random(e)
{
    return Math.floor(Math.random() * e);
};
Number.prototype.toStringF = function ()
{
    var e = String(this).split(/[eE]/);
    if(1 == e.length)
        return e[0];
    var t = "", r = this < 0 ? "-" : "", n = e[0].replace(".", ""), a = Number(e[1]) + 1;
    if(a < 0)
    {
        for(t = r + "0."; a++; )
            t += "0";
        return t + n.replace(/^\-/, "");
    }
    for(a -= n.length; a--; )
        t += "0";
    return n + t;
};
