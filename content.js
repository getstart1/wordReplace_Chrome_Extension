//This javascript is embedded into the page.
// Some of this javascript was provided by https://github.com/mjp2220/useless-chrome-extensions#text-replace
var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
// You can add defaults here if you want
var MATCH = [];
var REPLACE = [];

//In this tab, listen for a message
chrome.runtime.onMessage.addListener(function (message) {
  //check to see if the message is from the popup replacer
  if (message.type == "replace") {
    //The message is the json containing the word and replacement
    walkme(message)
  }
});

function walkme(message){
    MATCH.push(message.word);
    REPLACE.push(message.replacement);
    walk(document.body);
}

function walk(node) {
    // Function from here for replacing text: http://is.gd/mwZp7E

    var child, next;

    switch (node.nodeType) {
        case ELEMENT:  // Element
        case DOCUMENT:  // Document
        case DOCUMENT_FRAGMENT: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case TEXT: // Text node
            replaceText(node);
            break;
    }
}

function replaceText(textNode) {
    var v = textNode.nodeValue;

    // Go through and match/replace all the strings we've given it, using RegExp.
    for (var i = 0; i < MATCH.length; i++) {
        v = v.replace(new RegExp('\\b' + MATCH[i] + '\\b', 'g'), REPLACE[i]);
    }

    textNode.nodeValue = v;
}
