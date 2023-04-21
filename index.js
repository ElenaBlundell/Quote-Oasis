const get = element => document.getElementById(element);

const open = get("menu-btn")
const nav = get("nav")
const exit = get("exit-btn")
const searchBar = get("search-bar")
const searchContainer = get("search-container")
const carousel = get("carousel")


const searchBtn = get("search-btn")

const main = get("main")

const quoteBlock = get("quote-block")
const quoteBtn = get("get-quote-btn")
const addBtn = get("add-btn")

open.addEventListener("click", () => {
    nav.classList.add("open-nav")
    quoteBtn.style.opacity = "1"
    addBtn.style.opacity = "1"
    searchContainer.classList.add("none")
    searchBtn.style.visibility = "visible"
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

searchBtn.addEventListener("click", () => {
    // searchBtn.style.visibility = "hidden"
    searchContainer.classList.remove("none")
    
} )

const slides = document.getElementsByClassName('carousel-item');
let slidePosition = 0;
const totalSlides = slides.length;
const carouselButtons = get("carousel-buttons")
const imgQuote2 = get("img-quote-2")
const imgQuote3 = get("img-quote-3")


document.getElementById('carousel-button-next').addEventListener("click", moveToNextSlide);
document.getElementById('carousel-button-prev').addEventListener("click", moveToPrevSlide);

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
     }
 } 

function handleScreenChangeLarge(e){
     if (e.matches) {
         console.log("It's large now")
         imgQuote3.classList.add("carousel-item-visible")
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
    fetch ("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        quoteBlock.innerHTML = getQuoteHtml(data)
    })
})



