let inUser = new Usuario();

function init(callback){
    getUser()
        .then(function(user){
            inUser = user;
            callback();
        })
        .catch(function(err){
            window.location.href = './index.html';
        });
}

class appentTr {
    constructor() {
        this.tr = document.createElement("tr");
        this.id = 0;
    }
    onClick(fn) {
        if (typeof fn === "function") {
            this.tr.onclick = fn;
        }
    }
    appent(str) {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(str));
        this.tr.appendChild(td);
    }
    showTo(id) {
        document.getElementById(id).appendChild(this.tr);
    }
}

function getContratos(){
    var db = firebase.database();
    var ref = db.ref("Contratos");

    ref.once("value").then(function (contratos) {
        var index = 1;
        contratos.forEach(element => {
            var contrato = new Contrato().parse(element.ref.path.toString(), element.val());

            if(("pathUser" in contrato && contrato.pathUser === inUser.path) !== true){
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
            tabela01.id = index;
            tabela01.onClick(function () {
                localStorage.setItem('contratoPath', element.key);
                localStorage.setItem('contratoId', tabela01.id);
                window.location.href = "./contrato.html";
            });
            tabela01.showTo("tabela01");

            console.log(contrato);
            index++;
        });
    })
        .catch(function (err) { console.log(err) });
}

window.onload = function(){
    init(function(){
        getContratos();
    });
}