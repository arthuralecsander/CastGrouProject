const listClientes = JSON.parse(localStorage.getItem("clientes"));
const listProdutos = JSON.parse(localStorage.getItem("produtos"));
const listVendas = JSON.parse(localStorage.getItem("vendas"));

let cNome = document.getElementById("clienteNome");
let cCPF = document.getElementById("clienteCPF");
let cGenero = document.getElementById("clienteGenero");
let cEndereco = document.getElementById("clienteEndereco");

cNome.innerHTML = "Nome: " + listClientes[listVendas[0].idCliente].nome;
cCPF.innerHTML = "CPF: " + listClientes[listVendas[0].idCliente].cpf;
cGenero.innerHTML = "Genero: " + listClientes[listVendas[0].idCliente].genero;
cEndereco.innerHTML = "Endereco: " + listClientes[listVendas[0].idCliente].endereco;

let valorB = document.getElementById("valorTotalB");
let valorD = document.getElementById("valorTotalD");

let totalB = 0, totalD = 0;


for (let i = 0; i < listVendas.length; i++) {
    const text =
            `<tr>          
            <td>${listVendas[i].idProduto}</td>
            <td>${listProdutos[listVendas[i].idProduto].desc}</td>
            <td>${listVendas[i].qnt}</td> 
            <td>${listVendas[i].desconoto}%</td> 
            <td>R$${parseFloat(listVendas[i].precoU).toFixed(2)}</td>
            <td>R$${listVendas[i].precoUDesc.toFixed(2)}</td>
        </tr>`;
    const position = "beforeend";
    const tbVendaFinal = document.querySelector('#tbVendaFinal');
    tbVendaFinal.insertAdjacentHTML(position, text);
    totalB += listVendas[i].totalBruto;
    totalD += listVendas[i].totalDesco;
    setValorFinal()
}
function setValorFinal() {
    valorB.innerHTML = "Valor total bruto: R$" + totalB.toFixed(2);
    valorD.innerHTML = "Valor total c/ Desconto: R$" + totalD.toFixed(2);
}