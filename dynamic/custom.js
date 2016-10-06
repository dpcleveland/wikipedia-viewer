document.addEventListener('DOMContentLoaded', function() {
    // Search form
    var searchForm = document.getElementById('exp-search');

    function cleanSearchQuery(query) {
        // Change to lowercase, get rid of non alphanumeric characters, replace spaces with + for wikipedia URL parameters
        var cleaned = query.toLowerCase().replace(/[^a-z0-9+]+/gi, '+');
        return cleaned;
    }

    searchForm.onsubmit = function(e) {
        // Prevent form default submit behavior
        // http://forum.freecodecamp.com/t/issues-with-wikipedia-api-request-solved/40926/2
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        e.preventDefault();

        // User's Search Query
        var userSearch = document.getElementsByName('search')[0].value;
        console.log('userSearch: ' + userSearch);

        var finalSearchValue = cleanSearchQuery(userSearch);

        var wikipediaAPIURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + finalSearchValue + '&namespace=0&limit=10&profile=fuzzy&utf8=1';
        console.log('wikipediaAPIURL: ' + wikipediaAPIURL);

        function getWikipediaResults(searchURL) {
            // Vanilla JavaScript AJAX call doesn't work with Wikipedia's API
            // So have to use jQuery
            $.ajax({
                type: 'GET',
                url: searchURL,
                dataType: "jsonp",
                success: function(response) {
                    updateUI(response);
                    return response;
                },
                error: function() {
                    alert('Error retrieving search results, please try again later');
                }
            });
        }

        function updateUI(data) {
            console.log(data);
        }


        getWikipediaResults(wikipediaAPIURL);
    };

});
