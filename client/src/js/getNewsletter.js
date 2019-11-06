import {validateEmail} from "./app";

const email = document.getElementById('email');
const message = document.getElementById("subscription-confirmation");

email.addEventListener('input', () => $(email).popover('hide'));

document
    .getElementById('send-button')
    .addEventListener('click', e => {
        e.preventDefault();

        if (validateEmail(email.value)){
            console.log(validateEmail(email.value));
            const request = new XMLHttpRequest();
            request.open("POST", `http://127.0.0.1:3000/subscribe`);
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    message.innerHTML = `You will receive the newsletter to: <br> ${email.value}`;
                    document.getElementById('getNewsletter').reset();
                }
            };
            const data = {email: email.value};
            request.send(JSON.stringify(data));
        } else {
            $(email).popover('show');
        }
    });