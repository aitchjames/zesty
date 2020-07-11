import "@babel/polyfill";
import ColorThief from "ColorThief";
import { login, logout, signup, forgotPassword } from "./auth";
import { search } from "./search";
import { showAlert } from "./alerts";

// Mobile Menu Dom Elements
const menuIcon = document.querySelector(".nav-mobile-button");    
const menuIconHamburger = document.querySelector(".nav-mobile-button-menu");    
const menuIconClose = document.querySelector(".nav-mobile-button-x");    
const menuContent = document.querySelector(".nav-menu__mobile");
const menuCollapsible = document.querySelectorAll(".nav-mobile__link-collapse");
const desktopSearchForm = document.getElementById("desktopSearchForm");
const mobileSearchForm = document.getElementById("mobileSearchForm");
const loginForm = document.querySelector(".auth-form-login");
const signupForm = document.querySelector(".auth-form-signup");
const forgotPasswordForm = document.querySelector(".auth-form-forgotpassword");
const logoutButton = document.querySelectorAll(".button-logout");

// Mobile Menu Delegation
if (menuIcon) {
    menuIcon.addEventListener("click", () => {
        toggleMenu();
    });

    // Remove mobile menu when window resizes
    let windowResizeTimer;

    window.addEventListener("resize", event => {
        clearTimeout(windowResizeTimer);
        windowResizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                menuIconHamburger.classList.remove("nav-mobile-button-menu__is-visible");
                menuIconClose.classList.remove("nav-mobile-button-x__is-visible");
                menuContent.classList.remove("nav-menu__mobile__is-visible");
            }
        }, 250);
    });
}

function toggleMenu() {
    menuIconHamburger.classList.toggle("nav-mobile-button-menu__is-visible");
    menuIconClose.classList.toggle("nav-mobile-button-x__is-visible");
    menuContent.classList.toggle("nav-menu__mobile__is-visible");
}

if (desktopSearchForm) {
    desktopSearchForm.addEventListener("submit", event => {
        event.preventDefault()
        const searchTerm = document.getElementById("desktopSearchInput").value;
        search(searchTerm);
    })
}

if (mobileSearchForm) {
    mobileSearchForm.addEventListener("submit", event => {
        event.preventDefault()
        const searchTerm = document.getElementById("mobileSearchInput").value;
        search(searchTerm);
    })
}

if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    })
}

if (signupForm) {
    signupForm.addEventListener("submit", event => {
       event.preventDefault();
       const name = document.getElementById("name").value;
       const username = document.getElementById("username").value;
       const email = document.getElementById("email").value;
       const password = document.getElementById("password").value;
       signup(name, username, email, password);
    });
}

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", event => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        forgotPassword(email);
    })
}

if (menuCollapsible) {
    menuCollapsible.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
    
            button.classList.toggle("active");
    
            if (button.classList.contains("active")) {
                content.style.visibility = "visible"
                content.style.opacity = "1"
                content.style.maxHeight = `${content.scrollHeight}px`
            } else {
                content.style.visibility = "hidden"
                content.style.opacity = "0"
                content.style.maxHeight = 0;
            }
        })
    })
}

// Reviews Dom Elements
const reviewsButton = document.querySelector(".recipe-cooking-reviews__heading");
const reviewsContent = document.querySelector(".recipe-cooking-reviews__content");

// Reviews Delegation
if (reviewsButton) {
    reviewsButton.addEventListener("click", () => toggleReviews());
}

function toggleReviews() {
    reviewsButton.classList.toggle("hidden");
    reviewsContent.classList.toggle("hidden");
}


// Single Recipe Page Main Image Colour
const colorThief = new ColorThief();
const mainRecipeImage = document.querySelector(".recipe-masthead__image-fg");
const mainRecipeImageBG = document.querySelector(".recipe-masthead__image-bg")

if (mainRecipeImage) {
    if (mainRecipeImage.complete) {
        let color = colorThief.getColor(mainRecipeImage);
        mainRecipeImageBG.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    } else {
        mainRecipeImage.addEventListener('load', function() {
            let color = colorThief.getColor(mainRecipeImage);
            mainRecipeImageBG.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        });
    }
} 

if (logoutButton) {
    logoutButton.forEach(button => {
        button.addEventListener("click", logout);
    })    
} 

const alertMessage = document.querySelector("body").dataset.alert;
if (alertMessage) showAlert("success", alertMessage, 20);