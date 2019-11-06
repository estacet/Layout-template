import {validateEmail} from "./app";

const message = document.getElementById("register-confirmation");
const name = document.getElementById('name');
const email = document.getElementById('userEmail');
const password = document.getElementById('password');

function showError(field) {
    $(field).popover('show');
    message.innerText = `Please fill the required field correctly`;
}

[name, email, password].forEach(field => {
    field.addEventListener('input', () => $(field).popover('hide'));
});

document
    .getElementById('register-button')
    .addEventListener('click', e => {
        e.preventDefault();

        if (name.value.trim() === "") {
            showError(name);
        } else if (!validateEmail(email.value)){
            showError(email);
        } else if (password.value.length < 6) {
            showError(password);
        } else {
            const request = new XMLHttpRequest();
            request.open("POST", `http://127.0.0.1:3000/auth`);
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    message.innerText = `${name.value}, you have been successfully registered`;
                    document.getElementById('getRegistered').reset();
                    }
                };
            const data = {name: name.value, email: email.value, password: password.value};
            request.send(JSON.stringify(data));
        }
    });