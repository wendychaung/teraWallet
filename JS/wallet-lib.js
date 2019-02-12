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

var AttachItem, WasAccountsDataStr, PayList = [], MapAccounts = {}, LoadMapAfter = {}, MapCheckTransaction = {}, CanSendTransaction = 1,
CurrentTR = {}, MaxBlockNum = 0;

function SetAccountsData(e,t)
{
    if(e && e.result && t !== WasAccountsDataStr)
    {
        WasAccountsDataStr = t;
        var n = e.arr, a = $("idAccount");
        if(n.length !== a.options.length)
            a.options.length = n.length;
        MaxBlockNum = GetCurrentBlockNumByTime(), SetGridData(n, "grid_accounts", "idMyTotalSum");
        for(var r = 0; n && r < n.length; r++)
        {
            var i = n[r];
            i.MyAccount = !0;
            var o = ParseNum(i.Num);
            MapAccounts[o] || (MapAccounts[o] = {}), CopyObjKeys(MapAccounts[o], i);
            var c = a.options[r], u = GetAccountText(i, o, 1);
            c.text !== u && CheckNameAccTo(), c.value = o, c.text = u;
        }
        var s = LoadMapAfter.idAccount;
        s && (a.value = s, delete LoadMapAfter.idAccount), SetCurCurencyName();
    }
};

function CurTransactionToForm(e)
{
    var t = $("idTransaction");
    ("" === t.className || e) && (t.value = GetJSONFromTransaction(CurrentTR));
};

function CheckNameAccTo()
{
    MaxBlockNum = GetCurrentBlockNumByTime();
    var e = ParseNum($("idTo").value);
    (!MapAccounts[e] || MapAccounts[e].MustUpdate && MapAccounts[e].MustUpdate >= MaxBlockNum) && GetData("GetAccountList", {StartNum:e},

function (e)
    {
        if(e && 1 === e.result && e.arr.length)
        {
            var t = e.arr[0];
            t.UpdateData = Date.now(), MapAccounts[t.Num] = t, SetNameAccTo();
        }
    }), SetNameAccTo();
};

function SetNameAccTo()
{
    var e = ParseNum($("idTo").value), t = $("idNameTo"), n = MapAccounts[e], a = "To: " + GetAccountText(n, e, 1);
    t.value !== a && (t.value = a, n && n.MyAccount ? t.className = "smallbold" : t.className = "");
};

function GetAccountText(e,t,n)
{
    if(e)
    {
        var a = e.Name;
        if(a = a && 0 !== a.length ? t + ". " + a : t, n)
            a += " (" + SUM_TO_STRING(e.Value, e.Currency) + ")";
        return a;
    }
    return t;
};

function OnEditIdTo()
{
    CheckNameAccTo(), OnEditTransactionFields();
};

function OnEditTransactionFields()
{
    IsVisibleBlock("edit_transaction") && CreateTransaction(), SetCurCurencyName(), SaveValues();
};

function SetCurCurencyName()
{
    var e = ParseNum($("idAccount").value), t = MapAccounts[e];
    t && ($("idCoinName").value = CurrencyName(t.Currency));
};

function CreateTransaction(t,e,n)
{
    CheckNameAccTo(), CheckSending();
    var a = ParseNum($("idAccount").value);
    if(e && 0 === a)
        SetError("Select valid 'From account'");
    else
    {
        var r = $("idTo").value.trim(), i = 0, o = "", c = ParseNum(r);
        if(r !== "" + c && (66 !== r.length || "02" !== r.substr(0, 2) && "03" !== r.substr(0, 2) || !IsHexStr(r) ? (c = 0, o = "") : (c = 0,
        (o = r) === PubKeyStr && (i = 1))), e && c <= 0 && "" === o && !AttachItem)
            SetError("Valid 'Pay to' - required!");
        else
        {
            var u = $("idDescription").value.substr(0, 200), s = $("idSumSend").value, d = s.indexOf(".");
            if(0 <= d)
                var S = s.substr(0, d), l = s.substr(d + 1);
            else
                S = s, l = "0";
            l += "000000000";
            var m = {SumCOIN:ParseNum(S), SumCENT:ParseNum(l.substr(0, 9))}, T = 0, A = MapAccounts[a];
            A && (T = A.Value.OperationID);
            var v = [];
            AttachItem && ((v = AttachItem.Data.Body) || (v = []));
            var N = [];
            o && (N = GetArrFromHex(o));
            var f = {Type:111, Version:3, Reserve:0, FromID:a, OperationID:T, To:[{PubKey:N, ID:c, SumCOIN:m.SumCOIN, SumCENT:m.SumCENT}],
                Description:u, Body:v, Sign:CurrentTR.Sign};
            Object.defineProperties(f, {bFindAcc:{configurable:!0, writable:!0, enumerable:!1, value:i}}), Object.defineProperties(f, {Run:{configurable:!0,
                    writable:!0, enumerable:!1, value:n}}), JSON.stringify(f) !== JSON.stringify(CurrentTR) ? (CurrentTR = f, GetSignTransaction(f,

function (e)
            {
                CurTransactionToForm(!0), t && t(e);
            })) : t && t(CurrentTR);
        }
    }
};

