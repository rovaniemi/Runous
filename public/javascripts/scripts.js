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
        var data = {"word" : word, "counter" : counter};
        $.post('/getpoem', data, function(resp) {
            var response = resp;
            document.getElementById("runous").innerHTML = resp;
        });
}
