const teskform = document.querySelector(".js-toDoForm");
const teskinput = document.querySelector(".teskinput");
const pendingList = document.querySelector(".pendingList");
const finishList = document.querySelector(".finishList");
const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pendingArray = [];
let finishArray = [];
let ID = 1;

/* Check and Back */
/* Check and Back */
/* Check and Back */
function handleFinish(event) {
  const pending_li = event.target.parentNode;
  const pending_text = event.target.parentNode.firstChild.innerText;
  pendingList.removeChild(pending_li);
  const CleanPending = pendingArray.filter(function (pending) {
    return pending.id !== parseInt(pending_li.id);
  });

  pendingArray = CleanPending;

  paintFinish(pending_text);
  savePending();
}

function backFinish(event) {
  const finish_li = event.target.parentNode;
  const finish_text = event.target.parentNode.firstChild.innerText;
  finishList.removeChild(finish_li);
  const CleanFinish = finishArray.filter(function (finish) {
    return finish.id !== parseInt(finish_li.id);
  });

  finishArray = CleanFinish;

  paintPending(finish_text);
  saveFinish();
}
/* Check and Back */
/* Check and Back */
/* Check and Back */

/* Save  */
/* Save  */
/* Save  */
function saveFinish() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishArray));
}

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingArray));
}
/* Save  */
/* Save  */
/* Save  */

/* Delete */
/* Delete */
/* Delete */
function deleteFinish(event) {
  const finish_li = event.target.parentNode;
  finishList.removeChild(finish_li);
  const CleanFinish = finishArray.filter(function (finish) {
    return finish.id !== parseInt(finish_li.id);
  });

  finishArray = CleanFinish;
  saveFinish();
}

function handleDelete(event) {
  const pending_li = event.target.parentNode;
  pendingList.removeChild(pending_li);
  const CleanPending = pendingArray.filter(function (pending) {
    return pending.id !== parseInt(pending_li.id);
  });

  pendingArray = CleanPending;
  savePending();
}
/* Delete */
/* Delete */
/* Delete */

/* Paint */
/* Paint */
/* Paint */
function paintFinish(text) {
  const finish_li = document.createElement("li");
  const finish_delBtn = document.createElement("i");
  const finish_backBtn = document.createElement("i");
  const finish_span = document.createElement("span");
  const newId = ID;

  finish_delBtn.className = "fas fa-trash-alt";
  finish_delBtn.addEventListener("click", deleteFinish);
  finish_backBtn.className = "fas fa-undo";
  finish_backBtn.addEventListener("click", backFinish);
  finish_span.innerText = text;
  finish_span.classList.add("line-through");

  finish_li.appendChild(finish_span);
  finish_li.appendChild(finish_delBtn);
  finish_li.appendChild(finish_backBtn);
  finish_li.id = newId;

  finishList.appendChild(finish_li);

  const finish_Obj = {
    text: text,
    id: newId
  };

  ID += 1;
  finishArray.push(finish_Obj);
  saveFinish();
}

function paintPending(text) {
  const pending_li = document.createElement("li");
  const pending_delBtn = document.createElement("i");
  const pending_finBtn = document.createElement("i");
  const pending_span = document.createElement("span");
  const newId = ID;

  pending_delBtn.className = "fas fa-trash-alt";
  pending_delBtn.addEventListener("click", handleDelete);
  pending_finBtn.className = "fas fa-check";
  pending_finBtn.addEventListener("click", handleFinish);
  pending_span.innerText = text;
  pending_li.appendChild(pending_span);
  pending_li.appendChild(pending_delBtn);
  pending_li.appendChild(pending_finBtn);
  pending_li.id = newId;

  pendingList.appendChild(pending_li);

  const pending_Obj = {
    text: text,
    id: newId
  };

  ID += 1;
  pendingArray.push(pending_Obj);
  savePending();
}
/* Paint */
/* Paint */
/* Paint */

function handleSubmit(event) {
  // 이벤트가 발동한 페이지에서 보이는 것
  event.preventDefault();
  const currentValue = teskinput.value;
  paintPending(currentValue);
  teskinput.value = "";
}

function loadTesk() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinish = localStorage.getItem(FINISHED_LS);
  if (loadedPending !== null && loadedFinish === null) {
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinish = JSON.parse(loadedFinish);
    parsedPending.forEach(function (pending) {
      paintPending(pending.text);
    });
  } else if (loadedPending === null && loadedFinish !== null) {
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinish = JSON.parse(loadedFinish);
    parsedFinish.forEach(function (finish) {
      paintFinish(finish.text);
    });
  } else if (loadedPending !== null && loadedFinish !== null) {
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinish = JSON.parse(loadedFinish);
    parsedPending.forEach(function (pending) {
      paintPending(pending.text);
    });
    parsedFinish.forEach(function (finish) {
      paintFinish(finish.text);
    });
  }
}

function init() {
  loadTesk();
  teskform.addEventListener("submit", handleSubmit);
}
init();
