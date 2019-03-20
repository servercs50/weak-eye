let btns = document.getElementsByClassName("defect-name");
for (let i = 0; i < btns.length; i++) {
    // Вешаем обработчики клика на кнопки
    btns[i].addEventListener('click', function (e) {
        // Выбираем для изменений только активную вкладку
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            // Определяем тип фильтра исходя из id нопки
            let defectType = e.target.id;
            // Отправляем тип фильтра скрппту страницы
            chrome.tabs.sendMessage(tabs[0].id, {defect: defectType}, function (response) {
            });
        });
    }, false);
}
