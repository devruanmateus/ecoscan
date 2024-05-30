// Validar o tipo de arquivo enviado para o Scanner
function validarTipoArquivo(seletorCampo) {
    let arquivo = document.getElementById('iupload')

    if (arquivo.files[0].type != "image/png" && arquivo.files[0].type != "image/jpeg") {
        document.getElementById('error').style.display = 'inline-block'
        document.getElementById('error').innerText = 'Tipo de arquivo inválido, selecione arquivos do tipo PNG ou JPEG.'

        arquivo.value = ''
    } else {
        document.getElementById('error').style.display = 'none'
    }
}

// 
