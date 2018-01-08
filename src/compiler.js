const rmfr = require('rmfr');
const mkdirp = require('mkdirp');
const cpr = require('cpr');
const fs = require('fs');

// Sanity check
const target = process.argv[2];
if(!target){
  console.log("Usage: npm run compile [presentation directory]");
  console.log(" e.g.: npm run compile examples/example1");
  process.exit();
}

// Create output directory and copy over content
rmfr(`./output/${target}`).then(()=>{
  mkdirp.sync(`./output/${target}/${target}`);
  cpr(`./${target}`, `./output/${target}/${target}`, {});

  // Copy over dependencies
  cpr(`./extensions`, `./output/${target}/extensions`, {});
  cpr(`./bodlanes2.css`, `./output/${target}/bodlanes2.css`, {});
  cpr(`./bodlanes2.js`, `./output/${target}/bodlanes2.js`, {});

  // Create launcher/root content
  fs.writeFile(`output/${target}/index.html`, `<!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${target}/index.html">
      </head>
      <body>
        <a href="${target}/index.html">${target}</a>
      </body>
    </html>
  `);
  fs.writeFile(`output/${target}/package.json`, `{
    "name": "${target}",
    "main": "${target}/index.html",
    "window": {
      "kiosk": true
    }
  }`);
});
