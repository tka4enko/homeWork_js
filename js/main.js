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
            console.log(history);
            // console.log(response);
            for (var i = 0; i < response.length; i++) {
                // console.log(response[i].id)
                var tmp = '<tr id ="'+response[i].id+'" >' +
                    '<td class="name">' + response[i].name + '</td>' +
                    '<td class="phone">' + response[i].phone + '</td><td><button class="articles" data-articles="'+response[i].id+'" type="submit">Отобразить статьи</button></td></tr>'
                      tBody.innerHTML += tmp
            }
        }
    });
    var table = document.querySelector('table');
    table.addEventListener('click', function(event) {
        // event.stopPropagation();

    var target = event.target,
        dataArticles = target.getAttribute('data-articles');
        if(target.className == 'articles') {
            loadAjax({
                url: 'https://jsonplaceholder.typicode.com/posts?userId='+dataArticles,
                type: 'GET',
                success: function (response) {
                    var mianBody = document.querySelector('body');
                    var parentTr = target.parentNode.parentNode;
                    var parentId = parentTr.id;
                    console.log(mianBody)
                    history.pushState('indexfoo', "page 2", "#user"+parentId);
                    for (var i = 0; i < response.length; i++) {
                        var tmpArticles = '<div class="container"><tr class="comment-tr">' +
                            '<td colspan="3" class="block-sm">' +
                            '<div class="block-title"><b>' + response[i].id + ' </b>' + response[i].title + '</div>' +
                            ' <div class="block-description">' + response[i].body + '</div>' +
                            '<button class="comment" data-comment="' + response[i].id + '">Получить комментарий</button>'
                        ' </td>' +
                        ' </tr></div>';
                        if (response[i].userId == parentId) {
                            // console.log(response[i])
                            mianBody.innerHTML += tmpArticles;
                        }

                    }
                }
            })
        }
        else if(target.className == 'comment' ){
            var dataComment = target.getAttribute('data-comment');
            loadAjax({
                url: 'https://jsonplaceholder.typicode.com/comments?postId='+dataComment,
                type: 'GET',
                success: function (response) {
                    // console.log(response);
                    var parentCommet = target.parentNode;
                    var parentCommetId = target.parentNode;

                    for (var i = 0; i < response.length; i++) {
                        // console.log(response[i])
                        var tmpComment ='<div class="comment-block id-'+response[i].id+'">' +
                                            '<div class="comment-name"><b>Name:</b>'+response[i].name+'</div>'+
                                           ' <div class="comment-description"><b>Content:</b>'+response[i].body+'</div>'+
                                           ' <div class="comment-email"><b>Email:</b>'+response[i].email+'</div>'+
                                   ' </div>';
                        if(response[i].postId == dataComment){
                            console.log(response[i])
                            parentCommet.insertAdjacentHTML('afterbegin', tmpComment);
                        }

                    }
                }
            });
        }
    });
});
