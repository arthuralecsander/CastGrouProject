let listClientes = JSON.parse(localStorage.getItem("clientes"));
let listProdutos = JSON.parse(localStorage.getItem("produtos"));

let clientDrop = document.getElementById("clientDrop");
let produtoDrop = document.getElementById("produtoDrop");
let qntDrop = document.getElementById("qntDrop");
let descontoDrop = document.getElementById("descontosId");
let idVenda = 0;

let lista = {
    vendas: []
};
let precoUni, precoUniDesc, total, totalD;

for (let i = 0; i < listClientes.length; i++) {
    clientDrop.innerHTML += `<option value="${i}">${listClientes[i].nome}</option>`;
}
for (let i = 0; i < listProdutos.length; i++) {
    produtoDrop.innerHTML += `<option value="${i}">${listProdutos[i].desc}</option>`;
}

function carregarQnt(index) {
    qntDrop.innerHTML = `<option value="">Selecione a Quantidade</option>`;
    if (index !== "") {
        if (listProdutos[index].qnt !== 0) {
            carregarDesconto(index);
            for (let i = 1; i <= listProdutos[index].qnt; i++) {
                qntDrop.innerHTML += `<option value="${i}">${i}</option>`;
            }
        } else {
            qntDrop.innerHTML = `<option value="">Sem Estoque</option>`;
        }
    }
}
function carregarDesconto(index) {
    descontoDrop.innerHTML = `<option value="">Selecione o Desconto</option>`;
    if (index !== "") {
        for (let i = 0; i <= listProdutos[index].desconto; i++) {
            descontoDrop.innerHTML += `<option value="${i}">${i}%</option>`;
        }
    }
}

function adicionarItem() {
    calculoPrecos(produtoDrop.value, qntDrop.value, descontoDrop.value);
    if (clientDrop.value !== "" && produtoDrop.value !== "" && qntDrop.value !== "" && descontoDrop.value !== "") {
        lista.vendas.push({
            idVenda: idVenda,
            idCliente: clientDrop.value,
            idProduto: produtoDrop.value,
            desconoto: descontoDrop.value,
            precoU: precoUni,
            precoUDesc: precoUniDesc,
            totalBruto: total,
            totalDesco: totalD,
            qnt: qntDrop.value
        });

        const text =
                `<tr>          
                    <td>${listClientes[clientDrop.value].nome}</td>
                    <td>${listProdutos[produtoDrop.value].desc}</td>
                    <td>R$${parseFloat(listProdutos[produtoDrop.value].preco).toFixed(2)}</td>
                    <td>${descontoDrop.value}%</td>
        
                    <td>${qntDrop.value}</td> 
                    <td>
                        <div class='form-group'>        
                            <button type='button' id="vendaId${idVenda}" onclick="removerVenda(${idVenda},${produtoDrop.value},${qntDrop.value})" class="btn btn-primary">Remover</button>   
                         </div>
                   </td>
            </tr>`;
        const position = "beforeend";
        const tbVendas = document.querySelector('#tbVendas');
        tbVendas.insertAdjacentHTML(position, text);

        subtraiQnt(produtoDrop.value, qntDrop.value);
        carregarQnt(produtoDrop.value);
        idVenda++;
        console.log(lista.vendas);
    } else {
        alert("Preencha todos os dados");
    }

}
function finalizarVenda() {
    localStorage["vendas"] = JSON.stringify(lista.vendas);
    localStorage["produtos"] = JSON.stringify(listProdutos);
    window.location.assign("finalVenda.html");
}
function subtraiQnt(idProd, qnt) {
    listProdutos[idProd].qnt = listProdutos[idProd].qnt - qnt;
}
function somarQnt(idProd, qnt) {
    listProdutos[idProd].qnt = listProdutos[idProd].qnt + qnt;
}

function removerVenda(idVenda, idProd, qnt) {
    somarQnt(idProd, qnt);
    carregarQnt(idProd);
    var button = document.getElementById("vendaId" + idVenda);
    button.insertAdjacentHTML("afterEnd", "Removido!");
    button.style.display = "none";

    lista.vendas.splice(idVenda, 1);
    console.log(lista.vendas);
}
function calculoPrecos(idProd, qntProd, descProd) {
    precoUni = listProdutos[produtoDrop.value].preco ;
    precoUniDesc = listProdutos[idProd].preco - (listProdutos[idProd].preco * (descProd / 100));
    total = listProdutos[idProd].preco * qntProd;
    totalD = (listProdutos[idProd].preco - (listProdutos[idProd].preco * (descProd / 100))) * qntProd;

}