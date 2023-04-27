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

// Popular Topics
import {popularTopicsArr} from './data.js'

const popularTopics = get("popular-topics")

function makeTopicsGrid(){
    popularTopicsArr.forEach(topic => {
        console.log(topic)
        popularTopics.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
    })
}

function topicQuoteHtml(data){
    
    popularTopics.innerHTML = `<div id="quote-block">
        <p class="quote" id="quote">"${data.q}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data.a}</p>
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

makeTopicsGrid()

let topicQuotesArr = []

function getTopicQuotes(){
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            fetch(`https://zenquotes.io/api/quotes/keyword=${popularTopicsArr[flexCardsArr.indexOf(card)]}`)
            .then(response => response.json())
            .then(data => {
                console.log(popularTopicsArr[flexCardsArr.indexOf(card)])
                topicQuotesArr = data
                console.log(topicQuotesArr)
                topicQuoteHtml(topicQuotesArr[0])
            })
        })
    })
}

getTopicQuotes()

function getNextQuote(){
    const getPtQuote = get("get-pt-quote")
    const quote = get("quote")
    const author = get("author")
    getPtQuote.addEventListener("click", () => {
        let nextQuote = topicQuotesArr.shift()
        if (nextQuote) {
            nextQuote = topicQuotesArr.shift()
            quote.innerHTML = `"${nextQuote.q}"`
            author.innerHTML = `${nextQuote.a}`
        }else{
            getPtQuote.disabled = true
        } 
    })
}