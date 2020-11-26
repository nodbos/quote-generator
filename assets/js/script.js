console.log('Hello World!')

const quoteContent = document.getElementById('quote-content');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let errorQuantity = 0;

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContent.hidden = true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContent.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://serene-savannah-61000.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'Unknown'
        if(data.quoteAuthor === ''){
            authorText.innerText - '-Unknown';
        }else{
            authorText.innerText = `-${data.quoteAuthor}`;
        }
        // Reduce font size for long quotes
        if(data.quoteText > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner()
    } catch (error) {
        errorQuantity += 1;
        if(errorQuantity <= 10){
            getQuote();
            console.log('whoops, no quote', error);
        }else{
            alert('Whoops, too many errors. Try refreshing the page');
        }
    }
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();