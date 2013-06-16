(function(window, document, undefined) {

	var waterfall = function(settings) {

		var id = settings.id || 'waterfall';
		var width = settings.width || 1024;
		var height = settings.height || 200;
		var foreground = "rgba(255, 255, 255, 1)";
		var background = "rgba(0, 0, 0, 1)";
		
		var audioStream = settings.stream;
		var audioContext = settings.context;

		var target = document.getElementById(id);
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		target.appendChild(canvas);
		var canvasContext = canvas.getContext('2d');

		canvasContext.fillStyle = background;
		canvasContext.fillRect(0, 0, width, height);

		var analyser = audioContext.createAnalyser();
		audioStream.connect(analyser);
		analyser.connect(audioContext.destination);
		console.log(analyser);

		var moveBy = 1;
		function draw() {
			window.requestAnimationFrame(draw);

			frequencies = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(frequencies);
//			canvasContext.clearRect(0, 0, width, height);

			canvasContext.drawImage(canvasContext.canvas, 0, 0, width, height - moveBy, 0, moveBy, width, height - moveBy);

			for (var i = 0; i < frequencies.length; i++) {
				var mag = frequencies[i];
				canvasContext.fillStyle = "rgba(" + mag + "," + mag + "," + mag + ", 1)";
				canvasContext.fillRect(i, 0, 1, moveBy);
			}
		}

		draw();
	};

	window.Waterfall = waterfall;
}(window,document));
