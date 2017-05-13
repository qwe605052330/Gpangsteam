//根据id获取单个元素
function my$(id) {
    return document.getElementById(id);
}


//获取innerText或者是获取textContent
function getInnerTxt(element) {//element表示的标签
    return element.innerText ? element.innerText : element.textContent;
}
//设置innerText或者是设置textContent
function setInnerText(element, value) {
    if (element.innerText) {
        element.innerText = value;
    } else {
        element.textContent = value;
    }
}
//获取的是当前父级元素中的第一个子元素----兼容代码
function getFirstElement(element) {
    if (element.firstElementChild) {
        //浏览器如果支持这个属性则直接返回第一个子元素
        return element.firstElementChild;
    } else {//浏览器不支持firstElementChild属性
        var node = element.firstChild;//获取父元素中的第一个子节点
        //如果node不为空,并且node的类型是1,则证明是一个标签,如果不是则继续找后面的子节点
        while (node && node.nodeType != 1) {
            node = node.nextSibling;//当前子节点的下一个节点
        }
        //如果循环结束,表示node中存储的是一个标签节点
        return node;
    }
}


//获取的是当前父级元素中的最后一个子元素---兼容代码
function getLastElement(element) {
    if (element.lastElementChild) {//浏览器支持这个属性则直接返回
        return element.lastElementChild;
    } else {//浏览器不支持这个属性
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            //这个节点不是标签,继续向前找节点
            node = node.previousSibling;
        }
        return node;
    }
}


//获取当前元素的后一个兄弟元素
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
//获取当前元素的前一个兄弟元素
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
//获取当前元素的兄弟元素
function getSiblingElement(element) {
    var elements = [];//保存当前元素的前面所有元素和后面所有元素
    var ele = element.previousSibling;
    while (ele) {
        if (ele.nodeType == 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = element.nextSibling;
    while (ele) {
        if (ele.nodeType == 1) {
            elements.push(ele);
        }
        ele = ele.nextSibling;
    }
    return elements;
}

//产生十六进制颜色值
function getColor() {
    var str="#";
    var hex=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    for(var i=0;i<6;i++){
        var num=parseInt(Math.random()*16);
        str+=hex[num];
    }
    return str;
}

function animate(element,json,fn) {
    clearInterval(element.timeId);
    element.timeId=setInterval(function () {
        var flag=true;//假设都达到了目标
        for(var attr in json){
            if(attr=="opacity"){//判断属性是不是opacity
                var current= getAttrValue(element,attr)*100;
                //每次移动多少步
                var target=json[attr]*100;//直接赋值给一个变量,后面的代码都不用改
                var step=(target-current)/10;//(目标-当前)/10
                step=step>0?Math.ceil(step):Math.floor(step);
                current=current+step;
                element.style[attr]=current/100;
            }else if(attr=="zIndex"){//判断属性是不是zIndex
                element.style[attr]=json[attr];
            }else{//普通的属性

                //获取当前的位置----getAttrValue(element,attr)获取的是字符串类型
                var current= parseInt(getAttrValue(element,attr))||0;
                //每次移动多少步
                var target=json[attr];//直接赋值给一个变量,后面的代码都不用改
                var step=(target-current)/10;//(目标-当前)/10
                step=step>0?Math.ceil(step):Math.floor(step);
                current=current+step;
                element.style[attr]=current+"px";
            }
            if(current!=target){
                flag=false;//如果没到目标结果就为false
            }
        }
        if(flag){//结果为true
            clearInterval(element.timeId);
            if(fn){//如果用户传入了回调的函数
                fn(); //就直接的调用,
            }
        }
        console.log("target:"+target+"current:"+current+"step:"+step);
    },10);
}
