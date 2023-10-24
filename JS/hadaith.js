let theHadaith=document.querySelector(".hadaith");

const hadaithApi='https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json';

function getHadith () {
    fetch(hadaithApi)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Array of hadaith books name by arabic
            let hadithBookName=["سنن ابو داود", "صحيح البخاري", "سنن ابن ماجه", "موطأ الامام مالك", "صحيح مسلم", "سنن النسايْي", "جامع الترمذي"];
            let theHadaithBooks=document.createElement("div");
            theHadaithBooks.className="hadaithBook";

            for(let i=0; i<Object.values(data).length; i++) {
                let theHadaithName=document.createElement("p");
                theHadaithName.className="hadaithname";
                theHadaithName.innerHTML=`[ ${i+1} ] ${hadithBookName[i]}  /  ${Object.values(data)[i].name} `;

                theHadaithBooks.append(theHadaithName);
                theHadaith.append(theHadaithBooks);

                let hadaithDataLink=Object.values(data)[i].collection[0].link;
                theHadaithName.addEventListener('click', () => {
                    theHadaithBooks.classList.toggle("toggleBtn");
                    fetch(hadaithDataLink)
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(result);
                            let hadaithSection=document.createElement("div");
                            hadaithSection.className="hadaithsection";
                            for(const section in result.metadata.sections) {
                                let sectionTitle=document.createElement("p");
                                sectionTitle.className="sectiontitle";

                                let span1=document.createElement("span");
                                span1.textContent=`${result.metadata.section_details[section].hadithnumber_first} To ${result.metadata.section_details[section].hadithnumber_last} `;

                                if(section!=0) {
                                    sectionTitle.innerHTML=` ${result.metadata.sections[section]} `;
                                    sectionTitle.setAttribute("start", result.metadata.section_details[section].hadithnumber_first);
                                    sectionTitle.setAttribute("end", result.metadata.section_details[section].hadithnumber_last);

                                    sectionTitle.append(span1);
                                    hadaithSection.append(sectionTitle);
                                }

                                theHadaith.append(hadaithSection);
                            }
                            hadaithSection.addEventListener("click", (e) => {
                                theHadaith.innerHTML="";
                                console.log(Number(e.target.getAttribute("start")), Number(e.target.getAttribute("end")));
                                // Div that contains all hadaith
                                for(let i=Number(e.target.getAttribute("start")); i<Number(e.target.getAttribute("end")); i++) {
                                    let div=document.createElement("div");
                                    div.className="hadaithBox";

                                    // Create paragraph to carry each hadaith
                                    let hadithText=document.createElement("p");
                                    hadithText.className="hadithtext";
                                    hadithText.innerHTML=result.hadiths[i].text;
                                    // create div to carry the grades of the hadaiths
                                    let thegrades=document.createElement("div");
                                    thegrades.className="grades";
                                    if(result.hadiths[i].grades.length===4) {
                                        thegrades.innerHTML=`
                                        <table class="grade__table">
                                            <thead>
                                                <tr>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[0].grade}</td>
                                                    <td>${result.hadiths[i].grades[0].name}</td>
                                                </tr>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[1].grade}</td>
                                                    <td>${result.hadiths[i].grades[1].name}</td>
                                                </tr>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[2].grade}</td>
                                                    <td>${result.hadiths[i].grades[2].name}</td>
                                                </tr>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[3].grade}</td>
                                                    <td>${result.hadiths[i].grades[3].name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    `;
                                    } else if(result.hadiths[i].grades.length===3) {
                                        thegrades.innerHTML=`
                                        <table class="grade__table">
                                            <thead>
                                                <tr>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[0].grade}</td>
                                                    <td>${result.hadiths[i].grades[0].name}</td>
                                                </tr>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[1].grade}</td>
                                                    <td>${result.hadiths[i].grades[1].name}</td>
                                                </tr>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[2].grade}</td>
                                                    <td>${result.hadiths[i].grades[2].name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    `;
                                    } else if(result.hadiths[i].grades.length===2) {
                                        thegrades.innerHTML=`
                                        <table class="grade__table">
                                            <thead>
                                                <tr>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[0].grade}</td>
                                                    <td>${result.hadiths[i].grades[0].name}</td>
                                                </tr>
                                                <tr>
                                                    <td>${result.hadiths[i].grades[1].grade}</td>
                                                    <td>${result.hadiths[i].grades[1].name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    `;
                                    } else {
                                        thegrades.classList.add("toggleBtn");
                                        hadithText.classList.add("no__border");
                                    }

                                    div.append(hadithText, thegrades);
                                    theHadaith.append(div);
                                }
                            });
                        });
                });
            }
        })
        .catch(error => {
            console.log(Error(error));
        });
}


getHadith();