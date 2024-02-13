const container = document.getElementById('todo-container');
const tmp = document.createElement("div");
const count = document.querySelector(".count span");
var dragged, dropped;
var cnt = 0, d = 0;

function eliminate(x) {
    while (x.tagName != "DIV") {
        x = x.parentElement;
    }
    container.removeChild(x);
    cnt--;
    count.innerHTML = cnt;
}

function moves(a, b){
    if (a === b) {
        return;
    }
    if (b === null) {
        container.append(a);
    }
    else {
        container.insertBefore(a, b);
    }
}

function pushes() {
    const str = document.getElementById('activity').value;
    if (str.length == 0)
        return; 
    cnt++;
    d++;
    let pot = document.createElement("div");
    pot.classList.add('bar');
    pot.classList.add('todo');
    pot.setAttribute('draggable', true);
    pot.innerHTML = `
    <div class="container">
      <div class="circle" check=0>
        <input type="checkbox" class="todo-status" id="checkbox${d}">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
      </div>
      <div class="act"><p><label for="checkbox${d}">${str}</label></p></div>
    </div>
    <svg class="eraser" id="num${d}" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    `;
    container.insertBefore(pot, container.firstChild);
    document.getElementById(`num${d}`).addEventListener('click', (x) => {
        eliminate(x.target);
    });
    count.innerHTML = `${cnt}`;
    document.getElementById('activity').value = '';
    pot.addEventListener('dragstart', (event) => {
        dragged = event.target;
    });
    pot.addEventListener('drop', (event) => {
        dropped = event.target;
        while (dragged.classList.contains('bar') === false) {
            dragged = dragged.parentElement;
        }
        while (dropped.classList.contains('bar') === false) {
            dropped = dropped.parentElement;
        }
        if (dragged === dropped)
            return;
        let u = dragged.nextElementSibling, v = dropped.nextElementSibling;
        moves(dragged, v);
        moves(dropped, u);
    });
    pot.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
}

function clearcompleted() {
    document.querySelectorAll(".bar.todo:has(.todo-status:checked)").forEach((x) => {
        container.removeChild(x);
        cnt--;
    });
    count.innerHTML = `${cnt}`;
}

document.querySelector('.adder .circle').addEventListener('click', pushes);
document.querySelector('.count span').innerHTML = `${cnt}`;
document.getElementById('clear').addEventListener('click', clearcompleted);
document.getElementById('activity').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        pushes();
    }
});