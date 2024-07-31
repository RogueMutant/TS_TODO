"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const addBtn = document.getElementById("add-btn");
const modal = document.querySelector(".modal");
const doneBtn = document.getElementById("done-btn");
const titleEl = document.querySelector(".title");
const descriptionEl = document.querySelector(".description-el");
const containerEl = document.querySelector(".container");
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => {
    if (titleEl && descriptionEl) {
        titleEl.value = "";
        descriptionEl.value = "";
    }
    modal === null || modal === void 0 ? void 0 : modal.classList.toggle("slide-down");
    console.log("clicked");
});
class Task {
    constructor(title, description = "") {
        this.title = title;
        this.description = description;
        this.isComplete = false;
    }
    get getTitle() {
        return this.title;
    }
    get getDesc() {
        return this.description === ""
            ? "No description available"
            : this.description;
    }
    set setTitle(title) {
        this.title = title.toLowerCase();
    }
    set setDesc(desc) {
        this.description = desc.toLowerCase();
    }
    set setState(state) {
        this.isComplete = state;
    }
    get getState() {
        return this.isComplete;
    }
}
function createTaskDiv() {
    let fragment = document.createDocumentFragment();
    let para = document.createElement("p");
    let description = document.createElement("p");
    let taskContainer = document.createElement("div");
    let btnDiv = document.createElement("div");
    let addBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    if (titleEl && descriptionEl) {
        para.textContent = `TITLE: ${titleEl.value}`;
        description.textContent = `DESCRIPTION: ${descriptionEl.value}`;
        fragment.appendChild(para);
        fragment.appendChild(description);
        taskContainer.appendChild(fragment);
        btnDiv.className = "btnDiv";
        addBtn.textContent = "EDIT";
        deleteBtn.textContent = "DELETE";
        btnDiv.appendChild(addBtn);
        btnDiv.appendChild(deleteBtn);
        taskContainer.appendChild(btnDiv);
        if (containerEl) {
            containerEl.appendChild(taskContainer);
        }
        else {
            console.error("Container element not found.");
        }
    }
    else {
        console.error("Failed to create a new task: Title or description element not found.");
    }
}
doneBtn === null || doneBtn === void 0 ? void 0 : doneBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (titleEl.value && descriptionEl.value !== "") {
            let task = new Task(titleEl.value, descriptionEl.value);
            const taskDesc = task.getDesc;
            const taskTitle = task.getTitle;
            const taskState = task.getState;
            let tt = document.querySelector(".titleEL");
            let desc = document.querySelector(".descriptionEL");
            modal === null || modal === void 0 ? void 0 : modal.classList.remove("slide-down");
            const { data } = yield axios.post("/home/todo/", {
                taskDesc,
                taskTitle,
                taskState,
            });
            createTaskDiv();
            console.log(data.msg);
        }
        else {
            alert("The title or description can not be empty");
            console.error("Title or description element not found.");
        }
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}));
