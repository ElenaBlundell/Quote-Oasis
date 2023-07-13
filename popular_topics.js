import {baseUrl, popularTopicsArr} from './data.js'
import {carouselButtons} from './carousel.js'
import {makeTopicsGrid, quoteCardHtml, getNextQuote} from './main_functions.js'

const get = element => document.getElementById(element);

// Access main page elements
const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")
const popularTopics = get("popular-topics")

const flexCardsCollection = document.getElementsByClassName("flex-card")

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

let topicQuotesArr = []
const topicName = get("topic-name")

function getTopicQuotes() {
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            let cardName = popularTopicsArr[flexCardsArr.indexOf(card)]

            fetch(`${baseUrl}/quotes?tags=${cardName}&limit=150`)
                .then(response => response.json())
                .then(data => {
                    topicQuotesArr = data.results
                    quoteCardHtml(topicQuotesArr, cardName, "popular_topics.html")
                })
        })
    })
}

getTopicQuotes()

// STEP 3. Render a quote-block and "Go back" "Next quote" buttons

// function topicQuoteHtml(data) {



// const backPopularTopics = get("get-popular-topics")

// backPopularTopics?.addEventListener("click", function () {
//     topicName.classList.add("hidden")
// })