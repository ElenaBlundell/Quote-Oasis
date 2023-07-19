import {baseUrl} from './data.js'

const get = element => document.getElementById(element);

// Display topics/authors cards

function makeCardsGrid(arr) {
    const contentSection = get("content-section")
    arr.forEach(itemName => {
        contentSection.innerHTML += `<div class="flex-card">
            <p>${itemName}</p>
        </div>`
    })
}

// Access all of the cards and add event listeners

const flexCardsCollection = document.getElementsByClassName("flex-card")

function getCards(arr, page, author) {
    const flexCardsArr = Array.from(flexCardsCollection)
    flexCardsArr.forEach(card => {
        let cardName = arr[flexCardsArr.indexOf(card)]
        card.addEventListener("click", () => {
            (author) ? getAuthorQuotes(cardName, page) : getTopicQuotes(cardName, page)
        })
    })
}

// Fetch data for a chosen topic

function getTopicQuotes(topic, page){
    let topicQuotesArr = []
    fetch(`${baseUrl}/quotes?tags=${topic}&limit=150`)
                .then(response => response.json())
                .then(data => {
                    topicQuotesArr = data.results
                    if( topic === "Famous Quotes") {
                        const lastIndex = topic.lastIndexOf(" ");
                        topic = topic.substring(0, lastIndex);
                    }
                    quoteCardHtml(topicQuotesArr, topic, page)
                })
}

// Display a quote for a chosen topic/author

function quoteCardHtml(data, name, page) {

    main.innerHTML = `<h2 id="topic-name" class="hidden"></h2>`
    
    if(!get("quote-block")){
        main.innerHTML +=
                             `<div id="quote-block" class="quote-block"></div>
                              <div id="btn-block" class="btn-block"></div>`
    }
    
    const topicName = get("topic-name")
    const quoteBlock = get("quote-block")

    topicName.textContent = `${name.toUpperCase()} QUOTES`
    topicName.classList.remove("hidden")

    quoteBlock.innerHTML = `
            <p class="quote" id="quote">"${data[0].content}"</p>
            <div class="author">
                <img src="images/palm.png">
            <p id="author">${data[0].author}</p>
            </div>
    `
    
    const btnBlock = get("btn-block")
    btnBlock.innerHTML = `<a href=${page} class="btn">Go back</a>`

    if(data.length > 1){
            btnBlock.innerHTML += `
            <button id="next-quote-btn" class="btn">Next quote</button>
            `
            getNextQuote(data)
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

// Fetch data for a chosen author

function getAuthorQuotes(author, page) {
    let authorQuotesArr = []
            fetch(`https://api.quotable.io/quotes?author=${author}`)
                .then(response => response.json())
                .then(data => {
                    authorQuotesArr = data.results
                    quoteCardHtml(authorQuotesArr, author, page)
                })
}

export {makeCardsGrid, getTopicQuotes, quoteCardHtml, getNextQuote, flexCardsCollection, getCards}