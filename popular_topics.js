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