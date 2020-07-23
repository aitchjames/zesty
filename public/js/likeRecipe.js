import React, { useState } from "react";
import axios from "axios";

function LikeRecipe() {
    // Get data from server side rendered values
    const userLoggedIn = document.body.classList.contains('logged-in');
    const userLoggedOut = document.body.classList.contains('logged-out');
    

    const likeStat = parseInt(document.querySelector(".like-count"));
    // let likeCount = likeStat.innerHTML;

    const likeContainer = document.querySelector(".button-like__container");
    let likeString = likeContainer.getAttribute('data-recipe-liked');    
    let boolValue = likeString.toLowerCase() == 'true' ? true : false; 

    const recipeId = likeContainer.getAttribute('data-recipeid');

    // React Logic
    const [liked, setLiked] = useState(boolValue)
   
    function Liked() {
        return(
            <button onClick={unlikeRequest} className="button-icon">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                <span>Liked</span>
            </button>
        )
    }
    
    function Like() {
        return(
            <button onClick={likeRequest} className="button-icon button-icon__not-liked">
                <svg className="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
                <span>Like</span>
            </button>
        )
    }

    async function likeRequest() {  
        if (userLoggedIn) {
            try {
                await axios.post(`/api/v1/recipes/${recipeId}/like`);
                setLiked(!liked)
            } catch(error) {
                console.log("There was a problem")
            } 
        }
    }

    async function unlikeRequest() {  
        if (userLoggedIn) { 
            try {
                await axios.post(`/api/v1/recipes/${recipeId}/like`);
                setLiked(!liked)
            } catch(error) {
                console.log("There was a problem")
            }   
        }
    }

    return(
        <>
            {liked ? <Liked /> : <Like />}
        </>
    )
}



export default LikeRecipe;