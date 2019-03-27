var clickObj = document.getElementsByClassName("current"),
    font = document.getElementsByClassName("font"),
    len = clickObj.length,
    content = document.getElementsByClassName("content");
console.log(font);
for(var i = 0; i < len; i++){
    (function(i){
        clickObj[i].onclick = function(){
            for(var j = 0; j < len; j ++){
                clickObj[j].className = "title current";
                content[j].className = "content unVisible";
                font[j].innerHTML = "&#xe647;";
            }
            this.className = "title active current";
            content[i].className = "content";
            font[i].innerHTML = "&#xe655;";
        }
    })(i)
}
//缺招聘和帮助中心