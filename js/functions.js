function luoRuno() {
    //Aloitussana

  var sana = document.getElementById("runonAloitusSana").value;
  //Sanojen määrä
  var maara = document.getElementById("sanojenMaara").value;
  var runo = '';

  var j = 0;
  //data.jsonissa määritelty var data
  for(var i = 0; i < maara; i++){
    console.log(i + ':nnes sana ' + sana);
    if(data.hasOwnProperty(sana)){
	  console.log('Sanan kamut: ' + data[sana]);
      if(data[sana].length >= 2){
        j = Math.floor(Math.random() * 3);
      }
    sana = data[sana][j];
    j = 0;
    runo += sana + ' ';
    
    } else {
      alert('Sanaa ei löytynyt Kalevalasta');
      location.reload();
      return;
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
    	 if (i % 5 == 0) {
      	 array.splice(i, 0, "<br>");
         var lineStarter = array[i + 1];
         console.log('lineStarter: ' + lineStarter);
         lineStarter = capitalizeFirstLetter(lineStarter);
         array.splice((i+1), 1, lineStarter);
    	}
    }
    var divided = array.join(" ");
    return divided;
  }
  document.getElementById("runous").innerHTML = runo;
}

