// Слушаем сообщения от popup.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.defect);
        blindFilter(request.defect);
    });

// коэффициенты матрицы фильтра взяты с https://github.com/eeejay/NoCoffee
let colorMatrix = {
    "deuteranopia": '0.567 0.433 0 0 0\n' +
                    '0.558 0.442 0 0 0\n' +
                    '0 0.242 0.758 0 0\n' +
                    '0 0 0 1 0',
    "protanopia":   '0.625 0.375 0 0 0\n' +
                    '0.7 0.3 0 0 0\n' +
                    '0 0.3 0.7 0 0\n' +
                    '0 0 0 1 0',
    "tritanopia":   '0.95 0.05 0 0 0\n' +
                    '0 0.433 0.567 0 0\n' +
                    '0 0.475 0.525 0 0\n' +
                    '0 0 0 1 0',
    "achromotopsia":'0.299 0.587 0.114 0 0\n' +
                    '0.299 0.587 0.114 0 0\n' +
                    '0.299 0.587 0.114 0 0\n' +
                    '0 0 0 1 0',
    "nofilter": null,
};

let blindFilter = function(defectType) {
    // применяем фильтр к странице, добавляя элемент в разметку
    $('.filterBlock').remove();
    $('body').append(
        "<div class='filterBlock' style='visibility: visible'>" +
        "<svg xmlns='http://www.w3.org/2000/svg' version='1.1'>" +
        "<defs>" +
        "<filter id=" + defectType + ">" +
        "<feColorMatrix type=\"matrix\" values=\"" + colorMatrix[defectType] + "\" />'" +
        "</filter>" +
        "</defs>" +
        "</svg>" +
        "</div>"
    );
    // и применяя стили к html
    $("html").css('cssText', 'filter: url("#' + defectType + '")');
};