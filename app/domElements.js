define([], function () {

    return {

        create: function (elementData) {
            var element;
            if (elementData.hasOwnProperty("tagName")) {
                element = document.createElement(elementData.tagName);
            } else {
                element = document.createElement("div");
            }
            if (elementData.hasOwnProperty("id")) element.setAttribute("id", elementData.id);
            if (elementData.hasOwnProperty("className")) element.setAttribute("class", elementData.className);
            if (elementData.hasOwnProperty("innerText")) element.innerText = elementData.innerText;
            return element;
        }

    };

});

