var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var less = require('less');
var app = express();

var ITEMS_FILE = path.join(__dirname, 'items.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest items.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/items', function(req, res) {
  fs.readFile(ITEMS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/items', function(req, res) {
  fs.readFile(ITEMS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var items = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newItem = {
      id: Date.now(),
      category: req.body.category,
      author: req.body.author,
      text: req.body.text,
      weight: req.body.weight
    };
    items.push(newItem);
    fs.writeFile(ITEMS_FILE, JSON.stringify(items, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(items);
    });
  });
});

var options = {
    paths         : ["public/less"],        // .less file search paths
    outputDir     : "/public/css",           // output directory, note the '/'
    optimization  : 1,                      // optimization level, higher is better but more volatile - 1 is a good value
    filename      : "public/less/style.less",           // root .less file
    compress      : true,                   // compress?
    yuicompress   : true                    // use YUI compressor?
  };

fs.readFile('public/less/style.less', function(err, lessInput) {
  less.render(lessInput.toString(), options)
      .then(function(output) {
          // output.css = string of css
          // output.map = string of sourcemap
          // output.imports = array of string filenames of the imports referenced
          fs.writeFile('public/css/style.css', output.css);
      },
      function(error) {
        console.error("ERROR:\n" + error);
      });

});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});