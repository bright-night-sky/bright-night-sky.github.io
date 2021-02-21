const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    toDoFormWrapper = document.querySelector(".toDoForm-wrapper"),
    toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input")
    toDoListWrapper = document.querySelector(".toDoList-wrapper");

const USER_LS = "currentUser",
    SHOWING_CN = "showing",
    FLEX = "flex";

function saveName(text) {  
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {  
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {  
    form.classList.add(SHOWING_CN);
    toDoForm.style.display = "none";
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {  
    toDoForm.style.display = "block";

    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);

    greeting.innerText = `안녕하세요. ${text}님`;
}

function loadName() {  
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();