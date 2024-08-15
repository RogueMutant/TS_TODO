declare var axios: any;
import Task from "./task_Class";

const addBtn = document.getElementById("add-btn") as HTMLElement;
const modal = document.querySelector(".modal") as HTMLElement;
const doneBtn = document.getElementById("done-btn") as HTMLElement;
const okBtn = document.querySelector("okBtn") as HTMLElement;
const titleEl = document.querySelector(".title") as HTMLInputElement;
const descriptionEl = document.querySelector(
  ".description-el"
) as HTMLTextAreaElement;
const containerEl = document.querySelector(".container") as HTMLElement;

interface TaskType {
  title: string;
  description: string;
  _id: string;
}

async function showAllTasks() {
  try {
    const {
      data: { tasks },
    } = await axios.get("/home/todo/", { withCredentials: true });

    if (!tasks || tasks.length < 1) {
      console.log("No task available");
      return;
    }

    console.log(tasks);

    tasks.map((task: TaskType) => {
      const { title, _id: taskId, description } = task;
      if (taskId) {
        // Ensure taskId exists
        const myTask = new Task(title, description, taskId);
        myTask.createTaskDiv(
          containerEl,
          titleEl,
          descriptionEl,
          modal,
          doneBtn
        );
        console.log("Class task created:", myTask);
      } else {
        console.error("Task ID is undefined.");
      }
    });
  } catch (error) {
    console.log("Error fetching tasks:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await showAllTasks();
});

addBtn?.addEventListener("click", () => {
  if (titleEl && descriptionEl) {
    titleEl.value = "";
    descriptionEl.value = "";
  }
  modal?.classList.toggle("slide-down");
  console.log("Add button clicked");
});

doneBtn?.addEventListener("click", async (e: Event) => {
  try {
    if (titleEl.value && descriptionEl.value !== "") {
      const description: string = descriptionEl.value;
      const title: string = titleEl.value;

      modal?.classList.remove("slide-down");

      const {
        data: { task },
      } = await axios.post(
        "/home/todo/",
        { title, description },
        { withCredentials: true }
      );

      if (task._id) {
        const newTask = new Task(title, description, task._id);
        newTask.createTaskDiv(
          containerEl,
          titleEl,
          descriptionEl,
          modal,
          doneBtn
        );
        console.log("New task created:", task);
      } else {
        console.error("Task ID is undefined in response.");
      }
    } else {
      alert("The title or description cannot be empty");
      console.error("Title or description element is missing.");
    }
  } catch (error: any) {
    console.log("Error creating task:", error);
    throw new Error(error);
  }
});
