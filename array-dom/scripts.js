const P = console.log.bind(console)
const main = document.getElementById('main');
const createUserButton = document.getElementById('create-user');

let data = [];
getRandomUser();

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data =  await res.json()
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    P('user info', newUser)
}


// event listeners
createUserButton.addEventListener('click', getRandomUser)