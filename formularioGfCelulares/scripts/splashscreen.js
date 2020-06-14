window.onload = function(){
    logout();
    getUser()
    .then(function(user){
        window.location.href = './listaContrato.html';
    })
    .catch(function(){
        window.location.href = './telaDeLogin.html';
    });
}