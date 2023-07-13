import {favoriteAuthorsArr} from './data.js'
import {carouselButtons} from './carousel.js'
import {flexCardsCollection, makeTopicsGrid, getCards} from './main_functions.js'



const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

const flexCardsCollection = document.getElementsByClassName("flex-card")

open.addEventListener("click", () => {
    const flexCardsArr = Array.from(flexCardsCollection)
    nav.classList.add("open-nav")
    carouselButtons.style.visibility = "hidden"
    flexCardsArr.forEach(card => {
        card.classList.add("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.add("disabled"))
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    carouselButtons.style.visibility = "visible"
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.classList.remove("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.remove("disabled"))
})

// Favorite Authors

const favoriteAuthors = get("favorite-authors")

makeTopicsGrid(favoriteAuthorsArr, favoriteAuthors)

// STEP 2. Access all of the cards and add event listeners

getCards(authorQuotesArr, "popular_topics.html")

// STEP 3. Fetch data for a chosen topic
// getTopicQuotes(topic, page)

// STEP 4. Render a quote-block and "Go back" "Next quote" buttons
// quoteCardHtml(topicQuotesArr, topic, page)






// function authorQuoteHtml(data) {

//     favoriteAuthors.innerHTML = `<div id="quote-block" class="quote-block">
//         <p class="quote" id="quote">"${data.content}"</p>
//         <div class="author">
//             <img src="images/palm.png">
//         <p id="author">${data.author}</p>
//         </div>
//     </div>
//     <div id="btn-block" class="btn-block">
//         <a id="back-favorite-authors" href="favorite_authors.html" class="btn">Go back</a>
//     </div>    
//     `
//     const btnBlock = get("btn-block")

//     if(authorQuotesArr.length > 1){
//         btnBlock.innerHTML += `
//         <button id="next-quote-btn" class="btn">Next quote</button>
//         `
//         getNextQuote(authorQuotesArr)
//     } 

//     favoriteAuthors.classList.remove("flex-container")
//     favoriteAuthors.classList.add("quote-card")
    
// }

let authorQuotesArr = []

function getAuthorQuotes() {
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            fetch(`https://api.quotable.io/quotes?author=${favoriteAuthorsArr[flexCardsArr.indexOf(card)]}`)
                .then(response => response.json())
                .then(data => {
                    authorQuotesArr = data.results
                    authorQuoteHtml(authorQuotesArr[0])
                })
        })
    })
}

getAuthorQuotes()