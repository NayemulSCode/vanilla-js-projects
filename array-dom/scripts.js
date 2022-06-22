const P = console.log.bind(console)
const main = document.getElementById('main');
const createUserButton = document.getElementById('create-user');
const doubelMoneyBotton = document.getElementById('double-money');
const sortedByRichest = document.getElementById('sort-by-richest');
const filterByMillionaires = document.getElementById('filter-millionaires');


let data = [];
// at a time 2 user show very first load;
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
    addData(newUser);
}
//create / add object to data array 
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// double everyones money
function doubelMoney(){
    data = data.map(user =>{
        return {
            ...user,
            money: user.money * 2
        }
    });
    // P('double money', data)
    updateDOM()
}
// sort users by richest
function sortByRechest(){
    data.sort((a, b) => b.money - a.money);
    updateDOM()
}

// filter only millionaires
function filterUserOnlyMillionaires(){
    data = data.filter(user => user.money > 1000000);
    updateDOM()
}
//update DOM
function updateDOM(providedData = data){
    main.innerHTML = '<h2>Person Wealth</h2>';
    providedData.forEach(item =>{
        // P(item);
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element);
    });
}


// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number){
    return '৳' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners
createUserButton.addEventListener('click', getRandomUser)
doubelMoneyBotton.addEventListener('click', doubelMoney)
sortedByRichest.addEventListener('click', sortByRechest)
filterByMillionaires.addEventListener('click', filterUserOnlyMillionaires)