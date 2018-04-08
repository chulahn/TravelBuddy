$(document).ready(function() {
	$("#play").hide();
});

if (typeof socket === "undefined") {
	socket = io.connect('http://localhost:8000');
}

socket.on('connect' , function() {
	//console.log("Your socket.id is " + socket.id);
});

socket.on('test', function(data) {
	//alert('pass')
	//console.log(data);	
	$("#translatedText").text(data);


})

var context = new AudioContext();
var source = null;
var audioBuffer = null;

function playSound() {
    // source is global so we can call .stop() later.
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = false;
    source.connect(context.destination);
    source.start(0); // Play immediately.
}

$("#play").click(playSound);

socket.on('test2', function(data) {
	//alert('pass')
	//console.log(data);	
	console.log(data);
	//$("#mp3").text(data);

	var base64ToBuffer = function (buffer) {
	    var binary = window.atob(buffer);
	    var buffer = new ArrayBuffer(binary.length);
	    var bytes = new Uint8Array(buffer);
	    for (var i = 0; i < buffer.byteLength; i++) {
	        bytes[i] = binary.charCodeAt(i) & 0xFF;
	    }
	    return buffer;
	};


	function initSound(string) {
	    var audioFromString = base64ToBuffer(string);
	    context.decodeAudioData(audioFromString, function (buffer) {
	        // audioBuffer is global to reuse the decoded audio later.
	        audioBuffer = buffer;
	        // var buttons = document.querySelectorAll('button');
	        // buttons[0].disabled = false;
	        // buttons[1].disabled = false;
	        alert('Sound Ready');
	        $("#play").show();
	    }, function (e) {
	        console.log('Error decoding file', e);
	    });
	}


	initSound(data);


})