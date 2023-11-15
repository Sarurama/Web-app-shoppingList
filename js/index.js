import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://playground-1e974-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);

const database = getDatabase(app);
const shoppingListinDB = ref(database, "shopping-list");

let listHtml = document.getElementById("list");

let textInputEl = document.getElementById("input-field");
const buttonInputEl = document.getElementById("add-button");

onValue(shoppingListinDB, function (snapshot) {
  if (snapshot.exists()) {
    listHtml.innerHTML = "";
    let itemArray = Object.entries(snapshot.val());

    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i];

      createString(currentItem);
    }
  } else {
    listHtml.innerHTML = "Add something!";
  }
});

buttonInputEl.addEventListener("click", function (event) {
  event.preventDefault();

  inputFunction();

  clearInput();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    inputFunction();

    clearInput();
  }
});

function inputFunction() {
  let inputValue = textInputEl.value;
  if (inputValue !== "") {
    push(shoppingListinDB, inputValue);
  }
}

function clearInput() {
  textInputEl.value = "";
}
function createString(generalInput) {
  let generalIds = generalInput[0];
  let generalValues = generalInput[1];
  let shopping = document.createElement("li");
  shopping.textContent = `${generalValues}`;
  listHtml.append(shopping);
  shopping.addEventListener("click", function (event) {
    event.preventDefault();
    let locationIds = ref(database, `shopping-list/${generalIds}`);

    remove(locationIds);
  });
}
