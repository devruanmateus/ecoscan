let user = document.querySelector('#iuser')
let labelUser = document.querySelector('#labelUsuario')
let validUser = false

let email = document.querySelector('#iemail')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let senha = document.querySelector('#ipassword')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#iconfirmPassword')
let labelConfirmSenha = document.querySelector('labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')



function cadastrar() {
    if (validUser && validEmail && validSenha && validConfirmSenha){
        msgSuccess.style.display = 'block';
    } else {
        msgError.style.display = 'block';
    }
}