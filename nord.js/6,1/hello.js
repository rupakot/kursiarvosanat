const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Syötä ensimmäinen luku (1-10): ", (luku1) => {
  rl.question("Syötä toinen luku (1-10): ", (luku2) => {
    luku1 = parseInt(luku1);
    luku2 = parseInt(luku2);

    if (1 <= luku1 && luku1 <= 10 && 1 <= luku2 && luku2 <= 10) {
      const summa = luku1 + luku2;
      const erotus = luku1 - luku2;
      const tulo = luku1 * luku2;
      let osamaara;
      if (luku2 !== 0) {
        osamaara = luku1 / luku2;
      } else {
        osamaara = "Lukua ei voi jakaa nollalla.";
      }

      console.log("Summa:", summa);
      console.log("Erotus:", erotus);
      console.log("Tulo:", tulo);
      console.log("Osamäärä:", osamaara);

      // Print numbers between luku1 and luku2
      console.log(":");
      for (let i = luku1 + 1; i < luku2; i++) {
        console.log(i);
      }
    } else {
      console.log("Syöttämäsi luvut eivät ole välillä 1-10.");
    }
    rl.close();
  });
});
