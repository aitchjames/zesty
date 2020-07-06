// Remove mobile menu when window resizes
let windowResizeTimer;

window.addEventListener("resize", event => {
    clearTimeout(windowResizeTimer);
    windowResizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            menuIconHamburger.classList.remove("nav-mobile-button-menu__is-visible");
            menuIconClose.classList.remove("nav-mobile-button-x__is-visible");
            menuContent.classList.remove("nav-menu__mobile__is-visible");
            documentBody.classList.remove("scroll");
        }
    }, 250)
});

// Mobile Menu Dom Elements
documentBody = document.getElementsByTagName("BODY")[0]; 
menuIcon = document.querySelector(".nav-mobile-button");    
menuIconHamburger = document.querySelector(".nav-mobile-button-menu");    
menuIconClose = document.querySelector(".nav-mobile-button-x");    
menuContent = document.querySelector(".nav-menu__mobile");
menuCollapsible = document.querySelectorAll(".nav-mobile__link-collapse");

// Mobile Menu Delegation
menuIcon.addEventListener("click", () => toggleMenu());

function toggleMenu() {
    menuIconHamburger.classList.toggle("nav-mobile-button-menu__is-visible");
    menuIconClose.classList.toggle("nav-mobile-button-x__is-visible");
    menuContent.classList.toggle("nav-menu__mobile__is-visible");
    documentBody.classList.toggle("scroll");
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
reviewsButton = document.querySelector(".recipe-cooking-reviews__heading");
reviewsContent = document.querySelector(".recipe-cooking-reviews__content");

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
    let color = colorThief.getColor(mainRecipeImage);
    mainRecipeImageBG.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
} 