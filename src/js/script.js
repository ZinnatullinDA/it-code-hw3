let addMessage = document.querySelector('.message'), 
    addButton =document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = []; // Массив, в который записывается каждое новое дело

// проверка есть ли данные в локальном хранилище, если есть то мы возвращаем эти данные
if (localStorage.getItem('todo')){
    todoList =JSON.parse(localStorage.getItem('todo'));  //парсим данные из лок хранилище и JSON преобразовывает их в массив 
    displayMessages();
}

//Обработчик событий кнопки
addButton.addEventListener('click', function(){
    if(!addMessage.value) return;
    // Массив который содержит данные нашего последнего дела
    let newTodo = {
        todo: addMessage.value,   // описание дела
        checked: false,           // обозначение выполнения дела
        important: false          // обозначение важности дела
    };

    todoList.push(newTodo);  // добавление в массив новых дел
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

// Функция вывода сообщений - дел
function displayMessages(){
    let displayMessage = '';
    if(todoList.length ===0) todo.innerHTML = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

// Сохранение сделанных дел(помечанными галочками) в локальное хранилище
todo.addEventListener('change', function(event){
    let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach(function(item){
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

// Удаление дела(путём нажатия ctrl + ПКМ), а также выделение(красным цветом, жирным шрифтом) важного дела(путём нажатия ПКМ)
todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey || event.metaKey){
                todoList.splice(i, 1);
            }else
            {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

