var lista = {
    clientes: []
};
var listClientes = JSON.parse(localStorage.getItem("clientes"));
lista.clientes = listClientes;
function registrarCliente(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    if (formJSON.fname !== "" && formJSON.fcpf !== "" && formJSON.endereco !== "") {
        lista.clientes.push({
            nome: formJSON.fname,
            cpf: formJSON.fcpf,
            endereco: formJSON.endereco,
            genero: formJSON.genero
        });
        localStorage["clientes"] = JSON.stringify(lista.clientes);
        alert("Cliente cadastrado com sucesso. Nome: " + formJSON.fname);
    } else {
        alert("Formulario incompleto");
    }


}
function carregarClientes() {
    if (listClientes.length !== 0) {
        var btnLoad = document.getElementById("btnload");
        btnLoad.style.display = "none";

        for (let i = 0; i < listClientes.length; i++) {
            const text =
                    `<tr>          
                    <td>${listClientes[i].nome}</td>
                    <td>${listClientes[i].cpf}</td>
                    <td>
                        <div class='form-group'>        
                            <button type='button' id="clientID${i}" onclick="removerCliente(${i})" class="btn btn-primary">Remover</button>   
                         </div>
                   </td>
            </tr>`;
            const position = "beforeend";
            const tbPessoaNomes = document.querySelector('#tbPessoa');
            tbPessoaNomes.insertAdjacentHTML(position, text);
        }
    } else {
        alert("Lista vazia!")
    }

}
function removerCliente(id) {
    var button = document.getElementById("clientID" + id);
    button.insertAdjacentHTML("afterEnd", "Removido!");
    button.style.display = "none";

    listClientes.splice(id, 1);
    localStorage["clientes"] = JSON.stringify(listClientes);


}

