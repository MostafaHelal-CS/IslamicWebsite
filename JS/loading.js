let Theloading=document.getElementById("loading");

function removeLoading () {
    Theloading.style.display="none";
}

window.onload=function () {
    setTimeout(removeLoading, 1000);
};