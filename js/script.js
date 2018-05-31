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
var keysPlusShift;
var counter;
function init() {
    // lessons are defined in lessons.js
    toType = document.getElementById("toType");
    typingArea = document.getElementById("typingArea");
    counter = document.getElementById("counter");

    // keys
    keys = document.querySelectorAll("div[key-text]");
    keysPlusShift = document.querySelectorAll("div[shift-key-text]");

    toType.innerText = lessons["lesson1"].trim();
    typingArea.addEventListener("keyup", typing);

    // initial highlight
    highLight();
}

function typing(event) {
    highLight();
}

function highLight() {

    var shifts = document.getElementsByClassName("shift");

    
    //first dehighlight all keys which are highlighted
    var highLighted = document.getElementsByClassName("highlight");
    for (let index = 0; index < highLighted.length; index++) {
        highLighted[index].classList.remove("highlight");
        document.getElementById("typingArea").style.backgroundColor = "#00d1b2";
    }
    shifts[0].classList.remove("highlight");
    shifts[1].classList.remove("highlight");

    // -----------------------------------------------------------------------
    var keyText = toType.innerText[typingArea.value.length];
    let nodeToHighLight = document.querySelector(`div[key-text='${keyText}']`);
    if (nodeToHighLight)
        nodeToHighLight.className += " " + "highlight";
    else {

        // if here so it is a second letter key
        // it needs to be shift enabled
        nodeToHighLight = document.querySelector(`div[shift-key-text='${keyText}']`);
        nodeToHighLight.className += " " + "highlight";
        
        shifts[0].className += " " + "highlight";
        shifts[1].className += " " + "highlight";

    }
    //if the enterd letter is wrong change the background
    if (toType.innerText[typingArea.value.length - 1] != typingArea.value[typingArea.value.length - 1]) {
        document.getElementById("typingArea").style.backgroundColor = "#E91E63";
        counter.innerText = parseInt(counter.innerText) + 1
    }
}