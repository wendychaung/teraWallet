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

var MAX_SUM_TER = 1e9, MAX_SUM_CENT = 1e9;

function ADD(N,C)
{
    return N.SumCOIN += C.SumCOIN, N.SumCENT += C.SumCENT, N.SumCENT >= MAX_SUM_CENT && (N.SumCENT -= MAX_SUM_CENT, N.SumCOIN++),
    !0;
};

function SUB(N,C)
{
    return N.SumCOIN -= C.SumCOIN, N.SumCENT >= C.SumCENT ? N.SumCENT -= C.SumCENT : (N.SumCENT = MAX_SUM_CENT + N.SumCENT - C.SumCENT,
    N.SumCOIN--), !(N.SumCOIN < 0);
};

function DIV(N,C)
{
    N.SumCOIN = N.SumCOIN / C, N.SumCENT = Math.floor(N.SumCENT / C);
    var S = Math.floor(N.SumCOIN), O = Math.floor((N.SumCOIN - S) * MAX_SUM_CENT);
    return N.SumCOIN = S, N.SumCENT = N.SumCENT + O, N.SumCENT >= MAX_SUM_CENT && (N.SumCENT -= MAX_SUM_CENT, N.SumCOIN++), !0;
};

function FLOAT_FROM_COIN(N)
{
    return N.SumCOIN + N.SumCENT / 1e9;
};

function COIN_FROM_FLOAT(N)
{
    var C = Math.floor(N), S = {SumCOIN:C, SumCENT:Math.floor((N - C) * MAX_SUM_CENT)}, O = FLOAT_FROM_COIN(S);
    if(O != O)
        throw "ERR CHECK COIN_FROM_FLOAT";
    return S;
};

function ISZERO(N)
{
    return 0 === N.SumCOIN && 0 === N.SumCENT;
};

function COIN_FROM_STRING(N)
{
    throw "TODO: COIN_FROM_STRING";
};
"object" == typeof global && (global.ADD = ADD, global.SUB = SUB, global.DIV = DIV, global.ISZERO = ISZERO, global.FLOAT_FROM_COIN = FLOAT_FROM_COIN,
global.COIN_FROM_FLOAT = COIN_FROM_FLOAT, global.COIN_FROM_STRING = COIN_FROM_STRING);
