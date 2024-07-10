// Access the elements
const input = document.querySelector("input");
const addButton = document.querySelector("button");
const taskContainer = document.querySelector("ul");

// create the addTask function
function addTask(task){
    // create list item
    let listItem = document.createElement("li");
    
    // create a span element for the tasks
    let taskSpan = document.createElement("span");
    taskSpan.innerText = task;

    // create a span Element for the icons
    let spanElement = document.createElement("span");

    // create Icons
    // check Icon
    let checkIcon = document.createElement("input");
    checkIcon.setAttribute("type", "checkbox");

    // delete Icon
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bx", "bx-trash");

    // edit Icon
    let editIcon = document.createElement("i");
    editIcon.classList.add("bx", "bx-edit-alt");
    
    // done Icon
    let doneIcon = document.createElement("i");
    doneIcon.classList.add("bx", "bx-check-circle");
    doneIcon.style.display = "none";
    // Add the icons to the spanElement
    spanElement.append(checkIcon, editIcon, doneIcon, deleteIcon);
    // Add the spanElement to the listItem
    listItem.append(taskSpan, spanElement);
    // Add the listItem to the task container
    taskContainer.appendChild(listItem);

    // Add event Listener to the Icons
    checkIcon.addEventListener("click", (event) => {
        if(event.target.checked === true){
            listItem.style.textDecoration = "line-through";
            listItem.style.color = "#F04476";
            input.style.background = "#B58E8D";
        } else {
            listItem.style.textDecoration = "none";
        }
        saveTaskstoLocalStorage();
    })

    editIcon.addEventListener("click", () => {
        doneIcon.style.display = "inline";
        taskSpan.contentEditable = true;
        taskSpan.style.padding = "5px 10px";
        editIcon.style.display = "none";
        taskSpan.focus();
        saveTaskstoLocalStorage();
    });

    doneIcon.addEventListener("click", () => {
        doneIcon.style.display = "none";
        taskSpan.contentEditable = false;
        editIcon.style.display = "inline";
        saveTaskstoLocalStorage();
    });

    deleteIcon.addEventListener("click", () => {
        listItem.remove();
        saveTaskstoLocalStorage();
    });

    // save to local storage
    saveTaskstoLocalStorage();
}

// Function to save tasks to local storage
function saveTaskstoLocalStorage(){
    let tasks = [];
    let taskItems = document.querySelectorAll("li");
    taskItems.forEach((item) => {
    tasks.push(item.querySelector("span:first-child").innerText);
});
localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to load tasks from local storage
function loadTasksFromLocalStorage(){
    let tasks = JSON.parse(localStorage.getItem("tasks") || []);
    tasks.forEach((task) => {
        addTask(task);
    });
}

// Event listener for adding the task
addButton.addEventListener("click", () => {
    let task = input.value.trim();
    if(task !== ""){
        addTask(task);
        // clear the input field
        input.value = "";
    }
});

// Load items from local storage 
window.addEventListener("load", () => {
    loadTasksFromLocalStorage();
});