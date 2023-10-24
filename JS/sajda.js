let theSajda=document.querySelector(".sajdaPart");
console.log(theSajda);
fetch(`http://api.alquran.cloud/v1/sajda/edition`).then((data) => data.json()).then((result) => {
    for(let i=0; i<result.data.ayahs.length; i++) {
        let sajdaContainer=document.createElement("div");
        sajdaContainer.className="sajda";
        sajdaContainer.innerHTML=` [${i+1}] ${result.data.ayahs[i].text} الأية [ ${result.data.ayahs[i].numberInSurah} ] من  [ ${result.data.ayahs[i].surah.name} ]`;
        console.log(sajdaContainer);
        theSajda.appendChild(sajdaContainer);
    }
});