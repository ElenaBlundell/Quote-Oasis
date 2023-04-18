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

open.addEventListener("click", () => {
    nav.classList.add("open-nav")
    quoteBtn.style.opacity = "1"
    searchContainer.classList.add("none")
    searchBtn.style.visibility = "visible"
    carousel.style.position = "static"
    carouselButtons.style.visibility = "hidden"
})

exit.addEventListener("click", () => {
    nav.classList.remove('open-nav')
    quoteBtn.style.opacity = "0.5"
    carousel.style.position = "relative"
    carouselButtons.style.visibility = "visible"
})

searchBtn.addEventListener("click", () => {
    searchBtn.style.visibility = "hidden"
    searchContainer.classList.remove("none")
    
} )

const slides = document.getElementsByClassName('carousel-item');
let slidePosition = 0;
const totalSlides = slides.length;
const carouselButtons = get("carousel-buttons")

document.getElementById('carousel-button-next').addEventListener('click', moveToNextSlide);
document.getElementById('carousel-button-prev').addEventListener('click', moveToPrevSlide);

function hideAllSlides() {
    for (let slide of slides) {
        slide.classList.remove('carousel-item-visible');
        slide.classList.add('carousel-item-hidden');
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



