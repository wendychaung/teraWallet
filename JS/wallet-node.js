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


function SavePrivateKey()
{
    var t = document.getElementById("idTypeKey");
    if("brain" !== t.value)
    {
        var e = document.getElementById("idKeyNew").value;
        e = e.trim(), "private" !== t.value || 64 === e.length && IsHexStr(e) ? "private" === t.value || 66 === e.length && "0" === e.substr(0,
        1) && IsHexStr(e) ? ("private" === t.value && PrivKeyStr !== e ? SetStatus("Changed privat key") : "public" === t.value && PubKeyStr !== e && SetStatus("Changed public key"),
        GetData("SetWalletKey", e, function (e)
        {
            e && 1 === e.result && ("private" === t.value ? SelectStyle("styleBlue") : "public" === t.value && SelectStyle("styleGreen"),
            SetVisibleEditKeys(0), UpdatesData());
        })) : SetError("Error: Length must 66 HEX chars. (Length=" + e.length + ")") : SetError("Error: Length must 64 HEX chars. (Length=" + e.length + ")");
    }
    else
        ConvertToPrivateKey();
};

function CreateCheckPoint()
{
    if(!ServerBlockNumDB || ServerBlockNumDB < 16)
        SetError("Not set ServerBlockNumDB");
    else
    {
        var e = ServerBlockNumDB - 10;
        SetCheckPoint(e);
    }
};

function UseAutoCheckPoint()
{
    var e = $("idUseAutoCheckPoint").checked, t = ParseNum($("idPeriodAutoCheckPoint").value);
    GetData("SetAutoCheckPoint", {Set:e, Period:t}, function (e)
    {
        e && SetStatus(e.text, !e.result);
    });
};

function UseAutoCorrTime()
{
    GetData("SetAutoCorrTime", document.getElementById("idUseAutoCorrTime").checked, function (e)
    {
        e && SetStatus(e.text, !e.result);
    });
};

function SetCodeVersion()
{
    var e = JSON.parse(JSON.stringify(CONFIG_DATA.CODE_VERSION));
    e.BlockNum || (e.LevelUpdate = 160), e.BlockNum = CONFIG_DATA.CurBlockNum, e.addrArr = GetHexFromArr(e.addrArr), e.Hash = GetHexFromArr(e.Hash),
    e.Sign = GetHexFromArr(e.Sign), e.Hash = void 0, e.Sign = void 0, e.StartLoadVersionNum = void 0;
    var t = JSON.stringify(e, "", 2);
    document.getElementById("idDevService").value = t;
};

function SetNewCodeVersion()
{
    try
    {
        var e = JSON.parse(document.getElementById("idDevService").value);
    }
    catch(e)
    {
        return void SetError("Error format setting data");
    }
    e.addrArr = GetArrFromHex(e.addrArr), GetData("SetNewCodeVersion", e, function (e)
    {
        e && SetStatus(e.text, !e.result);
    });
};

function SetCorrTime()
{
    var e = parseInt(document.getElementById("idDevValue").value), t = {Num:CONFIG_DATA.CurBlockNum, bUse:1, bAddTime:1};
    e < 0 && (e =  - e, t.bAddTime = 0), t.DeltaTime = 40, t.StartBlockNum = ServerCurBlockNum + 10, t.EndBlockNum = t.StartBlockNum + Math.floor(e / t.DeltaTime);
    var n = JSON.stringify(t, "", 2);
    document.getElementById("idDevService").value = n;
};

function StartTimeCorrect()
{
    try
    {
        var e = JSON.parse(document.getElementById("idDevService").value);
    }
    catch(e)
    {
        return void SetError("Error format setting data");
    }
    GetData("SetCheckDeltaTime", e, function (e)
    {
        e && SetStatus(e.text, !e.result);
    });
};

function RestartNode()
{
    GetData("RestartNode", {}), DoRestartWallet();
};

