
// getting data from marvel and performing a CB function
function getData(keyword, callback){ 
  const userQuery = {
    nameStartsWith: `${keyword}`,
    orderBy: "name",
    limit: 100,
    ts: 1,
    apikey: MARVEL_API_AUTH.KEY,
    hash: MARVEL_API_AUTH.HASH
  };
  $.getJSON(MARVEL_SEARCH_URL, userQuery, callback);
}


// callback function for getData for marvel data
function displayData(data){
	const showResults = data.data.results.map((value, index) => displayResult(value));
  $(".js-comic-results").html(showResults);
  //if the data returned doesnt have any items
  if(data.data.results.length === 0){ 
    $(".js-comic-results").html(`<h2 class="js-no-results">Sorry, your keyword didn't return any results. Please try again.</h2>`);
  }
}


// invoked inside displayData - displays the result to the document
function displayResult(item){
  get101(item.name);
	return `
		<div class="charInfo">
			<div class="charThumbnail">
				<img src="${item.thumbnail.path}.jpg" alt="${item.name}'s thumbnail photo">
			</div>
			<div class="charData">
				<h3>${item.name}</h3>
				<p>${item.description}</p>
				<ul>
					<li>Has been featured ${item.comics.available} times in comics.</li>
					<li>Has been in a total of ${item.series.available} series.</li>
					<li>Has been featured in ${item.stories.available} stories.</li>
					<li>Has been featured in ${item.events.available} events.</li>
				</ul>
				<p>Go to <a href="${item.urls[1].url}" class="marvelWiki" target="_blank">Marvel's Wiki page</a> for more information on this character.</p>
				<p>For available comics that you can purchase, please click <a href="${item.urls[item.urls.length-1].url}" class="purchaseComics" target="_blank">here.</a></p>
			</div>
      <div id="charYoutube101" class="${item.name.replace(' ', '').replace('\(', '').replace('\)', '').replace('\'', '').replace('-', '').replace('/', '').replace(':', '').toLowerCase()}">
      </div>
		</div>
	`
}


// getting data from youtube and calling a function directly when mapping thru the data
function get101(charName){
	const userQuery = {
    q: `${charName} origin`,
    channelID: "UCvC4D8onUfXzvjTOM-dBfEA",
    part: "snippet",
    key: YOUTUBE_API_AUTH,
    type: "video",
    maxResults: 1,
  };
  $.getJSON(YOUTUBE_SEARCH_URL, userQuery, function (data){
    const showVideo = data.items.map((value, index) => displayVideo(value));
    $(`#charYoutube101.${charName.replace(' ', '').replace('\(', '').replace('\)', '').replace('\'', '').replace('-', '').replace('/', '').replace(':', '').toLowerCase()}`).html(showVideo);
  });
}



// invoked inside get101 - adds the result to the element with a specified class
function displayVideo(item){
	return `
	<iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
	`
}

function searchTheChar(){
  //When the document loads if a search query exists
  //get the search key value from the url and transform it
  let character;
  if (location.search){
    let params = new URLSearchParams(location.search);
    character = params.get("q");
    $("input").val(character);
    getData(character, displayData);
  }
  $(".js-query-form").submit(function (e){ //when search is clicked
    e.preventDefault(); //prevent submission of form
    const findInput = $(".js-query-form").find(".js-query"); //finds the input from user
    character = findInput.val(); //store the input in a variable
    findInput.val(""); //clears the input after button is clicked
    getData(character, displayData);
  });
  $('.fa-twitter-square').on('click', function(e){
    window.open(`https://twitter.com/intent/tweet?text=Get to know more about your preferred Marvel superhero. Click here https://imhighyat.github.io/myMarvelAPI/comic_books.html?q=${escape(character)}`)
  });
  $('.fa-facebook-square').on('click', function(e){
    https://www.facebook.com/sharer/sharer.php?u="+escape(window.location.href)+"&t="+document.title
    window.open(`https://facebook.com/sharer/sharer.php?u=${escape(`https://imhighyat.github.io/myMarvelAPI/comic_books.html?q=${character}`)}&t=Get to know more about your preferred Marvel superhero.`)
  });
}



$(searchTheChar); //calling the main function
