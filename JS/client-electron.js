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

const ipcRenderer = require('electron').ipcRenderer;

function GetDataElectron(Method,ObjPost,Func)
{
    if(Func === undefined)
    {
        Func = ObjPost;
        ObjPost = null;
    }
    var reply;
    try
    {
        reply = ipcRenderer.sendSync('GetData', {path:Method, obj:ObjPost});
    }
    catch(e)
    {
        reply = undefined;
    }
    if(Func)
        Func(reply);
};
window.GetData = GetDataElectron;
