
let thePages=document.querySelector(".pages");

function getPage () {
    // Create input field to take page number
    let inputDiv=document.createElement("div");
    inputDiv.className="inputContainer";
    let theInput=document.createElement("input");
    theInput.type="number";
    theInput.className="inputNumber";
    theInput.placeholder="أدخل رقم الصفحة";
    let getBtn=document.createElement("input");
    getBtn.value="أضغط لايجاد الصفحة";
    getBtn.type="submit";
    inputDiv.append(theInput, getBtn);
    thePages.append(inputDiv);

    // Create page
    let page=document.createElement("div");
    page.className="pageContent";

    let nameOfSurah=document.createElement("p");
    nameOfSurah.className="surahname";

    getBtn.addEventListener('click', () => {
        function getThePage () {
            page.innerHTML="";
            nameOfSurah.innerHTML="";
            fetch(`http://api.alquran.cloud/v1/page/${theInput.value}/edition`).then((data) => data.json()).then((result) => {

                nameOfSurah.textContent=`${Object.values(result.data.surahs)[0].name}`;
                thePages.appendChild(nameOfSurah);

                for(let i=0; i<result.data.ayahs.length; i++) {
                    let span=document.createElement("span");
                    span.className="pageText";
                    span.innerHTML=` ${result.data.ayahs[i].text} [${result.data.ayahs[i].numberInSurah}] `;
                    page.append(span);
                    thePages.appendChild(page);
                }
                let nextAndPrevious=document.createElement("div");
                nextAndPrevious.className="nextAndPreviousBtn";
                let next=document.createElement("i");
                next.className="fa-solid fa-less-than next";

                let previos=document.createElement("i");
                previos.className="fa-solid fa-greater-than previous";

                nextAndPrevious.append(next, previos);
                page.append(nextAndPrevious);
            }).catch((error) => alert("The Total Number Of Quran Page is 604 Please Enter Number Between 1 and 604"));
        }
        getThePage();
        page.addEventListener("click", (e) => {
            if(e.target.classList.contains("next")) {
                theInput.innerHTML=++(theInput.value);
                getThePage();
            }
        });
        page.addEventListener("click", (e) => {
            if(e.target.classList.contains("previous")) {
                theInput.innerHTML=--(theInput.value);
                getThePage();
            }
        });

    });
}

getPage();