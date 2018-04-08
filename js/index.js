var http = require("http");
var express = require("express");
var app = express();
var path = require('path');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'data-visitor-127620';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'ru';

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies




// // Imports the Google Cloud client library
// const Translate = require('@google-cloud/translate');

// // Creates a client
// const translate = new Translate();

// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// // const text = 'The text to translate, e.g. Hello, world!';
// // const target = 'The target language, e.g. ru';

// // Translates the text into the target language. "text" can be a string for
// // translating a single piece of text, or an array of strings for translating
// // multiple texts.
// translate
//   .translate(text, target)
//   .then(results => {
//     let translations = results[0];
//     translations = Array.isArray(translations)
//       ? translations
//       : [translations];

//     console.log('Translations:');
//     translations.forEach((translation, i) => {
//       console.log(`${text[i]} => (${target}) ${translation}`);
//     });
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

app.get('/', function (req, res) {

	// res.send('Hello World!');
	res.sendfile(path.resolve('../index.html'));
});


app.get('/js/controller.js', function(req,res) {

	res.sendfile(path.resolve('controller.js'));
})


app.get('/test', function(req,res) {

	res.send({"Yo": "Hi"});
})

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


app.listen(8000, function() {
	console.log("Listening on port 8000");

	// Translates some text into Russian
	translate
	  .translate(text, target)
	  .then(results => {
	    const translation = results[0];

	    console.log(translation);

	    console.log(`Text: ${text}`);
	    console.log(`Translation: ${translation}`);
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });
});

//Create HTTP server and listen on port 8000 for requests
// http.createServer(function (request, response) {

//    // Set the response HTTP header with HTTP status and Content type
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body "Hello World"
//    response.end('Hello World\n');
// }).listen(8000);

console.log("Server running");