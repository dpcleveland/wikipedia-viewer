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
            $.ajax({
                    type: 'GET',
                    url: wikipediaAPIURL,
                    dataType: "jsonp",
                })
                .done(function(res) {
                    console.log(res);
                })
                .fail(function(err) {
                    console.log('Error: ' + err.status);
                });
        }
        getWikipediaResults();
    };

});
