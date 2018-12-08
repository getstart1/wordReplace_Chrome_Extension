function clickHandler(e) {
  var word = document.getElementById('word').value;
  var replacement = document.getElementById('replacement').value;

//This is a handy way to send variables to a script within the active tab
//Query for the active tag, then execute a script, and send a message to that script
//with a custom json containing all the info you need: the type of message, the word to replace,
//and what to replace it with.
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
        file: "content.js"
    }, function(){
        chrome.tabs.sendMessage(tabs[0].id,{
            type: "replace",
            word: word,
            replacement: replacement
        },
        function(response) {
          this.close();
        });
    });
  });
}

//wait until after the wordreplace_popup.html is loaded,
//otherwise, no replace button will be found
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('replace').addEventListener('click', clickHandler);
})
