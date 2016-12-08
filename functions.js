function luoRuno() {
    //Käyttäjän määrittämä aloitussana
    var word = document.getElementById("runonAloitusSana").value;
    //Käyttäjän määrittelemä sanojen määrä
    var maara = document.getElementById("sanojenMaara").value;
    var runo = '';
    var tarkastin = 0;
    var j = 0;
    var sana = word.toLowerCase();
    
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
      array = array.filter(Boolean); //poistaa listasta tyhjät alkiot
      console.log(array);
      console.log('arrayn pituus: ' + array.length);
      for (i = 0; i < array.length - 1; i++) {

    	     if (i % 4 == 0) {
               if ( i != 0 && i != array.length-1) {
                console.log('i: ' + i);
                console.log('liitetään sanan ' + array[i] + ' loppuun pilkku ja line break');
                array[i - 1] = array[i - 1] + ', <br>';
               }
    	     }
      }
      array[array.length-1] = array[array.length-1] + '.';
      console.log('Lisätään piste sanan ' + array[array.length-1] + ' perään');
// loppupiste tulee jostain syystä omalle rivilleen, kun sanoja on 10
      var divided = array.join(' ');
      return divided;
  }

  //jos tarkastin on muuttunut ykköseksi, määritellään ettei runoa syntynyt
  if (tarkastin == 1){
      runo = 'Aloitussanaa ei löytynyt Kalevalasta.';
    }
  if (tarkastin == 2) {
    runo = 'Sanoja on oltava enemmän kuin kaksi ja vähemmän kuin 25.';
  }

  //printataan runo
  document.getElementById("runous").innerHTML = runo;
}