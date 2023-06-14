import {
    baseUrl
} from './data.js'

const get = element => document.getElementById(element);

// Access main page elements

const main = get("main")

const quoteBlock = get("quote-block")
const quoteBtn = get("get-quote-btn")
const addBtn = get("add-btn")

// HEADER

const searchIcon = get("search-icon")

searchIcon.addEventListener("click", () => {
    searchContainer.classList.remove("none")
})

// Navigation Menu
const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

open.addEventListener("click", () => {
    nav.classList.add("open-nav")
    searchContainer.classList.add("none")
    searchIcon.style.visibility = "visible"
    carousel.style.position = "static"
    carouselButtons.style.visibility = "hidden"
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    carousel.style.position = "relative"
    carouselButtons.style.visibility = "visible"
})

// SEARCH FIELD

const searchContainer = get("search-container")
const searchForm = get("search-form")
const searchBar = get("search-bar")
const searchBtn = get("search-btn")
let authorsList = []
let authorsSearchResult = []
let quotesList = []


function getAuthorsList(pageNum = 1) {
    fetch(`${baseUrl}/authors?sortBy=name&page=${pageNum}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(result => authorsList.push(result.name))
            console.log(authorsList)
            if (pageNum !== data.totalPages){
                pageNum++
                return getAuthorsList(pageNum)
            }
        })
        
    console.log("getAuthorsList triggered")
    console.log(authorsList)
}

getAuthorsList()

searchForm.addEventListener("submit", function (e) {
    e.preventDefault()
})

searchBtn.addEventListener("click", function () {
    // console.log("button's clicked!")
    authorsList.forEach(author => {
        if (author.includes(searchBar.value)) {
            authorsSearchResult.push(author)
        }
    })
    console.log(authorsList)
    return (authorsSearchResult.length === 0) ? searchQuote() : authorsListHtml()
})

function authorsListHtml() {
    authorsSearchResult.forEach(author => {
        console.log("authorsListHtml got triggered")
        main.innerHTML = `<p style="color: red">YOU did it!</p>
        `
    })
}

async function searchQuote() {
    quotesList = []
    const res = await fetch(`${baseUrl}/search/quotes?query=${searchBar.value}&limit=150`)
    const data = await res.json()
    data.results.forEach(result => quotesList.push({
        "quote": result.content,
        "author": result.author
        }))

    return (quotesList.length !== 0) 
            ? getQuotesListHtml()
            : alert(`No quotes about ${searchBar.value.toLowerCase()} were found`) 
}

const topicName = get("topic-name")

function getQuotesListHtml() {

    topicName.textContent = `Quotes about ${searchBar.value.toLowerCase()}`
    topicName.classList.remove("hidden")

    console.log(quotesList)
    console.log(quotesList[0].quote)
    // console.log(JSON.parse(JSON.stringify(quotesList[0])))

    quoteBlock.innerHTML = `<p class="quote">"${quotesList[0].quote}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p>${quotesList[0].author}</p>
        </div>
        `
}

// CAROUSEL OF SLIDES
const carousel = get("carousel")

const slides = document.getElementsByClassName('carousel-item');
let slidePosition = 0;
const totalSlides = slides.length;
const carouselButtons = get("carousel-buttons")
const imgQuote2 = get("img-quote-2")
const imgQuote3 = get("img-quote-3")

document.getElementById('carousel-button-next').addEventListener("click", moveToNextSlide);
document.getElementById('carousel-button-prev').addEventListener("click", moveToPrevSlide);

function hideAllSlides() {
    for (let slide of slides) {
        slide.classList.remove("carousel-item-visible");
        slide.classList.add("carousel-item-hidden");
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

// Random Quote for each slide

let slidesDom = document.getElementsByClassName("carousel-item")
const slidesArr = Array.from(slidesDom)

function randomSlideQuote(){
    
    console.log(slidesArr)
    slidesArr.forEach(slide => {
        fetch(`${baseUrl}/random?minLength=40&maxLength=50`)
            .then(res => res.json())
            .then(data => slide.innerHTML = getSlideQuoteHtml(data))
    })
}

randomSlideQuote()

function getSlideQuoteHtml(data){
    return `<p class="quote">"${data.content}"</p>
            <div class="author">
                <img src="images/palm.png">
                <p>${data.author}</p>
            </div>`
}

// function getAuthorImg(data){
//     let authorImgSource = ""
//     let author = data.author
//     let authorFetch = author.replace(/ /g, "%20")
//     console.log(authorFetch)
//     fetch(`https://en.wikipedia.org/w/api.php?action=query&
//                 titles=${authorFetch}&formatversion=2&prop=pageimages&format=json&pithumbsize=250`)
//             .then(response => response.json())
//             .then(img => {
//                 console.log(img.query.pages[0].thumbnail.source)
//                 authorImgSource = img.query.pages[0].thumbnail.source
//             })
//             return authorImgSource
// }



// GET A QUOTE

function getQuoteHtml(data) {
    // let authorImg = getAuthorImg(data)
    return `
            <p class="quote">"${data.content}"</p>
            <div class="author">
                <img src="images/palm.png">
            <p>${data.author}</p>
            </div>`
}

quoteBtn.addEventListener("click", () => {
    fetch(`${baseUrl}/random`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            quoteBlock.innerHTML = getQuoteHtml(data)
        })
})

// RESPONSIVE DESIGN

const mediaQuerySmall = window.matchMedia("(max-width: 499px)")
const mediaQueryMedium = window.matchMedia("(min-width: 500px)")
const mediaQueryMediumL = window.matchMedia("(max-width: 749px)")
const mediaQueryLarge = window.matchMedia("(min-width: 750px)")

function handleScreenChangeSmall(e) {
    if (e.matches) {
        console.log("It is small now!")
        imgQuote2.classList.remove("carousel-item-visible")
    }
}

function handleScreenChangeMedium(e) {
    if (e.matches) {
        // console.log("Media Query Matched!")
        imgQuote2.classList.add("carousel-item-visible")
    }
}

function handleScreenChangeMediumL(e) {
    if (e.matches) {
        // console.log("it is mL now")
        imgQuote3.classList.remove("carousel-item-visible")
        carouselButtons.style.visibility = "visible"
    }
}

function handleScreenChangeLarge(e) {
    if (e.matches) {
        // console.log("It's large now")
        imgQuote3.classList.add("carousel-item-visible")
        carouselButtons.style.visibility = "hidden"
    }
}

// Register event listener
mediaQuerySmall.addEventListener("change", handleScreenChangeSmall)
mediaQueryMedium.addEventListener("change", handleScreenChangeMedium)
mediaQueryMediumL.addEventListener("change", handleScreenChangeMediumL)
mediaQueryLarge.addEventListener("change", handleScreenChangeLarge)

// Initial check
handleScreenChangeSmall(mediaQuerySmall)
handleScreenChangeMedium(mediaQueryMedium)
handleScreenChangeMediumL(mediaQueryMediumL)
handleScreenChangeLarge(mediaQueryLarge)