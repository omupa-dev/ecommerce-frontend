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
        .then(response => alert(response.status))
        .catch(err => console.error(err));
}

function initListeners() {
    document.getElementById("botao-adicionar-produto").addEventListener("click", adicionarProduto);
}

initListeners();