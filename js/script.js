/**
*   Author: Ahmad Zubair Amar
*   E-Email: ahmad.zubair.amar@gmail.com
*   Date: 2018 April 22
*
**/

window.onload = loaded;
var keys;
var toType;
var typingArea;
var keysPlusShift;
var counter;

// max char length for editor
var maxCharLength = 80;

function loaded() {
    initLessonsSelectMenu($("#lessons-select"));
    setToTypeText(0);// 0 is the index of lesson from lessons.js
    init();
}

function init() {

    // max length of char in both 85

    $("#typingArea").value = "";
    // lessons are defined in lessons.js
    typingArea = $("#typingArea");

    // keys
    keys = $All("div[key-text]");
    keysPlusShift = $All("div[shift-key-text]");
    typingArea.addEventListener("keyup", typing);
    // initial highlight
    highLight();
}

function typing(event) {

    // if text reachs 85 char reset position
    if(event.target.value.length >= maxCharLength){
        event.target.value = "";
        $("#toType").innerText = $("#toType").innerText.substring(0, maxCharLength);
    }

    //check if lesson is completed
    
    

    rmhighLight();
    highLight();
}

function highLight() {
    rmhighLight();

    var shifts = $All(".shift");
    var keyText = $("#toType").innerText[typingArea.value.length];
    let nodeToHighLight = $(`div[key-text='${keyText}']`);
    if (nodeToHighLight) {
        nodeToHighLight.className += " " + "highlight";
    } else {

        // if here so it is a second letter key
        // it needs to be shift enabled
        nodeToHighLight = $(`div[shift-key-text='${keyText}']`);
        nodeToHighLight.className += " " + "highlight";

        shifts[0].className += " " + "highlight";
        shifts[1].className += " " + "highlight";

    }
    //if the enterd letter is wrong change the background
    if ($("#toType").innerText[typingArea.value.length - 1] != typingArea.value[typingArea.value.length - 1]) {
        $("#typingArea").style.backgroundColor = "#e91e6373";
        // counter.innerText = parseInt(counter.innerText) + 1
    }
}

function rmhighLight() {
    //first dehighlight all keys which are highlighted
    var highLighted = $All(".highlight");
    for (let index = 0; index < highLighted.length; index++) {
        highLighted[index].classList.remove("highlight");
    }
    $("#typingArea").style.backgroundColor = "#2196f38c";

}

function initLessonsSelectMenu(select) {
    // lessons obj coms from lessons.js

    for (let index = 0; index < lessons.length; index++) {

        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode((index + 1) + " لوست"));
        opt.setAttribute("value", index);
        select.appendChild(opt);

    }

    select.addEventListener("change", (event) => {
        // if the value is empty, return!!
        if (!event.target.value) return;
        //change the text of toType
        setToTypeText(event.target.value);
        //reset all
        init();
    });
}

function setToTypeText(lessonIndex) {
    $("#toType").innerText = lessons[lessonIndex].trim();
}

function $(el) {
    return document.querySelector(el);
}

function $All(el) {
    return document.querySelectorAll(el);
}