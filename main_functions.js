
const get = element => document.getElementById(element);

function makeTopicsGrid(topicsArr, section) {
    topicsArr.forEach(topic => {
        section.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
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

    topicName.textContent = `${name} Quotes`
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



export {makeTopicsGrid, quoteCardHtml, getNextQuote}