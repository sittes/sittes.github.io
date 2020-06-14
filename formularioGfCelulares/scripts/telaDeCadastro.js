let prism = document.querySelector(".rec-prism");

function init(){
  getUser()
  .then(function(){
      window.location.href = './listaContrato.html';
  })
  .catch(function(err){
    console.log(err)
  });
}

function login(event){
  if(event && "preventDefault" in event){
    event.preventDefault();
  }

  var form = document.getElementById("login");

  var email = form.email, password = form.password;

  signIn(email.value, password.value)
  .then(function(){
    window.location.href = './listaContrato.html';
  })
  .catch(function(err){
    showLogin();
    console.log(err);
  });

  return false;
}

function cadastrarsuario(event){
  if(event && "preventDefault" in event){
    event.preventDefault();
  }

  var form = document.getElementById("cadastrarsuario");

  var nome = form.nome,
  sobreNome = form.sobreNome,
  telefone = form.telefone,
  email = form.email,
  password = form.password,
  password2 = form.password2;

  if(nome.value === "" || sobreNome.value === "" || 
    telefone.value === "" || email.value === "" || 
    password.value === "" || password2.value === ""){
    return false;
  }

  if(password.value !== password2.value){
    return false;
  }

  var user = new Usuario(null, nome.value, sobreNome.value, email.value, telefone.value);

  criarUsuario(user, password.value)
  .then(function(user){
    nome.value = "";
    sobreNome.value = "";
    telefone.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";
    showLogin();
  })
  .catch(function(user){
    showSignup();
  });

  return false;
}

window.onload = function(){
  init();

  this.document.getElementById("login").onsubmit = login;
  this.document.getElementById("cadastrarsuario").onsubmit = cadastrarsuario;
}

function showSignup(){
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
}
function showLogin(){
  prism.style.transform = "translateZ(-100px)";
}
function showForgotPassword(){
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
}

function showSubscribe(){
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
}

function showContactUs(){
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
}

function showThankYou(){
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  return false;
}