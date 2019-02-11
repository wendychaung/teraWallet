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


function SendPay(e)
{
    e.cmd = "pay", SendData(e);
};

function SetStorage(e,t)
{
    SendData({cmd:"setstorage", Key:e, Value:t});
};

function GetStorage(e,t)
{
    SendData({cmd:"getstorage", Key:e}, t);
};

function SetCommon(e,t)
{
    SendData({cmd:"setcommon", Key:e, Value:t});
};

function GetCommon(e,t)
{
    SendData({cmd:"getcommon", Key:e}, t);
};

function GetInfo(e)
{
    SendData({cmd:"DappInfo"}, e);
};

function Call(e,t,a,n)
{
    SendData({cmd:"DappCall", MethodName:t, Params:a, Account:e}, n);
};

function SendCall(e,t,a,n)
{
    return INFO.WalletCanSign ? (SendData({cmd:"DappSendCall", MethodName:t, Params:a, Account:e, FromNum:n}), 1) : (SetError("Pls, open wallet"),
    0);
};

function GetWalletAccounts(e)
{
    SendData({cmd:"DappWalletList"}, e);
};

function GetAccountList(e,t)
{
    SendData({cmd:"DappAccountList", Params:e}, t);
};

function GetSmartList(e,t)
{
    SendData({cmd:"DappSmartList", Params:e}, t);
};

function GetBlockList(e,t)
{
    SendData({cmd:"DappBlockList", Params:e}, t);
};

function GetTransactionList(e,t)
{
    SendData({cmd:"DappTransactionList", Params:e}, t);
};

function DappSmartHTMLFile(e,t)
{
    SendData({cmd:"DappSmartHTMLFile", Params:{Smart:e}}, t);
};

function DappBlockFile(e,t,a)
{
    SendData({cmd:"DappBlockFile", Params:{BlockNum:e, TrNum:t}}, a);
};

function SetStatus(e)
{
    SendData({cmd:"SetStatus", Message:e}), console.log(e);
};

function SetError(e)
{
    SendData({cmd:"SetError", Message:e}), console.log(e);
};

function SetLocationPath(e)
{
    SendData({cmd:"SetLocationHash", Message:e});
};

function OpenLink(e)
{
    SendData({cmd:"OpenLink", Message:e});
};

function ComputeSecret(e,a)
{
    if(!INFO.WalletCanSign)
        return SetError("Pls, open wallet"), 0;
    "number" == typeof e ? GetAccountList({StartNum:e, CountNum:1}, function (e,t)
    {
        e ? SetError(e) : SendData({cmd:"ComputeSecret", PubKey:t[0].PubKey.data}, a);
    }) : SendData({cmd:"ComputeSecret", PubKey:e}, a);
};

function CheckInstall()
{
    SendData({cmd:"CheckInstall"});
};

function SendTransaction(e,t,a,n)
{
    SetError("Cannt SEND TR: " + JSON.stringify(t));
};

function CurrencyName(e)
{
    var n = MapCurrency[e];
    return n || (GetSmartList({StartNum:e, CountNum:1, TokenGenerate:1}, function (e,t)
    {
        if(!e && 0 !== t.length)
        {
            var a = t[0];
            n = GetTokenName(a.Num, a.ShortName), MapCurrency[a.Num] = n;
        }
    }), n = GetTokenName(e, "")), n;
};
var SendCountUpdate = 0;

function FindAllCurrency()
{
    SendCountUpdate++, GetSmartList({StartNum:8, CountNum:100, TokenGenerate:1}, function (e,t)
    {
        if(SendCountUpdate--, !e)
            for(var a = 0; a < t.length; a++)
            {
                var n = t[a];
                if(!MapCurrency[n.Num])
                {
                    var o = GetTokenName(n.Num, n.ShortName);
                    MapCurrency[n.Num] = o;
                }
            }
    });
};

function GetFilePath(e)
{
    return window.PROTOCOL_SERVER_PATH && e.indexOf("file/") && ("/" !== e.substr(0, 1) && (e = "/" + e), e = window.PROTOCOL_SERVER_PATH + e),
    e;
};

function GetParamsFromPath(e)
{
    if(OPEN_PATH)
        for(var t = OPEN_PATH.split("&"), a = 0; a < t.length; a++)
            if(0 === t[a].indexOf(e + "="))
                return t[a].split("=")[1];
};

function GetState(e,n,o)
{
    SendCountUpdate++, GetAccountList({StartNum:e, CountNum:1}, function (e,t)
    {
        if(SendCountUpdate--, !e && t.length)
        {
            var a = t[0].SmartState;
            if(a)
                return void n(a);
        }
        o && o();
    });
};
var glMapF = {}, glKeyF = 0;

function SendData(e,t)
{
    window.parent && (t && (glKeyF++, e.CallID = glKeyF, glMapF[glKeyF] = t), window.parent.postMessage(e, "*"));
};

