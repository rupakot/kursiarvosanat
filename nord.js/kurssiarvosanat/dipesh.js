const fs = require('fs');

function haeKurssinOsallistujatJaArvosanat(kurssi) {
  fs.readFile('kurssiarvosanat.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Virhe tiedoston lukemisessa:', err);
      return;
    }
    const rivit = data.split('\n');
    const opiskelijat = [];

    for (let i = 1; i < rivit.length; i++) {
      const rivi = rivit[i].split(',');
      const kurssiCsv = rivi[0].replace(/"/g, '');
      const opiskelija = rivi[1].replace(/"/g, '');
      const arvosana = rivi[2].replace(/"/g, '');

      if (kurssiCsv === kurssi) {
        opiskelijat.push({ Opiskelija: opiskelija, Arvosana: arvosana });
      }
    }

    if (opiskelijat.length > 0) {
      console.log(`Kurssin ${kurssi} osallistujien nimet ja arvosanat:`, opiskelijat);
    } else {
      console.log(`Kurssia ${kurssi} ei löytynyt`);
    }
  });
}


function haeOpiskelijanKurssitJaArvosanat(opiskelija) {
  fs.readFile('kurssiarvosanat.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Virhe tiedoston lukemisessa:', err);
      return;
    }

    const rivit = data.split('\n');
    const kurssit = [];

    for (let i = 1; i < rivit.length; i++) {
      const rivi = rivit[i].split(',');
      const kurssiCsv = rivi[0].replace(/"/g, '');
      const opiskelijaCsv = rivi[1].replace(/"/g, '');
      const arvosana = rivi[2].replace(/"/g, '');

      if (opiskelijaCsv === opiskelija) {
        kurssit.push({ Kurssi: kurssiCsv, Arvosana: arvosana });
      }
    }

    if (kurssit.length > 0) {
      console.log(`Opiskelijan ${opiskelija} kurssit ja arvosanat:`, kurssit);
    } else {
      console.log(`Opiskelijaa ${opiskelija} ei löytynyt`);
    }
  });
}


function haeOpiskelijanArvosanaKurssilta(opiskelija, kurssi) {
  fs.readFile('kurssiarvosanat.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Virhe tiedoston lukemisessa:', err);
      return;
    }

    const rivit = data.split('\n');
    let arvosana = 'Arvosanaa ei löytynyt';

    for (let i = 1; i < rivit.length; i++) {
      const rivi = rivit[i].split(',');
      const kurssiCsv = rivi[0].replace(/"/g, '');
      const opiskelijaCsv = rivi[1].replace(/"/g, '');
      const arvosanaCsv = rivi[2].replace(/"/g, '');

      if (opiskelijaCsv === opiskelija && kurssiCsv === kurssi) {
        arvosana = arvosanaCsv;
        break;
      }
    }

    if (arvosana !== 'Arvosanaa ei löytynyt') {
      console.log(`Opiskelijan ${opiskelija} arvosana kurssilta ${kurssi}:`, arvosana);
    } else {
      console.log(`Opiskelijan ${opiskelija} arvosanaa kurssilta ${kurssi} ei löytynyt`);
    }
  });
}


haeKurssinOsallistujatJaArvosanat('HTML/CSS');
haeOpiskelijanKurssitJaArvosanat('Maija Meikäläinen');
haeOpiskelijanArvosanaKurssilta('Maija Meikäläinen', 'HTML/CSS');