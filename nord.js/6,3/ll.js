const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function etsiAuto(rekisterinumero) {
  try {
    const data = fs.readFileSync('autot.csv', 'utf8').split('\n');
    const autot = data.map(line => line.split(','));
    let loydetytAutot = [];

    autot.forEach(auto => {
      const rekisteri = auto[0];
      if (rekisteri.includes(rekisterinumero)) {
        loydetytAutot.push({
          rekisterinumero: rekisteri,
          merkki: auto[1],
          vari: auto[2],
          vuosimalli: auto[3]
        });
      }
    });

    const jsonAutot = JSON.stringify(loydetytAutot, null, 2);
    fs.writeFileSync('autot.json', jsonAutot, 'utf8');

    console.log('Autot tallennettu JSON-tiedostoon.');
    return loydetytAutot;
  } catch (error) {
    console.error('Virhe luettaessa autotiedosto: ' + error.message);
    return [];
  }
}

rl.question('Anna rekisterinumero (tai sen osa): ', (rekisterinumero) => {
  const loydetytAutot = etsiAuto(rekisterinumero);
  if (loydetytAutot.length > 0) {
    console.log('Löytyneet autot:');
    loydetytAutot.forEach(auto => {
      console.log(`Rekisterinumero: ${auto.rekisterinumero}\nMerkki: ${auto.merkki}\nVäri: ${auto.vari}\nVuosimalli: ${auto.vuosimalli}`);

    });
  } else {
    console.log('Autoa ei löytynyt annetulla rekisterinumerolla.');
  }
  rl.close();
});
