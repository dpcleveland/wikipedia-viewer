document.addEventListener('DOMContentLoaded', function() {
    // Search form
    var searchForm = document.getElementById('exp-search');

    searchForm.onsubmit = function() {
        // User's Search Query
        var userSearch = document.getElementsByName('search')[0].value;
        console.log('userSearch: ' + userSearch);

        // Convert the search to lowercase
        var lowered = userSearch.toLowerCase();

        // Replace all non alphanumeric values
        var cleaned = lowered.replace(/[^a-z0-9+]+/gi, '+');
        console.log('cleaned: ' + cleaned);

        var finalSearchValue = cleaned;
        console.log('finalSearchValue: ' + finalSearchValue);

        var wikipediaAPIURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + finalSearchValue + '&namespace=0&limit=10&profile=fuzzy&utf8=1';
        console.log('wikipediaAPIURL: ' + wikipediaAPIURL);

        function getWikipediaResults() {
            var request = new XMLHttpRequest();
            request.open('GET', wikipediaAPIURL, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    console.log('JSON request success');
                    var data = JSON.parse(request.responseText);
                } else {
                    console.log('We reached our target server, but it returned an error');

                }
            };

            request.onerror = function() {
                console.log('There was a connection error of some sort');
                alert('Please try again later');
            };

            request.send();
        }
        getWikipediaResults();
    };

});
