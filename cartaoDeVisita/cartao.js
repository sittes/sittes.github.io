$(document).on('click', '.flip', function () {
  let card = $(this).closest('.card');
  if (card.hasClass('flip-it')) card.removeClass('flip-it');else
  card.addClass('flip-it');
});


$('.card').each(function () {
  let href = $(this).data('href');
  $(this).find('.image').css({
    backgroundImage: ['url(', href, ')'].join('') });

});

const contactMe = document.querySelector("#contactMe");

contactMe.onclick = ()=>{
    window.open("https://api.whatsapp.com/send?phone=5531993581414",'_blank');
  }