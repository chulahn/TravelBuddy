var exports = module.exports;

var http = require("http");
var express = require("express");
var app = express();
var path = require('path');
var request = require("request");

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var server = require('http').Server(app);
var io = exports.io = require('socket.io').listen(server);


// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'data-visitor-127620';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// const textToSpeech = require('text-to-speech.v1beta1');

// const client = new new textToSpeech.v1beta1.TextToSpeechClient({
//   projectId: projectId,
// 	});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'ru';

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies




app.get('/', function (req, res) {

	// res.send('Hello World!');
	res.sendfile(path.resolve('../index.html'));
});


app.get('/js/controller.js', function(req,res) {

	res.sendfile(path.resolve('controller.js'));
})

app.get('/js/socket.io.js', function(req,res) {
	res.sendfile(path.resolve('socket.io.js'));
});

app.get('/js/socket.js', function(req,res) {
	res.sendfile(path.resolve('socket.js'));
});

io.on('connection', function(socket) {
	//console.log(socket);


	app.post('/trans/:target', function(req, res) {

		// console.log(req.body);
		// res.send({
		// 	"textToTranslate": req.body.text,
		// 	"region": req.params.target
		// });

		translate.
			translate(req.body.text, req.params.target, function(err, translation) {

				if (!err) {
					res.send({
						"textToTranslate": req.body.text,
						"region": req.params.target,
						"translated": translation
					});
					//console.log('emit test');
					socket.broadcast.emit('test', translation);

				}

				
			})

		// translate.
		// 	translate(req.body.text, req.params.target)
		// 	.then(results => {
		// 		  const translation = results[0];

		// 		  console.log(translation);

		// 		  console.log(`Text: ${text}`);
		// 		  console.log(`Translation: ${translation}`);



		// 		res.send({
		// 			"textToTranslate": req.body.text,
		// 			"region": req.params.target,
		// 			"translated": translation.translation,
		// 			"1" : 1
		// 		});
		// 	})
		// 	.catch(err => {
		// 		  console.error('ERROR:', err);
		// 	});

	});

});

app.post('/tts/:target', function(req, res) {

	request({
	    headers: {
	      'Authorization': 'Bearer ya29.c.ElqXBc5bpWQF7Di90IOaWSch5u2bsLb6kVG-K-0ScqEo3nBuSpGQMOtR4MqlZkbWKW8c364_NtyX9Mb2t-T0BjvvZ8OV-sVX8HpeNNianPHGZGefUsia6xhAkgw',
	      'Content-Type': 'application/json; charset=utf-8'
	  	},
	    uri: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize',
	    data: {
    'input':{
      'text':'Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets.'
    },
    'voice':{
      'languageCode':'en-gb',
      'name':'gba-vocoded',
      'ssmlGender':'FEMALE'
    },
    'audioConfig':{
      'audioEncoding':'MP3'
    }
  },
	    method: 'POST'
	  }, function (err, res, body) {
	    //it works!
	  });
});

// app.post('/trans/:target', function(req, res) {

// 	// console.log(req.body);
// 	// res.send({
// 	// 	"textToTranslate": req.body.text,
// 	// 	"region": req.params.target
// 	// });

// 	translate.
// 		translate(req.body.text, req.params.target, function(err, translation) {

// 			if (!err) {
// 				res.send({
// 					"textToTranslate": req.body.text,
// 					"region": req.params.target,
// 					"translated": translation
// 				});

// 				io.emit()
// 			}

			
// 		})

// 	// translate.
// 	// 	translate(req.body.text, req.params.target)
// 	// 	.then(results => {
// 	// 		  const translation = results[0];

// 	// 		  console.log(translation);

// 	// 		  console.log(`Text: ${text}`);
// 	// 		  console.log(`Translation: ${translation}`);



// 	// 		res.send({
// 	// 			"textToTranslate": req.body.text,
// 	// 			"region": req.params.target,
// 	// 			"translated": translation.translation,
// 	// 			"1" : 1
// 	// 		});
// 	// 	})
// 	// 	.catch(err => {
// 	// 		  console.error('ERROR:', err);
// 	// 	});

// });

server.listen(8000, function () {
	console.log("Listening on 8000");
})

// app.listen(8000, function() {
// 	console.log("Listening on port 8000");

// 	// Translates some text into Russian
// 	translate
// 	  .translate(text, target)
// 	  .then(results => {
// 	    const translation = results[0];

// 	    console.log(translation);

// 	    console.log(`Text: ${text}`);
// 	    console.log(`Translation: ${translation}`);
// 	  })
// 	  .catch(err => {
// 	    console.error('ERROR:', err);
// 	  });
// });

//Create HTTP server and listen on port 8000 for requests
// http.createServer(function (request, response) {

//    // Set the response HTTP header with HTTP status and Content type
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body "Hello World"
//    response.end('Hello World\n');
// }).listen(8000);

console.log("Server running");