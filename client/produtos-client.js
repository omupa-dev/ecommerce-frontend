import { backendUrl } from "../configuration/url.js";

export async function listarProdutosClient() {
    const options = {
        method: 'GET'
    };

    return fetch(`${backendUrl()}/produtos`, options)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }

            return [];
        })
        .catch(err => {
            console.error(err)
            return []
        });
}

export async function salvarProdutoClient(produto) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    };

    return fetch(`${backendUrl()}/produtos`, options)
        .then(response => {
            if (response.status === 200) {
                return null
            }
        })
        .catch(err => {
            console.error(err)
            return err
        });
}

export async function removerProdutoClient(idProduto) {
    const options = {
        method: 'DELETE'
    };

    return fetch(`${backendUrl()}/produtos/${idProduto}`, options)
        .then(response => {
            if (response.status === 200) {
                return null
            }
        })
        .catch(err => {
            console.error(err)
            return err
        });
}