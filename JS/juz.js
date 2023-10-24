// Select quran parts
let quranParts=document.querySelector(".allquranParts");
let juzContent=document.querySelector(".juzContent");

// Create html Juz part
for(let i=1; i<=30; i++) {
    // Create div to carry all juz
    let div=document.createElement("div");
    // Add classname to the div
    div.className="part";
    // Create link for each juz
    let link=document.createElement("a");
    link.innerHTML=` الجزء ${i}`;
    // add classname to each link
    link.className='juzLink';
    // link.href=`juz${i}.html`;
    link.setAttribute("target", "_self");
    div.appendChild(link);
    quranParts.append(div);

    // Create variable contain all quran parts number
    let juzNumber=i;

    link.addEventListener("click", (e) => {
        quranParts.classList.add("toggleBtn");

        function getJusContent () {
            juzContent.innerHTML="";
            fetch(`http://api.alquran.cloud/v1/juz/${juzNumber}/edition`).then((data) => data.json()).then((result) => {
                console.log(result);
                for(let j=0; j<Object.values(result.data.surahs).length; j++) {
                    for(let i=0; i<result.data.ayahs.length; i++) {
                        if(result.data.ayahs[0].numberInSurah==1) {
                            if(result.data.ayahs[i].numberInSurah==1) {
                                let suName=document.createElement("p");
                                suName.className="surahname";
                                suName.innerHTML=`${Object.values(result.data.surahs)[j].name}`;
                                juzContent.appendChild(suName);
                                j++;
                            }
                        } else {
                            if(result.data.ayahs[i].numberInSurah==1) {
                                let suName=document.createElement("p");
                                suName.className="surahname";
                                suName.innerHTML=`${Object.values(result.data.surahs)[++j].name}`;
                                juzContent.appendChild(suName);
                            }
                        }

                        let span=document.createElement("span");
                        span.className="ayah";
                        span.innerHTML+=`${result.data.ayahs[i].text}  [${result.data.ayahs[i].numberInSurah}] `;
                        juzContent.append(span);
                    }

                }
                let nextAndPrevious=document.createElement("div");
                nextAndPrevious.className="nextAndPreviousBtn";
                let next=document.createElement("i");
                next.className="fa-solid fa-less-than next";

                let previos=document.createElement("i");
                previos.className="fa-solid fa-greater-than previous";

                nextAndPrevious.append(next, previos);
                juzContent.append(nextAndPrevious);
            }).catch((error) => alert("عدد اجزاء القران الكريم ثلاثون جزء"));
        }
        getJusContent();
        juzContent.addEventListener("click", (e) => {
            if(e.target.classList.contains("next")) {
                ++juzNumber;
                getJusContent();
            }
        });
        juzContent.addEventListener("click", (e) => {
            if(e.target.classList.contains("previous")) {
                --juzNumber;
                getJusContent();
            }
        });

    });
};