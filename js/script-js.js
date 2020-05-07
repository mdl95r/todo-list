// Данная оболочка, необходима для срабатывния скриптов после загрузки документа
$(document).ready(function() {
    const  dolistColTitleEl = $(".js-dolist-title"), 
             newdolistTitle = $("#js-newdo-title"),
              newdolistDesc = $("#js-newdo-desc"),
               listNullElem = $(".js-null"),
                 dolistElem = $(".js-list"),
                     btnAdd = $("#btn-add"),
                  nameLabel = $(".newdo-name label"),
                  decsLabel = $(".newdo-description label"),
                  nameTitle = $(".newdo-name__title"),
                  nameAlert = $(".newdo-name .alert"),
                  descAlert = $(".newdo-description .alert"),
       newDoDescriptionDesc = $(".newdo-description__desc");

$(newdolistTitle).on("keyup", function() {
    if ($(this).val() == "") {
        $(nameLabel).removeClass("access");
        $(nameLabel).removeClass("invalid");
        
    } else {
        $(nameLabel).addClass("access");
        $(nameLabel).removeClass("invalid");
    }

    $(nameTitle).removeClass("invalid");

    $(nameAlert).css("display", "");
});

$(newdolistDesc).on("keyup", function() {      
    if ($(this).val() == "") {
        $(decsLabel).removeClass("access");
        $(decsLabel).removeClass("invalid");
    } else {
        $(decsLabel).addClass("access");
        $(decsLabel).removeClass("invalid");
    }

    $(newDoDescriptionDesc).removeClass("invalid");

    $(descAlert).css("display", "");
});

// Функция при клике по "добавить дело"
$(btnAdd).on("click", function( event ) {

    // отменяем действие по умолчанию (перезагрузка страницы)
    event.preventDefault();

    // создаю переменную и передаю значение поля newdo-name__title
    const dolistTitleElem = $(newdolistTitle).val();

    // создаю переменную и передаю значение поля newdo-description__desc
    const dolistDescElem = $(newdolistDesc).val();
    
    // создаю условие, если две переменных не равны пустой строке, то
    if (dolistTitleElem && dolistDescElem != "") {

        // показываю ul блок (пока пустой)
        $(dolistElem).css("display", "block");

        // меняю внешний отступ для заголовка "Список дел"
        $(dolistColTitleEl).css("marginBottom", "29px");

        // скрываю "Список пуст"
        $(listNullElem).fadeOut();

        // генерирую разметку элемента li и подставляю данные с полей форм
        $(dolistElem).append(`
            <li class='list-item js-list-item'> 
                <article class='list-item__item'>
                    <header class='list-item__header'>
                        <h3 class='list-item__title reset'>${dolistTitleElem}</h3> 
                        <div class='list-item__btn-clear js-btn-clear' aria-label='Закрыть дело' title = 'Закрыть дело'></div> 
                        <div class='list-item__stripe-btn js-stripe-btn' aria-label='Скрыть описание' title = 'Скрыть описание'></div>
                    </header>
                    <p class='list-item__slider js-slider reset'>${dolistDescElem}</p> 
                </article>
            </li>`);
        // стираю значения полей
        $(newdolistTitle).val("");
        $(newdolistDesc).val("");

        $(nameLabel).removeClass("access");

        $(decsLabel).removeClass("access");

        $(nameLabel).removeClass("invalid");

        $(decsLabel).removeClass("invalid");
        
    } else {
        if (dolistTitleElem == "") {
            $(nameLabel).removeClass("access");

            $(nameTitle).addClass("invalid");

            $(nameLabel).addClass("invalid");

            $(nameAlert).css("display", "inline");
        }

        if (dolistDescElem  == "") {
            $(decsLabel).removeClass("access");

            $(newDoDescriptionDesc).addClass("invalid");

            $(decsLabel).addClass("invalid");

            $(descAlert).css("display", "inline");
        }
    }

    // $(newdolistTitle).on("keydown", function() {
    //     $(nameTitle).removeClass("invalid");

    //     $(nameAlert).css("display", "");
    // });

    // $(newdolistDesc).on("keydown", function() {
    //     $(newDoDescriptionDesc).removeClass("invalid");

    //     $(descAlert).css("display", "");
    // });

    const btnclearElem = $(".js-btn-clear");

    // функция на проверку кол-ва элементов li
    function showMessage()  {

        // если кол-во элементов li равно 0, то
        if ($(".js-list-item").length == 0) {

            // скрываю список
            $(dolistElem).css("display","none");

            // меняю внешний отступ для заголовка "Список дел"
            $(dolistColTitleEl).css("marginBottom", "63px");

            // показываю "Список пуст"
            $(listNullElem).fadeIn(300);	
        }
    };

    // клик по крестику для удаления дела
    $(btnclearElem).on('click', function() {

        // от кнопки стереть, перемещаюсь по DOM к родителю - к элементу li, применяю плавное скрытие и создаю функцию
        $(this).closest(".js-list-item").fadeOut(300, function() {
            
            // удаляю текущий элемент li
            $(this).remove();

            // вызываю функцию
            showMessage();
        });
    });
});

// Сворачивание
// Используем т.н называемое делегирование событий 
// (из-за того, что список создается динамически), т.е мы привязываемся к
// ближайшему род. элементу - ul, а после создание списка усправление переходит стрелке
$(dolistElem).on('click', '.js-stripe-btn', function() {

    // у стрелки меняем класс
    $(this).toggleClass("up-task");

    // Переремещаемся по DOM, к ближающему родителю стрелки (dolist-list__header) и
    // перемещаемся к следующему элементу dolist-list__slider и скрываем/показываем его
    $(this).parent().next('.js-slider').slideToggle();
});
});