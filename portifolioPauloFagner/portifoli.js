const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const contactMe = document.querySelector("#contactMe");

const contactemail = document.querySelector("#contactemail")

contactMe.onclick = ()=>{
    window.open("https://api.whatsapp.com/send?phone=5531993581414",'_blank');
  }

  contactemail.onclick = () =>{
      window.open("https://mail.google.com/mail/u/0/#inbox",target="_blank")
  }

const handleButtonClick = (e) => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#about"
    ? card.classList.add("is-active")
    : card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach((s) => s.classList.remove("is-active"));
  buttons.forEach((b) => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach((btn) => {
  btn.addEventListener("click", handleButtonClick);
});






