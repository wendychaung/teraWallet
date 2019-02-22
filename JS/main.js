function OnLoad()
{
  if(localStorage["NETWORK"])
    NETWORK=localStorage["NETWORK"];
  LoadValues();
  StartWebWallet();

  UpdatesExplorerData();
  UpdatesAccountsData();
  setInterval(UpdatesExplorerData,1000);
  setInterval(UpdatesAccountsData,1000);

  DoStableScroll();

  setTimeout(SetVisibleItemsKeys,500);

  //COMMON MOUSE MOVING
  window.onmousemove = function(event)
  {
    SetDiagramMouseX(event);
  }

  if(window.location.hash) {
    var LocationPath=window.location.hash.substr(1);
    if(LocationPath)
    {
      SelectTab(LocationPath,2);
    }
  }
}
function ChangeNetwork() {

  if(NETWORK==="TERA-TEST")
  {
    NETWORK="TERA-MAIN";
  }
  else
  {
    NETWORK="TERA-TEST";
  }
  localStorage["NETWORK"]=NETWORK;
  StartWebWallet();

  UpdatesExplorerData();
  UpdatesAccountsData();
}
function OnFindServer()
{
  if(!MainServer)
  {
    SetStatus("Server not found");
    delete localStorage["MainServer"];
    return;
  }

  localStorage["MainServer"]=JSON.stringify(MainServer);//for use in dapp

  //currency fill
  FillCurrencyAsync("idAccountCur");

}
function LoadValues()
{
  if(LoadValuesByArr(SaveIdArr))
  {
    //SetVisibleTab();
  }
}
function SaveValues()
{
  SaveValuesByArr(SaveIdArr);
}



function ViewDapps()
{
  ViewCurrent(DefDapps);
}

function SelectTab(name,type)
{
  SetStatus("");
  $("idCurTabName").value=name;
  SetVisibleTab();
  SaveValues();
  OnSelectTab(name);
  if(type == 1){
    toggleButton()
  }
  if(name!="Tabfirst"){
    $("logo").style.marginTop=20+"px";
  }else{
    $("logo").style.marginTop=60+"px";
  }
  window.location.hash="#"+name;
}
function OnSelectTab(name)
{
  if(name==="TabDapps")
  {
    ViewDapps();
  }
}


function SetVisibleTab()
{
  var CurTabName=$("idCurTabName").value;
  if(!CurTabName || CurTabName==="undefined")
    CurTabName=TabArr[0].name;
  $(CurTabName).style.height=document.body.clientHeight+"px";
  var str;
  for (var i=0;i<TabArr.length;i++)
  {
    var name=TabArr[i].name;
    var Item=$(name);
    if(!Item)
      continue;
    if(CurTabName===name)
    {
      Item.style.display = 'block';
      str="current"
    }
    else
    {
      Item.style.display = 'none';
      str=""
    }

    var ItemM=$("M"+name);
    if(ItemM)
    {
      ItemM.className=str;
    }
  }
}

function UpdatesAccountsData()
{
  GetData("/GetAccountListByKey",{Key:$("idPubKey").value,AllData:FirstAccountsData}, function (Data,responseText)
  {
    if(!Data || !Data.result)
      return;

    FirstAccountsData=0;
    NumAccountList=Data.NumAccountList;
    SetAccountsData(Data,responseText);
  });
}

function IsPrivateMode()
{
  var PrivKeyStr=$("idPrivKey").value;
  if(PrivKeyStr  && PrivKeyStr.length===64)
    return 1;
  else
    return 0;
}

function SetVisibleItemsKeys(EditFlag) {
  if(EditFlag)
  {
    $("idPrivKeyEdit").value=$("idPrivKey").value;
  }
  SetPubKey(EditFlag);
  var StrNo="none",StrYes="block";

  SetVisibleBlock("WalRow1",!EditFlag?StrYes:StrNo);

  SetVisibleBlock("WalRow2",EditFlag?StrYes:StrNo);
  if($("idShowPubKey").checked)
    SetVisibleBlock("WalRow3",EditFlag?StrYes:StrNo);
  else
    SetVisibleBlock("WalRow3","none");
  SetVisibleBlock("WalRow4",EditFlag?StrYes:StrNo);


  if(!EditFlag)
  {
    var Str;
    if(!$("idPrivKey").value)
    {
      if($("idPubKey").value)
        Str="Wallet in read mode. Using Public key.";
      else
        Str="Key not set. Pls, press edit and generate key ->";
    }
    else
    {
      Str="OK. Using Private key.";
    }
    $("idPrivKeyButton").innerHTML=Str;
  }

  if(EditFlag)
  {
    $("idPrivKeyEdit").focus();
  }
}


function SetPubKey(EditFlag) {

  var StrPrivKey;
  if(EditFlag)
    StrPrivKey=$("idPrivKeyEdit").value.trim();
  else{
    StrPrivKey=$("idPrivKey").value.trim();
  }

  if(IsHexStr(StrPrivKey))
  {
    if(StrPrivKey.length===64)
    {
      var PrivKey=GetArrFromHex(StrPrivKey);
      $("idPubKey").value=GetHexFromArr(SignLib.publicKeyCreate(PrivKey,1));
    }
    else
    {
      $("idPubKey").value=StrPrivKey;
    }
  }
  else
  {
    $("idPubKey").value="";
  }
}

