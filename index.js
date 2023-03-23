const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")
const main = get("main")

let quotesArr = []

open.addEventListener('click', () => {
    nav.classList.add('open-nav')
})

exit.addEventListener('click', () => {
    nav.classList.remove('open-nav')
})

const quoteBtn = get("get-quote-btn")

function getNewQuote() {
    const nextQuote = quotesArr.shift()
    return nextQuote ? getQuoteHtml(nextQuote) : {}
}

   function getQuoteHtml(data) {
        return `
         <div id="quote-block">
            <p class="quote">"${data.q}"</p>
            <div class="author">
                <img src="images/palm.png">
            <p>${data.a}</p>
            </div>
        </div>`
    }


quoteBtn.addEventListener("click", () => {
    if (quotesArr > 0){
        main.innerHTML = getNewQuote()
    }else{
    fetch ("https://zenquotes.io/api/quotes")
      .then(response => response.json())
      .then(data => {quotesArr = data
    console.log(quotesArr)
    main.innerHTML = getNewQuote()
    })}
})

