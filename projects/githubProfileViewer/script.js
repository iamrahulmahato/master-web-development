const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const type = document.getElementById("search");
const modal = document.getElementById("modal");
const modalCloseButton = document.getElementById("modal-close-btn");
const modalMessageText = document.getElementById("modal-message");

function toggleModal(visible){
    if (typeof visible == undefined) {
        visible = modal.style.display != "block";
    }
    if (visible) {
        modal.style.display = "block";
    }else{
        modal.style.display = "none";
    }
}

const getUser = async (username) => {
    fetch(APIURL + username)
    .then(response=>response.json())
    .then(data=>{
        console.log(JSON.stringify(data));
        
        if (data.status != undefined && data.status == 404){
            toggleModal(true);
            return;
        }
        if (!data.bio) data.bio = "";

        const card = `
            <div class="card">
                <div>
                    <img src="${data.avatar_url}" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>
                    <ul class="info">
                        <li>${data.followers}<strong>Followers</strong></li>
                        <li>${data.following}<strong>Following</strong></li>
                        <li>${data.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <div id="repos"></div>
                    <a href="${data.html_url}" id="ext-link" target="_blank"><i class="ri-external-link-line"></i></a>
                </div>
            </div>
            `;
        main.innerHTML = card;
        getRepos(username);
    })
    .catch(e=>{})
}

const getRepos = async (username) => {

    fetch(APIURL + username + "/repos")
    .then(response=>response.json())
    .then(response=>{
        if (response.status != undefined && response.status == 404) {
            toggleModal(true);
            return;
        }
        const repos = document.querySelector("#repos");
        response.forEach((item) => {
            const ele = document.createElement('a');
            ele.classList.add("repo");
            ele.href = item.html_url;
            ele.innerHTML = item.name;
            ele.target = '_blank'
            repos.appendChild(ele);
        });
    })
    .catch(e=>{})
}

const form = document.querySelector('#form');
function formsubmit() {
    if (type.value != "") {
        getUser(type.value);
        type.value = "";
    }
    
    return false;
}

type.addEventListener('focusout', function () {
    formsubmit();
})

modalMessageText.innerText = "Username not found. No user is associated with that username. Please recheck the entered username.";
modalCloseButton.addEventListener("click", ()=>{toggleModal(false)})

window.onclick = function(e){
    if (e.target== modal) {
        toggleModal();
    }
}
