
let theAzkar=document.querySelector(".azkar");

let azkarAlsabahURL="https://ahegazy.github.io/muslimKit/json/azkar_sabah.json";
let azkarAlsabahTitle="أذكار الصباح";
let azkarAlmassaURL="https://ahegazy.github.io/muslimKit/json/azkar_massa.json";
let azkarAlmassaTitle="أذكار المساء";
let azkarPostPrayerURL="https://ahegazy.github.io/muslimKit/json/PostPrayer_azkar.json";
let azkarPostPrayertitle="أذكار بعد الصلاة";

//Getting Azkar Api BY USing Promise
let getData=(jsonFile) => {
    return new Promise(function (resolver, rejecter) {
        let req=new XMLHttpRequest();
        req.open("GET", jsonFile, true);
        req.send();
        req.onload=function () {
            if(this.readyState==4&&this.status==200) {
                resolver(JSON.parse(this.responseText));
            } else {
                rejecter(Error("No Data Found"));
            }
        };

    });

};


function getAzkar () {
    let div=document.createElement("div");
    div.className="azkarType";
    let azkarSabahTitle=document.createElement("p");
    azkarSabahTitle.textContent="أذكار الصباح";
    let azkarmassaTitle=document.createElement("p");
    azkarmassaTitle.textContent="أذكار المساء";
    let azkarPostPrayerTitle=document.createElement("p");
    azkarPostPrayerTitle.textContent="أذكار بعد الصلاة";

    div.append(azkarSabahTitle, azkarmassaTitle, azkarPostPrayerTitle);
    theAzkar.append(div);

    azkarSabahTitle.addEventListener("click", () => {
        getTheAzkar(azkarAlsabahURL, azkarAlsabahTitle);
    });
    azkarmassaTitle.addEventListener("click", () => {
        getTheAzkar(azkarAlmassaURL, azkarAlmassaTitle);
    });
    azkarPostPrayerTitle.addEventListener("click", () => {
        getTheAzkar(azkarPostPrayerURL, azkarPostPrayertitle);
    });

    getAllAzkar();
}

function getAllAzkar () {
    getData("JS/adhkar.json")
        .then((result) => {
            let div=document.createElement("div");
            div.className="azkarType";
            for(let i=1; i<result.length; i++) {

                let azkarTitle=document.createElement("p");
                azkarTitle.textContent=result[i].category;

                div.append(azkarTitle);
                theAzkar.append(div);

                azkarTitle.addEventListener("click", () => {
                    theAzkar.innerHTML="";
                    let AzkarElsabahDiv=document.createElement("div");
                    AzkarElsabahDiv.className="AzkarElsabah";

                    let headtitle=document.createElement("div");
                    headtitle.className="headEle";
                    let heading=document.createElement("h2");
                    headtitle.appendChild(heading);
                    heading.className="azkarheading";
                    heading.textContent=result[i].category;
                    for(let j=0; j<result[i].array.length; j++) {
                        AzkarElsabahDiv.innerHTML+=`
                            <div class="alAzkar">
                                <ul class="zekr">
                                    <li><span>الذكر</span>${result[i].array[j].text}</li>
                                    <li><span>التكرار</span>${result[i].array[j].count}</li>
                                </ul>
                            </div>
                        `;
                    }
                    theAzkar.append(headtitle, AzkarElsabahDiv);
                });
            }
        })
        .catch((error) => console.log(error));
}

function getTheAzkar (apiUrl, azkarTitle) {
    theAzkar.innerHTML="";
    // اذكار الصباح
    fetch(apiUrl)
        .then((response) => response.json())
        .then((res) => {
            let AzkarElsabahDiv=document.createElement("div");
            AzkarElsabahDiv.className="AzkarElsabah";

            let headtitle=document.createElement("div");
            headtitle.className="headEle";
            let heading=document.createElement("h2");
            headtitle.appendChild(heading);
            heading.className="azkarheading";
            heading.textContent=azkarTitle;
            for(let i=0; i<res.content.length; i++) {
                if(res.content[i].bless=="") {
                    AzkarElsabahDiv.innerHTML+=`
                    <div class="alAzkar">
                        <ul class="zekr">
                            <li><span>الذكر</span> ${res.content[i].zekr}</li>
                            <li><span>التكرار</span>  ${res.content[i].repeat}</li>
                        </ul>
                    </div>
                `;
                } else {
                    AzkarElsabahDiv.innerHTML+=`
                        <div class="alAzkar">
                            <ul class="zekr">
                                <li><span>الذكر</span> ${res.content[i].zekr}</li>
                                <li><span>الفاىْدة</span> ${res.content[i].bless}</li>
                                <li><span>التكرار</span>  ${res.content[i].repeat}</li>
                            </ul>
                        </div>
                    `;
                }
            }
            theAzkar.append(headtitle, AzkarElsabahDiv);
        });
}


getAzkar();