function OnMessage(e)
{
    var t = e.data;
    if(t && "object" == typeof t)
    {
        var a = t.CallID, n = t.cmd;
        if(a)
        {
            var o = glMapF[a];
            if(o)
            {
                switch(delete t.CallID, delete t.cmd, n)
                {
                    case "getstorage":
                    case "getcommon":
                        o(t.Key, t.Value);
                        break;
                    case "DappCall":
                        o(t.Err, t.RetValue);
                        break;
                    case "DappInfo":
                        o(t.Err, t);
                        break;
                    case "DappWalletList":
                    case "DappAccountList":
                    case "DappSmartList":
                    case "DappBlockList":
                    case "DappTransactionList":
                        o(t.Err, t.arr);
                        break;
                    case "DappBlockFile":
                    case "DappSmartHTMLFile":
                        o(t.Err, t.Body);
                        break;
                    case "ComputeSecret":
                        o(t.Result);
                        break;
                    default:
                        console.log("Error cmd: " + n);
                }
                delete glMapF[a];
            }
        }
        else
            if("OnEvent" === n)
            {
                window.OnEvent && window.OnEvent(t);
                var r = new CustomEvent("Event", {detail:t});
                window.dispatchEvent(r);
            }
    }
};

function OpenRefFile(e)
{
    var t = ParseFileName(e);
    t.BlockNum ? DappBlockFile(t.BlockNum, t.TrNum, function (e,t)
    {
        document.write(t);
    }) : OpenLink(e);
};

function SaveToStorageByArr(e)
{
    SetStorage("VerSave", "1");
    for(var t = 0; t < e.length; t++)
    {
        var a = e[t], n = $(a);
        "checkbox" === n.type ? SetStorage(a, 0 + n.checked) : SetStorage(a, n.value);
    }
};

function LoadFromStorageByArr(n,o,r)
{
    GetStorage("VerSave", function (e,t)
    {
        if("1" === t)
            for(var a = 0; a < n.length; a++)
                a === n.length - 1 ? LoadFromStorageById(n[a], o) : LoadFromStorageById(n[a]);
        r && o && o(0);
    });
};

function LoadFromStorageById(n,o)
{
    GetStorage(n, function (e,t)
    {
        var a = document.getElementById(n);
        "checkbox" === a.type ? a.checked = parseInt(t) : a.value = t, o && o(e, t);
    });
};
var SendCountDappParams = 0;

function GetDappParams(e,t,n,o)
{
    e ? (SendCountDappParams++, DappBlockFile(e, t, function (e,t)
    {
        if(SendCountDappParams--, !e && 135 === t.Type)
        {
            try
            {
                var a = JSON.parse(t.Params);
            }
            catch(e)
            {
            }
            if(a)
                return void n(a, t.MethodName, t.FromNum);
        }
        o && n();
    })) : o && n();
};
document.addEventListener("DOMContentLoaded", function ()
{
    for(var e = document.getElementsByTagName("A"), t = 0, a = e.length; t < a; t++)
        0 <= e[t].href.indexOf("/file/") && (e[t].onclick = function ()
        {
            OpenRefFile(this.href);
        });
}), window.addEventListener ? window.addEventListener("message", OnMessage) : window.attachEvent("onmessage", OnMessage);
var SMART = {}, BASE_ACCOUNT = {}, INFO = {}, USER_ACCOUNT = [], USER_ACCOUNT_MAP = {}, OPEN_PATH = "", ACCOUNT_OPEN_NUM = 0,
WasStartInit = 0, WasStartInit2 = 0, eventInfo = new Event("UpdateInfo");

function UpdateDappInfo()
{
    GetInfo(function (e,t)
    {
        if(!e)
        {
            SMART = (INFO = t).Smart, BASE_ACCOUNT = t.Account, OPEN_PATH = t.OPEN_PATH, ACCOUNT_OPEN_NUM = ParseNum(OPEN_PATH), SetBlockChainConstant(t),
            USER_ACCOUNT = t.ArrWallet, USER_ACCOUNT_MAP = {};
            for(var a = 0; a < USER_ACCOUNT.length; a++)
                USER_ACCOUNT_MAP[USER_ACCOUNT[a].Num] = USER_ACCOUNT[a];
            if(window.OnInit && !WasStartInit ? (WasStartInit = 1, window.OnInit(1)) : window.OnUpdateInfo && window.OnUpdateInfo(), !WasStartInit2)
            {
                WasStartInit2 = 1;
                var n = new Event("Init");
                window.dispatchEvent(n);
            }
            if(window.dispatchEvent(eventInfo), t.ArrEvent)
                for(a = 0; a < t.ArrEvent.length; a++)
                {
                    var o = t.ArrEvent[a];
                    o.cmd = "OnEvent", OnMessage({data:o});
                }
        }
    });
};
window.addEventListener("load", function ()
{
    window.sha3 || LoadLib("./JS/sha3.js"), UpdateDappInfo(), setInterval(UpdateDappInfo, 1e3);
});
