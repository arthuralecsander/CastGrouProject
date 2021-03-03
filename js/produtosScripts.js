let lista = {
    produtos: []
};
let listProdutos = JSON.parse(localStorage.getItem("produtos"));
lista.produtos = listProdutos;

function registrarProduto(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    if (formJSON.desc !== "" && formJSON.qnt !== "" && formJSON.preco !== "") {
        if (!(formJSON.desconto < 0 || formJSON.desconto > 100)) {
            lista.produtos.push({
                desc: formJSON.desc,
                qnt: formJSON.qnt,
                preco: formJSON.preco,
                desconto: formJSON.desconto
            });
            localStorage["produtos"] = JSON.stringify(lista.produtos);
            alert("Produto cadastrado com Sucesso " + formJSON.desc);

        } else {
            alert("Desconto fora dos parametros possiveis 0-100");
        }
    } else {
        alert("Formulario incompleto!");
    }
}
function carregarProdutos() {

    if (listProdutos.length !== 0) {
        let btnLoad = document.getElementById("btnload");
        btnLoad.style.display = "none";

        for (let i = 0; i < listProdutos.length; i++) {
            const text =
                    `<tr>          
                    <td>${listProdutos[i].desc}</td>
                    <td>${listProdutos[i].qnt}</td>
                    <td>${listProdutos[i].preco}</td> 
                    <td>
                        <div class='form-group'>        
                            <button type='button' id="ProdutoID${i}" onclick="removerProduto(${i})" class="btn btn-primary">Remover</button>   
                         </div>
                   </td>
            </tr>`;
            const position = "beforeend";
            const tbPessoaNomes = document.querySelector('#tbProdutos');
            tbPessoaNomes.insertAdjacentHTML(position, text);
        }
    } else {
        alert("Lista vazia!");
    }

}
function removerProduto(id) {
    let button = document.getElementById("ProdutoID" + id);
    button.insertAdjacentHTML("afterEnd", "Removido!");
    button.style.display = "none";

    listProdutos.splice(id, 1);
    localStorage["produtos"] = JSON.stringify(listProdutos);


}

