const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('../Professional Education Record (PER).pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('pdf-text-utf8.txt', data.text, 'utf8');
    console.log("Wrote to pdf-text-utf8.txt");
}).catch(console.error);
