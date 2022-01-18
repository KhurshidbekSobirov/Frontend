const form = document.getElementById('form');
const input = document.getElementById('input');
const todos_container = document.querySelector('.todos_container');

const items = JSON.parse(localStorage.getItem('notes'));

if (items) {
    items.forEach(item => {
        addTodo(item);
    })
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
})



function addTodo(item, dates) {
    let todo;
    if (item) {
       todo = item.text;
    } else {
         todo = input.value;
    }

    input.value = ''

    function DateFilter(month) {
        return (month.toString().length <= 1) ? ("0" + month) : month;
    }

    let todo_item = document.createElement('li');

    if (todo) {
        
        let date = `${new Date().getDate()}.${DateFilter(new Date().getMonth())}.${new Date().getFullYear()}`

        todo_item.innerHTML =`
            <span>${todo}</span>
            <small>${date}</small>
        `

        todos_container.appendChild(todo_item);

        updateLS(todo, date);
    }

    todo_item.addEventListener('click', (event) => {
        crossLine(event.target)
    })



    function crossLine(elem) {
        if (elem.nodeName === 'LI') {
            if (elem.children[0].classList.contains('line')) {
                elem.children[0].classList.remove('line')
            } else {
                elem.children[0].classList.add('line')
            }
        }
    }

    todo_item.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        if (event.target.nodeName === 'LI') {
            event.target.remove();
        }
    })
}


function updateLS() {
    let todos = document.querySelectorAll('li');

    let todoObj = [];

    todos.forEach(item => {

        let text = item.children[0].textContent;
        let date = item.children[1].textContent;

        todoObj.push({ text: text, date: date });
    })

    localStorage.setItem('notes', JSON.stringify(todoObj));

}
