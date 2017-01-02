function getPoem() {
        event.preventDefault();

        var word = document.getElementById("runonAloitusSana").value;
        var counter = document.getElementById("sanojenMaara").value;

        // build a json object
        var data = {"word" : word, "counter" : counter};
        $.post('/getpoem', data, function(resp) {
            var response = resp;
            document.getElementById("runous").innerHTML = resp;
        });
};
