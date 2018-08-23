// NOTE: The $ function is located at main.js

let vm = new Vue({
    el: "#app",
    data: {
        'totype': '',
        'typed': '',
        'keypressed': '',
        'typo': false,
        'shiftkeyletter': false
    }, computed: {
        // computed getter nextletter
        nextletter: function () {
            return vm.totype[vm.typed.length];
        }
    }
});


// get the key text and add that to the keypressed string
// this event listener will be called with every keyup event
document.addEventListener('keyup', (event) => {
    // by default typo is false
    vm.typo = false;

    // if the prseed key is Backspace remove the last char
    if (event.key == "Backspace") {
        vm.typed = vm.typed.replace(/.$/, "");
        return;
    }
    
    
    
    // scroll functionality
    if(vm.typed.length >= 30) {
        let sliceN = 1;
        vm.typed = vm.typed.slice(sliceN);
        vm.totype = vm.totype.slice(sliceN);
    }


    // if all text is typed add no more chars to "typed"
    if (vm.typed.length == vm.totype.length) return;

    // if the key one letter (number or letter) add it
    // otherwise it is a controle key
    if (event.key.match(/^.?$/)) vm.typed += event.key;
});

// add new event listener to called every time no matter what, but at the end of the first event listner
document.addEventListener("keyup", (e) => heighlight());

// set the default lesson
vm.totype = lessons[0].trim();

var previousletter;
function heighlight() {
    let nextLetterKey = "[key-text='" + vm.nextletter + "']";
    let nextShiftLetterKey = "[shift-key-text='" + vm.nextletter + "']";

    // if there is a typo don't highlight any letter key
    // if(vm.typo = true)return;

    // by default next letter is not a shift key one
    vm.shiftkeyletter = false;


    // this line is to remove the style from previous letter key
    if (previousletter) previousletter.classList.remove("nextletterstyle");


    // check the nextletter and add the style to the next letter one
    let nextLetter = previousletter = $(".key" + nextLetterKey) || (function IIFE() {

        let tmp = $(".key" + nextShiftLetterKey);
        //if there is a shift key
        if (tmp) vm.shiftkeyletter = true;
        return tmp;
    })();

    // if the nextletter is undefined null or ... return
    if (!nextLetter) return;
    // heighlight next letter
    nextLetter.classList.add("nextletterstyle");

};
heighlight();


// select lessons menu
(function (select) {
    // lessons obj coms from lessons.js

    for (let index = 0; index < lessons.length; index++) {

        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode((index + 1) + " لوست"));
        opt.setAttribute("value", index);
        select.appendChild(opt);

    }

    select.addEventListener("change", (event) => {
        //change the text of toType
        vm.typed = "";
        vm.totype = lessons[event.target.value].trim();
        heighlight();
    });
})($("#select-lesson"));
