const fs = require('fs');
const readline = require('readline');

const datavirta = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

datavirta.question('Pick a row (1 or 2): ', function (nimi) {
  if (nimi === '1') {

    fs.readFile('loki.txt', 'utf8', function (err, data) {
      if (err) {
          console.log('Tapahtui virhe.');
      }
      else {
          console.log(data);
      }
  });
    datavirta.close();
    console.log('You picked option 1.');

  } else if (nimi === '2') {
    datavirta.question('Anna teksti', function(nimi) {
      const fs = require('fs');

fs.writeFile('loki.txt', nimi, { encoding: 'utf8', flag: 'a+' }, function(err) {
    if (err) {
        console.log('Virhe tiedostoon kirjoittamisessa.')
    }
    else {
        console.log('Kirjoitettu tiedostoon: ' + nimi);
        datavirta.close();

    }
});

    });

   
    datavirta.question('Give a row: ', function (nimi) {
      console.log(`Hello, ${nimi}!`);
      datavirta.close();
    });

  } else {
    console.log('Invalid input. Please enter 1 or 2.');
    datavirta.close();
  }
});
