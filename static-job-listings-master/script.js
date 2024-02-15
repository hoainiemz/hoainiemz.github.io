var data, arr = [], lst = ['Python', 'Ruby', 'JavaScript', 'HTML', 'CSS', 'React', 'Sass', 'Vue', 'Django', 'RoR'];
const container = document.getElementById('job-container');
const inp = document.getElementById('inp-container');
const filter = document.getElementById('filter');
async function getData() {
    data = await fetch('./data.json');
    data = await data.json();
}

function reset() {
    document.querySelectorAll('#inp-container > input').forEach((x) => {
        x.checked = true;
    });
}

function check(inp) {
    if (inp === true) {
        return "unhide";
    }
    return "hidden";
}

async function main() {
    await getData();
    for (i = 0; i < data.length; i++) {
        let cur = data[i];
        container.innerHTML += `
    
            <div class="job" id="jobnum${i}" role="${cur.role}" level="${cur.level}">
                <div class="job-info">
                    <img src="${cur.logo}">
                    <div class="info">
                    <div class="status">
                        <div class="company">${cur.company}</div>
                        <div class="new ${check(cur.new)}">NEW!</div>
                        <div class="featured ${check(cur.featured)}">FEATURED</div>
                    </div>
                    <div class="name">${cur.position}</div>
                    <div class="detail">
                        <div class="time">${cur.postedAt}</div>
                        <span>&#x2022;</span>
                        <div class="toj">${cur.contract}</div>
                        <span>&#x2022;</span>
                        <div class="loc">${cur.location}</div>
                    </div>
                    </div>
                </div>
                <div class="categories" id="catenum${i}">
                    <label for="${cur.role}">${cur.role}</label>
                    <label for="${cur.level}">${cur.level}</label>
                </div>
            </div>

        `;
    }
    for (i = 0; i < data.length; i++) {
        let cur = document.getElementById(`jobnum${i}`), lang="", tool="";
        arr.push(cur);
        data[i].languages.forEach((element) => {
            document.getElementById(`catenum${i}`).innerHTML += `<label for="${element}">${element}</label>`;
            lang += ` ${element}`;
        });
        data[i].tools.forEach((element) => {
            document.getElementById(`catenum${i}`).innerHTML += `<label for="${element}">${element}</label>`;   
            tool += ` ${element}`;
        });
        cur.setAttribute('need', lang + tool);
    }
    for (i of lst) {
        // console.log(i);
        inp.innerHTML += `
        <input type="radio" name="${i}" id="no${i}" checked>
        `;
        filter.innerHTML += `
        <div class="filter-item">
            <div>${i}</div>
            <input type="radio" name="${i}" id="${i}">
            <label class="filter-remove" for="no${i}">
                <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 14 14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
            </label>
        </div>
        `;
    }
    document.getElementById('clear-button').addEventListener('click', reset);
}   

main();