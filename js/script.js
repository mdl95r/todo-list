// Данная оболочка, необходима для срабатывния скриптов после загрузки документа
$(document).ready(function() {
        // объявляю переменные

                // поле имя дела
        const    newdo_name_elem = $("#js-newdo-name"),
                
                // поле описание дела
                 newdo_desc_elem = $("#js-newdo-desc"),

                //  Список пуст
                  list_null_elem = $(".js-null"),

                //   Список дел
                     dolist_elem = $(".js-list"),

            // заголовок список дел
               dolist_title_elem = $(".js-dolist-title");

                // форма
                       form_elem = $(".js-form");

    // Функция при клике по "добавить дело"
    $(form_elem).on("submit", function( event ) {

        // отменяем действие по умолчанию (перезагрузка страницы)
        event.preventDefault();

        // сохраняю в переменную значение поля формы
        const name_value = $(newdo_name_elem).val();

        // сохраняю в переменную значение поля формы
        const desc_value = $(newdo_desc_elem).val();
        
        // изменяю отступ
        $(dolist_title_elem).addClass("list-contain");

        // скрываю "Список пуст"
        $(list_null_elem).fadeOut();

        // генерирую разметку элемента li и подставляю данные с полей форм
        $(dolist_elem).append(`
            <li class="list-item js-list-item"> 
                <article class="list-item__item">
                    <header class="list-item__header">
                        <h3 class="list-item__title reset">${name_value}</h3> 
                        <button class="list-item__btn-clear js-btn-clear" aria-label="Закрыть дело" title = "Закрыть дело"></button> 
                        <button class="list-item__stripe-btn js-stripe-btn" aria-label="Скрыть описание" title = "Скрыть описание"></button>
                    </header>
                    <p class="list-item__slider js-slider reset">${desc_value}</p> 
                </article>
            </li>`);

        // сбрасываю форму
        this.reset();
    });

    // Удаление дела
    // Используем т.н называемое делегирование событий 
    // клик по кресту для удаления дела
    $(dolist_elem).on("click", ".js-btn-clear", function() {

        // от кнопки стереть, перемещаюсь по DOM к родителю - к элементу li, применяю плавное скрытие и создаю функцию
        $(this).closest(".js-list-item").fadeOut(300, function() {
            
            // удаляю текущий элемент li
            $(this).remove();

             // если кол-во элементов li внутри списка равно 0, то
             if (dolist_elem.children().length == 0) {

                // изменяю отступ
                $(dolist_title_elem).removeClass("list-contain");

                // показываю "Список пуст"
                $(list_null_elem).fadeIn(300);	
            }
        });
    });

    // Сворачивание
    // Используем т.н называемое делегирование событий 
    // (из-за того, что список создается динамически), т.е мы привязываемся к
    // ближайшему род. элементу - ul, а после создание списка усправление переходит стрелке
    $(dolist_elem).on("click", ".js-stripe-btn", function() {

        // у стрелки меняем класс
        $(this).toggleClass("up-task");
        
        // определяю в переменную кнопку скрыть/показать описание
        const stripe_btn = $(this).closest(".js-list-item").find(".js-stripe-btn");

        // проверяю имеются ли атрибуты
        if (stripe_btn.attr("title") === "Скрыть описание" && stripe_btn.attr("aria-label") === "Скрыть описание") {
            // меняю атрибут
            stripe_btn.attr({
                "title": "Показать описание", "aria-label": "Показать описание"
            });
        } else {
            // оставляю по умолчанию
            stripe_btn.attr({"title": "Скрыть описание", "aria-label": "Скрыть описание"});
        }

        // Переремещаемся по DOM, к ближающему родителю стрелки (dolist-list__header) и
        // перемещаемся к следующему элементу dolist-list__slider и скрываем/показываем его
        $(this).closest(".js-list-item").find(".js-slider").slideToggle();
    });
});