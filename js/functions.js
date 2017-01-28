var exports = module.exports = {};

exports.capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.divide = function (string) {
  var array = string.split(" ");
  array = array.filter(Boolean); //poistaa listasta tyhjät alkiot
  console.log('Jaettava stringi: ' + array);
  console.log('arrayn pituus: ' + array.length);
  for (i = 0; i < array.length - 1; i++) {

    if (i % 4 === 0) {
      if ( i !== 0 && i != array.length-1) {
        console.log('i: ' + i);
        console.log('liitetään sanan ' + array[i] + ' loppuun pilkku ja line break');
        array[i - 1] = array[i - 1] + ', <br>';
        }
  	  }
    }

  array[array.length-1] = array[array.length-1] + '.';
  console.log('Lisätään piste sanan ' + array[array.length-1] + ' perään');
  var divided = array.join(' ');
  return divided;
};

exports.sortByProb = function (x,y) {
  return y.prob - x.prob;
};
