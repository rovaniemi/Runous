function luoRuno() {
    //Aloitussana

    var sana = document.getElementById("runonAloitusSana").value;
    //Sanojen määrä
    var maara = document.getElementById("sanojenMaara").value;
    var sananSailytys = '';
    var runo = '';

    var j = 0;
    //data.jsonissa määritelty var data
    for(var i = 0; i < maara; i++){
        if(data.hasOwnProperty(sana)){
          if(sana.length > 3){
            j = Math.floor(Math.random() * 3);
          }
        if(i == maara - 1){
            runo += sana;
        } else {
          runo += sana + ' ';
        }
        sananSailytys = sana;
        sana = data[sana][j];
        j = 0;
          } else {
            sana = data[sananSailytys][0];
          }
    }
	runo = capitalizeFirstLetter(runo);
	runo = divide(runo);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function divide(string) {
	var array = string.split(" ");
	for (i = 0; i < maara; i++) {
		if (i % 4 == 0) {
			array.splice(i, 0, "<br>");
		}
	}
	var divided = array.join(" ");
	return divided;
    }

    document.getElementById("runous").innerHTML = runo;
}

