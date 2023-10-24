let theRadios=document.querySelector(".radios"),
    theQaree=document.querySelector(".radios .qaree"),
    theRadioController=document.querySelector(".radios .radioControl"),
    theradioAudio=document.querySelector(".radios .radioControl audio");


function getRadiosUrl () {
    fetch("https://www.mp3quran.net/api/v3/radios?language=ar").then((response) => response.json()).then((data) => {
        for(let i=0; i<data.radios.length; i++) {
            if(data.radios[i].id==31||data.radios[i].id==70||data.radios[i].id==75||data.radios[i].id==78||data.radios[i].id==80||data.radios[i].id==9||data.radios[i].id==91||data.radios[i].id==4||data.radios[i].id==110||data.radios[i].id==111||data.radios[i].id==15||data.radios[i].id==18||data.radios[i].id==3||data.radios[i].id==34||data.radios[i].id==69||data.radios[i].id==64||data.radios[i].id==69||data.radios[i].id==128) {
                let qareeDetails=document.createElement("div");
                qareeDetails.className="qaraaData";

                let qareeName=document.createElement("p");
                qareeName.className="qareename";
                qareeName.innerHTML=`${data.radios[i].name}`;

                qareeDetails.append(qareeName);
                theQaree.append(qareeDetails);


                qareeDetails.addEventListener('click', () => {

                    theradioAudio.src=data.radios[i].url;

                });
            }
        }

        let allQarees=document.querySelectorAll(".qaree .qaraaData");
        allQarees.forEach((qaree) => {
            qaree.addEventListener("click", () => {
                allQarees.forEach((qare) => {
                    qare.classList.remove("clicked");
                });
                qaree.classList.add("clicked");

            });
        });

    });
}


getRadiosUrl();