function SignJSON(t)
{
    if(!$("idSignJSON").disabled)
    {
        var e = GetTransactionFromJSON();
        e && (CurrentTR = e, GetSignTransaction(e, function (e)
        {
            CurTransactionToForm(!0), t && t();
        }));
    }
};

function CheckSending(e)
{
    MaxBlockNum = GetCurrentBlockNumByTime();
    var t = IsPrivateMode(), n = "Send", a = "Sign JSON";
    if(t || (a = n = " "), t)
    {
        var r = ParseNum($("idAccount").value), i = MapAccounts[r];
        i && i.NextSendTime && i.NextSendTime > MaxBlockNum && (e && SetStatus("Transaction was sending. Wait... (" + i.LastTransactionText + ")"),
        t = !1, n = "Wait...");
    }
    return $("idSendButton").disabled = !t, $("idSendButton").value = n, $("idSignJSON").disabled = !t, $("idSignJSON").value = a,
    t;
};

function AddWhiteList()
{
    var e = ParseNum($("idTo").value);
    e && $("idWhiteOnSend").checked && (localStorage["White:" + e] = 1);
};

function SendMoneyBefore()
{
    if(!$("idSendButton").disabled)
    {
        var e = ParseNum($("idTo").value), t = MapAccounts[e];
        if(localStorage["White:" + e] || !$("idSumSend").value || t && t.MyAccount)
            SendMoney();
        else
        {
            var n = " to " + GetAccountText(t, e);
            $("idWhiteOnSend").checked = 0, $("idOnSendText").value = $("idSumSend").value + " " + $("idCoinName").value + n, SetVisibleBlock("idBlockOnSend",
            1), SetImg(this, "idBlockOnSend");
        }
    }
};

function SendMoney2()
{
    AddWhiteList(), SendMoney();
};

function SendMoney()
{
    CanSendTransaction ? (CheckSending(!0), $("idSendButton").disabled || (SetVisibleBlock("idBlockOnSend", 0), CreateTransaction(SendMoneyTR,
    !0, ClearAttach))) : SetError("Can't Send transaction");
};

function GetJSONFromTransaction(e)
{
    for(var t = JSON.parse(JSON.stringify(e)), n = 0; n < t.To.length; n++)
    {
        var a = t.To[n];
        a.PubKey = GetHexFromArr(a.PubKey);
    }
    return t.Body = GetHexFromArr(t.Body), t.Sign = GetHexFromArr(t.Sign), JSON.stringify(t, "", 4);
};

function GetTransactionFromJSON()
{
    var e = $("idTransaction").value;
    try
    {
        var t = JSON.parse(e);
    }
    catch(e)
    {
        return void SetError(e);
    }
    for(var n = 0; n < t.To.length; n++)
    {
        var a = t.To[n];
        a.PubKey = GetArrFromHex(a.PubKey), a.SumTER && void 0 === a.SumCOIN && (a.SumCOIN = a.SumTER, delete a.SumTER);
    }
    return t.Body = GetArrFromHex(t.Body), t.Sign = GetArrFromHex(t.Sign), t;
};

function SendMoneyJSON()
{
    if(CanSendTransaction)
    {
        var e = GetTransactionFromJSON();
        e && SendMoneyTR(e);
    }
    else
        SetError("Can't Send transaction");
};

function SignAndSendFromJSON()
{
    SignJSON(SendMoneyJSON);
};

function GetTransactionText(e,t)
{
    var n;
    if(e)
    {
        if(e.Type === TYPE_TRANSACTION_CREATE)
            n = "New account " + e.Name.substr(0, 20);
        else
            if(111 === e.Type)
            {
                var a = {}, r = {SumCOIN:0, SumCENT:0};
                n = e.FromID + "/" + e.OperationID + " to ";
                for(var i = 0; i < e.To.length; i++)
                {
                    var o = e.To[i];
                    o.ID === e.FromID || a[o.ID] || (a[o.ID] = 1, ADD(r, o), 0 === i && (n += "["), n.length < 16 ? (0 < i && (n += ","), o.ID || o.PubKey && 66 !== o.PubKey.length ? n += o.ID : n += GetHexFromArr(o.PubKey).substr(0,
                    8)) : "." !== n.substr(n.length - 1) && (n += "..."));
                }
                n += "] " + SUM_TO_STRING(r), n += " " + e.Description.substr(0, 20).replace(/\n/g, "");
            }
    }
    else
        n = t || "";
    return n;
};

