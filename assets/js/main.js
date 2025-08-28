console.log("js.loaded");

let movieName = document.getElementById("txtSearch");
let searchBtn = document.getElementById("search_btn");

movieName.addEventListener("keypress", e => {
    if (e.key == 'Enter') {
        console.log(movieName.value);
        callApi(movieName.value.trim());
    }
});

searchBtn.addEventListener("click", () => {
    console.log(movieName.value);
    callApi(movieName.value.trim());
});

async function callApi(movie = "") {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=f5c34d84&t=${movie}`)
        .then((responce) => responce.json())
        .then((data) => {
            if (data.Response === "True") {
                setDetails(data);
            } else {
                alert("Movie not found!");
            }
        })
    fetch(`http://www.omdbapi.com/?apikey=f5c34d84&s=${movie}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                keywordResults = data.Search;
                displayKeywordResults(keywordResults);
            }
        });
}


function displayKeywordResults(results) {
    const container = document.getElementById("keyword-results");
    container.innerHTML = ""; // clear previous results

    results.forEach(movie => {
        const div = document.createElement("div");
        div.className = "keyword-movie";
        div.innerHTML = `
            <p>${movie.Title} </p>
            <img src="${movie.Poster}" alt="" width="100">    
        `;
        container.appendChild(div);
    });
}


function setDetails(movieData) {
    let movie = document.getElementById("movie_name");
    let year = document.getElementById("released_year");
    let imdb = document.getElementById("imdb_rate");
    let casting = document.getElementById("cast");
    let category = document.getElementById("categories");
    let images = document.getElementById("image");
    let plott = document.getElementById("plots");
    let runt = document.getElementById("runs");
    let directo = document.getElementById("direct");
    let gen = document.getElementById("genr");

    movie.innerText = movieData.Title;
    year.innerText = movieData.Year;
    imdb.innerText = movieData.imdbRating;
    casting.innerText = movieData.Actors;
    category.innerText = movieData.Genre;
    images.src = movieData.Poster;
    plott.innerText = movieData.Plot;
    runt.innerText = movieData.Runtime;
    directo.innerText = movieData.Director;
    gen.innerText = movieData.Genre;
}

