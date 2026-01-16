import {
    listarProdutosClient,
    salvarProdutoClient,
    removerProdutoClient,
    atualizarProdutoClient
} from "../client/produtos-client.js";

async function salvarProduto() {
    let produto = {
        "idProduto": document.getElementById("adicionar-produto-id").value,
        "titulo": document.getElementById("adicionar-produto-titulo").value,
        "descricao": document.getElementById("adicionar-produto-descricao").value,
        "preco": parseFloat(document.getElementById("adicionar-produto-preco").value),
        "qtdEstoque": parseInt(document.getElementById("adicionar-produto-quantidade").value)
    }

    if (produto.idProduto) {
        console.log("Atualizando produto:", produto);
        let err = await atualizarProdutoClient(produto);
        if (err !== null) {
            return
        }

    } else {
        console.log("Salvando produto:", produto);
        let err = await salvarProdutoClient(produto);
        if (err !== null) {
            return
        }
    }

    carregarProdutos()
    fecharModal()
    limparFormularioAdicionarProduto()
}

function limparFormularioAdicionarProduto() {
    document.getElementById("adicionar-produto-id").value = "";
    document.getElementById("adicionar-produto-titulo").value = "";
    document.getElementById("adicionar-produto-descricao").value = "";
    document.getElementById("adicionar-produto-preco").value = "";
    document.getElementById("adicionar-produto-quantidade").value = "";
}

function preencherFormularioSalvarProduto(produto) {
    document.getElementById("adicionar-produto-id").value = produto.idProduto || "";
    document.getElementById("adicionar-produto-titulo").value = produto.titulo || "";
    document.getElementById("adicionar-produto-descricao").value = produto.descricao || "";
    document.getElementById("adicionar-produto-preco").value = produto.preco || "";
    document.getElementById("adicionar-produto-quantidade").value = produto.qtdEstoque || "";
}

function fecharModal() {
    const modalAddProdutoElement = document.getElementById('modal-adicionar-produto');
    const modalAddProduto = bootstrap.Modal.getInstance(modalAddProdutoElement);
    modalAddProduto.hide();
}

async function carregarProdutos() {
    let produtos = await listarProdutosClient();
    renderizarProdutos(produtos);
}

function renderizarProdutos(produtos) {
    const tbody = document.getElementById("listagem-produtos");
    if (!tbody) return;

    if (!produtos || produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum produto encontrado</td></tr>';
        return;
    }

    const rows = produtos.map(produto => {
        const preco = typeof produto.preco === 'number' ? produto.preco : parseFloat(produto.preco || 0);
        const precoFormatado = `R$${preco.toFixed(2).replace('.', ',')}`;

        return `<tr 
                    data-id="${produto.idProduto || ''}"
                    data-titulo="${produto.titulo || ''}"
                    data-descricao="${produto.descricao || ''}"
                    data-preco="${produto.preco || ''}"
                    data-qtd-estoque="${produto.qtdEstoque != null ? produto.qtdEstoque : ''}"
                >
                    <td>${produto.titulo || ''}</td>
                    <td>${produto.descricao || ''}</td>
                    <td>${precoFormatado}</td>
                    <td>${produto.qtdEstoque != null ? produto.qtdEstoque : ''}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-primary btn-sm" data-id="${produto.idProduto || ''}" data-action="editar" data-produto="${produto}" data-bs-toggle="modal" data-bs-target="#modal-adicionar-produto">Editar</button>
                            <button type="button" class="btn btn-outline-primary btn-sm" data-id="${produto.idProduto || ''}" data-action="remover">Remover</button>
                        </div>
                    </td>
                </tr>`;
    }).join('');

    tbody.innerHTML = rows;

    addEventListerBotoesRemover(tbody)
    addEventListenerBotoesEditar(tbody)
}

function addEventListerBotoesRemover(tbody) {
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

function addEventListenerBotoesEditar(tbody) {
    const botoesEditar = tbody.querySelectorAll('button[data-action="editar"]');
    botoesEditar.forEach(botao => {
        botao.addEventListener("click", function () {
            const tr = this.closest('tr');
            if (tr) {
                const produto = {
                    idProduto: tr.getAttribute('data-id'),
                    titulo: tr.getAttribute('data-titulo'),
                    descricao: tr.getAttribute('data-descricao'),
                    preco: tr.getAttribute('data-preco'),
                    qtdEstoque: tr.getAttribute('data-qtd-estoque')
                };

                preencherFormularioSalvarProduto(produto);
            }
        });
    });
}

async function removerProduto(idProduto) {
    let err = await removerProdutoClient(idProduto);
    if (!err) {
        carregarProdutos()
    }
}

function initListeners() {
    document.getElementById("botao-salvar-produto").addEventListener("click", salvarProduto);
}

function onInit() {
    initListeners()
    carregarProdutos()
}

onInit()