function SendMoneyTR(e)
{
    var t = GetArrFromTR(e);
    WriteArr(t, e.Sign, 64), t.length += 12, SendTransaction(t, e, void 0, function (e,t,n)
    {
        if(!e)
        {
            var a = MapAccounts[t.FromID];
            if(a)
            {
                var r = GetHexFromArr(sha3(n)), i = GetCurrentBlockNumByTime();
                a.LastTransactionText = GetTransactionText(t), a.NextSendTime = i + 10, MapCheckTransaction[r] = a, CheckSending();
            }
        }
    });
};

function ClearTransaction()
{
    PayList = [], ClearAttach(), CheckSendList(1);
    for(var e = ["idAccount", "idTo", "idSumSend", "idDescription"], t = 0; t < e.length; t++)
        $(e[t]).value = "";
    SaveValues(), CreateTransaction();
};

function StartEditTransactionJSON()
{
    $("idTransaction").className = "smallbold";
};

function EditJSONTransaction()
{
    var e = "edit_transaction", t = $("idTransaction");
    IsVisibleBlock(e) ? SetVisibleBlock(e, !1) : (CreateTransaction(), SetVisibleBlock(e, !0)), t.className = "";
};
var glNumPayCount = 0;

function GetInvoiceHTML(e,t,n)
{
    e.num || (glNumPayCount++, e.num = glNumPayCount);
    var a = "idSendInvoice" + e.num, r = "";
    return e.Data.Amount ? r += "<B>" + e.Data.Amount + "</B> Tera" : r += "<B style='color:green'>No pay</B>", "<button id='" + a + "' onclick='" + t + "' class='" + n + "'>" + (r += "&#x00A;" + e.num + ". " + e.Data.name) + "</button>";
};

function AddSendList(e)
{
    PayList.push({Data:e});
};

function CheckSendList(e)
{
    TitleWarning = PayList.length, AttachItem && TitleWarning++;
    var t = localStorage.InvoiceList;
    if(t || e)
    {
        if(e || SelectTab("TabSend"), t)
        {
            for(var n = JSON.parse(t), a = 0; a < n.length; a++)
                AddSendList(n[a]);
            localStorage.InvoiceList = "";
        }
        var r = $("idSendList");
        if(PayList.length)
        {
            r.innerHTML = "<DIV id='PaiListInfo'>Select the item you want to sign (pay) and send to blockchain:</DIV>";
            for(a = 0; a < PayList.length; a++)
            {
                var i = PayList[a];
                r.innerHTML += GetInvoiceHTML(i, "UseInvoice(" + a + ")", "btinvoice");
            }
            void 0 === AttachItem && UseInvoice(0);
        }
        else
            r.innerHTML = "";
    }
};

function UseInvoice(e)
{
    var t = PayList[e];
    t.Data.From && ($("idAccount").value = t.Data.From), $("idTo").value = t.Data.To, $("idSumSend").value = t.Data.Amount, $("idDescription").value = t.Data.Description,
    PayList.splice(e, 1), AttachItem = t, $("idAttach").innerHTML = GetInvoiceHTML(AttachItem, "OpenAttach()", "btinvoice btinvoice_use"),
    CheckSendList(1);
};

function ClearAttach()
{
    AttachItem = void 0, $("idAttach").innerHTML = "";
};

function OpenAttach()
{
    if(AttachItem)
    {
        var e = JSON.parse(JSON.stringify(AttachItem.Data));
        e.Body && (e.Body = GetHexFromArr(e.Body)), delete e.TransferSecret, alert("DATA:\n" + JSON.stringify(e, "", 4));
    }
};

function SendTrCreateAcc(e,t,n,a,r,i,o)
{
    var c = GetTrCreateAcc(e, t, n, a, r), u = GetBodyCreateAcc(c);
    if(c.bFindAcc = 1, o)
    {
        var s = {name:n, To:0, Amount:CONFIG_DATA.PRICE_DAO.NewAccount, Description:"Create acc: " + n, Body:u};
        AddToInvoiceList(s);
    }
    else
        SendTransaction(u, c, MIN_POWER_POW_ACC_CREATE);
    $("idAccountName").value = "", CancelCreateAccount();
};

function ChangeSmart(e,t)
{
    if(!IsPrivateMode())
        return SetError("Pls, open wallet"), 0;
    var n = prompt("Enter smart number:", t);
    if(null !== n && n != t)
    {
        var a = parseInt(n), r = 0, i = MapAccounts[e];
        i && (r = i.Value.OperationID);
        var o = {Type:140, Account:e, Smart:a, FromNum:e, Reserve:[], OperationID:r, Sign:""}, c = [];
        WriteByte(c, o.Type), WriteUint(c, o.Account), WriteUint32(c, o.Smart), WriteArr(c, o.Reserve, 10), WriteUint(c, o.FromNum),
        WriteUint(c, o.OperationID), SendTrArrayWithSign(c, o.Account, o);
    }
};

function CheckLengthAccDesription(e,t)
{
    var n = $(e).value.substr(0, t + 1), a = t - toUTF8Array(n).length;
    a < 0 ? SetError("Bad length") : SetStatus("Lost: " + a + " bytes");
};
setInterval(CheckSendList, 200);
