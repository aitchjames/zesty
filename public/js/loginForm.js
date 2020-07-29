import axios from "axios"
import { showAlert } from "./alerts";

export default class LoginForm {
    constructor() {
        this.form = document.querySelector(".auth-form-login");
        this.allFields = document.querySelectorAll(".auth-form-login .auth-form__input");
        this.insertValidationElements();
        this.email = document.querySelector("#email");
        this.password = document.querySelector("#password");
        this.events();
    }

    events() {
        this.form.addEventListener("submit", event => {
            event.preventDefault()
            this.formSubmitHandler()
        })
    }

    formSubmitHandler() {
        if (this.email.value != "" && this.password.value != "") {            
            axios.post('/api/v1/users/login', {
                email: this.email.value,
                password: this.password.value
            }).then((res) => {
                if (res.data.status === 'success') {
                    showAlert('success', 'Logged in successfully');
                    window.setTimeout(() => {
                        location.assign('/');
                    }, 1500);
                }
            }).catch((err) => {
                this.showValidationError(this.email, `${err.response.data.message}`);
            })            
        }
    }

    showValidationError(el, message) {
        el.nextElementSibling.innerHTML = `<p>${message}</p>`;
        el.nextElementSibling.classList.add("auth-form__validation-visible");
    }

    insertValidationElements() {
        this.allFields.forEach(function(el) {
            el.insertAdjacentHTML('afterend', '<div class="auth-form__validation"></div>')
        })
    }
}