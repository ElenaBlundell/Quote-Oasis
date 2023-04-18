const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

const searchBar = get("search-bar")
const searchBtn = get("search-btn")
const searchContainer = get("search-container")

const carousel = get("carousel")


let flexCardsCollection = document.getElementsByClassName("flex-card")

open.addEventListener("click", () => {
    const flexCardsArr = Array.from(flexCardsCollection)
    nav.classList.add("open-nav")
    searchContainer.classList.add("none")
    searchBtn.style.visibility = "visible"
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

searchBtn.addEventListener("click", () => {
    searchBtn.style.visibility = "hidden"
    searchContainer.classList.remove("none")
    nav.classList.remove('open-nav')
    carousel.style.position = "relative"
} )

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

// All Topics
import {allTopicsArr} from './data.js'

const allTopics = get("all-topics")

function makeTopicsGrid(){
    allTopicsArr.forEach(topic => {
        allTopics.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
    })
}

function topicQuoteHtml(data){
    
    allTopics.innerHTML = `<div id="quote-block">
        <p class="quote" id="quote">"${data.q}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data.a}</p>
        </div>
    </div>
    <div class="btn-block">
        <a id="back-all-topics" href="all_topics.html" class="btn">Go back</a>
        <button id="get-topic-quote" class="btn">Get a quote</button>
    </div>    
    `
    allTopics.classList.remove("flex-container")
    allTopics.classList.add("quote-card")
    getNextQuote()
}

makeTopicsGrid()

let topicQuotesArr = []

function getTopicQuotes(){
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            fetch(`https://zenquotes.io/api/quotes/keyword=${allTopicsArr[flexCardsArr.indexOf(card)]}`)
            .then(response => response.json())
            .then(data => {
                topicQuotesArr = data
                topicQuoteHtml(topicQuotesArr[0])
            })
        })
    })
}

getTopicQuotes()

function getNextQuote(){
    const getTopicQuote = get("get-topic-quote")
    const quote = get("quote")
    const author = get("author")
    getTopicQuote.addEventListener("click", () => {
        let nextQuote = topicQuotesArr.shift()
        if (nextQuote) {
            nextQuote = topicQuotesArr.shift()
            quote.innerHTML = `"${nextQuote.q}"`
            author.innerHTML = `${nextQuote.a}`
        }else{
            getTopicQuote.disabled = true
        } 
    })
}