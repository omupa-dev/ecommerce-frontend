function adicionarProduto() {
    let produto = {
        "titulo": document.getElementById("adicionar-produto-titulo").value,
        "descricao": document.getElementById("adicionar-produto-descricao").value,
        "preco": parseFloat(document.getElementById("adicionar-produto-preco").value),
        "qtdEstoque": parseInt(document.getElementById("adicionar-produto-quantidade").value)
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    };

    fetch('http://localhost:8080/produtos', options)
        .then(response => {
            if (response.status === 200) {
                fecharModal()
            }
        })
        .catch(err => console.error(err));
}

function fecharModal() {
    const modalAddProdutoElement = document.getElementById('modal-adicionar-produto');
    const modalAddProduto = bootstrap.Modal.getInstance(modalAddProdutoElement);
    modalAddProduto.hide();
}

function initListeners() {
    document.getElementById("botao-adicionar-produto").addEventListener("click", adicionarProduto);
}

initListeners();