let produtos = [
    {
        "idProduto": 1,
        "titulo": "Panetone Bauduco",
        "descricao": "Já foi bom um dia",
        "preco": 29.90,
        "qtdEstoque": 78
    },
    {
        "idProduto": 2,
        "titulo": "Caixa de Biz",
        "descricao": "Agora perdi uma fileira e estou menor",
        "preco": 7.99,
        "qtdEstoque": 57
    },
    {
        "idProduto": 3,
        "titulo": "Bombom Sonho de Valsa",
        "descricao": "Apenas uma unidade do bombom",
        "preco": 2,
        "qtdEstoque": 54
    },
    {
        "idProduto": 4,
        "titulo": "Bolacha Negresco",
        "descricao": "Já foi boa um dia",
        "preco": 5.78,
        "qtdEstoque": 54
    },
    {
        "idProduto": 5,
        "titulo": "Bombom Lindt",
        "descricao": "O melhor de todos",
        "preco": 7.65,
        "qtdEstoque": 54
    },
    {
        "idProduto": 6,
        "titulo": "Picanha",
        "descricao": "Fazer aquele churrasco",
        "preco": 128.74,
        "qtdEstoque": 54
    },
    {
        "idProduto": 7,
        "titulo": "Arroz Tio Jorge",
        "descricao": "Sem descrição",
        "preco": 28.90,
        "qtdEstoque": 54
    }
]

function aumentarQuantidadeProduto() {

}

function diminuirQuantidadeProduto() {
    let qtdMock = 0;

    if (qtdMock = 0) {
        return
    }
}

function consultarProduto() {
    renderizarProdutos();
}

function renderizarProdutos() {
    let produtosHtml = document.getElementById("produtos")

    produtos.forEach(produto => {
        const novoProduto = `
            <div class="col-sm-6 col-md-6 col-lg-4 py-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${produto.titulo}</h5>
                        <p class="card-text">${produto.descricao}</p>
                        <p class="card-text text-end">R$ ${produto.preco}</p>
                        <div class="row">
                            <div class="col">
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-outline-primary">-</button>
                                    <button type="button" class="btn btn-outline-primary" disabled>1</button>
                                    <button type="button" class="btn btn-outline-primary">+</button>
                                </div>
                            </div>
                            <div class="col text-end">
                                <button type="button" class="btn btn-success">Carrinho</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        const template = document.createElement('div');
        template.innerHTML = novoProduto;

        produtosHtml.appendChild(template.firstElementChild);
    })
}

function iniciarListeners() {

}

renderizarProdutos();