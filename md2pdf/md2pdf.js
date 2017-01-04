// Need a path
if (process.argv.length <= 3) {
    console.log("Usage: " + __filename + " path/to/practice-name --out path/to/out");
    process.exit(-1);
}

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var markdownpdf = require('markdown-pdf')

// First arg must be a dir to md files
var dir = argv['_'][0];
if (!fs.lstatSync(dir).isDirectory()) {
  console.log("Usage: " + __filename + " path/to/practice-name --out path/to/out");
  process.exit(-1);
}

var MARKDOWN_OPTIONS = {
  cssPath: __dirname + '/public/css/print.css',
  highlightCssPath: __dirname + '/public/css/highlight.css',
  paperBorder: '1cm',
  paperFormat: 'Letter',
  runningsPath: __dirname + '/lib/runnings.js'
};

var dir = process.argv[2];
var files = fs.readdirSync(dir);

var mdDocs = []
for (var i = 0; i < files.length; i++) {
  if (path.extname(files[i]) == '.md') {
    var _file = path.join(dir, path.basename(files[i]));
    mdDocs.push(fs.realpathSync(_file));
  }
}

// Build list of output files
var outDir = argv['out']
var pdfDocs = mdDocs.map(function (d) {
  var practiceName = d.split(path.sep).slice(-2)[0];
  var _t = path.join(outDir, practiceName);
  if (!fs.existsSync(_t)) {
    fs.mkdirSync(_t);
  }
  var outFile = path.join(fs.realpathSync(_t), path.basename(d).replace(".md", ".pdf"));
  return outFile;
});

console.log("Processing all .md files from " + fs.realpathSync(dir));
var options = _.extend({}, MARKDOWN_OPTIONS);
markdownpdf(options).from(mdDocs).to(pdfDocs, function () {
  pdfDocs.forEach(function (d) { console.log("Created", d) })
})
