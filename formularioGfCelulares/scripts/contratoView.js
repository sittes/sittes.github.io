let inUser = new Usuario();

function init(callback) {
    getUser()
        .then(function (user) {
            inUser = user;
            callback();
        })
        .catch(function (err) {
            window.location.href = './index.html';
        });
}

class appentTr {
    constructor() {
        this.code = "";
    }
    appent(str) {
        this.code += "<td>" + str + "</td>";
    }
    showTo(id) {
        document.getElementById(id).insertAdjacentHTML('beforeend', "<tr>" + this.code + "</tr>");
    }
}

function getContrato(){
var contratoPath = localStorage.getItem('contratoPath'),
    contratoId = localStorage.getItem('contratoId');

var db = firebase.database();
var ref = db.ref("Contratos");
ref.child(contratoPath).once("value").then(function (element) {
    var index = contratoId;
    var contrato = new Contrato().parse(element.ref.path.toString(), element.val());

    if(("pathUser" in contrato && contrato.pathUser === inUser.path) !== true){
        window.location.href = "./listaContrato.html";
        return;
    }

    var tabela01 = new appentTr();
    tabela01.appent(index);
    tabela01.appent(contrato.nome);
    tabela01.appent(contrato.sobreNome);
    tabela01.appent(contrato.email);
    tabela01.appent(contrato.bairro);
    tabela01.appent(contrato.endereco);
    tabela01.appent(contrato.telefone);
    tabela01.showTo("tabela01");

    var tabela02 = new appentTr();
    tabela02.appent(index);
    tabela02.appent(contrato.aparelho);
    tabela02.appent(contrato.modelo);
    tabela02.appent(contrato.serial);
    tabela02.showTo("tabela02");

    var tabela03 = new appentTr();
    tabela03.appent(index);
    tabela03.appent(contrato.tipoAcessorio.includes("bateria") ? "Sim" : "Não");
    tabela03.appent(contrato.tipoAcessorio.includes("tampa") ? "Sim" : "Não");
    tabela03.appent(contrato.tipoAcessorio.includes("carregador") ? "Sim" : "Não");
    tabela03.appent(contrato.tipoAcessorio.includes("outros") ? "Sim" : "Não");
    tabela03.appent(contrato.serialAcessorios);
    tabela03.appent(contrato.defeitodeClarado);
    tabela03.showTo("tabela03");

    var tabela04 = new appentTr();
    tabela04.appent(index);
    tabela04.appent(contrato.dataDeOrcamento);
    tabela04.appent(contrato.dataDeEntrega);
    tabela04.appent(contrato.valor);
    tabela04.appent(contrato.tecnico);
    tabela04.showTo("tabela04");

    var tabela05 = new appentTr();
    tabela05.appent(index);
    tabela05.appent(contrato.assinaturaTecnico);
    tabela05.appent(contrato.assinaturaDoCliente);
    tabela05.showTo("tabela05");
})
    .catch(function (err) { console.log(err) });
}


window.onload = function () {
    init(function () {
        getContrato();
    });
}