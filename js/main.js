/**
 * Created by Админ on 17.11.2016.
 */

document.addEventListener('DOMContentLoaded', function () {
    var tBody,
        tPhone,
        tName;
    tBody = document.querySelector('tbody');
    tPhone = document.getElementsByClassName('phone');
    tName = document.getElementsByClassName('name');
    console.log(tBody)
    function loadAjax(param) {
        var xhr = new XMLHttpRequest();
        xhr.open(param.type, param.url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                param.success(JSON.parse(xhr.response));
            }
        }
    };
    loadAjax({
        url: 'https://jsonplaceholder.typicode.com/users ',
        type: 'GET',
        success: function (response) {
            // console.log('response');
            // console.log(response);
            for (var i = 0; i < response.length; i++) {
                // console.log(response[i].id)
                var tmp = '<tr >' +
                    '<td class="name">' + response[i].name + '</td>' +
                    '<td class="phone">' + response[i].phone + '</td><td><button id="articles-'+response[i].id+'" type="submit">Отобразить статьи</button></td></tr>'
                      tBody.innerHTML += tmp
            }
        }
    });
    var table = document.querySelector('table');
    table.addEventListener('click', function(event) {
        // event.stopPropagation();
        var target = event.target;
        console.log(event)
        if(target.id == 'articles-1'){
          loadAjax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'GET',
            success: function (response) {
                var parentTr = target.parentNode.parentNode;
                for (var i = 0; i < response.length; i++) {
                    var tmpArticles ='<tr class="comment-tr">' +
                                    '<td colspan="2" class="block-sm">'+
                                        '<div class="block-title"><b>'+i+' </b>' +response[i].title+'</div>'+
                                       ' <div class="block-description">'+response[i].body+'</div>'+
                                        '<button class="comment" id="'+response[i].id+'">Получить комментарий</button>'
                                   ' </td>'+
                               ' </tr>';
                    if(response[i].userId == 1){
                        // console.log(response[i])
                        parentTr.insertAdjacentHTML('beforebegin', tmpArticles);
                    }

                }
            }
        });
        }
        else if(target.className == 'comment' && target.id == '3' ){
            loadAjax({
                url: 'https://jsonplaceholder.typicode.com/comments',
                type: 'GET',
                success: function (response) {
                    console.log(response);
                    var parentCommet = target.parentNode;
                    console.log(parentCommet);
                    for (var i = 0; i < response.length; i++) {
                        // console.log(response[i])
                        var tmpComment ='<div class="comment-block id-'+response[i].id+'">' +
                                            '<div class="comment-name"><b>Name:</b>'+response[i].name+'</div>'+
                                           ' <div class="comment-description"><b>Content:</b>'+response[i].body+'</div>'+
                                           ' <div class="comment-email"><b>Email:</b>'+response[i].email+'</div>'+
                                   ' </div>';
                        if(response[i].postId == 3){
                            // console.log(response[i])
                            parentCommet.insertAdjacentHTML('afterbegin', tmpComment);
                        }

                    }
                }
            });
        }
    });
});
