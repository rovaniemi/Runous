function luoRuno() {
    //Aloitussana

    var sana = document.getElementById("runonAloitusSana").value;
    //Sanojen määrä
    var maara = document.getElementById("sanojenMaara").value;
    var sananSailytys = '';
    var runo = '';

    var j = 1;
    //data.jsonissa määritelty var data
    for(var i = 0; i < maara; i++){
        if(data.hasOwnProperty(sana)){
            runo += sana + ' ';
            sananSailytys = sana;
            sana = data[sana][j];
            j = 1;
        } else {
            sana = data[sananSailytys][j++];
        }
    }


    document.getElementById("runous").innerHTML = runo;
}
