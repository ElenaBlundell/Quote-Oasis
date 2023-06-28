import {baseUrl} from "./data.js"

const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

const searchBar = get("search-bar")
const searchIcon = get("search-icon")
const searchContainer = get("search-container")

const carousel = get("carousel")

let flexCardsCollection = document.getElementsByClassName("flex-card")

open.addEventListener("click", () => {
    const flexCardsArr = Array.from(flexCardsCollection)
    nav.classList.add("open-nav")
    searchContainer.classList.add("none")
    searchIcon.style.visibility = "visible"
    carousel.style.position = "static"
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
    carousel.style.position = "relative"
    carouselButtons.style.visibility = "visible"
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.classList.remove("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.remove("disabled"))
})

searchIcon.addEventListener("click", () => {
    searchIcon.style.visibility = "hidden"
    searchContainer.classList.remove("none")
    nav.classList.remove('open-nav')
    carousel.style.position = "relative"
})

const slides = document.getElementsByClassName('carousel-item');
let slidePosition = 0;
const totalSlides = slides.length;
const carouselButtons = get("carousel-buttons")

document.getElementById('carousel-button-next').addEventListener('click', moveToNextSlide);
document.getElementById('carousel-button-prev').addEventListener('click', moveToPrevSlide);

function hideAllSlides() {
    for (let slide of slides) {
        slide.classList.remove('carousel-item-visible');
        slide.classList.add('carousel-item-hidden');
    }
}

function moveToNextSlide() {
    hideAllSlides();

    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

    slides[slidePosition].classList.add("carousel-item-visible");
}

function moveToPrevSlide() {
    hideAllSlides();

    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }

    slides[slidePosition].classList.add("carousel-item-visible");
}

// ALL TOPICS

import {allTopicsArr} from './data.js'

const allTopics = get("all-topics")

function makeTopicsGrid() {
    allTopicsArr.forEach(topic => {
        allTopics.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
    })
}

const main = get("main")

function topicQuoteHtml(data) {
    allTopics.innerHTML = `<div id="quote-block">
        <p class="quote" id="quote">"${data.content}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data.author}</p>
        </div>
    </div>
    <div id="btn-block" class="btn-block">
        <a id="back-all-topics" href="all_topics.html" class="btn">Go back</a>
    </div>    
    `
    const btnBlock = get("btn-block")

    if(topicQuotesArr.length > 1){
        btnBlock.innerHTML += `
        <button id="next-quote-btn" class="btn">Next quote</button>
        `
        getNextQuote(topicQuotesArr)
    } 

    allTopics.classList.remove("flex-container")
    allTopics.classList.add("quote-card")
}

makeTopicsGrid()


let topicQuotesArr = []
const topicName = get("topic-name")

function getTopicQuotes() {
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        let cardName = allTopicsArr[flexCardsArr.indexOf(card)]
        card.addEventListener("click", () => {
            topicName.textContent = cardName
            topicName.classList.remove("hidden")
            fetch(`${baseUrl}/quotes?tags=${cardName}&limit=150`)
                .then(response => response.json())
                .then(data => {
                    topicQuotesArr = data.results
                    topicQuoteHtml(topicQuotesArr[0])

                })
        })
    })
}

getTopicQuotes()

function getNextQuote(data) {
    const nextQuoteBtn = get("next-quote-btn")
    const quote = get("quote")
    const author = get("author")

    let nextQuote = data.shift()
    let nextQuoteIndex = 0

    nextQuoteBtn.addEventListener("click", () => {

        if (nextQuoteIndex === 0) {
            nextQuote = topicQuotesArr.shift()
        }

        quote.innerHTML = `"${nextQuote.content}"`
        author.innerHTML = `${nextQuote.author}`

        nextQuote = data.shift()
        if (!nextQuote) {
            nextQuoteBtn.disabled = true
        }
        nextQuoteIndex++
    })
}