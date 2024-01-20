const form = document.querySelector('#github-form');

form.addEventListener('submit',handleSubmit);



function handleSubmit(e){

    e.preventDefault();

    
    let inputValue = e.target.search.value;
    // Remove all white spaces
    const inputValueNoWhiteSpace = inputValue.split(' ').join('')
    
    
    getUser(inputValueNoWhiteSpace);

}


// DOM Render functions
/* 1. UserProfileCardsRenderer() description
Items rendered 
Card:   a.Avatar  owner.avatar_url
        b.Name    full_name
        c.Git hub profile link html_url
        d.Git hub repositories link 
        (click event triggers git hub repository render)
*/

function userProfileCardRenderer (user){
    // Get list where user is to be added
    const usersList = document.querySelector('#user-list');
    // Create list item
    const card = document.createElement('li');
    // Add class name for stylings
    card.className = 'card'
    // Add card inner html

    card.innerHTML = `
    <img class = "user-avatar" src="${user.avatar_url}" alt="user's avatar image">
    <div class="user-details">
        <p class="user-name" id="userName">${user.login}</p>
        <a id ='profileLink' class="card-link capitalize" href="${user.html_url}"> my github </a>
        <p id ='repositories' class="card-link capitalize" >my github repositories </p>
    </div>
    `
    // Append card to the users list
    usersList.appendChild(card);
    // Get all repositories     
    const repositories = card.querySelector('#repositories');
    repositories.addEventListener('click',() => {

        getRepos(user.repos_url);
    })



}


/* 2. repoRender()
a.fetch all repository  user.repos_url
b.convert to js object
c.display 
    i.repository name : repo.description 
    ii.link to this repo : repo.html_url

*/

function repoRender (repo){
    // Get area where repo is to be rendered 
    const reposList = document.querySelector('#reposList');
    // Create element thats to be rendered 
    const repoName = document.createElement('li');
    // Add repoName inner HTML
    repoName.innerHTML = `    
    <a href="${repo.html_url}" class="repo-link capitalize" > ${repo.name}</a>
    ` ;
    // Append to repo render area
    reposList.appendChild(repoName);

}





// user-list

// GET users data by keyWord provided

function getUser (keyWord){
    return fetch(`https://api.github.com/search/users?q=${keyWord}`)
    .then(resp => resp.json())
    .then(users => users.items.forEach(user => userProfileCardRenderer(user)));
}

// GET repos

function getRepos (reposLink){
    return fetch(`${reposLink}`)
    .then(resp => resp.json())
    .then(repos => repos.forEach(repo => repoRender(repo)));
}


