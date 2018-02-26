requirejs.config({
    baseUrl: "lib",
    paths: {
        app: "../app"
    }
});

requirejs(["domReady", "app/domElements", "app/service"], function (domReady, domElements, service) {

    var FACET_MAPPINGS = {
        "author": {
            "facet_title": "Authors",
            "selected_class": "author_selected"
        },
        "year": {
            "facet_title": "Years",
            "selected_class": "year_selected"
        }
    };

    domReady(function () {

        function createFacet(field, fieldTitle) {
            var fieldValues = service.listFacetValues(field);
            var facetElement = domElements.create({"tagName": "article", "className": "facet"});
            var facetTitle = domElements.create({"tagName": "h1", "innerText": fieldTitle});
            facetElement.appendChild(facetTitle);
            for (var i = 0; i < fieldValues.length; i++) {
                var facetValueElement = domElements.create({
                    "id": field + "_" + i,
                    "className": field,
                    "innerText": fieldValues[i]
                });
                facetElement.appendChild(facetValueElement);
            }
            document.getElementById("facets").appendChild(facetElement);
        }

        function loadResults(arrayOfResults) {
            document.getElementById("results").innerHTML = "";
            arrayOfResults.forEach(function (result) {
                var resultElement = domElements.create({"tagName": "article", "className": "result"});
                var titleElement = domElements.create({"tagName": "h1", "innerText": result.title});
                resultElement.appendChild(titleElement);
                var authorElement = domElements.create({
                    "className": "result_author",
                    "innerText": "Written by " + result.author + " in " + result.year
                });
                resultElement.appendChild(authorElement);
                var abstractElement = domElements.create({"tagName": "p", "innerText": result.abstract});
                resultElement.appendChild(abstractElement);
                document.getElementById("results").appendChild(resultElement);
            });
        }

        function resetClassOnFacetValues(facet) {
            var facetValuesElements = document.getElementsByClassName(facet);
            for (var i = 0; i < facetValuesElements.length; i++) {
                facetValuesElements[i].className = facet;
            }
        }

        function handleFacetClicks(facet) {
            var facetValuesElements = document.getElementsByClassName(facet);
            for (var i = 0; i < facetValuesElements.length; i++) {
                facetValuesElements[i].addEventListener("click", function (event) {
                    var selectedFacets = [];

                    // add or remove clicked facet
                    var targetId = event.target.id.split("_")[0];
                    if (event.target.className.indexOf(FACET_MAPPINGS[targetId].selected_class) === -1) {
                        resetClassOnFacetValues(facet);
                        event.target.className += " " + FACET_MAPPINGS[facet].selected_class;
                        selectedFacets.push({"facet": facet, "facetValue": event.target.innerText});
                    } else {
                        event.target.className = facet;
                    }

                    // add other selected facets
                    for (var key in FACET_MAPPINGS) {
                        if (FACET_MAPPINGS.hasOwnProperty(key) && key !== facet) {
                            var selectedFacet = document.getElementsByClassName(FACET_MAPPINGS[key].selected_class);
                            if (selectedFacet.length > 0) {
                                selectedFacets.push({"facet": key, "facetValue": selectedFacet[0].innerText});
                            }
                        }
                    }

                    loadResults(service.filterResults(selectedFacets));
                });
            }
        }

        loadResults(service.getAllBooks());
        for (var key in FACET_MAPPINGS) {
            if (FACET_MAPPINGS.hasOwnProperty(key)) {
                createFacet(key, FACET_MAPPINGS[key].facet_title);
                handleFacetClicks(key);
            }
        }

    });


});
