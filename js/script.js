/**
*   Author: Ahmad Zubair Amar
*   E-Email: ahmad.zubair.amar@gmail.com
*   Date: 2018 April 22
*
**/

window.onload = init;
var keys;
var toType;
var typingArea;
function init(){
    // lessons are defined in lessons.js
    toType = document.getElementById("toType");
    typingArea = document.getElementById("typingArea");
    keys = document.querySelectorAll("div[key-text]");
    toType.innerText = lessons["lesson1"].trim();

    typingArea.addEventListener("keyup", typing);

    // initial highlight
    highLight();
}

function typing(event){
    highLight();
}

function highLight(){

    //first dehighlight all keys which are highlighted
    var highLighted = document.getElementsByClassName("highlight");
    for (let index = 0; index < highLighted.length; index++) {
        highLighted[index].classList.remove("highlight");
        document.getElementsByClassName("keyboard")[0].style.backgroundColor = "#009688";
    }

    var keyText = toType.innerText[typingArea.value.length];
    let nodeToHighLight = document.querySelector(`div[key-text='${keyText}']`);
    if(nodeToHighLight)
        nodeToHighLight.className += " " + "highlight";

    //if the enterd letter is wrong change the background
    if(toType.innerText[typingArea.value.length - 1] != typingArea.value[typingArea.value.length -1 ]){
        document.getElementsByClassName("keyboard")[0].style.backgroundColor = "#E91E63";
    }
}

function remHighLight(text){
    if(!text)return;
    let one;
    for(let i = 0; i < text.length; i++){
        one = document.querySelector(`div[key-text='${text[i]}']`);
        one.style.fill = "#fcfcfc";
    }
}