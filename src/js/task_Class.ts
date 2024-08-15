declare var axios: any;
function createElement(
  tag: string,
  className?: string,
  textContent?: string
): HTMLElement {
  let newElement = document.createElement(tag);
  if (className) {
    newElement.className = className;
  }
  if (textContent) {
    newElement.textContent = textContent;
  }
  return newElement;
}

class Task {
  private isComplete: boolean = false;

  constructor(
    private title: string,
    private description: string = "",
    private id?: string
  ) {}

  public get getTitle(): string {
    return this.title;
  }

  public get getDesc(): string {
    return this.description === ""
      ? "No description available"
      : this.description;
  }

  public get getId(): string | undefined {
    return this.id;
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

  public createTaskDiv(
    containerEl: HTMLElement,
    titleEl: HTMLInputElement,
    descriptionEl: HTMLTextAreaElement,
    modal: HTMLElement,
    doneBtn: HTMLElement
  ) {
    let fragment: DocumentFragment = document.createDocumentFragment();
    let taskContainer = createElement("div");
    let btnDiv = createElement("div", "btnDiv");
    let para = createElement("p", "task-title", `TITLE: ${this.title}`);
    let description = createElement(
      "p",
      "task-desc",
      `DESCRIPTION: ${this.description}`
    );
    let editBtn = createElement("button", "editBtnEl", "EDIT");
    let deleteBtn = createElement("button", "deleteBtnEl", "DELETE");

    taskContainer.dataset.id = this.id;

    if (this.title && this.description) {
      fragment.appendChild(para);
      fragment.appendChild(description);

      taskContainer.appendChild(fragment);

      btnDiv.appendChild(editBtn);
      btnDiv.appendChild(deleteBtn);
      taskContainer.appendChild(btnDiv);

      editBtn.addEventListener("click", () =>
        this.editTask(
          taskContainer,
          containerEl,
          titleEl,
          descriptionEl,
          modal,
          doneBtn
        )
      );
      deleteBtn.addEventListener("click", () => this.deleteTask(taskContainer));

      containerEl.appendChild(taskContainer);
    } else {
      console.error(
        "Failed to create a new task: Title or description element not found."
      );
    }
  }

  private async editTask(
    taskContainer: HTMLElement,
    containerEl: HTMLElement,
    titleEl: HTMLInputElement,
    descriptionEl: HTMLTextAreaElement,
    modal: HTMLElement,
    doneBtn: HTMLElement
  ) {
    // Populate modal with current task data
    titleEl.value = this.title;
    descriptionEl.value = this.description;

    const okBtn = createElement("button", "okBtn", "OK");
    doneBtn.style.display = "none";
    modal.appendChild(okBtn);

    modal.classList.add("slide-down");

    okBtn.addEventListener("click", async (e: Event) => {
      try {
        if (
          titleEl.value === this.title &&
          descriptionEl.value === this.description
        ) {
          alert(
            "No change detected!, please pass a new value to either fields"
          );
          return;
        }
        if (titleEl.value && descriptionEl.value !== "") {
          const updatedTask = {
            title: titleEl.value,
            description: descriptionEl.value,
          };

          const { data } = await axios.patch(
            `/home/todo/${this.id}`,
            updatedTask,
            { withCredentials: true }
          );

          this.title = titleEl.value;
          this.description = descriptionEl.value;

          // Update the task div with the new values
          taskContainer.querySelector(
            ".task-title"
          )!.textContent = `TITLE: ${this.title}`;
          taskContainer.querySelector(
            ".task-desc"
          )!.textContent = `DESCRIPTION: ${this.description}`;

          modal.classList.remove("slide-down");
          doneBtn.style.display = "block";
          modal.removeChild(okBtn);
          console.log("Task updated successfully", data);
        } else {
          alert("The title or description cannot be empty");
          console.error("Title or description element not found.");
        }
      } catch (error: any) {
        console.log(error, "the id", this.id ?? "no id found");
      }
    });
  }

  private async deleteTask(taskContainer: HTMLElement) {
    try {
      await axios.delete(`/home/todo/${this.id}`, { withCredentials: true });
      taskContainer.remove();
      console.log(`Task with ID ${this.id} deleted`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
}

export default Task;
