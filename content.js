chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.action);
    });

$(document).ready(function () {
    // let images = $('img');
    // console.log(images);
    // images.each(function () {
    //     console.log($(this)[0].clientWidth + " " + $(this)[0].clientHeight);
    // });
    function getRGB(str){
        let match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return [match[1], match[2], match[3]];
    }

    let deffect_type = "protanopia";

    $("*").each(function () {
        let rgb = getRGB($(this).css("background-color"));
        let blind_rgb;
        if (JSON.stringify(rgb) !== JSON.stringify(["0", "0", "0"])) {
            if (deffect_type === "protanopia") {
                blind_rgb = fBlind.Protanopia(rgb);
            } else if (deffect_type === "deuteranopia") {
                blind_rgb = fBlind.Deuteranopia(rgb);
            } else if (deffect_type === "tritanopia") {
                blind_rgb = fBlind.Tritanopia(rgb);
            }
            blind_rgb = blind_rgb.join(", ");
            $(this).css({"background-color": "rgb(" + blind_rgb + ")"})
        }
    });
});