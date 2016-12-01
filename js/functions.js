function luoRuno() {
    //Käyttäjän määrittämä aloitussana
    var sana = document.getElementById("runonAloitusSana").value;
    //Käyttäjän määrittelemä sanojen määrä
    var maara = document.getElementById("sanojenMaara").value;
    var runo = '';
    var tarkastin = 0;
    var j = 0;

    if (maara > 24 || maara < 3) {
      tarkastin = 2;    
    }

    //data.jsonissa on määritelty muuttuja data
    for(var i = 0; i < maara; i++){
//        console.log(i + ':nnes sana ' + sana);
        if(data.hasOwnProperty(sana)){
            runo += sana + ' ';
//	          console.log('Sanan kamut: ' + data[sana]);
            j = Math.floor(Math.random() * data[sana].length);
            sana = data[sana][j];
            j = 0;
        } else {
            tarkastin = 1;
        }
    }
  // Runon ensimmäinen kirjain isolla
  runo = capitalizeFirstLetter(runo);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//  console.log('runo: ' + runo);

  runo = divide(runo);
  function divide(string) {
      //splittaa runon jokaisen välimerkin kohdalta
      var array = string.split(" ");
      console.log(array);
//      console.log(array.length);
      for (i = 0; i < array.length; i++) {

    	     if (i % 3 == 0) {
               if ( i != 0 && i != array.length-1) {
                //liitetään sanan loppuun pilkku ja line break
                array[i] = array[i] + ', <br>';
               }
    	     }          
      }
      array[array.length-2] = array[array.length-2] + '.'; //lisätään loppuun piste, viimeinen listan alkio on tyhjä
// loppupiste tulee jostain syystä omalle rivilleen, kun sanoja on 10
      var divided = array.join(' ');
      return divided;
  }

  //jos tarkastin on muuttunut ykköseksi, määritellään ettei runoa syntynyt
  if (tarkastin == 1){
      runo = 'Aloitussanaa ei löytynyt Kalevalasta.';
    }
  if (tarkastin == 2) {
    runo = "Sanoja on oltava enemmän kuin kaksi ja vähemmän kuin 25."
  }

  //printataan runo
  document.getElementById("runous").innerHTML = runo;
}
