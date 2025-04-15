document.addEventListener('DOMContentLoaded', function() {
    const quotes = [
        {
            text: "Internet je programovatelná informace. Blockchain je programovatelný nedostatek.",
            author: "Balaji Srinivasan, podnikatel a bývalý technický ředitel společnosti Coinbase.",
            source: "https://www.brainyquote.com/quotes/balaji_srinivasan_851755"
        },
        {
            text: "Bitcoin je velmoc světa",
            author: "Donald Trump, Současný prezident Spojených států amerických",
            source: "https://www.youtube.com/watch?v=JE_l2r5uO0Q"
        },
          {
            text: "Cokoli, co si lze představit jako supply chain, může blockchain výrazně zefektivnit - nezáleží na tom, zda jde o lidi, čísla, data nebo peníze.",
             author: "Ginni Rometty, CEO IBM",
             source: "https://www.usmedicine.com/editor-in-chief/anything-that-can-conceive-of-as-a-supply-chain-blockchain-can-vastly-improve-its-efficiency/"
        },
    ];

    const quoteTextElement = document.getElementById('quote');
    const quoteAuthorElement = document.getElementById('author');
    const sourceLinkContainer = document.getElementById('source-link-container');

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    function setRandomQuote(){
        const quote = getRandomQuote();
    
        quoteTextElement.textContent = `"${quote.text}"`; 
        quoteAuthorElement.textContent = quote.author;
        displaySourceLink(quote);
    }

     function displaySourceLink(quote) {
      sourceLinkContainer.innerHTML = ''; 

        if (quote.source) {
           const linkElement = document.createElement('a');
            linkElement.href = quote.source;
            linkElement.textContent = ' Zdroj';
            linkElement.target = '_blank';
            sourceLinkContainer.appendChild(linkElement);

        }
    }

    setRandomQuote()
});