function UseAutoUpdate()
{
    var e = {USE_AUTO_UPDATE:document.getElementById("idAutoUpdate").checked, DoMining:1};
    GetData("SaveConstant", e, function (e)
    {
        e && e.result && SetStatus("Save AutoUpdate: " + document.getElementById("idAutoUpdate").checked);
    });
};

function UseMining()
{
    if(MiningAccount)
    {
        var e = {USE_MINING:document.getElementById("idUseMining").checked, DoMining:1};
        GetData("SaveConstant", e, function (e)
        {
            e && e.result && SetStatus("Save Mining: " + document.getElementById("idUseMining").checked);
        });
    }
    else
        SetError("Not set mining account");
};

function SetPercentMining()
{
    var e = {POW_MAX_PERCENT:document.getElementById("idPercentMining").value};
    GetData("SaveConstant", e, function (e)
    {
        e && e.result && SetStatus("Save Mining percent: " + document.getElementById("idPercentMining").value + " %");
    });
};

function MiningSets()
{
    var e = "edit_mining_set";
    IsVisibleBlock(e) ? SetVisibleBlock(e, !1) : (SetVisibleBlock(e, !0), document.getElementById("idMiningAccount").value = MiningAccount,
    document.getElementById("idMiningAccount").focus());
};

function SaveMiningSet(e)
{
    SetVisibleBlock("edit_mining_set", !1), MiningAccount = e || ParseNum(document.getElementById("idMiningAccount").value), GetData("SetMining",
    MiningAccount, function (e)
    {
    });
};

function CancalMiningSet()
{
    SetVisibleBlock("edit_mining_set", !1);
};
var WasHistoryMaxNum, WasLastNumSound = 0;

function CheckNewMoney()
{
    $("idUseSoundHistory").checked && WasHistoryMaxNum !== HistoryMaxNum && ServerBlockNumDB && (WasHistoryMaxNum = HistoryMaxNum,
    GetData("GetHistoryAct", {StartNum:HistoryMaxNum - 40, CountNum:40}, function (e)
    {
        if(e && e.result)
            for(var t = e.arr, n = 0; n < t.length; n++)
            {
                var i = t[n];
                "+" === i.Direct && i.BlockNum > ServerBlockNumDB - 60 && i.BlockNum < ServerBlockNumDB - 20 && i.BlockNum > WasLastNumSound && (WasLastNumSound = i.BlockNum,
                $("sound_coin").play());
            }
    }));
};

function DoRestartWallet()
{
    SetStatus("<H1 align='center' style='color:blue'>Restarting program...</H1>"), WasSetRestart || (WasSetRestart = 1, setTimeout(function ()
    {
        window.location.reload();
    }, 1e4));
};

function SetArrLog(e)
{
    for(var t = "", n = 0, i = 0; i < e.length; i++)
    {
        var o = e[i], a = GetTransactionText(MapSendTransaction[o.key], o.key.substr(0, 16)), r = o.text;
        if(a && (r += " (" + a + ")"), o.final)
        {
            var c = MapSendTransaction[o.key];
            c && 0 <= o.text.indexOf("Add to blockchain") && (c.bFindAcc && (n = 1, c.bFindAcc = 0), c.Run && (c.Run(c), c.Run = void 0));
            var u = MapCheckTransaction[o.key];
            u && (delete MapCheckTransaction[o.key], u.NextSendTime = 0);
        }
        t = t + r + "\n";
    }
    SetStatusFromServer(t), CheckSending(), n && FindMyAccounts();
};

function SetAutoMining()
{
    setTimeout(function ()
    {
        var e = $("idAccount");
        e.options.length && SaveMiningSet(e.options[e.options.length - 1].value);
    }, 100);
};

