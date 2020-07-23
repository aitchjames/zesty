import React, { useState } from "react";
import axios from "axios";

function BookmarkRecipe() {
    // Get data from server side rendered values
    const userLoggedIn = document.body.classList.contains('logged-in');
    const userLoggedOut = document.body.classList.contains('logged-out');

    const bookmarkContainer = document.querySelector(".button-bookmark__container");
    let bookmarkString = bookmarkContainer.getAttribute('data-recipe-bookmarked');
    let boolValue = bookmarkString.toLowerCase() == 'true' ? true : false; 

    const recipeId = bookmarkContainer.getAttribute('data-recipeid');

    // React Logic
    const [bookmarked, setBookmarked] = useState(boolValue)

    function Bookmarked() {
        return(
            <button onClick={unfavRequest} className="button-icon">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bookmark-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"/>
                </svg>
                <span>Bookmarked</span>
            </button>
        )
    }

    function Bookmark() {
        return(
            <button onClick={favRequest} className="button-icon button-icon__not-liked">
                <svg className="bi bi-bookmark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z" />
                </svg>
                <span>Bookmark</span>
            </button>
        )
    }

    async function favRequest() {  
        if (userLoggedIn) {
            try {
                await axios.post(`/api/v1/recipes/${recipeId}/favourite`);
                setBookmarked(!bookmarked)
            } catch(error) {
                console.log("There was a problem")
            }  
        }
    }

    async function unfavRequest() {  
        if (userLoggedIn) {
            try {
                await axios.post(`/api/v1/recipes/${recipeId}/favourite`);
                setBookmarked(!bookmarked)
            } catch(error) {
                console.log("There was a problem")
            }        
        }
    }
   

    return(
        <>
            {bookmarked ? <Bookmarked /> : <Bookmark />}
        </>
    )
}





export default BookmarkRecipe;