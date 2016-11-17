/**
 * Created by Админ on 17.11.2016.
 */

document.addEventListener('DOMContentLoaded', function () {
// var root = 'https://jsonplaceholder.typicode.com';
    var tBody,
        tPhone,
        tName;
    tBody = document.querySelector('tbody');
    tPhone = document.getElementsByClassName('phone');
    tName = document.getElementsByClassName('name');
    tBody.appendChild(tPhone);
    function loadPhones(param) {
        var xhr = new XMLHttpRequest();
        xhr.open(param.type, param.url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                param.success(JSON.parse(xhr.response));
            }
        }
    };
    loadPhones({
        url: 'https://jsonplaceholder.typicode.com/users ',
        type: 'GET',
        success: function (response) {
            console.log('response');
            console.log(response);

            for (var i = 0; i < response.length; i++) {
                console.log(response[i].name)
                var tmp = '<tr>' +
                    '<td class="name">' + response[i].name + '</td>' +
                    '<td class="phone">' + response[i].phone + '</td></tr>';
                      tBody.appendChild(tmp);
            }
        }
    });
});
// // console.log(tBody)
// $.ajax({
//     url: root + '/users/',
//     method: 'GET'
// }).then(function (data) {
// //     tBody = document.getElementsByTagName('tbody');
// //     tPhone = document.getElementsByClassName('phone');
// //     tName = document.getElementsByClassName('name');
// for (var i = 0; i < data.length; i++) {
//     var tmp = '<tr>' +
//         '<td class="name">' + data[i].name + '</td>' +
//         '<td class="phone">' + data[i].phone + '</td></tr>';
//     console.log(tBody);
//     document.getElementsByTagName('tbody').appendChild(tmp);
//
// }
// });
