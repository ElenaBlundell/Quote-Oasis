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

// Favorite Authors
import {favoriteAuthorsArr} from './data.js'

const favoriteAuthors = get("favorite-authors")

function makeTopicsGrid(){
    favoriteAuthorsArr.forEach(author => {
        favoriteAuthors.innerHTML += `<div class="flex-card">
            <p>${author}</p>
        </div>`
    })
}

function authorQuoteHtml(data){
    
    favoriteAuthors.innerHTML = `<div id="quote-block">
        <p class="quote" id="quote">"${data.content}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data.author}</p>
        </div>
    </div>
    <div class="btn-block">
        <a id="back-favorite-authors" href="favorite_authors.html" class="btn">Go back</a>
        <button id="get-author-quote" class="btn">Get a quote</button>
    </div>    
    `
    favoriteAuthors.classList.remove("flex-container")
    favoriteAuthors.classList.add("quote-card")
    getNextQuote()
}

makeTopicsGrid()

let authorQuotesArr = []

function getAuthorQuotes(){
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            // fetch(`https://zenquotes.io/api/quotes/keyword=${favoriteAuthorsArr[flexCardsArr.indexOf(card)]}`)
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

function getNextQuote(){
    const getAuthorQuote = get("get-author-quote")
    const quote = get("quote")
    const author = get("author")
    getAuthorQuote.addEventListener("click", () => {
        let nextQuote = authorQuotesArr.shift()
        if (nextQuote) {
            nextQuote = authorQuotesArr.shift()
            quote.innerHTML = `"${nextQuote.content}"`
            author.innerHTML = `${nextQuote.author}`
        }else{
            getAuthorQuote.disabled = true
        } 
    })
}