function getPoem() {
  event.preventDefault();

  var word = document.getElementById("start-word").value;
  var counter = document.getElementById("word-amount").value;

  if (!/^[a-zåäöA-ZÅÄÖ]+$/.test(word)) {
    document.getElementById("poem").innerHTML = "Kirjoita runolle aloitussana.";
    document.getElementById("start-word").value = '';
    return;
  }

  if (counter < 3) {
    document.getElementById("poem").innerHTML = "Sanoja on oltava vähintään kolme.";
    document.getElementById("word-amount").value = 3;
    return;
  } else if (counter > 24) {
    document.getElementById("poem").innerHTML = "Sanoja on oltava enintään 24.";
    document.getElementById("word-amount").value = 24;
    return;
  }

  // build a json object
  var data = { "word": word, "counter": counter };
  $.post('/getpoem', data, function (resp) {
    document.getElementById("poem").innerHTML = resp;
    if (resp === "Sanaa ei löytynyt Kalevalasta.") {
      hideVoteButtons();
    } else {
      showVoteButtons();
    }
  });
}

function votePoem(vote) {
  event.preventDefault();
  var poem = document.getElementById("poem").innerHTML;
  var data = { "poem": poem, "vote": vote };
  $.post('/votepoem', data, function (message) {
    if (message !== '') {
        document.getElementById("poem").innerHTML = message;
    }
    hideVoteButtons();
  });
}

function hideVoteButtons() {
  var elements = document.getElementsByClassName("vote");
  for (i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}

function showVoteButtons() {
  var elements = document.getElementsByClassName("vote");
  for (i = 0; i < elements.length; i++) {
    elements[i].style.display = "inline";
  }
}
