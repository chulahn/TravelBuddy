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