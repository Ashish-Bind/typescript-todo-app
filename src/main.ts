import './style.css'

interface Todo {
  title: string
  isCompleted: boolean
  readonly id: number
}

const todos: Array<Todo> = []

const todoContainer = <HTMLDivElement>document.querySelector('.todo-container')
const todoInput = <HTMLInputElement>document.querySelector('#todo-title')
const todoForm = <HTMLFormElement>document.querySelector('#todo-form')

todoForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault()
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: Math.random() * 1000,
  }

  todos.push(todo)
  todoInput.value = ''
  renderTodo(todos)
}

const generateTodo = (id: number, isCompleted: boolean, title: string) => {
  const todoDiv = <HTMLDivElement>document.createElement('div')

  const todoTitle = <HTMLHeadingElement>document.createElement('h3')
  todoTitle.style.textDecoration = isCompleted ? 'line-through' : ''
  todoTitle.innerHTML = title

  const todoCheck = <HTMLInputElement>document.createElement('input')
  todoCheck.setAttribute('type', 'checkbox')
  todoCheck.checked = isCompleted
  todoCheck.onchange = () => {
    todos.find((item) =>
      item.id === id ? (item.isCompleted = todoCheck.checked) : ''
    )
    todoTitle.style.textDecoration = todoCheck.checked ? 'line-through' : ''
  }

  const deleteBtn = <HTMLButtonElement>document.createElement('button')
  deleteBtn.innerHTML = 'Delete'
  deleteBtn.onclick = () => {
    deleteTodo(id)
  }

  todoDiv.append(todoCheck, todoTitle, deleteBtn)
  todoContainer.appendChild(todoDiv)
}

const deleteTodo = (id: number) => {
  const index = todos.findIndex((item) => item.id === id)
  todos.splice(index, 1)
  renderTodo(todos)
}

const renderTodo = (todos: Todo[]) => {
  todoContainer.innerHTML = ''
  todos.forEach((item) => {
    generateTodo(item.id, item.isCompleted, item.title)
  })
}
