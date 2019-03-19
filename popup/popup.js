let btns = document.getElementsByClassName("defect-name");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let defectType = e.target.id;
            chrome.tabs.sendMessage(tabs[0].id, {defect: defectType}, function (response) {
            });
        });
    }, false);
}
