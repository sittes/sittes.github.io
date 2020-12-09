const contactMe = document.querySelector("#contactMe");
const email = document.querySelector("#email")

contactMe.onclick = ()=>{
    window.open("https://api.whatsapp.com/send?phone=5531993581414",'_blank');
  }

  email.onclick = () =>{
    window.open("https://mail.google.com/mail/u/0/#inbox","_blank")
}

 