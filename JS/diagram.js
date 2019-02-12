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

var DiagramMap = {}, DiagramMapId = {}, LMouseOn = !1;

function SetHTMLDiagramItem(e,t)
{
  if(e.mouseX = t - 50, !e.Extern && !e.Delete)
  {
    e.id || (e.id = "DgrmId" + e.num), DiagramMap[e.name] = e, (DiagramMapId[e.id] = e).isLine ? e.text ? Str = "<div><strong>" + e.text + '</strong></div>' : Str = "<HR>" : Str = "<DIV>" + e.text + '</DIV><div class="canvasbrdr"><canvas  class="DIAGRAM" width="' + t + '" height="80" id="' + e.id + '"></canvas></div>';
    var a = document.getElementById("B" + e.id);
    if(a)
      a.innerHTML = Str;
    else
      document.getElementById("diargams").innerHTML += "<DIV id='B" + e.id + "'>" + Str + "</DIV>";
  }
};

function SetDiagramMouseX(e,t)
{
  if(e.srcElement && e.srcElement.className && e.srcElement.className.indexOf && 0 <= e.srcElement.className.indexOf("DIAGRAM") && ("down" === t ? LMouseOn = !0 : "up" === t && (LMouseOn = !1),
    e.preventDefault(), !0 === LMouseOn))
  {
    var a = e.srcElement, i = getMouse(a, e);
    if(!0 === e.ctrlKey)
      for(var r in DiagramMapId)
      {
        var o;
        (o = DiagramMapId[r]).mouseX = i.x, DrawDiagram(o);
      }
    else
      (o = DiagramMapId[a.id]) && (o.mouseX = i.x, DrawDiagram(o));
  }
};

