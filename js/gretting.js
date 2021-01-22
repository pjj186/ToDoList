const form = document.querySelector(".js-form"); // form
const input = form.querySelector("input");
const question = document.querySelector(".question");
const greeting = document.querySelector(".js-greetings"); // ㅗ4
const hello = document.querySelector(".js-hello");

const USER_LS = "currentUser";
const SHOWING_ON = "showing";
const BLIND = "form";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
    // key : currnetUser , value : text 
}

function handleSubmit(event) {
    event.preventDefault(); // 이벤트를 막는다. 여기선 submit이 원래 해야할 이벤트를 금지
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_ON); // form_SHOWING ON
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON); // form 가림
    question.classList.add(BLIND);
    greeting.classList.add(SHOWING_ON);
    hello.classList.add(SHOWING_ON);
    greeting.innerText = `${text} ! `
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS); // 매개변수로 키값, 그 키값이 가진 value를 반환
    if(currentUser === null) { // currentUser 에서 가져온 이름의 키가 존재하지않으면?
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();