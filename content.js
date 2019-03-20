chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.defect);
        blindFilter(request.defect);
    });

let colorMatrix = {
    "deuteranopia": '0.567 0.433 0 0 0    0.558 0.442 0 0 0      0 0.242 0.758 0 0      0 0 0 1 0',
    "protanopia":   '0.625 0.375 0 0 0    0.7 0.3 0 0 0        0 0.3 0.7 0 0        0 0 0 1 0',
    "tritanopia":   '0.95 0.05 0 0 0      0 0.433 0.567 0 0      0 0.475 0.525 0 0      0 0 0 1 0',
};

let blindFilter = function(defectType) {
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

    $("html").css('cssText', 'filter: url("#' + defectType + '")');

    return defectType
};

$(document).ready(function () {
    // let filterElementId = blindFilter("tritanopia");
});