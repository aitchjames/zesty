import axios from "axios"
import { showAlert } from "./alerts";

export default class SignupForm {
    constructor() {
        this.form = document.querySelector(".auth-form-signup");
        this.allFields = document.querySelectorAll(".auth-form-signup .auth-form__input");
        this.insertValidationElements();
        this.name = document.querySelector("#name");
        this.name.previousValue = "";
        this.username = document.querySelector("#username");
        this.username.previousValue = "";
        this.email = document.querySelector("#email");
        this.email.previousValue = "";
        this.password = document.querySelector("#password");
        this.password.previousValue = "";
        this.username.isUnique = false;
        this.email.isUnique = false;
        this.events();
    }

    events() {
        this.form.addEventListener("submit", event => {
            event.preventDefault()
            this.formSubmitHandler()
        })
        this.name.addEventListener("keyup", () => {
            this.isDifferent(this.name, this.nameHandler)
        })
        this.username.addEventListener("keyup", () => {
            this.isDifferent(this.username, this.usernameHandler)
        })
        this.email.addEventListener("keyup", () => {
            this.isDifferent(this.email, this.emailHandler)
        });
        this.password.addEventListener("keyup", () => {
            this.isDifferent(this.password, this.passwordHandler)
        });
        this.name.addEventListener("blur", () => {
            this.isDifferent(this.name, this.nameHandler)
        });
        this.username.addEventListener("blur", () => {
            this.isDifferent(this.username, this.usernameHandler)
        });
        this.email.addEventListener("blur", () => {
            this.isDifferent(this.email, this.emailHandler)
        });
        this.password.addEventListener("blur", () => {
            this.isDifferent(this.password, this.passwordHandler)
        });
    }

    formSubmitHandler() {
        this.nameAfterDelay();
        this.nameImmediately();
        this.usernameImmediately();
        this.usernameAfterDelay();
        this.emailAfterDelay();
        this.passwordImmediately();
        this.passwordAfterDelay();

        if (!this.name.errors && this.username.isUnique && !this.username.errors && this.email.isUnique && !this.email.errors && !this.password.errors) {
            // this.form.submit()
            axios.post('/api/v1/users/signup', {
                name: this.name.value,
                username: this.username.value,
                email: this.email.value,
                password: this.password.value
            }).then((res) => {
                if (res.data.status === 'success') {
                    showAlert('success', 'Successfully created your account');
                    window.setTimeout(() => {
                        location.assign('/');
                    }, 1500);
                } 
            }).catch((err) => {
                showAlert('error', err.response.data.message);
                console.log(err.response.data);
            })            
        }
    }

    isDifferent(el, handler) {
        if (el.previousValue != el.value) {
            handler.call(this);
        }
        el.previousValue = el.value;
    }

    nameHandler() {
        this.name.errors = false;
        this.nameImmediately();
        clearTimeout(this.name.timer);
        this.name.timer = setTimeout(() => this.nameAfterDelay(), 1000);
    }

    usernameHandler() {
        this.username.errors = false;
        this.usernameImmediately();
        clearTimeout(this.username.timer);
        this.username.timer = setTimeout(() => this.usernameAfterDelay(), 1000);
    }

    emailHandler() {
        this.email.errors = false;
        clearTimeout(this.email.timer);
        this.email.timer = setTimeout(() => this.emailAfterDelay(), 1000);
    }

    passwordHandler() {
        this.password.errors = false;
        this.passwordImmediately();
        clearTimeout(this.password.timer);
        this.password.timer = setTimeout(() => this.passwordAfterDelay(), 1000);
    }

    nameImmediately() {
        if (this.name.value != "" && !/^[a-zA-Z]+$/.test(this.name.value)) {
            this.showValidationError(this.name, "Name can only contain letters");
        }

        if (this.name.value.length > 40) {
            this.showValidationError(this.name, "Name cannot exceed 40 characters");
        }

        if (!this.username.errors) {
            this.hideValidationError(this.name)
        }
    }

    usernameImmediately() {
        if (this.username.value != "" && !/^([a-zA-Z0-9]+)$/.test(this.username.value)) {
            this.showValidationError(this.username, "Username can only contain letters and numbers");
        }

        if (this.username.value.length > 30) {
            this.showValidationError(this.username, "Username cannot exceed 30 characters");
        }

        if (!this.username.errors) {
            this.hideValidationError(this.username)
        }
    }

    passwordImmediately() {
        if (this.password.length > 50) {
            this.showValidationError(this.password, "Password cannot exceed 50 characters")
        }

        if (!this.password.errors) {
            this.hideValidationError(this.password)
        }
    }

    hideValidationError(el) {
        el.nextElementSibling.classList.remove("auth-form__validation-visible");
    }

    showValidationError(el, message) {
        el.nextElementSibling.innerHTML = `<p>${message}</p>`;
        el.nextElementSibling.classList.add("auth-form__validation-visible");
        el.errors = true;
    }

    nameAfterDelay() {
        if (this.name.value.length < 2) {
            this.showValidationError(this.name, "Your name must be atleast 2 characters");
        }
    }

    usernameAfterDelay() {
        if (this.username.value.length < 3) {
            this.showValidationError(this.username, "Username must be atleast 3 characters");
        }

        if (!this.username.errors) {
            axios.post('/api/v1/users/doesUsernameExist', {username: this.username.value}).then((response) => {
                if (response.data) {
                    this.showValidationError(this.username, `${this.username.value} is already taken`);
                    this.username.isUnique = false;
                } else {
                    this.username.isUnique = true;
                }
            }).catch(() => {
                console.log("Please try again later");
            })
        }
    }

    emailAfterDelay() {
        if (!/^\S+@\S+$/.test(this.email.value)) {
            this.showValidationError(this.email, "You must provide a valid email address")
        }

        if (!this.email.errors) {
            axios.post('/api/v1/users/doesEmailExist', {email: this.email.value}).then((response) => {
                if (response.data) {
                    this.showValidationError(this.email, `${this.email.value} is already in use`);
                    this.email.isUnique = false;
                } else {
                    this.email.isUnique = true;
                    this.hideValidationError(this.email);
                }
            }).catch(() => {
                console.log("Please try again later");
            })
        }
    }

    passwordAfterDelay() {
        if (this.password.value.length < 8 ) {
            this.showValidationError(this.password, "The password must be atleast 8 characters")
        }
    }

    insertValidationElements() {
        this.allFields.forEach(function(el) {
            el.insertAdjacentHTML('afterend', '<div class="auth-form__validation"></div>')
        })
    }

}