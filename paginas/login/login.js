function fazerLogin() {
    event.preventDefault()
    if (usuarioLogado()) {
        window.location.href = '/paginas/produtos/produtos.html'
        return
    }

    alert('Usuário ou senha inválidos!')
}

function usuarioLogado() {
    // TODO: Validar usuario logado com sucesso
    return true
}