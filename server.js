var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , jsdom = require('jsdom');

var port = 1337;
server.listen(port);

app.configure(function(){
  app.use(express.static(__dirname+'/public'));
  app.use(express.bodyParser({strict: false}));
  app.set('views', './views');
  app.engine('html', require('ejs').renderFile);
});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/postdonation', function(request, response){
	io.sockets.emit('message', {message: 'newdonation', content: request.body });
    response.end();
});

app.get('/getbracket', function(req, res){
	var bracketId = req.query.id;
	var domain = "http://tipofthehats.challonge.com/";
	var page = domain+bracketId;
	jsdom.env(
			page,
			["http://code.jquery.com/jquery.js"],
			function (errors, window) {
					if(!errors){
							var absoluteWindow = rewrite_dom(window, domain);
							var $ = absoluteWindow.jQuery;
							$('<link>').appendTo($('head')).attr({href:'http://vps.alexvancamp.com:1337/css/brackets.css', rel:'stylesheet', type:"text/css"});
							res.write(absoluteWindow.document.innerHTML);
							res.end();
					}
					else {
							res.send('<h1>Error:</h1><br />'+errors);
					}
			}
	);
});

//password protect the widget control pages
var auth = express.basicAuth('tothprod', '.goodsh0w.');
app.get('/widget', auth, function(req, res) {
  res.render('widget.html');
});

app.get('/dotawidget', auth, function(req, res) {
  res.render('dotawidget.html');
});

/* PATH REPLACEMENT CODE BELOW VIA http://pxl.gg/2012/07/05/writing-a-reverse-proxy-with-node-js-part-2/ (MODIFIED)*/

// dom rewriter (urls)
function rewrite_dom(window, current_url){
    $ = window.$;

    // relative url rewriter for jquery's each method
    function rewrite_relative($, attr, host){
        return function(ix, el){
            var $el = $(el), uri = $el.attr(attr);
            $el.attr(attr, translate_to_proxy(host, uri));
        }
    }

    // not the way for production environments, (HEY KEEP THOSE COMMENTS TO YOURSELF)
    // but we gonna rewrite everything that fetches
    // external resources or links to them
    $('a').each(rewrite_relative($, 'href', current_url));
    $('img').each(rewrite_relative($, 'src', current_url))
    $('link').each(rewrite_relative($, 'href', current_url));
    $('script').each(rewrite_relative($, 'src', current_url))

    // find the doctype
    var doctype = 'doctype' in window.document && window.document.doctype ?
        window.document.doctype : '';

    // we restringify the object
    return window;
}

// translates relative urls to absolute
function translate_to_proxy(host, uri){
    if(typeof uri != "undefined"){
        // if there isn't something similar to an absolute url
        if (uri.indexOf('://') === -1 || /^\/\//g.test(uri) ){
            // attach slash if required
            host += uri.indexOf('/') === -1 ? '/' : '';
            // build an absolute url and return it
            return host + uri;
        } else {
            // return it, its already absolute
            return uri;
        }
    }
}

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);
