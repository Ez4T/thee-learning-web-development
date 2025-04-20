const username = document.getElementById("username");
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todoListCount = document.getElementById("todo-list-count")

const todoList = document.getElementById("todo-list");

// อยากได้ข้อมูลจาก Web Browser storage ต้องทำยังไง
const todoItems = JSON.parse(window.localStorage.getItem("todoItems")) || [];

let todoItemCount = todoItems.length;
todoListCount.innerHTML = todoItemCount;

// วิธีการ loop ด้วย for
// for (let i = 0; todoItems.length; i++){
//   renderElement(todoItems[i]);
// }

// วิธีการ loop ข้อมูลที่อยู่ใน Array ด้วย forEach
todoItems.forEach((item) => {
  renderElement(item);
})

function addTodo(){
  const value = todoInput.value;

  if (value === "") {
    return;
  }

  todoItemCount = todoItemCount + 1;
  todoListCount.innerHTML = todoItemCount;

  todoInput.value = '';
  todoItems.push(value);
  window.localStorage.setItem("todoItems", JSON.stringify(todoItems))
  renderElement(value);
}

function renderElement(value){
  const now = new Date().getTime();
  const id = now + Math.random().toString(36)

  const li = document.createElement("li");
  li.setAttribute("id", "todo-list-item-" + id);

  const p = document.createElement("p");
  p.innerHTML = value

  const delButton = document.createElement("button");
  delButton.innerHTML = "ไม่อยากทำแล้ว";
  delButton.setAttribute("type", "button");
  delButton.setAttribute("class", "delete-btn");

  delButton.addEventListener("click", () => {
    deleteTodo(id);
  });
  
  li.appendChild(p);
  li.appendChild(delButton);

  todoList.appendChild(li);
}

function deleteTodo(id){
  Array.from(todoList.children).forEach((el, index) => {
    const elementId = el.id;
    const deleteId = "todo-list-item-" + id

    if (elementId === deleteId){
      todoItems.splice(index, 1);
      window.localStorage.setItem("todoItems", JSON.stringify(todoItems))
    }
  })
  
  todoItemCount = todoItemCount - 1;
  todoListCount.innerHTML = todoItemCount;
  const li = document.getElementById("todo-list-item-" + id);
  li.remove();
}

addTodoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter"){
    addTodo();
  }
})

// const userInput = prompt("ใครเอ่ย");
// username.innerHTML = userInput;