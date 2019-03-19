let btn = document.getElementById('sync_text');
btn.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "black_white"}, function(response) {
            console.log(response.farewell);
        });
    });
}, false);
