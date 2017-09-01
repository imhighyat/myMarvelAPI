
const charSearch = "https://gateway.marvel.com/v1/public/characters";
//const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search"; 
//let charName = null;

function getData(keyword, callback){ //marvel
  const userQuery = {
    nameStartsWith: `${keyword}`,
    orderBy: "name",
    limit: 20,
    ts: 1,
    apikey: "58149727a1ccb3e2d0983beb68c219ac",
    hash: "9537e876fc1cc632440c7e9b3ab3fe7e"
  };
  $.getJSON(charSearch, userQuery, callback);
}

function displayData(data){ //marvel
	const showResults = data.data.results.map((value, index) => displayResult(value));
  	$(".js-results").html(showResults);
  	//get101(data.data.results.name, displayVideo)
  	if(data.data.results.length === 0){ 
    $(".js-results").html("<h2>Sorry, your keyword didn't return any results. Please try again.</h2>");
  }
}

function displayResult(item){ //will create the markup for the results
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
				<p>Go to <a href="${item.urls[1].url}" target="_blank">Marvel's Wiki page</a> for more information on this character.</p>
				<p>For available comics that you can purchase, please click <a href="${item.urls[item.urls.length-1].url}" target="_blank">here.</a></p>
			</div>
			<div class="charYoutube101">
			</div>
		</div>
	`
}

/*function get101(charName, callback){ //youtube
	const userQuery = {
    q: `${charName} marvel 101 in: title`,
    part: "snippet",
    key: "AIzaSyClYmxQUfYLWr81myf1BaGDeAuGC-AmV0o",
    type: "video",
    maxResults: 1,
  };
  $.getJSON(youtubeSearchUrl, userQuery, callback);
}

function displayVideo(data){ //youtube
	const showResults = data.items.map((value, index) => showVideo(value));
  	$(".marvel101").html(showResults);
}

function showVideo(item){
	return `
	<iframe src="https://www.youtube.com/watch?v=${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
	`
}*/

function searchTheChar(){
  $(".js-query-form").submit(function (e){ //when search is clicked
    e.preventDefault(); //prevent submission of form
    const findInput = $(".js-query-form").find(".js-query"); //finds the input from user
    const getInputValue = findInput.val(); //store the input in a variable
    findInput.val(""); //clears the input after button is clicked
    getData(getInputValue, displayData);
  });
}

$(searchTheChar); //calling the main function