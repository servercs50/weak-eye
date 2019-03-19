chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        blindFilter(request.defect);
    });


let blindFilter = function(defectType) {
    function getRGB(str){
        let match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return [match[1], match[2], match[3]];
    }

    $("*").each(function () {

        let rgb = $(this).css("background-color");
        let blind_rgb;
        console.log(rgb);
        rgb = getRGB(rgb);
        if (JSON.stringify(rgb) !== JSON.stringify(["0", "0", "0"]) &&
            JSON.stringify(rgb) !== JSON.stringify(["255", "255", "255"])) {
            if (defectType === "protanopia") {
                blind_rgb = fBlind.Protanopia(rgb);
            } else if (defectType === "deuteranopia") {
                blind_rgb = fBlind.Deuteranopia(rgb);
            } else if (defectType === "tritanopia") {
                blind_rgb = fBlind.Tritanopia(rgb);
            }
            blind_rgb = blind_rgb.join(", ");
            $(this).css("cssText", "background-color:" + "rgb(" + blind_rgb + ") !important");
        }
    });
};

$(document).ready(function () {
    // let images = $('img');
    // console.log(images);
    // images.each(function () {
    //     console.log($(this)[0].clientWidth + " " + $(this)[0].clientHeight);
    // });
});