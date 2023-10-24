// Menu links part
let togglerBtn=document.querySelector(".toggler"),
    theNavLinks=document.querySelector(".links");

togglerBtn.addEventListener("click", () => {
    theNavLinks.classList.toggle("openNavLinks");
});



// Scroll to top button
let scrollBtn=document.getElementById("scrollToTop");

window.onscroll=() => {
    if(scrollY>500) {
        scrollBtn.style.display="block";
    } else {
        scrollBtn.style.display="none";
    }
};


scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.oncontextmenu=function () {
    alert("Not Allow To Use Right Click");
    return false; // cancel default menu
};

// document.onkeydown=function (event) {
//     if(event.keyCode==123) {
//         return false;
//     }
//     // Disable => Ctrl + shift  + i
//     else if(event.ctrlKey&&event.shiftKey&&event.keyCode==73) {
//         alert("Not Allow To Open Inspect");
//         return false;
//     }
//     // Disable => Ctrl + shift  + j
//     else if(event.ctrlKey&&event.shiftKey&&event.keyCode==74) {
//         alert("Not Allow To Open Inspect");
//         return false;
//     }
//     // Disable => Ctrl + shift  + c
//     else if(event.ctrlKey&&event.shiftKey&&event.keyCode==67) {
//         alert("Not Allow To Open Inspect");
//         return false;
//     }
// };