function DrawDiagram(s)
{
  if(!s.Delete)
  {
    var e = s.arr;
    e || (e = s.ArrList);
    var d = s.value, t = s.steptime, a = s.startnumber, i = s.starttime, g = s.mouseX;
    if(e)
    {
      var m = document.getElementById(s.id), u = m.getContext("2d"), h = 50, r = 11;
      // if(s.fillStyle ? u.fillStyle = s.fillStyle : u.fillStyle = "#FFF", u.fillRect(0, 0, m.width, m.height), !(e.length <= 0))
      if(u.fillStyle = "#000", u.fillRect(0, 0, m.width, m.height), !(e.length <= 0))
      {
        var v = 0;
        "**" === s.name.substr(s.name.length - 2) && (v = 1);
        for(var o = e[0], n = e[0], l = 0, f = 0; f < e.length; f++)
          e[f] > o && (o = e[f]), e[f] < n && (n = e[f]), e[f] && (l += e[f]);
        "MAX:" === s.name.substr(0, 4) && s.AvgValue ? l = s.AvgValue : l /= e.length, v && l && (l = Math.pow(2, l) / 1e6), l = l < 50 ? l.toFixed(2) : Math.floor(l),
        void 0 !== s.MaxValue && (o = s.MaxValue), v && o && (o = Math.pow(2, o) / 1e6);
        var M = o;
        M <= 0 && (M = 1);
        var c = (m.width - h - 50) / e.length, D = (m.height - r - 15) / M, w = 0, T = s.line;
        s.zero && (T = 1, w -= s.zero * D, o -= s.zero, l -= s.zero), o = Math.floor(o + .5), u.lineWidth = T ? 3 : 1 < c ? c : 1;
        var p = h, S = m.height - 15, I = 0, y = void 0, x = void 0;
        if(s.red || (s.red = "#A00"), T ? H(e, "line", s.red) : (H(e, "red", s.red), 0 < d && H(e, "green", "#0A0")), u.lineWidth = .5,
          u.beginPath(), u.strokeStyle = "#fff", h--, p--, S += 2, u.moveTo(h, r), u.lineTo(p, S), u.moveTo(p, S + w), u.lineTo(m.width - 10,
          S + w), u.stroke(), void 0 !== g && (u.beginPath(), u.lineWidth = .5, u.strokeStyle = "#00F", u.moveTo(g, r), u.lineTo(g, S),
          u.stroke(), void 0 !== y))
        {
          u.fillStyle = x;
          var L = "" + Math.floor(y + .5);
          u.fillText(L, g - 3, 9);
        }
        if(u.fillStyle = "#fff", u.fillText(Rigth("          " + o, 8), 0, 8), 0 < o && 0 < l)
        {
          var O = S - r, X = l / o, E = O - Math.floor(X * O), b = E;
          b < 10 && (b = 10), u.beginPath(), u.moveTo(h - 2, E + r), u.lineTo(h + 2, E + r), u.stroke(), u.strokeStyle = "#00F", u.fillText(Rigth("          " + l,
            8), 0, b + r);
        }
        var A = 10;
        e.length < A && (A = e.length);
        var B, R, k = (m.width - h - 50) / A, P = 1, V = e.length / A;
        if(void 0 !== a)
          R = 1, B = a;
        else
        if(i)
        {
          R = 1, (B = Math.floor((Date.now() - i - t * e.length * 1e3) / 1e3)) < 0 && (B = 0), 0 == (P = 10 * Math.floor(V / 10)) && (P = 1);
        }
        else
          R = 0, B = Date.now() - t * e.length * 1e3, p -= 16;
        for(f = 0; f <= A; f++)
        {
          var z;
          if(f === A ? (z = e.length * t, P = 1) : z = 0 === f ? 0 : f * V * t, R)
            L = z = Math.floor((B + z) / P) * P;
          else
          {
            var F = new Date(B + 1e3 * z);
            L = "" + F.getHours(), L += ":" + Rigth("0" + F.getMinutes(), 2), L += ":" + Rigth("0" + F.getSeconds(), 2);
          }
          u.fillText(L, p + f * k, S + 10);
        }
      }
    }
  }

  function H(e,t,a)
  {
    u.beginPath(), u.moveTo(h, m.height - 15), u.strokeStyle = a;
    for(var i = 0; i < e.length; i++)
    {
      var r = e[i];
      if(r || (r = 0), v && r && (r = Math.pow(2, r) / 1e6), "green" === t)
      {
        if(d < r)
          continue;
      }
      else
      if("red" === t && r <= d)
        continue;
      var o = r;
      d < o && (o = d);
      var n = Math.floor(o * D), l = Math.floor(r * D);
      n === l && (n -= 2);
      var f = p + u.lineWidth / 2 + i * c;
      if(T || u.moveTo(f, S - n), u.lineTo(f, S - l), g)
        Math.abs(f - g) < Math.abs(I - g) && (I = f, y = r, s.zero && (y -= s.zero), x = a);
    }
    u.stroke();
  };
};

function InitDiagramByArr(e,t)
{
  for(var a = 0; a < e.length; a++)
    e[a].num = a + 1, SetHTMLDiagramItem(e[a], t);
  window.addEventListener("mousedown", function (e)
  {
    SetDiagramMouseX(e, "down");
  }, !1), window.addEventListener("mouseup", function (e)
  {
    SetDiagramMouseX(e, "up");
  }, !1), window.addEventListener("onmousemove", function (e)
  {
    SetDiagramMouseX(e, "move");
  }, !1);
};

function getMouse(e,t)
{
  var a = t.clientX - getTrueOffsetLeft(e);
  window.pageXOffset && (a += window.pageXOffset);
  var i = t.clientY - getTrueOffsetTop(e);
  return window.pageYOffset && (i += window.pageYOffset), {x:a, y:i};
};

function getTrueOffsetLeft(e)
{
  for(var t = 0; e; )
    t += e.offsetLeft || 0, e = e.offsetParent;
  return t;
};

function getTrueOffsetTop(e)
{
  for(var t = 0; e; )
    t += e.offsetTop || 0, e = e.offsetParent;
  return t;
};
