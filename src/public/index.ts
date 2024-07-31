declare var axios: any;
const addBtn: HTMLElement | null = document.getElementById("add-btn");
const modal: HTMLElement | null = document.querySelector(".modal");
const doneBtn: HTMLElement | null = document.getElementById("done-btn");
const titleEl: HTMLInputElement | null = document.querySelector(
  ".title"
) as HTMLInputElement;
const descriptionEl: HTMLTextAreaElement | null = document.querySelector(
  ".description-el"
) as HTMLTextAreaElement;
const containerEl: HTMLElement | null = document.querySelector(".container");

addBtn?.addEventListener("click", () => {
  if (titleEl && descriptionEl) {
    titleEl.value = "";
    descriptionEl.value = "";
  }
  modal?.classList.toggle("slide-down");
  console.log("clicked");
});

class Task {
  private isComplete: boolean = false;

  constructor(private title: string, private description: string = "") {}

  public get getTitle(): string {
    return this.title;
  }

  public get getDesc(): string {
    return this.description === ""
      ? "No description available"
      : this.description;
  }

  public set setTitle(title: string) {
    this.title = title.toLowerCase();
  }

  public set setDesc(desc: string) {
    this.description = desc.toLowerCase();
  }

  public set setState(state: boolean) {
    this.isComplete = state;
  }

  public get getState(): boolean {
    return this.isComplete;
  }
}

function createTaskDiv() {
  let fragment: DocumentFragment = document.createDocumentFragment();
  let para: HTMLParagraphElement = document.createElement("p");
  let description: HTMLParagraphElement = document.createElement("p");

  let taskContainer: HTMLDivElement = document.createElement("div");
  let btnDiv: HTMLDivElement = document.createElement("div");
  let addBtn: HTMLButtonElement = document.createElement("button");
  let deleteBtn: HTMLButtonElement = document.createElement("button");
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
    } else {
      console.error("Container element not found.");
    }
  } else {
    console.error(
      "Failed to create a new task: Title or description element not found."
    );
  }
}

doneBtn?.addEventListener("click", async () => {
  try {
    if (titleEl.value && descriptionEl.value !== "") {
      let task = new Task(titleEl.value, descriptionEl.value);
      const taskDesc: string = task.getDesc;
      const taskTitle: string = task.getTitle;
      const taskState: boolean = task.getState;
      let tt: HTMLParagraphElement | null = document.querySelector(".titleEL");
      let desc: HTMLParagraphElement | null =
        document.querySelector(".descriptionEL");

      modal?.classList.remove("slide-down");
      const { data } = await axios.post("/home/todo/", {
        taskDesc,
        taskTitle,
        taskState,
      });
      createTaskDiv();

      console.log(data.msg);
    } else {
      alert("The title or description can not be empty");
      console.error("Title or description element not found.");
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
});
