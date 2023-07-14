import {favoriteAuthorsArr} from './data.js'
import {carouselButtons} from './carousel.js'
import {flexCardsCollection, makeCardsGrid, getCards} from './main_functions.js'



const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")
const favoriteAuthors = get("favorite-authors")

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

// STEP 1. Display topic cards

makeCardsGrid(favoriteAuthorsArr, favoriteAuthors)

// STEP 2. Access all of the cards and add event listeners

getCards(favoriteAuthorsArr, "favorite_authors.html", "author")

// STEP 3. Fetch data for a chosen author
// getAuthorQuotes(author, page)

// STEP 4. Render a quote-block and "Go back" "Next quote" buttons
// quoteCardHtml(authorQuotesArr, author, page)