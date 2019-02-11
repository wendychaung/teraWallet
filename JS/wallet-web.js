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

var MIN_VERSION = 868, COUNT_BLOCK_PROOF = 300, MIN_SUM_POWER = 35 * COUNT_BLOCK_PROOF, MainServer = void 0, MaxConnectedCount = 10,
MaxTimeConnecting = 3e3, StartTimeConnecting = 0, ConnectedCount = 0, NETWORK = "TERA-MAIN", ServerMap = {}, ServerMainMap = {"127.0.0.1":{ip:"127.0.0.1",
        port:80, Name:"LOCAL"}, "terafoundation.org":{ip:"terafoundation.org", port:443, Name:"TERA", System:1}, "91.235.136.81":{ip:"91.235.136.81",
        port:80, Name:"SUPPORT1", System:1}, "149.154.70.158":{ip:"149.154.70.158", port:80, Name:"SUPPORT2", System:1}}, ServerTestMap = {"127.0.0.1":{ip:"127.0.0.1",
        port:80, Name:"LOCAL"}, "91.235.136.81":{ip:"91.235.136.81", port:88, Name:"SUPPORT1", System:1}, "149.154.70.158":{ip:"149.154.70.158",
        port:88, Name:"SUPPORT2", System:1}};

function StartWebWallet()
{
    ServerMap = "TERA-TEST" === NETWORK ? (MIN_SUM_POWER = 0, ServerTestMap) : (MIN_SUM_POWER = 35 * COUNT_BLOCK_PROOF, ServerMainMap),
    $("idNetwork").innerText = NETWORK, OnInitWebWallet(), ConnectWebWallet();
};

function OnInitWebWallet()
{
    var e = localStorage.getItem(NETWORK + "NodesArrayList");
    if(e)
        for(var t = JSON.parse(e), r = 0; r < t.length; r++)
        {
            var o = ServerMap[t[r].ip];
            o && o.System || (ServerMap[t[r].ip] = t[r]);
        }
};

function SaveServerMap()
{
    var e = [];
    for(var t in ServerMap)
    {
        var r = ServerMap[t];
        r.SumPower >= MIN_SUM_POWER && e.push({ip:r.ip, port:r.port});
    }
    localStorage.setItem(NETWORK + "NodesArrayList", JSON.stringify(e));
};
function parseDom(arg) {

  var objE = document.createElement("div");

  objE.innerHTML = arg;

  return objE.childNodes[0];

};
function SetStatus(e)
{
    // $("idStatus").innerHTML = e, console.log(e);
  let str;
  if( e.indexOf("Connect") > -1){
      str ="<div>"+e+"</div>";
  }else{
    str ="<span>"+e+"</span>";
  }
    $("idStatus").append(parseDom(str));
    $("idStatus2").append(parseDom(str));
  $("idStatus").scrollTop = $("idStatus").scrollHeight;
  $("idStatus2").scrollTop = $("idStatus2").scrollHeight;
};

function SetError(e,t)
{
    SetStatus("<DIV  align='left' style='color:red'><B>" + e + "</B></DIV>");
};

function ConnectWebWallet(num) {
    num?$("idStatus2").style.display ="block":$("idStatus2").style.display ="none";
    for(var e in StartTimeConnecting = Date.now(), ConnectedCount = 0, ServerMap)
    {
        ServerMap[e].SendHandShake = 0;
    }
    SetStatus("Connecting..."), LoopHandShake(), setTimeout(LoopWalletInfo, 1500);
};
var Stage = 0;

function LoopHandShake()
{
    for(var e in SetStatus("Connecting: " + ++Stage + "..."), ServerMap)
    {
        var t = ServerMap[e];
        !t.SendHandShake && t.port && DoNodeList(t);
    }
};

function DoNodeList(a)
{
    "https:" === window.location.protocol && 443 !== a.port || 443 === a.port && IsIPAddres(a.ip) || (a.SendHandShake = 1, GetData(GetProtocolServerPath(a) + "/GetNodeList",
        {}, function (e)
    {
        if(e && e.result && e.BlockChain && e.VersionNum >= MIN_VERSION)
        {
            ConnectedCount++, a.GetHandShake = 1, a.BlockChain = e.BlockChain;
            for(var t = 0, r = 0; r < e.arr.length; r++)
            {
                var o = e.arr[r];
                !ServerMap[o.ip] && o.port && (ServerMap[o.ip] = o, t = 1);
            }
            t && ConnectedCount < MaxConnectedCount && new Date - StartTimeConnecting < MaxTimeConnecting && setTimeout(LoopHandShake,
            100);
        }
    }));
};

function LoopWalletInfo()
{
    for(var e in SetStatus("Get wallets info..."), ServerMap)
    {
        var t = ServerMap[e];
        t.port && DoWalletInfo(t);
    }
    setTimeout(FindLider, 500);
};

function DoWalletInfo(t)
{
    "https:" === window.location.protocol && 443 !== t.port || 443 === t.port && IsIPAddres(t.ip) || (t.StartTime = Date.now(),
    t.SendWalletInfo = 1, GetData(GetProtocolServerPath(t) + "/GetCurrentInfo", {BlockChain:1}, function (e)
    {
        e && e.result && e.BlockChain && e.NETWORK === NETWORK && (t.Name = e.NODES_NAME, t.GetWalletInfo = 1, t.DeltaTime = new Date - t.StartTime,
        t.BlockChain = e.BlockChain, t.MaxNumBlockDB = e.MaxNumBlockDB, console.log("Get: " + t.ip + ":" + t.port + " delta=" + t.DeltaTime));
    }));
};

function FindLider()
{
    MainServer = void 0;
    var e = [], t = {};
    for(var r in ServerMap)
    {
        if((S = ServerMap[r]).GetWalletInfo && S.BlockChain)
        {
            var o = S.BlockChain;
            if(o.data && (o = o.data), S.SumPower = CalcPowFromBlockChain(o), S.SumPower < MIN_SUM_POWER)
            {
                console.log("Skip: " + S.ip + ":" + S.port + " SumPower(" + S.SumPower + ") < MIN_SUM_POWER(" + MIN_SUM_POWER + ")");
                continue;
            }
            t[S.SumPower] || (t[S.SumPower] = 0), t[S.SumPower]++, e.push(S);
        }
    }
    var a, n = 0;
    for(var r in t)
        t[r] >= n && (n = t[r], a = parseInt(r));
    e.sort(function (e,t)
    {
        return e.DeltaTime - t.DeltaTime;
    });
    for(var i = 0; i < e.length; i++)
    {
        var S;
        if((S = e[i]).SumPower === a)
        {
            SetStatus("Find " + S.ip + ":" + S.port + " with pow=" + S.SumPower + " " + n + "  ping=" + S.DeltaTime), MainServer = S, SaveServerMap();
            break;
        }
    }
    OnFindServer();
};

function CalcPowFromBlockChain(e)
{
    var t = 0, r = GetBlockArrFromBuffer(e);
    if(r.length === COUNT_BLOCK_PROOF)
        for(var o = 0; o < r.length; o++)
            t += r[o].Power;
    return t;
};
