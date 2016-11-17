/*
 Использование конструктора
 */

function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Доступен как статический метод
User.getById = function(id) {
    // data = ajax request
    return new User();
}

// Доступны всем экземплярам
User.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
};

var user1 = new User('Ivan', 'Ivanov');
var user2 = new User('Ivan1', 'Ivanov1');

console.log(user1, user2);
console.log(user1.getFullName());
console.log(user2.getFullName());
/*----------------------------------------------------------------------------*/

/*
 Исопльзование Object.create. Создание объекта с заданным прототипом
 */

var car = {
    color: 'black',
    run: function() {
        console.log('is running');
        console.log(this.color);
    }
};

var ford = Object.create(car);
ford.color = 'red';
ford.run = function() {
    console.log('nothing')
}

console.log(ford)

/*----------------------------------------------------------------------------*/

/*
 Использование современного синтаксиса ES6 для создания класса
 */

class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
    static getById() {
        return new User()
    }
}


var user1 = new User('Ivan', 'Ivanov');
var user2 = new User('Ivan1', 'Ivanov1');

console.log(user1, user2);

/*----------------------------------------------------------------------------*/

/*
 Работа с DOM. Добавление/удаление обработчиков событий
 */

var btn = document.querySelector('button');
var div = document.querySelector('div');

btn.onclick = function() {
    alert('click')
};

var handler = function(event) {
    console.log(event);
};

btn.addEventListener('click', function(event) {
    // event.stopPropagation();
    console.log('click btn');
});

div.addEventListener('click', function(event) {
    console.log('click div');
});

setTimeout(function() {
    btn.removeEventListener('click', handler);
}, 3000);


/*----------------------------------------------------------------------------*/

/*
 AJAX запросы. Использование встроенного конструктора XMLHttpRequest.
 */

function ajax(params) {
    var xhr = new XMLHttpRequest();
    xhr.open(params.type, params.url);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            params.success(JSON.parse(xhr.response));
        }
    }
}

ajax({
    url: 'https://jsonplaceholder.typicode.com/users/2',
    type: 'GET',
    success: function(response) {
        console.log('response')
        console.log(response)
    }
});

/*----------------------------------------------------------------------------*//**
 * Created by Админ on 17.11.2016.
 */
