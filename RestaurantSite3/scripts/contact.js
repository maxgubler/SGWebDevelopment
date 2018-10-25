/*
Creator: Max Gubler
Date Created: October 25, 2018
Last Modified:
*/

/*
This script extends upon HTML5 validation with the use of JavaScript.
It checks if data is provided and valid. A fallback is provided if the browser does not support the use of reportValidity().
When clicked, a message will appear above the submit button after all data is provided.
Nothing will be submitted with the use of preventDefault().
*/

/* Display or remove validity results message */
function results(valid) {
    if (valid === true) {
        document.getElementById("results").innerText = "Your provided information is validated";
        document.getElementById("results").style.display = "block";

        return true;
    }
    else {
        document.getElementById("results").innerText = "";
        document.getElementById("results").style.display = "none";

        return false;
    }
}

/* Extend upon HTML5 validation with JavaScript */
function validate(target) {
    var form = document.forms["contactForm"];

    /*  Check if either name input is entirely a number */
    if (target === form["firstName"] || target === form["lastName"]) {
        if (isNaN(target.value) == false) {
            target.setCustomValidity("This field must not be a number");

            return false;
        }
        else {
            target.setCustomValidity("");

            return true;
        }
    }

    /* Check if data is provided and valid and display or remove results message */
    else if (target === form["btnSubmit"]) {
        /* Fallback for browsers that do not support reportValidity such as IE11 */
        if (!HTMLFormElement.prototype.hasOwnProperty('reportValidity')) {
            if (form["firstName"] !== "" && form["lastName"] !== "" && form["email"] !== "" && form["phone"] !== "" && form["info"] !== "") {
                document.getElementById("results").innerText = "Data has been provided";
                document.getElementById("results").style.display = "block";
            }
            else {
                document.getElementById("results").innerText = "Please fill in all form fields";
                document.getElementById("results").style.display = "block";
            }
        }
        /* Simple validation using reportValidity for modern browsers */
        else if (form.reportValidity()) {
            results(true);
        }
        else {
            results(false);
        }
    }

    else {
        return true;
    }
}

/* Initialization function called onload in contact.html */
function initialize() {
    var form = document.forms["contactForm"];

    /* Reset form and results */
    form.reset();
    results(false);

    /* On submit: Prevent submission and then validate form */
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        validate(form["btnSubmit"]);
    });

    /* Validate the input value after losing focus */
    form.addEventListener("blur", function(e) {
        validate(e.target);
    }, true);
}