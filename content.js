chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        blindFilter(request.defect);
    });


let blindFilter = function(defectType) {
    $('body').append(
        "<div id='filterBlock' visibility='visible'>" +
            "<svg xmlns='http://www.w3.org/2000/svg' version='1.1'>" +
                "<defs>" +
                    "<filter id=" + defectType + ">" +
                    "</filter>" +
                "</defs>" +
            "</svg>" +
        "</div>"
    );
    let feColorMatrixElement = $('<feColorMatrix>', {type: 'matrix',
        values: '0.95 0.05 0 0 0' +
                '0 0.433 0.567 0 0' +
                '0 0.475 0.525 0 0' +
                '0 0 0 1 0'
    });
    $('#' + defectType).append(feColorMatrixElement);
    $("body").css({'filter': 'url("#' + defectType + '")'});
    $("body").hide().show(0);
};

$(document).ready(function () {
    blindFilter("deuteranopia");
});