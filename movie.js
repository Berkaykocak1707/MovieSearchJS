const searchEl = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieInfo = document.getElementById("movieInfo");

let accessToken =
  "YOUR_ACCSES_TOKEN"; 

let openPage = 0;

async function searchMovie() {
  let movieName = searchEl.value;
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  const results = data.results;

  movieInfo.innerHTML = "";

  if (results.length === 0) {
    alert("The searched page was not found");
    return;
  }

  results.map(async (result) => {
    const movieTitle = result.title;
    let movieOverview = result.overview;
    let moviePoster = result.poster_path
      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
      : "noimage.png";
    const moviePage = `https://www.themoviedb.org/movie/${result.id}`;

    movieOverview = movieOverview.split(" ").slice(0, 20).join(" ") + "...";

    movieInfo.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
                <h2>${movieTitle}</h2>
                <a href="${moviePage}" target="_blank">
                    <img src="${moviePoster}" alt="${movieTitle}">
                </a>
                <p>${movieOverview}</p>
            </div>`
    );

    
  });
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchMovie();
    openPage;
    
});
