const r_recipe_card = document.querySelector('.r_recipe_card');
const fav_m = document.querySelector('.fav_m');
const search_term = document.getElementById('search_term');
const search_resultblock = document.getElementById('search_result')
const modal_container = document.querySelector('.modal_container');
const modal = document.querySelector('.modal');

const remove_btn = document.querySelector('.remove_meal');

fetchFavMeals();

function getRandomMeal(method, url) {
    return new Promise(
        function (resolve, reject) {
            const http = new XMLHttpRequest();

            http.open(method, url, true);

            http.responseType = 'json';

            http.addEventListener('load', (event) => {
                const randomMeal = http.response;
                resolve(randomMeal);
            })

            http.addEventListener('error', () => {
                reject(new Error('URL connection is Error check your Internet connection!'))
            })

            http.send()
        }
    )
}

getRandomMeal('GET', 'https://www.themealdb.com/api/json/v1/1/random.php')
    .then(data => {
        let meal = data.meals[0];
        addRandomMeal(meal, true);
    });


function addRandomMeal(meal, random = false) {
    let mealcard = document.createElement('div');
    mealcard.classList.add('r_recipe_card');

    mealcard.innerHTML = `
        <div class="r_recipe_image">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="r_recipe_title">
            <span>${meal.strIngredient4}</span>
            <button id="addFavourite">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `

    mealcard.querySelector('.r_recipe_image').addEventListener('click', showModal.bind('', meal))

    let button = mealcard.querySelector('#addFavourite');

    button.addEventListener('click', addFavouriteFnc)
    r_recipe_card.appendChild(mealcard)

    
    function addFavouriteFnc() {

        if (button.classList.contains('active')) {
            button.classList.remove('active');
            removeMealIdFromLS(meal.idMeal)
        } else {
            button.classList.add('active');
            addMealToLS(meal.idMeal);
            window.location.reload()
        }

    }

}

async function getMealById(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const respData = await response.json();

    const meal = respData.meals[0];
    return meal;
}

function removeMealIdFromLS(id) {

    const getMeals = getMealfromLS();

    localStorage.setItem('mealIds', JSON.stringify(getMeals.filter(e => {
        return e !== id
    })));
}


function addMealToLS(mealId) {
    const mealIds = getMealfromLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function getMealfromLS() {
    const mealId = JSON.parse(localStorage.getItem('mealIds'));

    return (mealId !== null) ? mealId : [];
}

async function fetchFavMeals() {
    fav_m.innerHTML = '';

    const mealsIds  = getMealfromLS();

    const meals = [];

    for (let i=0; i < mealsIds.length; i++) {
        const mealId = mealsIds[i];

        let me = await getMealById(mealId);

        meals.push(me);
        addMealToFav(me);
    }
}


function addMealToFav(meal) {
    const li = document.createElement('li');
    li.innerHTML = `
        <button class="remove_meal">&times;</button>
        <div class="meal_img">
            <img src="${meal.strMealThumb}">
        </div>
        <span>${meal.strIngredient4}</span>
    `

    li.querySelector('.meal_img').addEventListener('click', showModal.bind(null, meal))
    
    li.querySelector('.remove_meal').addEventListener('click', async () => {
        removeMealIdFromLS(meal.idMeal);
        fetchFavMeals();
    })

    fav_m.appendChild(li)
}


search_term.addEventListener('input', search_mealFnc);


function getMealBySearch(term) {
    return new Promise(
        function(resolve, reject) {
            const http = new XMLHttpRequest();
            http.open('GET', `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`, true);

            http.responseType = 'json';

            http.addEventListener('readystatechange', () => {
                if (http.readyState === 4 && http.status === 200) {
                    resolve(http.response);
                }
            })

            http.send()
        }
    )
}

async function search_mealFnc() {
    const inp_value = search_term.value;
    if (inp_value.trim() === '') {
        search_resultblock.style.display = 'none';
        return;
    } else {
        search_resultblock.style.display = 'flex';
    }


    const search_resp = await getMealBySearch(inp_value);

    for (let i = 0; i < search_resp.meals.length; i++) {
        document.querySelector('.search_result').querySelectorAll('li').forEach(e => e.remove())
    }

    for (let i = 0; i < search_resp.meals.length; i++) {

        const result = search_resp.meals[i];

        const createElementLi = document.createElement('li');
        createElementLi.innerHTML = `
            <div class="meal_image">
                <img src="${result.strMealThumb}" alt="">
            </div>
            <span>${result.strIngredient4}</span>
        `

        createElementLi.addEventListener('click', showModal.bind(null, result))

        document.querySelector('.search_result').appendChild(createElementLi);
    }
}


function showModal(rdata) {

    modal_container.querySelectorAll('.modal').forEach(e => {
        e.remove()
    })

    modal_container.style.display = 'block';

    let modal = document.createElement('div');

    modal.classList.add('modal');
    modal.innerHTML = `

        <img src="${rdata.strMealThumb}" alt="">

        <p>
            ${rdata.strInstructions}
        </p>
    `
    modal_container.appendChild(modal)
}



document.querySelector('.modal_closebtn').addEventListener('click', function() {
    modal_container.style.display = 'none';
});

