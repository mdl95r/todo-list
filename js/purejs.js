// Vanilla Js исполнение
// Слушаем, как страница прогрузиться
document.addEventListener('DOMContentLoaded', function() {
    // поле имя дела
    const   newdo_name_elem = document.getElementById("js-newdo-name"),
    
            // поле описание дела
            newdo_desc_elem = document.getElementById("js-newdo-desc"),

            //  Список пуст
             list_null_elem = document.querySelector("js-null"),

            //Список дел
                dolist_elem = document.querySelector("js-list"),

            // заголовок список дел
          dolist_title_elem = document.querySelector("js-dolist-title");

            // форма
                  form_elem = document.querySelector("js-form");

    
    // слушаем клик по кнопке добавить дело
    form_elem.addEventListener("submit", function() {

       
        
        // Функция должна срабатывать после того, как все li элементы будут удалены
        function showMessage()  {

            const dolistItem = document.querySelectorAll('.dolist-list__item');

            // если кол-во элементов li равно 0, то
            if (dolistItem.length == 0) {

                // скрываю список
                dolistList.style.display = "";

                // меняю внешний отступ для заголовка "Список дел"
                dolistDoTitle.style.marginBottom =  "63px";

                // показываю "Список пуст"
                listNull.style.display = "";
            // в противном случае показываю в консоли
            } else {
                console.log("!");
            }
        };
        
        // проверяю слушателя, если это кнопка стереть то вызываю слушателя
        if (btnClear) {
            btnClear.addEventListener("click", function() {
                // применяю к родителю метод remove удаляющий разметку
                this.closest(".dolist-list__item").remove();

                // вызываю функцию
                showMessage();    
            });
        }
    });
});