const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOW_CN = "show";

function handleSubmit(event) {
    event.preventDefault();
    const name = input.value;
    localStorage.setItem(USER_LS, name);
    paintGreeting(name);
}

function getName() {
    form.classList.add(SHOW_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOW_CN);
    greetings.classList.add(SHOW_CN);
    greetings.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        getName();
    } else {
        paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}

init();

