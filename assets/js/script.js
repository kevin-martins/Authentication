//#region Variables

const headerContentDoc = document.getElementById('headerContent');
const userWelcomeDoc = document.getElementById('userWelcome');
const authenticationDoc = document.getElementById('authentication');
const buttonDoc = document.getElementById('logButton');
const usernameDoc = document.getElementById('username');
const passwordDoc = document.getElementById('password');
const tableDoc = document.getElementById('tableContent');
var data = [];

//#endregion

//#region Get data from .json

async function getData() {
    const data = await fetch('assets/js/server.json');
    return await data.json();
}

//#endregion

//#region Put JSON into variable then it on the Webpage

getData().then((userInfos) => {
    for (let userInfo of userInfos) {
        data.push({
            id: userInfo.id,
            username: userInfo.username,
            password: userInfo.password,
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            private: userInfo.private
        });
    }
    for (let i = 0; i < data.length; i++) {
        printUserInfo(data[i]);
    }
})

const printUserInfo = userInfo => {
    const hide = userInfo.private;
    tableDoc.innerHTML += `<tr id="${userInfo.id}">
                                <td>${hidePrivateInfo(hide, userInfo.username)}</td>
                                <td>${hidePrivateInfo(hide, userInfo.password)}</td>
                                <td>${hidePrivateInfo(hide, userInfo.name)}</td>
                                <td>${hidePrivateInfo(hide, userInfo.email)}</td>
                                <td>${hidePrivateInfo(hide, userInfo.phone)}</td>
                                <td>${userInfo.private}</td>
                            </tr>`;
};

const hidePrivateInfo = (hide, info) => {
    return hide? '*'.repeat(info.length):info;
};

//#endregion

document.body.onkeydown = (keyPressed) => {
    if (keyPressed.key == "Enter") {
        login();
    }
}

const login = () => {
    let logged = 0;
    getData().then((userInfos) => {
        for (let userInfo of userInfos) {
            if (userInfo.username == usernameDoc.value &&
                userInfo.password == passwordDoc.value) {
                logged = printUserInformations(userInfo);
            }
        }
        if (logged != 1) {
            alert("Error: invalid username or password");
        }
    })
};

function printUserInformations(user) {
    console.log(user.name + " correctly logged!")
    userWelcomeDoc.innerHTML = `Welcome back ${user.name} !`;
    document.getElementById(`${user.id}`).classList.add('selected');
    headerContentDoc.classList.remove('hiddenHeader');
    authenticationDoc.style.visibility = "hidden";
    return 1;
}

// getData().push({
//     "id": 1,
//     "username": "hello",
//     "password": "salut",
//     "name": "Mark",
//     "email": "mark-lefou@gmail.com",
//     "phone": "0625458756",
//     "private": false
// });
