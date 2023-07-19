import {allTopicsArr, baseUrl} from './data.js'
import {carouselButtons} from './carousel.js'
import {quoteCardHtml, getTopicQuotes, makeCardsGrid, getCards} from './main_functions.js'

const get = element => document.getElementById(element)

// Access main page elements
const main = get("main")
const quoteBlock = get("quote-block")
const quoteBtn = get("get-quote-btn")
const alert = get("alert")
const body = get("body")
const header = get("header")
const carousel = get("carousel")

// HEADER
const searchIcon = get("search-icon")

searchIcon.addEventListener("click", () => {
    searchContainer.classList.remove("none")
})

// NAVIGATIN MENU
const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

open.addEventListener("click", () => {
    nav.classList.add("open-nav")
    searchContainer.classList.add("none")
    searchIcon.classList.add("disabled")
    carouselButtons.style.visibility = "hidden"
    quoteBtn.disabled = true
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    searchIcon.classList.remove("disabled")
    carouselButtons.style.visibility = "visible"
    quoteBtn.disabled = false
})

// SEARCH FIELD

const searchContainer = get("search-container")
const searchForm = get("search-form")
const searchBar = get("search-bar")
const searchBtn = get("search-btn")
let authorsList = []
let authorsSearchResult = []
let topicSearchResult = ""
let quotesArr = []

searchForm.addEventListener("submit", function (e) {
    e.preventDefault()
})

// SEARCH

// Getting a list of authors that stored in the data base
getAuthorsList()

// Recursive function, that querying page after page until all pages data is stored in authorsList
function getAuthorsList(pageNum = 1) {
    fetch(`${baseUrl}/authors?sortBy=name&page=${pageNum}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(result => authorsList.push(result.name))
            if (pageNum !== data.totalPages){
                pageNum++
                return getAuthorsList(pageNum)
            }
        })
}
// Step 1.1 QUOTES. Check if the search bar value is an existing topic

searchBtn.addEventListener("click", function () {

    topicSearchResult = ""

    let lowerCaseTopicsArr= allTopicsArr.map(topic => topic.toLowerCase())
    lowerCaseTopicsArr.forEach(topic => {
        if (topic.includes(searchBar.value.toLowerCase())) {
            topicSearchResult = topic
        }
    })

    return (topicSearchResult) ? getTopicQuotes(topicSearchResult, "index.html") : searchQuote()
})

// Step 1.2 QUOTES. Check if the search bar value can be found in a quote.
//      (Store all found quotes for a searched value in an array and check if it's empty or not)

async function searchQuote() {
    quotesArr = []
    const res = await fetch(`${baseUrl}/search/quotes?query=${searchBar.value}&limit=150`)
    const data = await res.json()
    data.results.forEach(result => quotesArr.push({
        "content": result.content,
        "author": result.author
        }))
    
    return (quotesArr.length !== 0) ? quoteCardHtml(quotesArr, searchBar.value, "index.html") : searchAuthor()
}

// Step 1.3 Check if the search bar value is an existing author's name

function searchAuthor(){
    authorsSearchResult = []
    let lowerCaseAuthorsList = authorsList.map(author => author.toLowerCase())
    lowerCaseAuthorsList.forEach(author => {

        if (author.includes(searchBar.value.toLowerCase())) {
            authorsSearchResult.push(authorsList[lowerCaseAuthorsList.indexOf(author)])
        }
    })
    return (authorsSearchResult.length !== 0) ? authorsListHtml() : displayAlert()
}

function displayAlert() {
    main.style.visibility = "hidden"
    alert.style.display = "inline"
    header.style.opacity = "0.3"
    carousel.style.opacity = "0.3"
    searchBtn.classList.add("disabled")
    open.classList.add("disabled")
    body.addEventListener("click", hideAlert)
}

function hideAlert() {
    searchBtn.classList.remove("disabled")
    open.classList.remove("disabled")
    main.style.visibility = "visible"
    header.style.opacity = "1"
    carousel.style.opacity = "1"
    alert.style.display = "none"
}

// Step 2.QUOTES. Get an array of quotes for a searched topic   
// getTopicQuotes(topicSearchResult, "index.html")
   
// Step 3.QUOTES. Display a quote for a surched topic
// quoteCardHtml(topicQuotesArr, topic, page)


// Step 2.AUTHORS. Display a list of options for a surched author

function authorsListHtml() {
    main.innerHTML = `<div id="authors-list" class="flex-container"></div>`
    const authorsCardsList = get("authors-list")
    makeCardsGrid(authorsSearchResult, authorsCardsList)

    // Step 3.AUTHORS.  Access all of the cards and add event listeners
    getCards(authorsSearchResult, "index.html", "author")
}

// STEP 4. Fetch data for a chosen author
// getAuthorQuotes(author, page)

// STEP 5. Render a quote-block and "Go back" "Next quote" buttons
// quoteCardHtml(authorQuotesArr, author, page)


// GET A RANDOM QUOTE

quoteBtn.addEventListener("click", () => {
    fetch(`${baseUrl}/random`)
        .then(response => response.json())
        .then(data => {
            quoteBlock.innerHTML = getQuoteHtml(data)
        })
})

function getQuoteHtml(data) {
    return `
            <p class="quote">"${data.content}"</p>
            <div class="author">
                <img src="images/palm.png">
            <p>${data.author}</p>
            </div>`
}