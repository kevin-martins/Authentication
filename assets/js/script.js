//#region Variables

const headerContentDoc = document.getElementById('headerContent');
const userWelcomeDoc = document.getElementById('userWelcome');
const authenticationDoc = document.getElementById('authentication');
const usernameDoc = document.getElementById('username');
const passwordDoc = document.getElementById('password');
const tableDoc = document.getElementById('tableContent');

//#endregion

//#region Get data from .json

async function getData() {
    const res = await fetch('assets/js/server.json');
    return await res.json();
}

//#endregion

//#region Parse Date and print table

getData().then((userInfos) => {
    for (let userInfo of userInfos) {
        if (userInfo.name == "Mark") {
            userInfo.name = "Sophie";
        }
        printUserInfo(userInfo);
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
}

const hidePrivateInfo = (hide, info) => {
    return hide? '*'.repeat(info.length):info;
}

//#endregion

const loginButton = () => {
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
}

function printUserInformations(user) {
    console.log(user.name + " correctly logged!")
    userWelcomeDoc.innerHTML = `Welcome back ${user.name} !`;
    document.getElementById(`${user.id}`).classList.add('selected');
    headerContentDoc.classList.remove('hiddenHeader');
    authenticationDoc.style.visibility = "hidden";
    return 1;
}