const fs = require('fs');

fs.readFile('tiedosto.txt', 'utf8', function (err, data) {
    if (err) {
        console.log('Tapahtui virhe.');
        console.log(err);
    }
    else {
        console.log(data);
    }
});