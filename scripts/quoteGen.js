// Random Quote Generator

var colors = ['#16a085', '#27ae60', '#2c5e60', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', 'deeppink', "#1278A8", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '', currentAuthor = '';

$(document).ready(function() {
   /* $('body').scrollspy({target: "#side-nav", offset: 50}); */
   getQuote();
   $('#newQuote').on('click', getQuote);
   $('#tweetQuote').on('click', function() {
       if(!inIframe()) {
           openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
       }
   });
});

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function inIframe () {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
}

function getQuote() {
    $.ajax({
        headers: {"X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V", Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded"},
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: function(response) {
            var quoteObj = JSON.parse(response);
            currentQuote = quoteObj.quote;
            currentAuthor = quoteObj.author;
            if(inIframe()) {
                $('#tweetQuote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
            }
            $('.quoteText').animate({opacity: 0}, 500, function() {
                $(this).animate({opacity: 1}, 500);
                $('#quote').text(quoteObj.quote);
            });
            $('.quoteAuthor').animate({opacity: 0}, 500, function() {
                $(this).animate({opacity: 1}, 500);
                $('#author').text(quoteObj.author);
            });
            var rand = Math.floor(Math.random() * colors.length);
            $('.quoteBox').css("color", colors[rand]);
            $('#newQuote').css("background-color", colors[rand]);

            console.log(currentQuote);
            console.log(rand);
            console.log(colors[rand]);
        }
    });
}
