import {baseUrl} from "./data.js"
import {carouselButtons} from './carousel.js'
import {makeTopicsGrid, quoteCardHtml, getNextQuote} from './main_functions.js'

const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")
const allTopics = get("all-topics")

const carousel = get("carousel")

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
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.classList.remove("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.remove("disabled"))
    carouselButtons.style.visibility = "visible"
})

// ALL TOPICS

import {allTopicsArr} from './data.js'

// STEP 1. Display all topics cards

makeTopicsGrid(allTopicsArr, allTopics)

const main = get("main")

let topicQuotesArr = []

function getTopicCards() {
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        let cardName = allTopicsArr[flexCardsArr.indexOf(card)]
        card.addEventListener("click", () => {

            getTopicQuotes(cardName)
        })
    })
}

function getTopicQuotes(topic){
    fetch(`${baseUrl}/quotes?tags=${topic}&limit=150`)
                .then(response => response.json())
                .then(data => {
                    topicQuotesArr = data.results
                    if( topic === "Famous Quotes") {
                        const lastIndex = topic.lastIndexOf(" ");
                        topic = topic.substring(0, lastIndex);
                    }
                    quoteCardHtml(topicQuotesArr, topic, "all_topics.html")
                })
}

getTopicCards()