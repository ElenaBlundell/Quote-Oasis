import {popularTopicsArr} from './data.js'
import {carouselButtons} from './carousel.js'
import {flexCardsCollection, makeTopicsGrid, getCards} from './main_functions.js'

const get = element => document.getElementById(element);

// Access main page elements
const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")
const popularTopics = get("popular-topics")

// NAVIGATIN MENU

open.addEventListener("click", () => {
    const flexCardsArr = Array.from(flexCardsCollection)
    nav.classList.add("open-nav")
    flexCardsArr.forEach(card => {
        card.classList.add("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.add("disabled"))
    carouselButtons.style.visibility = "hidden"
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.classList.remove("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.remove("disabled"))
    carouselButtons.style.visibility = "visible"
})


// POPULAR TOPICS

// STEP 1. Display topic cards

makeTopicsGrid(popularTopicsArr, popularTopics)

// STEP 2. Access all of the cards and add event listeners

getCards(popularTopicsArr, "popular_topics.html")

// STEP 3. Fetch data for a chosen topic
// getTopicQuotes(topic, page)

// STEP 4. Render a quote-block and "Go back" "Next quote" buttons
// quoteCardHtml(topicQuotesArr, topic, page)