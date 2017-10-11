let pageCounter = 1;

//main function that will load
function getMovieList(callback){
	const query = {
		api_key: TMDB_API_AUTH.KEY,
		sort_by: "release_date.desc",
		page: pageCounter
	};
	$.getJSON(TMDB_SEARCH_URL_MOVIES_LIST, query, callback);
}

//callback for getMovieList, will call displayResult function after mapping thru list of movies
function getMovieID(data){
	const movieList = data.results.map((value, index) => displayResult(value));
	$(".js-movies-result").html(movieList);
	titleClick();
	closeClick();
}

//pass the id of the movie and calls the getMovieDetails. returns div with a unique class for each movie ID
function displayResult(item){
	getMovieDetails(item.id, displayData);
	return `
		<div class="movies movie${item.id}"></div>
		`
}

//getJSON for the movie details
function getMovieDetails(id, callback){
	const query = {
		api_key: TMDB_API_AUTH.KEY,
	};
	$.getJSON(TMDB_SEARCH_URL_MOVIES_DETAILS+id, query, callback);
}

//will add every movie with poster, title and year
function displayData(data){
	let display_with_poster = `
			<a href="${data.id}" class="moreInfo">
			<img class="poster" src="http://image.tmdb.org/t/p/w500/${data.poster_path}">
			<h3 class="title">${data.title}</h3>
			</a>
			<p class="year">${data.release_date}</p>
			`
	let display_no_poster = `
			<a  href="${data.id}" class="moreInfo">
			<img class="poster" src="img/no_poster.png">
			<a href="${data.id}">
			<h3 class="title">${data.title}</h3>
			</a>
			<p class="year">${data.release_date}</p>
			`
	if(data.poster_path === null){
		$(`.movie${data.id}`).html(display_no_poster);
	}
	else{
		$(`.movie${data.id}`).html(display_with_poster);
	}
}

function titleClick(){
	$(".movies").on("click", "a", function (e){
		e.preventDefault();
		$(".modal-movie-detail").removeClass("js-hide");
		let movieID = $(this).attr("href");
		getMovieDetails(movieID, getCast);
	});
}

function closeClick(){
	$(".modal-movie-detail").on("click", ".close-modal", function (e){
		e.preventDefault();
		$(".modal-movie-detail").addClass("js-hide");
		$('iframe').attr('src', '');
	});
}



// Populate js-movie-detail with data
function getCast(data){
	$('.modal-movie-detail .modal-js-poster').attr("src", `http://image.tmdb.org/t/p/w500/${data.poster_path}`);
	$('.modal-movie-detail .modal-title').text(data.title);
	$('.modal-movie-detail .modal-overview').text(`${data.overview}`);
	$('.modal-movie-detail .modal-year').text(`Release date: ${data.release_date}`);
	$('.modal-movie-detail .modal-runtime').text(`Runtime: ${data.runtime} minutes`);
	$('.modal-movie-detail .modal-vote').text(`Average rating: ${data.vote_average}`);
	if(data.poster_path === null){
		$('.modal-movie-detail .modal-js-poster').attr("src", "img/no_poster.png");
	}
	if(data.runtime == 0){
		$('.modal-movie-detail .modal-runtime').text("Runtime: Not Available");
	}
	if(data.vote_average == 0){
		$('.modal-movie-detail .modal-vote').text("Average rating: Not Available");
	}
	getCastDetails(data.id, displayCastDetails);
	getTrailer(data.title);
}

//call JSON for cast details
function getCastDetails(id, callback){
	const query = {
		api_key: TMDB_API_AUTH.KEY,
	};
	$.getJSON(TMDB_SEARCH_URL_MOVIES_DETAILS+id+"/credits", query, callback);
}

//will return the display as it maps through the array of cast
function displayCastDetails(data){
	var castItems = data.cast.map(function(item){
		if(item.profile_path === null){
			return `
			<li>
			<img class="castPhoto" src="img/photo_not_available.jpg">
			<p>${item.name} as ${item.character}</p>
			</li>
			`
		}
		else{
			return `
				<li>
				<img class="castPhoto" src="http://image.tmdb.org/t/p/w500/${item.profile_path}">
				<p>${item.name} as ${item.character}</p>
				</li>
				`
		}
	});
	$('.modal-movie-detail .modal-cast').html(castItems.join(''));
}

//call JSON for youtube trailer
function getTrailer(title){
	const userQuery = {
    q: `${title} official trailer`,
    part: "snippet",
    key: YOUTUBE_API_AUTH,
    type: "video",
    maxResults: 1,
  };
  $.getJSON(YOUTUBE_SEARCH_URL, userQuery, function (data){
    const showVideo = data.items.map((value, index) => displayTrailer(value));
    $('.modal-movie-detail .modal-video').html(showVideo);
  });
}

//will display trailer
function displayTrailer(item){
	return `
		<iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
		`
}

function nextPageClick(){
	$(".pagination").on("click", "#nextPage", function(e){
			$("#prevPage").removeClass("js-hide");
			pageCounter++;
			getMovieList(getMovieID);
		if (pageCounter === 5){
			$("#nextPage").addClass("js-hide");
		}
		$("html, body").animate({scrollTop: 250}, 500);
	});
}

function prevPageClick(){
	$(".pagination").on("click", "#prevPage", function(e){
			pageCounter--;
			$("#nextPage").removeClass("js-hide");
			getMovieList(getMovieID);
		if (pageCounter === 1){
			$("#prevPage").addClass("js-hide");
		}
		$("html, body").animate({scrollTop: 250}, 500);
	});
}

function loadMovies(){
	getMovieList(getMovieID);
	nextPageClick();
	prevPageClick();
	$('.fa-twitter-square').on('click', function(e){
  		window.open(`https://twitter.com/intent/tweet?text=Take a look at the movies featuring Marvel superheroes. Click here https://imhighyat.github.io/myMarvelAPI/movies.html`);
  	});
	$('.fa-facebook-square').on('click', function(e){
  		window.open(`https://facebook.com/sharer/sharer.php?u=${escape(`https://imhighyat.github.io/myMarvelAPI/movies.html`)}&t=Take a look at the movies featuring Marvel superheroes.`);
  	});
  	$('.fa-pinterest-square').on('click', function(e){
		window.open(`https://pinterest.com/pin/create/button/?url=${escape(`https://imhighyat.github.io/myMarvelAPI/movies.html`)}&media=${escape(`https://imhighyat.github.io/myMarvelAPI/img/home_movies.png`)}&description=Take a look at the movies featuring Marvel superheroes.`);
	});
}

//main function
$(loadMovies);