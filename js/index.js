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

const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient({
	options: {
		credentials: {
			client_email : "scahn.x@gmail.com",
			private_key: "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDa/7blzSXLNAfy\nKejEpQJKt5SxcPvyDRv2H7YYNXsreOQ4BTvtkKTdA3Rq+ikEtKZhAiOAAqOH6alT\nTPrnXp0sL+pebgaE2e8XbtcCQQbbM12vQocn7mFQi+1hq3ERhxnrj8de0o9hlf9M\n+SFz8wzuD6XHhMtYsvbljhytEBIkITxGZboEgyPJ0XVIjkjl3GrLzA8ewi5tEH9F\ne6OJI0p2Lsfme2XWswMgu15Md25mWRIQlSea5lAURlWZOCe9IXvP44cT+znnx2KO\nM9+FCJm/xBXndcXxFBbBLxyehjb6ZS8zKX0WvXfCMk4xV3vVh9X/igDUIr5flcG9\nPlxRtPLbAgMBAAECggEACmveGZQS7Fc5hD3s+blFy/sYdFPavsCo8qQSV5c+mT7+\nJ+b33GzkVjAdO3SpZwlBsZ7BxGGxGSf2tXlq/H+gHcOEn6G/ZasJRFAzTcQnvglK\nYqtZIH6o2tsNx3a6bAnFzf6K5OmYMR32MYTZdq8Q5R3m1wEWvCMoD0cdTjmpjgEq\n+nybXhpp0lQqXAq0k9w//4rS2l69WdL+zegjg+LTWPlitVYPS0pSePKNXwSccPeN\ndwXvh45VVcCK5buSugJce5Sf/BwgRK+ge2iKSYcIMYiWs/IYeTERIBdE+6OFSTDy\nW1rvdfhl1D+O7Aocdd5BLiF/mHn0SwDPeFlmyoimwQKBgQD51JfOe2LX9cSk90PU\nYfxl/A5wG3eBGcs0mEZELWejfgiX1rTvBCdWfe4rnzguy/TXQ45zd/aPv0l7JDPM\nDBt6aq07lQqjMIEriScaIFDaTmJwh7ZdiiP8+5wY7qttQ40H1pRNLcj9pZwVj6Fy\nacQYnwv2yXVK3ra2P8AYX8MrGQKBgQDgaDT6TsDdAWriB/t9750oSjNo9O7DYzjD\nUwAQVaFyj1jHbKJLXrnTjNPnI0noylSZCyH3NyQanrYYp+06EgPUsMAES0VhWQw4\nhZFklKhIpRYbbNDimuiv1w26Oif7kHasGQ5xnTpuWP94JRLq4vM1hQwSMpvETqc9\n9dCkJ9bAEwKBgQCbeIFALejFHFzTjEzZzmCT1tflTDKCVNrwUBLqOpdUVwph82uF\nksAoQxYEb4E3HhWwIIp1sSHvMss3pr/VK3OuKtTDT2zfQUAhJ6j9yT6HnGAGR25l\np6HdvXbWzTBBPth1GEQSA3wg3P7VLBz8ZnVyHQgE/DnR7ecmY2XXxUBfgQKBgEPt\nh0vVlu/PRAlTnT8Lzyio/VLiAXxHhqEpeLV5FjvVRGxpZ98kt19gG6y1s+Oxi1Yg\nVpG8sUMVk81214pidaJmNlmWZ1QGXnqlg9NMZHxI7J40nC5b8d94W4FppTyzCBkk\nJIkjrNJGQl6d6lILjM9AjNzdUOVlYZ6R0CxAmvLdAoGBAPdFgFKsKyVp6Xj9DOb2\nC5fm+AlGdd1TpGIF1TidZKehzDSSbX8l+6Bmzc8zw3Q0nNNeI5arcggw1R8oeeuj\ndmTNf4WqYqAy1GWTYqpvlnYYZYIDTHKjYJ7Ecr4xBF0yd1VBZ1fgFhGrayiKgKVx\nZcnSnKrE98iDyPqB9PGvu48z\n",

		},
		email: "scahn.x@gmail.com",
		port: 8000,
		projectId: "data-visitor-127620"
	}
});

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

	client.request = {};

	request.input ={
    	'text':'Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets.'
  	}
	
	request.voice ={
	    'languageCode':'en-gb',
	    'name':'en-GB-Standard-A',
	    'ssmlGender':'FEMALE'
	}
	request.audioConfig={
	    'audioEncoding':'MP3'
	}

  	client.synthesizeSpeech(request)
      .then(responses => {
        var response = responses[0];
        console.log(request);
        console.log(response)
        // doThingsWith(response)
      })
      .catch(err => {
        console.error(err);
      });

	// request({
	//     headers: {
	//       'Authorization': 'Bearer ya29.c.ElqXBc5bpWQF7Di90IOaWSch5u2bsLb6kVG-K-0ScqEo3nBuSpGQMOtR4MqlZkbWKW8c364_NtyX9Mb2t-T0BjvvZ8OV-sVX8HpeNNianPHGZGefUsia6xhAkgw',
	//       'Content-Type': 'application/json; charset=utf-8'
	//   	},
	//     uri: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize',
	//     data: {
 //    'input':{
 //      'text':'Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets.'
 //    },
 //    'voice':{
 //      'languageCode':'en-gb',
 //      'name':'gba-vocoded',
 //      'ssmlGender':'FEMALE'
 //    },
 //    'audioConfig':{
 //      'audioEncoding':'MP3'
 //    }
 //  },
	//     method: 'POST'
	//   }, function (err, res, body) {
	//     //it works!
	//   });
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