function ViewNetworkMode()
{
    if(IsVisibleBlock("idNetworkView"))
        SetVisibleBlock("idNetworkView", !1);
    else
    {
        SetVisibleBlock("idNetworkView", !0);
        var e = CONFIG_DATA.CONSTANTS.NET_WORK_MODE;
        e || (e = {UseDirectIP:!0}, INTERNET_IP_FROM_STUN ? e.ip = INTERNET_IP_FROM_STUN : e.ip = SERVER_IP, e.port = SERVER_PORT),
        document.getElementById("idUseDirectIP").checked = e.UseDirectIP, document.getElementById("idIP").value = e.ip, document.getElementById("idPort").value = e.port,
        e.NodeWhiteList || (e.NodeWhiteList = ""), document.getElementById("idNodeWhiteList").value = e.NodeWhiteList;
    }
};

function SetNetworkParams(e)
{
    var t = {};
    t.UseDirectIP = document.getElementById("idUseDirectIP").checked, t.ip = document.getElementById("idIP").value, t.port = ParseNum(document.getElementById("idPort").value),
    t.NodeWhiteList = document.getElementById("idNodeWhiteList").value, t.DoRestartNode = e, GetData("SetNetMode", t, function (e)
    {
        e && e.result && (SetStatus("Set net work params OK"), SetVisibleBlock("idNetworkView", !1));
    }), e && DoRestartWallet();
};

function ViewConstant()
{
    IsVisibleBlock("idConstantView") ? SetVisibleBlock("idConstantView", !1) : (SetVisibleBlock("idConstantView", !0), document.getElementById("idConstant").value = JSON.stringify(CONFIG_DATA.CONSTANTS,
    "", 2));
};

function SaveConstant(e)
{
    try
    {
        var t = JSON.parse(document.getElementById("idConstant").value);
    }
    catch(e)
    {
        return void SetError("Error JSON format setting constant");
    }
    t.DoRestartNode = e, GetData("SaveConstant", t, function (e)
    {
        e && e.result && (SetStatus("Save Constant OK"), SetVisibleBlock("idConstantView", !1));
    }), e && DoRestartWallet();
};

function ViewRemoteParams()
{
    IsVisibleBlock("idRemoteView") ? SetVisibleBlock("idRemoteView", !1) : (SetVisibleBlock("idRemoteView", !0), CONFIG_DATA.HTTPPort && (document.getElementById("idHTTPPort").value = CONFIG_DATA.HTTPPort),
    document.getElementById("idHTTPPassword").value = CONFIG_DATA.HTTPPassword);
};

function SetRemoteParams(e)
{
    var t = i, n = ParseNum(document.getElementById("idHTTPPort").value), i = document.getElementById("idHTTPPassword").value;
    GetData("SetHTTPParams", {HTTPPort:n, HTTPPassword:i, DoRestartNode:e}, function (e)
    {
        !t && i ? window.location.reload() : (SetVisibleBlock("idRemoteView", !1), SetStatus("Set HTTP params OK"));
    }), e && DoRestartWallet();
};

function RewriteAllTransactions()
{
    DoBlockChainProcess("RewriteAllTransactions", "Rewrite all transactions", 0);
};

function RewriteTransactions()
{
    DoBlockChainProcess("RewriteTransactions", "Rewrite transactions on last %1 blocks", 1);
};

function TruncateBlockChain()
{
    DoBlockChainProcess("TruncateBlockChain", "Truncate last %1 blocks", 1);
};

function ClearDataBase()
{
    DoBlockChainProcess("ClearDataBase", "Clear DataBase", 0);
};

function CleanChain()
{
    DoBlockChainProcess("CleanChain", "Clean chain on last %1 blocks", 1);
};

function DoBlockChainProcess(e,t,n)
{
    SaveValues();
    var i = {};
    n && (i.BlockCount = ParseNum(document.getElementById("idBlockCount").value), t = t.replace("%1", i.BlockCount)), confirm(t + "?") && (SetVisibleBlock("idServerBlock",
    1), SetStatus("START: " + t), GetData(e, i, function (e)
    {
        e && SetStatus("FINISH: " + t, !e.result);
    }));
};
