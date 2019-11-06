//AJAX
import 'bootstrap';
import './getNewsletter';
import './getRegistered';

function validateEmail(email) {
    let re = /[\w|\W]+@[a-z]+\.+[a-z]{1,6}/;
    return re.test(email);
}
export {validateEmail};
