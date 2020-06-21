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
//ela chama o banco de dados firebase
var db = firebase.database();
//uma referencia onde esta chamando o banco de dados
var rootRef = db.ref("Contratos");

// filho da referencia

// Example starter JavaScript for disabling form submissions if there are invalid fields
'use strict';
window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (form.checkValidity() === false) {
                form.classList.add('was-validated');
            } else {
                var nome = document.getElementById('validationCustom01').value;
                var sobreNome = document.getElementById('validationCustom02').value;
                var email = document.getElementById('validationCustomUsername').value;
                var bairro = document.getElementById('validationCustom03').value;
                var endereco = document.getElementById('validationCustom04').value;
                var telefone = document.getElementById('validationCustom05').value;
                var aparelho = document.getElementById('validationCustom06').value;
                var modelo = document.getElementById('validationCustom07').value;
                var serial = document.getElementById('validationCustom08').value;
                var serialAcessorios = document.getElementById('validationCustom09').value;
                var defeitodeClarado = document.getElementById('validationCustom10').value;
                var dataDeOrcamento = document.getElementById('validationCustom11').value;
                var dataDeEntrega = document.getElementById('validationCustom12').value;
                var valor = document.getElementById('validationCustom13').value;
                var tecnico = document.getElementById('validationCustom14').value;
                var assinaturaDoTecnico = document.getElementById('validationCustom15').value;
                var assinaturaDoCliente = document.getElementById('validationCustom16').value;
                var tipoAcessorio = [];
                if (document.getElementById("customRadioInline1").checked) { tipoAcessorio.push("bateria") }
                if (document.getElementById("customRadioInline2").checked) { tipoAcessorio.push("tampa") }
                if (document.getElementById("customRadioInline3").checked) { tipoAcessorio.push("carregador") }
                if (document.getElementById("customRadioInline4").checked) { tipoAcessorio.push("outros") }
                var contrato = new Contrato(null, nome, sobreNome, email, bairro, endereco, telefone, aparelho, modelo,
                    serial, tipoAcessorio, serialAcessorios, defeitodeClarado, dataDeOrcamento, dataDeEntrega, valor, tecnico,
                    assinaturaDoTecnico, assinaturaDoCliente, inUser.path);
                //função criada para que o dados e enviado automaricamente          
                rootRef.push(contrato.toJson())
                    .then(function (el) {
                        window.location.href = "./contrato.html?path=" + el.key + "&id=" + 1;
                    })
                    .catch(function (err) { console.log(err) });
            }
        }, false);
    });
}, false);

window.onload = function () {
    init(function () {
        
    });
}