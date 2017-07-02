function getPoem() {
  event.preventDefault();

  var word = document.getElementById("runonAloitusSana").value;
  var counter = document.getElementById("sanojenMaara").value;

  if (!/^[a-zåäöA-ZÅÄÖ]+$/.test(word)) {
    document.getElementById("runous").innerHTML = "Kirjoita runolle aloitussana.";
    document.getElementById("runonAloitusSana").value = '';
    return;
  }

  if (counter < 3) {
    document.getElementById("runous").innerHTML = "Sanoja on oltava vähintään kolme.";
    document.getElementById("sanojenMaara").value = 3;
    return;
  } else if (counter > 24) {
    document.getElementById("runous").innerHTML = "Sanoja on oltava enintään 24.";
    document.getElementById("sanojenMaara").value = 24;
    return;
  }

  // build a json object
  var data = { "word": word, "counter": counter };
  $.post('/getpoem', data, function (resp) {
    document.getElementById("runous").innerHTML = resp;
    if (resp === "Sanaa ei löytynyt Kalevalasta.") {
      hideVoteButtons();
    } else {
      showVoteButtons();
    }
  });
}

function votePoem(vote) {
  event.preventDefault();
  var poem = document.getElementById("runous").innerHTML;
  var data = { "poem": poem, "vote": vote };
  $.post('/votepoem', data, function (message) {
    if (message !== '') {
        document.getElementById("runous").innerHTML = message;
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
