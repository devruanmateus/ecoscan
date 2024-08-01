/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    [Código que processa e analisa o envio da imagem]
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    const preview = document.querySelector('#img-preview');
    const inputImage = document.querySelector('#inputImage');
    const fileInput = document.querySelector('#fileInput');
    const previewText = document.querySelector('#previewText');
    const loadingElement = document.getElementById('loading');

    // Função nomeada para o clique no preview
    const handlePreviewClick = () => {
        fileInput.click();
    };

    preview.addEventListener('click', handlePreviewClick);

    // Garante que a imagem de preview só apareça após o envio do arquivo
    if (previewText.style.display == 'none') {
        inputImage.style.display = 'block'
    } else {
        inputImage.style.display = 'none'
    }

    // Remove o texto de pré-visualização e adiciona a imagem enviada pelo usuário no container
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            inputImage.src = e.target.result;
            inputImage.style.display = 'block';
            previewText.style.display = 'none';
            preview.style.cursor = 'default';
            
            // Remove o listener de clique no preview
            preview.removeEventListener('click', handlePreviewClick);
        };
        reader.readAsDataURL(file);
    }
});

// Adiciona a análise de imagem com a tela de carregamento
document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function() {
        var img = new Image();
        img.onload = function() {
            // Mostra a tela de carregamento
            loadingElement.style.display = 'flex'; // Flex para centralizar o texto
            
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;

            // Inicializa contadores para cada nível de degradação
            var countHighlyDegraded = 0;
            var countModeratelyDegraded = 0;
            var countSlightlyDegraded = 0;
            var countNotDegraded = 0;

            // Acessa os píxels da imagem
            for (var i = 0; i < data.length; i += 4) {
                var red = data[i];
                var green = data[i + 1];
                var blue = data[i + 2];

                // Calcula o brilho médio do píxel
                var brightness = (red + green + blue) / 3;

                // Determina o nível de degradação com base nos valores de cor e brilho
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

            // Calcula o número total de píxels da imagem
            var totalPixels = imageData.data.length / 4;

            // Calcula probabilidades
            var percentualNotDegraded = (countNotDegraded / totalPixels) * 100;
            var percentualHighlyDegraded = (countHighlyDegraded / totalPixels) * 100;
            var percentualModeratelyDegraded = (countModeratelyDegraded / totalPixels) * 100;
            var percentualSlightlyDegraded = (countSlightlyDegraded / totalPixels) * 100;

            // Determina o status geral de degradação
            var degradationStatus = 'Indeterminado'; // Padrão
            if (countNotDegraded > countModeratelyDegraded && countNotDegraded > countSlightlyDegraded) {
                degradationStatus = 'Solo não degradado';
            } else if (countModeratelyDegraded > countNotDegraded && countModeratelyDegraded > countSlightlyDegraded) {
                degradationStatus = 'Solo degradado';
            } else if (countSlightlyDegraded > countNotDegraded && countSlightlyDegraded > countModeratelyDegraded) {
                degradationStatus = 'Solo degradado';
            }

            // Usa setTimeout para exibir a tela de carregamento por alguns segundos
            setTimeout(() => {
                // Oculta a tela de carregamento
                loadingElement.style.display = 'none';

                // Mostra o resultado
                var resultDiv = document.getElementById('result');
                resultDiv.innerHTML = '<p id="title-result">Resultado da análise:</p>' +
                                    '<ul>' +
                                    '<li>Solo não degradado: ' + percentualNotDegraded.toFixed(2) + '%</li>' +
                                    '<li>[1] Solo degradado: ' + percentualModeratelyDegraded.toFixed(2) + '%</li>' +
                                    '<li>[2] Solo degradado: ' + percentualSlightlyDegraded.toFixed(2) + '%</li>' +
                                    '</ul>' +
                                    '<p id="status">Status de degradação do solo: <strong>' + degradationStatus + '</strong></p>';
            }, 300); // 200 milissegundos = 0,3 segundos

        };

        img.src = reader.result;
        document.getElementById('inputImage').src = reader.result;
    };

    reader.readAsDataURL(file);
});