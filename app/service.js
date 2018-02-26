define([], function () {

    var books = [
        {
            "author": "Carl",
            "title": "Shiny Perl",
            "year": "2014",
            "abstract": "Most of my peers hate Perl but I still enjoy doing apps with it."
        },
        {
            "author": "Carl",
            "title": "Troublesome JavaScript",
            "year": "2016",
            "abstract": "JavaScript is super cool but the tooling is making me dizzy."
        },
        {
            "author": "Carl",
            "title": "Lovely Ruby",
            "year": "2018",
            "abstract": "Ruby is pretty and enjoyable."
        },
        {
            "author": "Yuki",
            "title": "Pawsintheface",
            "year": "2015",
            "abstract": "5am... I'm starving. Give me food now."
        },
        {
            "author": "Yuki",
            "title": "For me?",
            "year": "2016",
            "abstract": "Since you open the fridge, it's definitely to give me food."
        },
        {
            "author": "Yuki",
            "title": "Mielllo",
            "year": "2018",
            "abstract": "You found me again, hi."
        },
        {
            "author": "Murky",
            "title": "Chewing chairs",
            "year": "2016",
            "abstract": "I'm hungry."
        },
        {
            "author": "Murky",
            "title": "Chewing hair",
            "year": "2017",
            "abstract": "I want to eat."
        },
        {
            "author": "Murky",
            "title": "Chewing devices",
            "year": "2018",
            "abstract": "Give me food."
        }
    ];

    function keepResult(result, selectedFacets) {
        var keep = true;
        for (var i = 0; i < selectedFacets.length; i++) {
            if (result[selectedFacets[i].facet] !== selectedFacets[i].facetValue) {
                keep = false;
                break
            }
        }
        return keep;
    }

    return {

        getAllBooks: function() {
            return books;
        },

        listFacetValues: function (facet) {
            return books.map(function (r) {
                return r[facet];
            }).filter(function (x, i, a) {
                return a.indexOf(x) === i;
            }).sort();
        },

        filterResults: function(selectedFacets) {
            var filteredResults = [];
            for (var i = 0; i < books.length; i++) {
                if (keepResult(books[i], selectedFacets)) filteredResults.push(books[i]);
            }
            return filteredResults;
        }

    };

});

