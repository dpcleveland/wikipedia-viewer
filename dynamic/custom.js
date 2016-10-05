document.addEventListener('DOMContentLoaded', function() {
    // Search form
    var searchForm = document.getElementById('exp-search');

    searchForm.onsubmit = function(e) {
        // Prevent form default submit behavior
        // http://forum.freecodecamp.com/t/issues-with-wikipedia-api-request-solved/40926/2
        e.preventDefault();

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
                success: function(response) {
                    console.log(response);
                },
                error: function() {
                    alert('Error retrieving search results, please try again later');
                }
            });
        }
        getWikipediaResults();
    };

});