function OnPrivKeyNew()
{
  var arr = new Uint8Array(32);
  window.crypto.getRandomValues(arr);
  var Str=GetHexFromArr(sha3(arr));
  $("idPrivKeyEdit").value=Str;
  SetPubKey(1);
}
function OnPrivKeyOK()
{
  $("idPrivKey").value=$("idPrivKeyEdit").value;
  SetVisibleItemsKeys(0);
  SaveValues();
}
function OpenWallet()
{
  if($("idPrivKey").value)
    return;

}

function ViewNewAccount()
{
  SetVisibleBlock2("idAccountEdit",1);
  $("idAccountName").focus();
}
function OnSetAccount(FlagOK)
{
  if(FlagOK)
  {
    if(!$("idPrivKey").value)
    {
      OnPrivKeyNew();
      OnPrivKeyOK();
    }

    var Name=$("idAccountName").value;
    var Smart=0;
    var Currency=ParseNum($("idAccountCur").value);
    if(!Name)
    {
      SetError("Enter the account name.");
      return;
    }
    SetStatus("Calculate Tx, wait pls ...");
    SendTrCreateAccWait(Currency,Name,Smart);
  }
  SetVisibleBlock("idAccountEdit",0)
}
function CancelCreateAccount()
{
  SetVisibleBlock("idAccountEdit",0)
}

function SendTrCreateAccWait(Currency,Name,Smart)
{
  CURRENCY=Currency;
  NAME=Name;
  SMART=Smart;
  setTimeout(function ()
  {
    SendTrCreateAcc(CURRENCY,$("idPubKey").value,NAME,0,SMART,0,0);
  },50)
}
function UpdatesExplorerData()
{
  var WasSendTr=0;
  for(var key in MapSendTransaction)
  {
    var Item=MapSendTransaction[key];
    if(!Item.WasProcess && !Item.final)
    {
      WasSendTr=1;
      break;
    }
  }


  GetData("GetCurrentInfo",{Diagram:IsVisibleBlock("idStatBlock"),ArrLog:WasSendTr}, function (Data)
  {
    if(!Data || !Data.result)
      return;

    SetExplorerData(Data);
    SetBlockChainConstant(Data);

    var arr=Data.arr;
    for(var i=0;arr && i<arr.length;i++)
    {
      var ItemServer=arr[i];
      var ItemClient=DiagramMap[ItemServer.name];
      if(!ItemClient || ItemClient.Extern)
        continue;


      ItemClient.arr=ItemServer.arr;
      ItemClient.AvgValue=ItemServer.AvgValue;
      ItemClient.steptime=ItemServer.steptime;
      ItemClient.fillStyle="white";



      DrawDiagram(ItemClient);
    }

  });
}

function SetExplorerData(Data)
{
  if(!Data || !Data.result)
    return;
  CONFIG_DATA=Data;
  window.FIRST_TIME_BLOCK=Data.FIRST_TIME_BLOCK;
  if(FirstCallDiagram)
  {
    ViewEnd(DefAccounts,CONFIG_DATA.MaxAccID,1);
    ViewEnd(DefBlock,CONFIG_DATA.MaxNumBlockDB,1);
    InitDiagram();
  }
  FirstCallDiagram=0;

  var StrVersion=" 0."+Data.VersionNum;
  var Str="Blockchain height: <B>"+Data.MaxNumBlockDB+"</B>  Current create: <B>"+Data.CurBlockNum+"</B> Wallet ver:"+"<B>"+StrVersion+"</B>";
  $("idCurrentBlockNum").innerHTML=Str;


  SetArrLog(Data.ArrLog);

}

function SetArrLog(arr)
{
  if(!arr)
    return;

  for(var i=0;i<arr.length;i++)
  {
    var Item=arr[i];
    if(!Item.final)
      continue;
    var TR=MapSendTransaction[Item.key];
    if(TR && !TR.WasProcess && Item.final)
    {
      TR.WasProcess=1;
      SetStatus(Item.text);

      if(Item.text.indexOf("Add to blockchain")>=0)
      {
        if(TR.Run)
        {
          TR.Run(TR);
          TR.Run=undefined;
        }
      }


      var Account=MapCheckTransaction[Item.key];
      if(Account)
      {
        delete MapCheckTransaction[Item.key];
        Account.NextSendTime=0;
      }


    }
  }
  CheckSending();
}
function InitDiagram()
{
  InitDiagramByArr(DiagramArr,800);
}

function ViewCounters(This)
{
  var BlockName="idStatBlock";
  var element=$(BlockName);

  var bVisible=IsVisibleBlock(BlockName);
  if(!bVisible)
    MoveUp(element);
  SetVisibleBlock(BlockName,!bVisible);
  var ResVisible=IsVisibleBlock(BlockName);
  if(This && This.className)
  {
    This.className=This.className.replace("btpress", "");
    if(ResVisible)
      This.className+=" btpress";
  }
}
function downloadKey() {
  var inValue  = $("idPrivKey").value.trim();
  exportRaw('tera-key.txt', inValue);
}
function fakeClick(obj) {
  var ev = document.createEvent("MouseEvents");
  ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  fakeClick(save_link);
}

