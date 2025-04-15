const input = document.getElementById("input");
const btn = document.getElementById("btn");
const tasksWrapper = document.getElementById("tasks-wrapper");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const buildCards = () => {
  tasksWrapper.innerHTML = "";
  [...tasks].reverse().forEach((t, index) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    card.addEventListener("click", () => {
      const originalIndex = tasks.findIndex((task) => task === t);
      tasks[originalIndex].isCompleted = !tasks[originalIndex].isCompleted;
      console.log(tasks[originalIndex]);

      localStorage.setItem("tasks", JSON.stringify(tasks));
      buildCards();
    });

    const titleWrapper = document.createElement("h3");
    titleWrapper.setAttribute("class", "task-title");
    titleWrapper.textContent = t.title;

    const indicator = document.createElement("div");
    const insicatorClass = t.isCompleted ? "completed" : "not-completed";
    indicator.setAttribute("class", insicatorClass);

    tasksWrapper.append(card);
    card.append(titleWrapper);
    card.append(indicator);
  });
};

btn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text.length < 3) {
    console.log("min 4 simboliai");
    return;
  }

  const task = {
    title: input.value,
    isDone: false,
    creationDate: new Date(),
  };

  tasks.push(task);
  input.value = "";
  buildCards();

  console.log(tasks);

  localStorage.setItem("tasks", JSON.stringify(tasks));
});

buildCards();
