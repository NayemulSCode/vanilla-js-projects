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
    // P('user info', newUser)
    addData(newUser)

}
//create / add object to data array 

function addData(obj) {
    data.push(obj);
    updateDOM();
}
//update DOM
function updateDOM(providedData = data){
    main.innerHTML = '<h2>Person Wealth</h2>';
    providedData.forEach(item =>{
        P(item);
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>`
        main.appendChild(element);
    });
}


// event listeners
createUserButton.addEventListener('click', getRandomUser)