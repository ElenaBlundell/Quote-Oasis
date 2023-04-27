import {baseUrl} from './data.js'

const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")


const carousel = get("carousel")
const searchIcon = get("search-icon")

const main = get("main")

const quoteBlock = get("quote-block")
const quoteBtn = get("get-quote-btn")
const addBtn = get("add-btn")

open.addEventListener("click", () => {
    nav.classList.add("open-nav")
    quoteBtn.style.opacity = "1"
    addBtn.style.opacity = "1"
    searchContainer.classList.add("none")
    searchIcon.style.visibility = "visible"
    carousel.style.position = "static"
    carouselButtons.style.visibility = "hidden"
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    quoteBtn.style.opacity = "0.5"
    addBtn.style.opacity = "0.5"
    carousel.style.position = "relative"
    carouselButtons.style.visibility = "visible"
})

searchIcon.addEventListener("click", () => {
    // searchIcon.style.visibility = "hidden"
    searchContainer.classList.remove("none")
} )

// SEARCH FIELD
const searchContainer = get("search-container")
const searchForm = get("search-form")
const searchBar = get("search-bar")
const searchBtn = get("search-btn")
let authorsList = []
let authorsSearchResult = []
let quotesList = []

getAuthorsList()

searchForm.addEventListener("submit", function(e){
    e.preventDefault()
})

searchBtn.addEventListener("click", function(){
    console.log("button's clicked!")
    authorsList.forEach(author => {
        if (author.includes(searchBar.value)){
            authorsSearchResult.push(author)
        } else {
            console.log("you are cool")
        }
        // authorsListHtml() : searchQuote()
    })
    console.log("you are cool too")
    return (authorsSearchResult.length === 0) ? authorsListHtml() : searchQuote()
})

function authorsListHtml(){
    authorsSearchResult.forEach(author => {
        console.log("authorsListHtml got triggered")
        main.innerHTML = `<p>YOU did it!</p>
        `
    })
}

function searchQuote(){
    fetch(`${baseUrl}/search/quotes?query=${searchBar.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.results.forEach(result => quotesList.push(result.content))
        })
        console.log(quotesList)
        console.log("Good Job!")
    // getQuotesListHtml()
}

// function getQuotesListHtml()

function getAuthorsList(){
    fetch(`${baseUrl}/authors?sortBy=name`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.results)
            data.results.forEach(result => authorsList.push(result.name))
            console.log(authorsList)
        })
        console.log("getAuthorsList triggered")
}

// CAROUSEL OF SLIDES

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
    fetch (`${baseUrl}/random`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        quoteBlock.innerHTML = getQuoteHtml(data)
    })
})


// RESPONSIVE DESIGN

const mediaQuerySmall = window.matchMedia("(max-width: 499px)")
const mediaQueryMedium = window.matchMedia("(min-width: 500px)")
const mediaQueryMediumL = window.matchMedia("(max-width: 749px)")
const mediaQueryLarge = window.matchMedia("(min-width: 750px)")

function handleScreenChangeSmall(e){
    if (e.matches) {
        console.log("It is small now!")
        imgQuote2.classList.remove("carousel-item-visible")
    }
}

function handleScreenChangeMedium(e){
    if (e.matches){
        console.log("Media Query Matched!")
        imgQuote2.classList.add("carousel-item-visible") 
    }
  }

 function handleScreenChangeMediumL(e){
     if (e.matches){
        console.log("it is mL now")
        imgQuote3.classList.remove("carousel-item-visible")
        carouselButtons.style.visibility = "visible"
     }
 } 

function handleScreenChangeLarge(e){
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
  
//   // Initial check
//   handleScreenChangeSmall(mediaQuerySmall)
//   handleScreenChangeMedium(mediaQueryMedium)
//   handleScreenChangeMediumL(mediaQueryMediumL)
//   handleScreenChangeLarge(mediaQueryLarge)

