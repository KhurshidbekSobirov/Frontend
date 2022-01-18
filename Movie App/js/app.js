const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const search_input = document.getElementById('film_search');

function getMovies(method, url, async) {
    return new Promise(
        function (resolve, reject) {
            const http = new XMLHttpRequest();

            http.open(method, url, async);

            http.addEventListener('load', () => {
                resolve(JSON.parse(http.response))
            })

            http.send()
        }
    )
}


getMovies('GET', APIURL, true)
    .then((film_data) => {
        film_data.results.forEach(film => {
            const film_card = document.createElement('div');
            film_card.classList.add('movie_card');

            film_card.innerHTML = `
            <div class="movie_image">
                <img src="${IMGPATH + film.poster_path}">
            </div>
            <div class="movie_components">
                <span class="movie_title">${film.title}</span>
                <span class="movie_rating ${gerRateFilm(film.vote_average)}">${film.vote_average}</span>
            </div>
            `

            document.querySelector('.movie_wrapper').appendChild(film_card)
        });


        function gerRateFilm(rate) {
            if (rate >= 7) {
                return 'green'
            }
            if (rate >= 6) {
                return 'orange';
            } else {
                return 'red'
            }
        }
    })

const search_modal = document.getElementById('search_modal')

search_input.addEventListener('input', () => {
    document.querySelector('.movie_wrapper').innerHTML = ''

    const search_value = search_input.value;
    getMovies('GET', SEARCHAPI + search_value, true)
    .then((film_data) => {
        film_data.results.forEach(film => {
            const film_card = document.createElement('div');
            film_card.classList.add('movie_card');

            film_card.innerHTML = `
            <div class="movie_image">
                <img src="${IMGPATH + film.poster_path}">
            </div>
            <div class="movie_components">
                <span class="movie_title">${film.title}</span>
                <span class="movie_rating ${gerRateFilm(film.vote_average)}">${film.vote_average}</span>
            </div>
            `

            document.querySelector('.movie_wrapper').appendChild(film_card)
        });


        function gerRateFilm(rate) {
            if (rate >= 7) {
                return 'green'
            }
            if (rate >= 6) {
                return 'orange';
            } else {
                return 'red'
            }
        }
    })

    let notFound = document.querySelector('.film_container').querySelectorAll('li');

    if (search_value !== '') {

        search_modal.style.display = 'block';
        const http = new XMLHttpRequest();

        http.open('GET', SEARCHAPI + search_value, true);

        http.addEventListener('load', () => {
            let founded_film = JSON.parse(http.response);
            document.querySelector('.film_container').innerHTML = ''


            if (notFound.length <= 0) {
                document.querySelector('.film_container').innerHTML = 'Not Found'
            } else {
                document.querySelector('.film_container').innerHTML = ''
            }

            if (founded_film) {
                founded_film.results.forEach(film_found => {
                    // console.log(film_found)
                    let film_founded = document.createElement('li');
                    film_founded.innerHTML = `

                <div class="film_image">
                    <img src="${IMGPATH + film_found.poster_path}">
                </div>
                <div class="">
                    <div class="title_film">
                        ${film_found.original_title}
                    </div>
                    <p class="film_info">
                       ${film_found.overview}
                    </p>
                </div>
                `
                    document.querySelector('.film_container').appendChild(film_founded)
                })
            }
        })


        http.send()
    } else {
        search_modal.style.display = 'none';
        getMovies('GET', APIURL, true)
        .then((film_data) => {
            film_data.results.forEach(film => {
                const film_card = document.createElement('div');
                film_card.classList.add('movie_card');
    
                film_card.innerHTML = `
                <div class="movie_image">
                    <img src="${IMGPATH + film.poster_path}">
                </div>
                <div class="movie_components">
                    <span class="movie_title">${film.title}</span>
                    <span class="movie_rating ${gerRateFilm(film.vote_average)}">${film.vote_average}</span>
                </div>
                `
    
                document.querySelector('.movie_wrapper').appendChild(film_card)
            });
    
    
            function gerRateFilm(rate) {
                if (rate >= 7) {
                    return 'green'
                }
                if (rate >= 6) {
                    return 'orange';
                } else {
                    return 'red'
                }
            }
        })
    }
})