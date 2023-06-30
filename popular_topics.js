import {baseUrl, popularTopicsArr} from './data.js'
import {carouselButtons} from './carousel.js'

const get = element => document.getElementById(element);

// Access main page elements
const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")

const flexCardsCollection = document.getElementsByClassName("flex-card")

// NAVIGATIN MENU

open.addEventListener("click", () => {
    const flexCardsArr = Array.from(flexCardsCollection)
    nav.classList.add("open-nav")
    flexCardsArr.forEach(card => {
        card.classList.add("disabled")
    })
    let btnCollection = document.getElementsByClassName("btn")
    const btnArr = Array.from(btnCollection)
    btnArr.forEach(btn => btn.classList.add("disabled"))
    carouselButtons.style.visibility = "hidden"
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


// POPULAR TOPICS

const popularTopics = get("popular-topics")

makeTopicsGrid()

function makeTopicsGrid() {
    popularTopicsArr.forEach(topic => {
        popularTopics.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
    })
}

function topicQuoteHtml(data) {

    popularTopics.innerHTML = `<div id="quote-block" class="quote-block">
        <p class="quote" id="quote">"${data.content}"</p>
        <div class="author">
            <img src="images/palm.png">
            <p id="author">${data.author}</p>
        </div>
    </div>
    <div id="btn-block" class="btn-block">
        <a id="back-popular-topics" href="popular_topics.html" class="btn">Go back</a>
    </div>    
    `
    const btnBlock = get("btn-block")

    if(topicQuotesArr.length > 1){
        btnBlock.innerHTML += `
        <button id="next-quote-btn" class="btn">Next quote</button>
        `
        getNextQuote(topicQuotesArr)
    } 

    popularTopics.classList.remove("flex-container")
    popularTopics.classList.add("quote-card")
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
                
                // if (cardName.endsWith("al")) {
                //     cardName = cardName.substring(0, cardName.length - 2)
                // }
                topicName.textContent = `${cardName} Quotes`
                topicName.classList.remove("hidden")
        })
    })
}

getTopicQuotes()

const backPopularTopics = get("get-popular-topics")

backPopularTopics?.addEventListener("click", function () {
    topicName.classList.add("hidden")
})



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