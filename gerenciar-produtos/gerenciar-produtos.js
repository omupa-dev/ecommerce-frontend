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
                carregarProdutos()
                fecharModal()
                limparFormularioAdicionarProduto()
            }
        })
        .catch(err => console.error(err));
}

function limparFormularioAdicionarProduto() {
    document.getElementById("adicionar-produto-titulo").value = "";
    document.getElementById("adicionar-produto-descricao").value = "";
    document.getElementById("adicionar-produto-preco").value = "";
    document.getElementById("adicionar-produto-quantidade").value = "";
}

function fecharModal() {
    const modalAddProdutoElement = document.getElementById('modal-adicionar-produto');
    const modalAddProduto = bootstrap.Modal.getInstance(modalAddProdutoElement);
    modalAddProduto.hide();
}

function carregarProdutos() {
    const options = {
        method: 'GET'
    };

    fetch('http://localhost:8080/produtos', options)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then(responseBody => renderizarProdutos(responseBody))
        .catch(err => console.error(err));
}

function renderizarProdutos(responseBody) {
    const tbody = document.getElementById("listagem-produtos");
    if (!tbody) return;

    if (!responseBody || responseBody.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum produto encontrado</td></tr>';
        return;
    }

    const rows = responseBody.map(produto => {
        const preco = typeof produto.preco === 'number' ? produto.preco : parseFloat(produto.preco || 0);
        const precoFormatado = `R$${preco.toFixed(2).replace('.', ',')}`;

        return `<tr>
                    <td>${produto.titulo || ''}</td>
                    <td>${produto.descricao || ''}</td>
                    <td>${precoFormatado}</td><td>${produto.qtdEstoque != null ? produto.qtdEstoque : ''}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-primary btn-sm" data-id="${produto.idProduto || ''}" data-action="editar">Editar</button>
                            <button type="button" class="btn btn-outline-primary btn-sm" data-id="${produto.idProduto || ''}" data-action="remover">Remover</button>
                        </div>
                    </td>
                </tr>`;
    }).join('');

    tbody.innerHTML = rows;

    const botoesRemover = tbody.querySelectorAll('button[data-action="remover"]');
    botoesRemover.forEach(botao => {
        botao.addEventListener("click", function () {
            const id = this.getAttribute('data-id');
            if (id) {
                removerProduto(id);
            }
        });
    });
}

function removerProduto(idProduto) {
    const options = {
        method: 'DELETE'
    };

    fetch(`http://localhost:8080/produtos/${idProduto}`, options)
        .then(response => {
            if (response.status === 200) {
                carregarProdutos()
            }
        })
        .catch(err => console.error(err));
}

function initListeners() {
    document.getElementById("botao-adicionar-produto").addEventListener("click", adicionarProduto);
}

function onInit() {
    initListeners()
    carregarProdutos()
}

onInit()