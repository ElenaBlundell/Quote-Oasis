import {popularTopicsArr} from './data.js'
import {makeCardsGrid, getCards} from './main_functions.js'

// STEP 1. Display topic cards

makeCardsGrid(popularTopicsArr)

// STEP 2. Access all of the cards and add event listeners

getCards(popularTopicsArr, "popular_topics.html")

// STEP 3. Fetch data for a chosen topic
// getTopicQuotes(topic, page)

// STEP 4. Render a quote-block and "Go back" "Next quote" buttons
// quoteCardHtml(topicQuotesArr, topic, page)