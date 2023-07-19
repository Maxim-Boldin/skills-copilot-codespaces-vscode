// Create a web server
// Node.js
// 1. Create a web server
// 2. Handle HTTP route GET / and POST / i.e. Home
// 3. Handle HTTP route GET /:username i.e. /chalkers
// 4. Function that handles the reading of files and merge in values
//    i.e. read from file and get a string
//      merge values in to string
var http = require('http');
var fs = require('fs');

function mergeValues(values, content) {
  // Cycle over the keys
  for (var key in values) {
    // Replace all {{key}} with the value from the values object
    content = content.replace('{{' + key + '}}', values[key]);
  }
  // return merged content
  return content;
}

function view(templateName, values, response) {
  // Read from the template file
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});
  // Insert values in to the content
  fileContents = mergeValues(values, fileContents);
  // Write out the contents to the response
  response.write(fileContents);
}

function post(request, response) {
  var body = '';
  request.on('data', function(postBody) {
    body += postBody;
  });
  request.on('end', function() {
    var post = qs.parse(body);
    console.log(post);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Success");
  });
}

function renderPage(title, response) {
  var values = {
    title: title
  };
  view('header', values, response);
  view('footer', values, response);
}

function home(request, response) {
  if (request.url === '/') {
    if (request.method.toLowerCase() === "get") {
      response.writeHead(200, {'Content-Type': 'text/html'});
      renderPage('Hello World', response);
    } else {
      post(request, response);
    }
  }
}

function user(request, response) {
  var username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    renderPage(username, response);
  }
}

http.createServer(function(request, response) {
  home(request, response);
  user(request, response);
}).listen(
