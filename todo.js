const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

const CARD = "card";
const CARD_DEL = "card-del-btn"
const BTN = "btn";

function deleteToDo(event) {  
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {  
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {  
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {  
    const listDiv = document.createElement("div");
    const delDiv = document.createElement("div");

    listDiv.innerText = text;
    delDiv.innerText = "❌";

    delDiv.addEventListener("click", deleteToDo);

    listDiv.classList.add(CARD);
    delDiv.classList.add(CARD_DEL);
    delDiv.classList.add(BTN);
    listDiv.appendChild(delDiv);

    const newId = toDos.length + 1;
    listDiv.id = newId;

    toDoList.appendChild(listDiv);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {  
    event.preventDefault();
    const currentValue = toDoInput.value;
    const toDosNum = toDos.length;

    if (toDosNum > 4) {
        alert("우선적으로 해야할 일이 너무 많습니다.\n입력한 할 일들 먼저 끝내주세요.")
    } else {
        paintToDo(currentValue);
    }
    
    toDoInput.value = "";
}

function loadToDos() {  
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {  
            paintToDo(toDo.text);
        });
    }
}

function init() { 
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();