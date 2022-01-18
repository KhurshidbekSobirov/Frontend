const USER_API = 'https://api.github.com/users/';

const inp = document.getElementById('search_inp');


inp.addEventListener('input', () => {
    getUsers(inp.value)
})

async function getUsers(user) {
    const resp = await fetch(USER_API + user);
    const respData = await resp.json();

    createUserCard(respData);
}


function createUserCard(user) {
    document.querySelector('.momo').innerHTML = ''
    const account_box = document.createElement('div');
    account_box.classList.add('account_box');
    account_box.innerHTML = `
            <div class="image_box">
                <img src="${user.avatar_url}" alt="">
            </div>
            <div class="info_box">
                <div class="account_username">
                    <h3>${user.login}</h3>
                    <small>id: ${user.id}</small>
                </div>
                <div class="info">
                    <p>
                        ${user.created_at}
                    </p>
                </div>
                <div class="like_popular">
                    <div class="">
                        <i class="fas fa-users"></i>
                        <span>Followers: ${user.followers}</span>
                    </div>
                    <div class="">
                        <i class="fas fa-user"></i>
                        <span>Following: ${user.following}</span>
                    </div> 
                    <div class="">
                        <i class="fas fa-retweet"></i>
                        <span>Repost: ${user.public_repos}</span>
                    </div>    
                </div>
            </div>`

        document.querySelector('.momo').appendChild(account_box)
}


