let surahsAudioContainer=document.querySelector(".surahsAudioContainer");
let allSurahs=document.querySelector(".allSurahsContent");

let theAyaha=document.querySelector(".ayaha"),
    theAudio=document.querySelector('.audioControl'),
    thePreviousBtn=document.getElementById('prev'),
    thePlayBtn=document.getElementById('play'),
    theNextBtn=document.getElementById('next');



let isPlaying=false;
function playControl () {
    if(isPlaying) {
        theAudio.pause();
        thePlayBtn.innerHTML=`<i class="fa-solid fa-play"></i>`;
        isPlaying=false;
    } else {
        theAudio.play();
        thePlayBtn.innerHTML=`<i class="fa-solid fa-pause"></i>`;
        isPlaying=true;
    }
}

function getSurahs () {
    fetch(`https://quran-endpoint.vercel.app/quran/`).then((response) => response.json()).then((result) => {
        for(const surah in result.data) {
            let theSurahContent=document.createElement("div");
            theSurahContent.className="surahContent";

            let surahName=document.createElement("p");
            surahName.className="surahName";
            surahName.innerHTML=` [ ${result.data[surah].number} ]   ${Object.values(result.data[surah].asma)[0].long}  `;

            let ayahsCount=document.createElement("p");
            ayahsCount.className="ayahCount";
            ayahsCount.innerHTML=` [ ${result.data[surah].ayahCount} ]  أيات`;

            let surahType=document.createElement("span");
            surahType.className="surahtype";
            surahType.innerHTML=`${Object.values(result.data[surah].type)[0]}`;
            surahName.append(surahType);

            theSurahContent.append(surahName, ayahsCount);
            allSurahs.append(theSurahContent);

            // console.log(result.data[surah].recitation.full);
        }
        let containerOfAllSurahs=document.querySelectorAll(".allSurahsContent .surahContent");
        let ayahaText;
        let ayahaAudio;
        let surahsArray;
        let surahsAudios;
        let listeningOnly=document.querySelector(".listeningOnly");
        let listeningWithRead=document.querySelector(".listeningWithRead");

        // Listening with read part
        listeningWithRead.addEventListener("click", () => {

            listeningWithRead.classList.add("listeningEffect");
            listeningOnly.classList.remove("listeningEffect");
            alert("Please Select The Surah");

            containerOfAllSurahs.forEach((surahCont, index) => {
                surahCont.addEventListener('click', () => {

                    containerOfAllSurahs.forEach((surahContent) => {
                        surahContent.classList.remove("surahEffect");
                    });
                    surahCont.classList.add("surahEffect");
                    theAyaha.style.padding="10px";

                    fetch(`https://quran-endpoint.vercel.app/quran/${index+1}`)
                        .then((response) => response.json())
                        .then((result) => {

                            // Get all ayahs and audios and pushing in the array
                            let verses=result.data.ayahs;
                            ayahaText=[];
                            ayahaAudio=[];
                            verses.forEach((verse) => {
                                ayahaText.push(verse.text.ar);
                                ayahaAudio.push(verse.audio.url);
                            });

                            let ayahaIndex=0;
                            changeAyahaDetails(ayahaIndex);

                            // Customize Ending audion funtion
                            theAudio.addEventListener('ended', () => {
                                ayahaIndex++;
                                if(ayahaIndex<ayahaAudio.length) {
                                    changeAyahaDetails(ayahaIndex);
                                    theAudio.play();
                                } else {
                                    ayahaIndex=0;
                                    alert("السورة انتهت");
                                    changeAyahaDetails(ayahaIndex);
                                    theAudio.pause();
                                }
                            });
                            // Previous button function
                            thePreviousBtn.addEventListener('click', () => {
                                ayahaIndex<ayahaAudio.length? ayahaIndex=0:ayahaIndex--;
                                changeAyahaDetails(ayahaIndex);
                            });
                            // Next button function
                            theNextBtn.addEventListener('click', () => {
                                ayahaIndex<ayahaAudio.length-1? ayahaIndex++:ayahaIndex=0;
                                changeAyahaDetails(ayahaIndex);
                            });

                            playControl();
                            thePlayBtn.addEventListener("click", playControl);
                            // Change Ayaha and video ditails function
                            function changeAyahaDetails (theIndex) {
                                theAudio.src=ayahaAudio[theIndex];
                                theAyaha.innerHTML=ayahaText[theIndex];
                            }
                        });
                });
                // Set the first surah is the default
                // theAudio.src=`${result.data[0].recitation.full}`;
            });
        });

        // Listening part
        listeningOnly.addEventListener("click", () => {
            listeningOnly.classList.add("listeningEffect");
            listeningWithRead.classList.remove("listeningEffect");
            alert("Please Select The Surah");

            containerOfAllSurahs.forEach((surahCont) => {
                surahCont.addEventListener('click', () => {
                    containerOfAllSurahs.forEach((surahContent) => {
                        surahContent.classList.remove("surahEffect");
                    });
                    surahCont.classList.add("surahEffect");
                    theAyaha.style.padding="10px";
                    fetch(`https://quran-endpoint.vercel.app/quran/`)
                        .then((response) => response.json())
                        .then((result) => {
                            surahsArray=[];
                            surahsAudios=[];
                            let theAllSurahs=result.data;
                            theAllSurahs.forEach((surah) => {
                                surahsAudios.push(surah.recitation.full);
                                surahsArray.push(surah.asma.ar.long);
                            });
                            let surahIndex=0;
                            changeSurahDetails(surahIndex);

                            thePreviousBtn.addEventListener("click", () => {
                                surahIndex<surahsAudios.length? surahIndex=0:surahIndex--;
                                changeSurahDetails(surahIndex);
                            });

                            theNextBtn.addEventListener("click", () => {
                                surahIndex<surahsAudios.length-1? surahIndex++:surahIndex=0;
                                changeSurahDetails(surahIndex);
                            });

                            playControl();
                            thePlayBtn.addEventListener("click", playControl);

                            function changeSurahDetails (index) {
                                theAyaha.innerHTML=surahsArray[index];
                                theAudio.src=surahsAudios[index];
                            }

                        });

                });

                // Set the first surah is the default
                // theAudio.src=`${result.data[0].recitation.full}`;
            });
        });

    });
}

getSurahs();