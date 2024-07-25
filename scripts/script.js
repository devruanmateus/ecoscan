
document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function() {
        var img = new Image();
        img.onload = function() {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;

            // Initialize counters for each degradation level
            var countHighlyDegraded = 0;
            var countModeratelyDegraded = 0;
            var countSlightlyDegraded = 0;
            var countNotDegraded = 0;

            // Loop through each pixel
            for (var i = 0; i < data.length; i += 4) {
                var red = data[i];
                var green = data[i + 1];
                var blue = data[i + 2];

                // Calculate average brightness of the pixel
                var brightness = (red + green + blue) / 3;

                // Determine degradation level based on color values and brightness
                if (red > 200 && green < 150 && blue < 150 && brightness < 180) {
                    countHighlyDegraded++;
                } else if (red > 150 && green < 200 && blue < 150 && brightness < 200) {
                    countModeratelyDegraded++;
                } else if (red > 100 && green < 250 && blue < 200 && brightness < 220) {
                    countSlightlyDegraded++;
                } else {
                    countNotDegraded++;
                }
            }

            // Calculate total number of pixels
            var totalPixels = imageData.data.length / 4;

            // Calculate percentages
            var percentualNotDegraded = (countNotDegraded / totalPixels) * 100;
            var percentualHighlyDegraded = (countHighlyDegraded / totalPixels) * 100;
            var percentualModeratelyDegraded = (countModeratelyDegraded / totalPixels) * 100;
            var percentualSlightlyDegraded = (countSlightlyDegraded / totalPixels) * 100;

            // Determine the overall degradation status
            var degradationStatus = 'Indeterminado'; // Default
            if (countNotDegraded > countModeratelyDegraded && countNotDegraded > countSlightlyDegraded) {
                degradationStatus = 'Solo não degradado';
            } else if (countModeratelyDegraded > countNotDegraded && countModeratelyDegraded > countSlightlyDegraded) {
                degradationStatus = 'Solo degradado';
            } else if (countSlightlyDegraded > countNotDegraded && countSlightlyDegraded > countModeratelyDegraded) {
                degradationStatus = 'Solo degradado';
            }

            // Display result
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p id="title-result">Resultado da análise:</p>' +
                                  '<ul>' +
                                  '<li>Solo não degradado: ' + percentualNotDegraded.toFixed(2) + '%</li>' +
                                  '<li>Solo altamente degradado: ' + percentualHighlyDegraded.toFixed(2) + '%</li>' +
                                  '<li>Solo moderadamente degradado: ' + percentualModeratelyDegraded.toFixed(2) + '%</li>' +
                                  '<li>Solo levemente degradado: ' + percentualSlightlyDegraded.toFixed(2) + '%</li>' +
                                  '</ul>' +
                                  '<p id="status-solo">Status de degradação do solo: <strong>' + degradationStatus + '</strong></p>';
        };

        img.src = reader.result;
        document.getElementById('inputImage').src = reader.result;
    };

    reader.readAsDataURL(file);

    // Update file name
    var fileName = this.files[0].name;
    document.getElementById('fileName').textContent = "Arquivo selecionado: " + fileName;

    // Hide the file input label after image is selected
    document.querySelector('.custom-file-upload').style.display = 'none';
});