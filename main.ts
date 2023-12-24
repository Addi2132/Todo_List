import inquirer from "inquirer"

let todos = [
    { id: 1, title: 'todo list', desc: 'todo list desc', done: false },
]

async function newTodo() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'title:'
        },
        {
            type: 'input',
            name: 'desc',
            message: 'desc:'
        },
    ])
    const newTodo = { id: todos.length + 1, title: answers.title, desc: answers.desc, done: false }
    todos.push(newTodo)
    console.log('new todo created:', newTodo)
}

async function showTodos() {
    console.log('todos:', todos)
}


async function toggleTodo() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'id:'
        },
    ])
    const id = Number(answers.id)
    let todo;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todo = todos[i];
            break;
        }
    }
    if (todo) {
        todo.done = !todo.done
        console.log('todo toggled:', todo)
    } else {
        console.log('todo not found')
    }
}

async function deleteTodo() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'id:'
        },
    ])
    const id = Number(answers.id)
    const index = todos.findIndex(todo => todo.id === id)
    if (index !== -1) {
        todos.splice(index, 1)
        console.log('todo deleted')
    } else {
        console.log('todo not found')
    }
}

async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'action:',
            choices: [
                { name: 'new todo', value: 'newTodo' },
                { name: 'show todos', value: 'showTodos' },
                { name: 'toggle todo', value: 'toggleTodo' },
                { name: 'delete todo', value: 'deleteTodo' },
            ]
        },
    ])
    const action = answers.action
    switch (action) {
        case 'newTodo':
            await newTodo()
            break
        case 'showTodos':
            await showTodos()
            break
        case 'toggleTodo':
            await toggleTodo()
            break
        case 'deleteTodo':
            await deleteTodo()
            break
    }
    await main()
}

main()