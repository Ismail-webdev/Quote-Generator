// get Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// Get Quote from Api
async function getQuote() {
    // stop quote, show loading
    loading();
    const apiUrl = "https://api.quotable.io/random";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // ternary Operator for Quote Text
        data.content.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
        quoteText.innerText = data.content;
        // if author is blank, add Unknown
        data.author === '' ? authorText.innerText = "Unknown" : authorText.innerText = data.author;
        // stop loader, show quote
        complete();
    } catch (error) {
        // getQuote();
        console.log("error", error);
    }
}
// Tweet Quotes
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

async function getBackground() {
    const accesskey = "vHPvmAftdUgg6IKFP55ZtDV0DWOCDibFJ6OYPTAXA6I";
    const baseUrl = `https://api.unsplash.com/photos/random?client_id=${accesskey}`;
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        //console.log(data);
        if (response.ok) {
            document.body.style.backgroundImage = `url(${data.urls.regular})`;
        }
    } catch (error) {
        console.error('Error fetching image:', error.message);
    }
}
// event listeners
newQuoteButton.addEventListener('click', getQuote, getBackground);
newQuoteButton.addEventListener('click', getBackground);
twitterButton.addEventListener('click', tweetQuote);

//Load
getQuote();
getBackground();