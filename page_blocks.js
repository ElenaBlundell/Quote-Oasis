const navHtml = `
        <nav id="nav">
            <button id="exit-btn" class="inner-wrapper">
                <img src="images/left-arrow.png" alt="go back icon">
                Go back
            </button>

            <ul id ="nav-list" class="nav-list">
                <li class="nav-li-item selected"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-list-item"><a class="nav-link" href="popular_topics.html">Popular topics</a></li>
                <li class="nav-list-item"><a class="nav-link" href="all_topics.html">All topics</a></li>
                <li class="nav-li-item"><a class="nav-link" href="favorite_authors.html">Favorite Authors</a></li>
            </ul>
        </nav>`

const headerHtml = `
                    <header id="header">
                        <div class="top">
                            <i id="menu-btn" class="fa-solid fa-bars fa-lg" style="color: #cbe4de;"></i>
                            <h1 id="logo" class="logo">Quote Oasis</h1>
                        </div>
                    </header>`

const carouselHtml = `
                    <div class="search-container none" id="search-container">
                    <form id="search-form">
                        <input 
                            type="search" 
                            id="search-bar" 
                            name="q" 
                            placeholder="Search for a specific topic or phrase"
                            required
                        >
                        <button type="submit" id="search-btn">Search</button>
                    </form>
                    </div>`

export {navHtml, headerHtml, carouselHtml}