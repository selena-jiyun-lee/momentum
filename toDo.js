const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOLIST_LS = "toDoList";

let toDoArray = [];

function deleteToDo(event){
    // console.dir(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDoList = toDoArray.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDoArray = cleanToDoList;
    saveToDoList();
}

function saveToDoList() {
    localStorage.setItem(TODOLIST_LS, JSON.stringify(toDoArray));
}

function handleSubmit(event){
    event.preventDefault();
    const value = toDoInput.value;
    console.log(value);
    paintList(value);
    saveToDoList();
}

function loadToDoList() {
    const loadedToDoList = localStorage.getItem(TODOLIST_LS);
    if(loadedToDoList !== null) {
        const parsedTodoList = JSON.parse(loadedToDoList);
        parsedTodoList.forEach(function(toDo){
            paintList(toDo.text);
        })
    }
}

function paintList(text){
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDoArray.length + 1;
    deleteBtn.innerHTML = "❌";
    deleteBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(deleteBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        id: newId,
        text: text
    }
    toDoArray.push(toDoObj);
    toDoInput.value = "";
}

function init() {
    loadToDoList();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();