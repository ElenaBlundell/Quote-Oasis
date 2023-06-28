import {
    allTopicsArr,
    baseUrl
} from './data.js'

const get = element => document.getElementById(element);

// Access main page elements
const main = get("main")
const quoteBlock = get("quote-block")
const quoteBtn = get("get-quote-btn")
// const addBtn = get("add-btn")
const btnBlockHome = get("btn-block-home")


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


// Getting a list of authors that stored in data base
getAuthorsList()

// Recursive function, that querying page after page until all pages data is stored in authorsList

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
    console.log(authorsList)
}



searchForm.addEventListener("submit", function (e) {
    e.preventDefault()
})

// Step 1. Check if the search bar value is an existing author's name 

searchBtn.addEventListener("click", function () {
    // topicName?.classList.add("hidden")
    authorsSearchResult = []
    let lowerCaseAuthorsList = authorsList.map(author => author.toLowerCase())
    lowerCaseAuthorsList.forEach(author => {

        if (author.includes(searchBar.value.toLowerCase())) {
            authorsSearchResult.push(authorsList[lowerCaseAuthorsList.indexOf(author)])
        }
    })

    return (authorsSearchResult.length === 0) ? searchQuote() : authorsListHtml()
})

// Step 2.QUOTES. Store all quotes for a requested topic in an array

async function searchQuote() {
    quotesList = []
    const res = await fetch(`${baseUrl}/search/quotes?query=${searchBar.value}&limit=150`)
    const data = await res.json()
    data.results.forEach(result => quotesList.push({
        "content": result.content,
        "author": result.author
        }))

    return (quotesList.length !== 0) 
            ? getQuoteCardHtml()
            : alert(`No quotes for your request were found`) 
}

const topicName = get("topic-name")

// Step 3.QUOTES. Display a quote for a surched topic

function getQuoteCardHtml() {
    let lowerCaseTopicsArr = allTopicsArr.map(topic => topic.toLowerCase())

    quoteBlock.innerHTML = `
                        <p id="quote" class="quote">"${quotesList[0].content}"</p>
                        <div class="author">
                            <img src="images/palm.png">
                            <p id="author">${quotesList[0].author}</p>
                        </div>
        `
    btnBlockHome.innerHTML = `<a href="index.html" class="btn">Go back</a>`

    // if (lowerCaseTopicsArr.includes(searchBar.value)) {
    //         topicName.textContent = `Quotes about ${searchBar.value.toLowerCase()}`
    //         topicName.classList.remove("hidden")
    //     }

    if(quotesList.length > 1){
            btnBlockHome.innerHTML += `
            <button id="next-quote-btn" class="btn">Next quote</button>
            `
            getNextQuote(quotesList)
        } 
}

// Step 2.AUTHORS. Display a list of options for a surched author

let authorsCardsList

function authorsListHtml() {
    main.innerHTML = `<div id="authors-list" class="flex-container"></div>`
    authorsCardsList = get("authors-list")
    authorsSearchResult.forEach(author => {
        authorsCardsList.innerHTML += `<div class="flex-card">
                                            <p>${author}</p>
                                       </div>`
    })
    getAuthorQuotes()
}

// Step 3.AUTHORS. Get a quote from a chosen(clicked) author

let authorQuotesArr = []

function getAuthorQuotes() {
    let authorsCardsCollection = document.getElementsByClassName("flex-card")
    const authorsCardsArr = Array.from(authorsCardsCollection)
    authorsCardsArr.forEach(card => {
        card.addEventListener("click", () => {
            fetch(`https://api.quotable.io/quotes?author=${authorsSearchResult[authorsCardsArr.indexOf(card)]}`)
                .then(response => response.json())
                .then(data => {
                    authorQuotesArr = data.results
                    authorQuoteHtml(authorQuotesArr[0])
                })
        })
    })
}

// Step 4.AUTHORS. Display a quote from a chosen(clicked) author
function authorQuoteHtml(data) {

    authorsCardsList.innerHTML = `<div id="quote-block">
        <p class="quote" id="quote">"${data.content}"</p>
        <div class="author">
            <img src="images/palm.png">
        <p id="author">${data.author}</p>
        </div>
    </div>
    <div id="btn-block" class="btn-block">
         <a href="index.html" class="btn">Go back</a>
        
    </div>    
    `
    authorsCardsList.classList.remove("flex-container")
    authorsCardsList.classList.add("quote-card")

    if(authorQuotesArr.length > 1){
        const btnBlock = get("btn-block")
        btnBlock.innerHTML += `<button id="next-quote-btn" class="btn">Next quote</button>`
        getNextQuote(authorQuotesArr)
    } 
}

// Display next quote for a chosen author/topic after a click on a "Next quote" button

function getNextQuote(data) {
    const nextQuoteBtn = get("next-quote-btn")
    const quote = get("quote")
    const author = get("author")

    let nextQuote = data.shift()
    let nextQuoteIndex = 0
    
    nextQuoteBtn.addEventListener("click", () => {

        if (nextQuoteIndex === 0) {
            nextQuote = data.shift()
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

// CAROUSEL OF SLIDES

const carousel = get("carousel")
const slides = document.getElementsByClassName('carousel-item')
let slidePosition = 0
const totalSlides = slides.length
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


// GET A RANDOM QUOTE

quoteBtn.addEventListener("click", () => {
    fetch(`${baseUrl}/random`)
        .then(response => response.json())
        .then(data => {
            quoteBlock.innerHTML = getQuoteHtml(data)
        })
})

function getQuoteHtml(data) {
    // let authorImg = getAuthorImg(data)
    return `
            <p class="quote">"${data.content}"</p>
            <div class="author">
                <img src="images/palm.png">
            <p>${data.author}</p>
            </div>`
}

// RESPONSIVE DESIGN
const navList = get("nav-list")

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
        console.log("Media Query Matched Medium!")
        imgQuote2.classList.add("carousel-item-visible")
        
    }
}

function handleScreenChangeMediumL(e) {
    if (e.matches) {
        console.log("it is mL now")
        imgQuote3.classList.remove("carousel-item-visible")
        carouselButtons.style.visibility = "visible"
        navList.style.fontSize = "10px"
    }
}

function handleScreenChangeLarge(e) {
    if (e.matches) {
        console.log("It's large now")
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