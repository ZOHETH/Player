
var cw = document.body.clientWidth;
var cover = document.getElementById("cover");
var image = cover.getElementsByTagName("img")[0];
var song = document.getElementsByTagName("audio")[0];
var progressBar = document.getElementById("progressbar");
var progressBarTM = document.getElementById("progressbar-tm");
var upBun = document.getElementById("up");
var downBun = document.getElementById("down");
var mName = document.getElementsByTagName("i")[0];
var list=document.getElementById("list-text");
var listI=document.getElementById("list");
var wait=document.getElementById("wait");
var songLen, order = 0;//歌曲序号
var songDir = "CloudMusic//";
var probarLen;
var timer1, timer2, timer3;
var flag = 0;
var flash = 0;
var first=true;
var songName = new Array();
var oReq = new XMLHttpRequest();
oReq.onload = function () {
    songName = this.responseText.split("|");
    playIt();
}
oReq.open("get", "songname.php", true);
oReq.send();
//                                                  【播放】
cover.onclick = start;
function start() {
    minute = 0;
    if (flag) {
        song.pause();
        clean();
        cover.classList.remove("rotate");
        cover.classList.add("return");
        flag = 0;
    } else {
        song.play();if(song.currentTime==0&&!first)
        {
            wait.style.opacity="1";
            wait.classList.add("rotate");
            song.addEventListener("loadedmetadata", function(){
            addtime();
            wait.style.opacity="0";
            wait.classList.remove("rotate");
            cover.classList.remove("return");
            cover.classList.add("rotate");
            probar();
            timer3 = setInterval(loop, 10);  
            flag = 1;
        });
        }
        else
        {
            wait.classList.remove("rotate");
            cover.classList.remove("return");
            cover.classList.add("rotate");
            probar();
            timer3 = setInterval(loop, 10);  
            flag = 1;
	    first=false;
        }
        
    }
}
var playIt=function(d=1) {
    var ord = order;
    
    var temp = songName[order].split(".");
    var suffix = temp[temp.length - 1];
    while (suffix != 'mp3' && suffix != 'flac') {
        order+=d;
        if (order == songName.length)
            order = 0;
        else if(order == -1)
            order=songName.length-1;
        if (order == ord);
        return false;
        temp = songName[order].split(".");
        suffix = temp[temp.length - 1];
    }
    song.src = songDir + songName[order];
    mName.innerHTML=temp[0];
    song.load();
    song.ondurationchange = function () {
        songLen = song.duration;
    }
}
function addtime() {
    timer2 = setInterval(function () {  //时间计时器
        len = document.body.clientWidth;
        var cur = parseInt(song.currentTime);
        var temp = cur;
        var minute = parseInt(temp / 60);
        if (cur % 60 < 10) {
            time.innerHTML = "" + minute + ":0" + cur % 60 + "";
        } else {
            time.innerHTML = "" + minute + ":" + cur % 60 + "";

        }
    }, 10)
}
//进度条
{
    function probar() {
        songLen = song.duration;
        timer1 = setInterval(function () {   //进度条定时器
            var cur = song.currentTime;
            probarLen = parseFloat(cur / songLen) * cw;
            if(songLen*100-cur*100<10){
                down();
            }
        }, 10)
    }

    var canvas = document.getElementsByTagName("canvas")[0];
    var ctx = canvas.getContext("2d"),
        ctxw = canvas.width = 4 * cw,
        ctxh = canvas.height = 300,
        clear = function () {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, .1)';
            ctx.fillRect(0, 0, ctxw, ctxh);
            ctx.globalCompositeOperation = 'lighter';
        }
    var render = function () {
        ctx.save();
        ctx.translate(probarLen, 280);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(- probarLen, 0);
        ctx.lineWidth = 13;
        var gradient1 = ctx.createLinearGradient(0, 0, -probarLen, 0);
        if (flash)
            gradient1.addColorStop(0, 'hsla(220, 60%, 50%, 1)');
        else if (probarLen < 140)
            gradient1.addColorStop(0, 'hsla(220, 60%, 50%, .' + parseInt((200 - probarLen) / 2) + ')');
        else
            gradient1.addColorStop(0, 'hsla(220, 60%, 50%, .3)');
        gradient1.addColorStop(1, 'hsla(220, 60%, 50%, 0)');
        ctx.strokeStyle = gradient1;
        ctx.stroke();
        ctx.restore();
    },
        renderFlare = function () {

            ctx.save();
            ctx.translate(probarLen, 260);
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0, 30, 30, 0, Math.PI * 2, false);
            ctx.closePath();
            var gradient3 = ctx.createRadialGradient(0, 20, 0, 0, 20, 6);
            gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)');
            gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
            ctx.fillStyle = gradient3;
            ctx.fill();
            ctx.restore();

        },
        renderFlare2 = function () {
            ctx.save();
            ctx.translate(probarLen, 260);
            ctx.scale(1.5, 1);
            ctx.beginPath();
            ctx.arc(0, 30, 25, 0, Math.PI * 2, false);
            ctx.closePath();
            var gradient4 = ctx.createRadialGradient(0, 20, 0, 0, 20, 10);
            if (flash)
                gradient4.addColorStop(0, 'hsla(30, 80%, 50%, .4)');
            else
                gradient4.addColorStop(0, 'hsla(30, 80%, 50%, .2)');
            gradient4.addColorStop(1, 'hsla(30, 80%, 50%, 0)');
            ctx.fillStyle = gradient4;
            ctx.fill();
            ctx.restore();
        }
    ctx.shadowBlur = 25;
    ctx.shadowColor = 'hsla(' + 220 + ', 80%, 60%, .8)';
    ctx.lineCap = 'round'
    loop = function () {
        clear();
        render();
        renderFlare2();
    }





    progressBarTM.onclick = function (e) {
        song.currentTime = parseFloat(e.clientX / cw) * songLen;
    }
    progressBarTM.onmousedown = function (e) {
        document.onmousemove = function (e) {
            flash = 1;
            song.volume = 0;
            song.currentTime = parseFloat(e.clientX / cw) * songLen;
        }
    }
    document.onmouseup = function () {  //当鼠标松开后关闭移动事件和自身事件
        flash = 0;
        song.volume = 1;
        document.onmousemove = null;
        progressBarTM.onmouseup = null;
    }
}
//上一曲
upBun.onmousemove = function () {
    upBun.classList.add("appear");
}
upBun.onmouseleave = function () {
    upBun.classList.remove("appear");
}
downBun.onmousemove = function () {
    downBun.classList.add("appear");
}
downBun.onmouseleave = function () {
    downBun.classList.remove("appear");
}
upBun.onclick = function up() {
    song.pause();
    clean();
    cover.classList.remove("rotate");
    cover.classList.add("return");
    flag = 0;
    probarLen = 0;
    order--;
    if (order == -1) {
        order = songName.length - 1;
    }
    playIt(-1);
    start();
}
downBun.onclick=down;
function down () {
    song.pause();
    clean();
    cover.classList.remove("rotate");
    cover.classList.add("return");
    flag = 0;
    probarLen = 0;
    order++;
    if (order == songName.length)
        order=0;
    playIt(1);
    start();
}

function clean() {
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3);
}

listI.onmouseover=function(){
    list.style.width="15%";
    list.style.padding="0 2%";
    list.innerHTML="当前歌单: "+"不可更改~";
}
listI.onmouseleave=function(){
    list.style.width="0";
    list.style.padding="0";
    list.innerHTML="";
}

function resize() {
    cw=window.innerWidth;
}
window.addEventListener("resize",resize);

init();

