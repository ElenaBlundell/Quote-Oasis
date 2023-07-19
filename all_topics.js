import {allTopicsArr} from './data.js'
import {makeCardsGrid, getCards} from './main_functions.js'

// STEP 1. Display all topics cards

makeCardsGrid(allTopicsArr)

// STEP 2. Access all of the cards and add event listeners

getCards(allTopicsArr, "all_topics.html")

// STEP 3. Fetch data for a chosen topic
// getTopicQuotes(topic, page)

// STEP 4. Render a quote-block and "Go back" "Next quote" buttons
// quoteCardHtml(topicQuotesArr, topic, page)