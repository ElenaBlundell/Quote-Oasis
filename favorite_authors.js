import {favoriteAuthorsArr} from './data.js'
import {makeCardsGrid, getCards} from './main_functions.js'

// STEP 1. Display topic cards

makeCardsGrid(favoriteAuthorsArr)

// STEP 2. Access all of the cards and add event listeners

getCards(favoriteAuthorsArr, "favorite_authors.html", "author")

// STEP 3. Fetch data for a chosen author
// getAuthorQuotes(author, page)

// STEP 4. Render a quote-block and "Go back" "Next quote" buttons
// quoteCardHtml(authorQuotesArr, author, page)