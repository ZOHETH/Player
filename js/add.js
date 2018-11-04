var addI=document.getElementById("plus"),
    addBox=document.getElementById("add-box"),
    addText=document.getElementById("add-text")
    addR=document.getElementsByClassName("fa-remove")[0],    
    
    search=document.getElementsByClassName("add-online")[0],
    searchI=search.getElementsByTagName("div")[0],
    searchT=search.getElementsByTagName("article")[0],
    searchR=document.getElementsByClassName("fa-reply")[0],
 
    
    local=document.getElementsByClassName("add-local")[0],
    localI=local.getElementsByTagName("div")[0],
    localT=local.getElementsByTagName("article")[0];

    // 网易云音乐模块
var searchBox=document.getElementById("search-box");
var keyword = document.getElementById('keyword'); // 搜索歌名
var searchBtn = document.getElementById('search-btn'); // 搜索按钮
var result = document.getElementById('result'); // 结果区
var toPlay = document.getElementById('to-play'); // 立即播放按钮
    
var flag=false;
var open=false;
addI.onclick=function(){
    if(open){
        addText.classList.remove("textApp");
        addBox.classList.remove("trueApp");
        addText.classList.add("textRemove");
        addBox.style.opacity="0";
        open=false;
    }
    else{
        addText.classList.remove("textRemove");
        addText.classList.add("trueApp");
        addBox.classList.add("trueApp");
        addBox.style.opacity="3";
        open=true;
    }
}
addR.onclick=function(){
    if(open){
        addText.classList.remove("tureApp");
        addBox.classList.remove("trueApp");
        addText.classList.add("textRemove");
        addBox.style.opacity="0";
        searchI.classList.remove("searchMove");
        searchBox.style.zIndex="1";
        searchBox.style.opacity="0";   
        flag=false;
        open=false;
    }
}

searchI.onclick=function(){
    searchI.classList.remove("app");
    searchT.classList.remove("trueApp");   
    searchI.classList.add("searchMove");
    addBox.style.zIndex="1";
    addBox.style.opacity='0';
    searchBox.style.zIndex="3";
    searchBox.style.opacity="1";
    flag=true;
}
searchR.onclick=function(){
    searchI.classList.remove("searchMove");
    addBox.style.zIndex="3";
    addBox.style.opacity='1';
    searchBox.style.zIndex="1";
    searchBox.style.opacity="0";   
    flag=false;
}
searchI.onmouseover=function(){
    if(!flag)
    {
        searchI.classList.add("app");
        searchT.classList.add("trueApp");
    }
    
}
searchI.onmouseleave=function(){
    searchI.classList.remove("app");
    searchT.classList.remove("trueApp");
}
localI.onmouseover=function(){
    if(!flag)
    {
        localI.classList.add("app");
        localT.classList.add("trueApp");
    }
    
}
localI.onmouseleave=function(){
    localI.classList.remove("app");
    localT.classList.remove("trueApp");
    
}


searchBtn.addEventListener('click', function () {
    var value = keyword.value;
    if (!value) {
        alert('???');
        return;
    }
    var url = "http://s.music.163.com/search/get/";
    var data = {
        "type": 1,
        "limit": 20,
        "s": value,
        "callback": "jsonpcallback"
    };
    var buffer = [];
    for (var key in data) {
        buffer.push(key + '=' + encodeURIComponent(data[key]));
    }
    var fullpath = url + '?' + buffer.join('&');
    CreateScript(fullpath);
});

function CreateScript (src) {
    var el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.defer = true;
    document.body.appendChild(el);
};

function jsonpcallback (rs) {
    var li=result.getElementsByTagName("li");
    if(rs.result.songs.length==0)
    {
        li[0].innerHTML = "没有找到结果╮(╯-╰)╭";
        result.style.opacity="1";
    }
    for(var i=0;i<rs.result.songs.length;i++)
    {
        var j=i%4;
        var resultHtml = "<a href='javascript:;' id='to-play'>" + rs.result.songs[0].name + '</a>' + 
                     "<strong>" + rs.result.songs[i].artists[i].name + '</strong>';	
        li[j].innerHTML = resultHtml;
        li[j].setAttribute('data-audio', rs.result.songs[i].audio);
        li[j].setAttribute('data-img', rs.result.songs[i].album.picUrl);
        li[j].setAttribute('data-music', rs.result.songs[i].name);
        li[j].setAttribute('data-singer', rs.result.songs[i].artists[0].name);
    result.style.opacity = '1';
    }
    
    

};