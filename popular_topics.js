import {baseUrl} from './data.js'

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

// Popular Topics
import {popularTopicsArr} from './data.js'

const popularTopics = get("popular-topics")

makeTopicsGrid()

function makeTopicsGrid() {
    popularTopicsArr.forEach(topic => {
        // console.log(topic)
        popularTopics.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
    })
}

function topicQuoteHtml(data) {

    popularTopics.innerHTML = `<div id="quote-block">
        <p class="quote" id="quote">"${data.content}"</p>
        <div class="author">
            <img src="images/palm.png">
            <p id="author">${data.author}</p>
        </div>
    </div>
    <div class="btn-block">
        <a id="back-popular-topics" href="popular_topics.html" class="btn">Go back</a>
        <button id="get-pt-quote" class="btn">Get a quote</button>
    </div>    
    `
    popularTopics.classList.remove("flex-container")
    popularTopics.classList.add("quote-card")
    getNextQuote()
}



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
                    topicQuoteHtml(topicQuotesArr[0])
                })
                
                if (cardName.endsWith("al")) {
                    cardName = cardName.substring(0, cardName.length - 2)
                }
                topicName.textContent += cardName.toLowerCase()
                topicName.classList.remove("hidden")
        })
    })
}

getTopicQuotes()

const backPopularTopics = get("get-popular-topics")

backPopularTopics?.addEventListener("click", function () {
    topicName.classList.add("hidden")
})



function getNextQuote() {
    const getPtQuote = get("get-pt-quote")
    const quote = get("quote")
    const author = get("author")

    let nextQuote = topicQuotesArr.shift()
    let nextQuoteIndex = 0

    getPtQuote.addEventListener("click", () => {
        
        if (nextQuoteIndex === 0) {
            nextQuote = topicQuotesArr.shift()
        }

        quote.innerHTML = `"${nextQuote.content}"`
        author.innerHTML = `${nextQuote.author}`

        nextQuote = topicQuotesArr.shift()
        if (!nextQuote) {
            getPtQuote.disabled = true
        }
        nextQuoteIndex++
    })

    
}