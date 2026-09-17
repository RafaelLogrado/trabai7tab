let btn_cadastrar = document.getElementById("btn_cadastrar")
let resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const telefone = document.getElementById("telefone").value
    const cpf = document.getElementById("cpf").value
    const identidade = document.getElementById("identidade").value

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        cpf: cpf,
        identidade: identidade
    }
    
    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then((dados) => {
        resposta.innerHTML = `${dados.message}`
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error('Erro ao realizar cadastro: ', err)
    })
})