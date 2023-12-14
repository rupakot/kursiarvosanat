const readline = require("readline");
const fs = require("fs");
const virta = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
virta.question(
  "Valitse toiminto: \n1. Hae tietyn kurssin kaikkien osallistujien nimet ja arvosanat\n2. Hae tietyn opiskelijan kaikki kurssien nimet ja arvosanat\n3. Hae tietyn opiskelijan arvosana tietyltä kurssilta.\n",
  function (valinta) {
    if (valinta === "1") {
      virta.question("Anna kurssin nimi: ", function (kurssi) {
        losalistujat(kurssi);
        virta.close();
      });
    } else if (valinta === "2") {
      virta.question("Anna opiskelijan nimi: ", function (opiskelija) {
        opiskeliakurssi(opiskelija);
        virta.close();
      });
    } else if (valinta === "3") {
      virta.question(
        "Anna opiskelijan nimi ja kurssin nimi erotettuna pilkulla (esim. Maija Meikäläinen,HTML/CSS): ",
        function (input) {
          const [opiskelija, kurssi] = input.split(",");
          löytääNemo(opiskelija, kurssi);
          virta.close();
        }
      );
    } else {
      console.log("Virheellinen valinta.");
      virta.close();
    }
  }
);
function losalistujat(kurssi) {
  fs.readFile("kurssiarvosanat.csv", "utf8", function (err, data) {
    if (err) {
      console.log("Tapahtui virhe.");
    } else {
      const arvosanat = [];
 
      let rivit = data.split(/\r?\n/);
 
      for (let rivi of rivit) {
        if (rivi === '"kurssi","opiskelija","arvosana"' || rivi === "") {
          continue;
        }
 
        let luettuarvo = rivi.split(",");
 
        let arvosanaOlio = {
          kurssi: luettuarvo[0].replace(/"/g, ""),
          opiskelija: luettuarvo[1].replace(/"/g, ""),
          arvosana: luettuarvo[2].replace(/"/g, ""),
        };
        arvosanat.push(arvosanaOlio);
      }
      const osallistujat = arvosanat.filter(
        (arvosana) => arvosana.kurssi.toLowerCase() === kurssi.toLowerCase()
      );
      if (osallistujat.length > 0) {
        console.log(`Kurssin ${kurssi} osallistujat ja arvosanat:`);
        osallistujat.forEach((arvosana) => {
          console.log(
            `Opiskelija: ${arvosana.opiskelija}, Arvosana: ${arvosana.arvosana}`
          );
        });
      } else {
        console.log("Valitulla kurssilla ei ole osallistujia.");
      }
    }
  });
}
function opiskeliakurssi(opiskelija) {
  fs.readFile("kurssiarvosanat.csv", "utf8", function (err, data) {
    if (err) {
      console.log("Tapahtui virhe.");
    } else {
      const arvosanat = [];
 
      let rivit = data.split(/\r?\n/);
 
      for (let rivi of rivit) {
        if (rivi === '"kurssi","opiskelija","arvosana"' || rivi === "") {
          continue;
        }
        let luettuarvo = rivi.split(",");
        let arvosanaOlio = {
          kurssi: luettuarvo[0].replace(/"/g, ""),
          opiskelija: luettuarvo[1].replace(/"/g, ""),
          arvosana: luettuarvo[2].replace(/"/g, ""),
        };
        arvosanat.push(arvosanaOlio);
      }
      const opiskelijanKurssit = arvosanat.filter(
        (arvosana) => arvosana.opiskelija.toLowerCase() === opiskelija.toLowerCase()
      );
      if (opiskelijanKurssit.length > 0) {
        console.log(`Opiskelijan ${opiskelija} kurssit ja arvosanat:`);
        opiskelijanKurssit.forEach((arvosana) => {
          console.log(`Kurssi: ${arvosana.kurssi}, Arvosana: ${arvosana.arvosana}`);
        });
      } else {
        console.log("Opiskelijalla ei ole suorituksia.");
      }
    }
  });
}
function löytääNemo(opiskelija, kurssi) {
  fs.readFile("kurssiarvosanat.csv", "utf8", function (err, data) {
    if (err) {
      console.log("Tapahtui virhe.");
    } else {
      const arvosanat = [];
 
      let rivit = data.split(/\r?\n/);
 
      for (let rivi of rivit) {
        if (rivi === '"kurssi","opiskelija","arvosana"' || rivi === "") {
          continue;
        }
 
        let luettuarvo = rivi.split(",");
 
        let arvosanaOlio = {
          kurssi: luettuarvo[0].replace(/"/g, ""),
          opiskelija: luettuarvo[1].replace(/"/g, ""),
          arvosana: luettuarvo[2].replace(/"/g, ""),
        };
        arvosanat.push(arvosanaOlio);
      }
 
      const opiskelijanArvosana = arvosanat.find(
        (arvosana) =>
          arvosana.opiskelija.toLowerCase() === opiskelija.toLowerCase() &&
          arvosana.kurssi.toLowerCase() === kurssi.toLowerCase()
      );
 
      if (opiskelijanArvosana) {
        console.log(
          `Opiskelijan ${opiskelija} arvosana kurssilta ${kurssi}: ${opiskelijanArvosana.arvosana}`
        );
      } else {
        console.log(`Opiskelijalla ${opiskelija} ei ole arvosanaa kurssilta ${kurssi}.`);
      }
    }
  });
}
