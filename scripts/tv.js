$('.fa-twitter-square').on('click', function(e){
  	window.open(`https://twitter.com/intent/tweet?text=Take a look at the TV shows featuring Marvel superheroes. Click here https://imhighyat.github.io/myMarvelAPI/tv_shows.html`);
});
$('.fa-facebook-square').on('click', function(e){
  	window.open(`https://facebook.com/sharer/sharer.php?u=${escape(`https://imhighyat.github.io/myMarvelAPI/tv_shows.html`)}&t=Take a look at the TV shows featuring Marvel superheroes.`);
});
$('.fa-pinterest-square').on('click', function(e){
	window.open(`https://pinterest.com/pin/create/button/?url=${escape(`https://imhighyat.github.io/myMarvelAPI/tv_shows.html`)}&media=${escape(`https://imhighyat.github.io/myMarvelAPI/img/tv.jpg`)}&description=Take a look at the TV shows featuring Marvel superheroes.`);
});
