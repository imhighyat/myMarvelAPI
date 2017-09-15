$(".imageShield").click(function() {
  $("body").animate({scrollTop: $(document).height()}, 1000);
});

$('.fa-twitter-square').on('click', function(e){
  window.open(`https://twitter.com/intent/tweet?text=Get to know more about your Marvel superheroes. Click here https://imhighyat.github.io/myMarvelAPI/`);
  });
$('.fa-facebook-square').on('click', function(e){
  window.open(`https://facebook.com/sharer/sharer.php?u=${escape(`https://imhighyat.github.io/myMarvelAPI/`)}&t=Get to know more about your Marvel superheroes.`);
  });
$('.fa-pinterest-square').on('click', function(e){
  window.open(`https://pinterest.com/pin/create/button/?url=${escape(`https://imhighyat.github.io/myMarvelAPI/`)}&media=${escape(`https://imhighyat.github.io/myMarvelAPI/img/shield.jpg`)}&description=Take a look at the movies featuring Marvel superheroes.`);
});