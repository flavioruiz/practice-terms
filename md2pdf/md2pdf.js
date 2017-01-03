// Need a path
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var markdownpdf = require('markdown-pdf')

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
console.log("Processing all .md files from " + fs.realpathSync(dir));
var pdfDocs = mdDocs.map(function (d) { return d.replace(".md", ".pdf") })

var options = _.extend({}, MARKDOWN_OPTIONS);
markdownpdf(options).from(mdDocs).to(pdfDocs, function () {
  pdfDocs.forEach(function (d) { console.log("Created", d) })
})
