// our wrapper inside which we'll insert cards (i.e. movies) found in our search
const wrapper = document.querySelector('#card-wrapper');
// our input form where the user enter a search query
const search = document.getElementById('movie-search');
// our 'no movies found' wrapper if the search doesn't generate any matches
const nothingFound = document.querySelector('.nothing-found');
// creating our array where we'll store the user input search query
let searchQuery = [];

function doMovieSearch() {
  // our fetch request and API url, where 'q=' means a free text search, and ${searchQuery} is our array with the user input
  fetch(`https://javascriptst18.herokuapp.com/trending?q=${searchQuery}`)
    .then(response => {
      // returning our json response and passing it to next '.then' (we have to do it this way, in two steps)
      return response.json();
    })
    // here's where we use our returned 'response.json'
    .then(json => {
      for (let movie of json) {
        // here are the elements, classes and content we want to insert to the HTML page for each results
        let cardDetails = ` 
        <div class="card-body">
          <img src="${movie.poster}" alt="${movie.title}">
        </div>`;
        // here we insert each card to 'wrapper'
        wrapper.insertAdjacentHTML('beforeend', cardDetails);
      }
      // if our search can't find any matches, we display an 'no matches' message
      if (!wrapper.hasChildNodes()) {
        // here's the heading and text we insert if nothing's found
        let noResults = `
        <h1>Sorry</h1>
        <h2>No matches found.<br>Please try again.</h2>`;
        // here we insert the message to 'nothingFound'
        nothingFound.insertAdjacentHTML('beforeend', noResults)
      }
    })
    // here's our error handler, which won't really tell us much.
    .catch(error => console.log(error));
}

search.addEventListener('submit', (i) => {
  // prevent form submit to reload page
  i.preventDefault();
  // empty wrapper (card results) from any previous search results
  wrapper.innerHTML = '';
  // empty our 'nothing found' message
  nothingFound.innerHTML = '';
  // store the value from the input field in 'result'
  let result = document.getElementById('movie-title').value;
  // empty our searchQuery array from previous searches
  searchQuery.pop();
  // add the 'result' input search value to the array
  searchQuery.push(result);
  // logging the content of our searchQuery array, to check that it works
  console.log(searchQuery);
  // call the search function
  doMovieSearch();
});