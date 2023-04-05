const get = element => document.getElementById(element);

// Popular Topics
const popularTopicsArr = ["Inspiration", "Love", "Happiness", "Success",
                       "Courage", "Confidence", "Leadership", "Change"]

const allTopics = ["Anxiety", "Change", "Choice", "Confidence", "Courage",
 "Death", "Dreams", "Excellence", "Failure", "Fairness", "Fear", "Forgiveness",
"Freedom", "Future", "Happiness", "Inspiration", "Kindness", "Leadership", "Life",
"Living", "Love", "Pain", "Past", "Success", "Time", "Today", "Truth", "Work"]


const popularTopics = get("popular-topics")

// function getPopularTopics(){
//     popularTopicsArr.forEach(topic => {
//         fetch(`https://zenquotes.io/api/quotes/keyword=${topic}`)
//             .then(response => response.json()
//             .then(data => {
//                 popularTopics.innerHTML += `
//                 <div class="flex-card">
//                 <p>${}</p>
//             </div>`
//             })
//     })
// }
function makeTopicsGrid(){
    popularTopicsArr.forEach(topic => {
        console.log(topic)
        popularTopics.innerHTML += `<div class="flex-card">
            <p>${topic}</p>
        </div>`
    })
}

makeTopicsGrid()