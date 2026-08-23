/* ================= MOBILE MENU ================= */

function toggleMenu(icon) {
    const menu = document.getElementById("menu");

    menu.classList.toggle("show");
    icon.classList.toggle("active");
}


/* ================= PROJECT LINKS ================= */

function toggleLinks() {
    const links = document.getElementById("projectLinks");

    if (links.style.display === "flex") {
        links.style.display = "none";
    } else {
        links.style.display = "flex";
    }
}


/* ================= EMAILJS ================= */

(function () {

    emailjs.init({
        publicKey: "9QrxFWV8Q1pfl-yZK"
    });

})();


/* ================= PAGE LOADED ================= */

document.addEventListener("DOMContentLoaded", function () {


    /* ================= CONTACT FORM ================= */

    const form = document.getElementById("contact-form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = form.from_name.value.trim();
            const email = form.from_email.value.trim();
            const message = form.message.value.trim();


            /* CHECK EMPTY FIELDS */

            if (!name || !email || !message) {

                alert("Please fill all fields ❌");

                return;
            }


            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Wrong Email ❌ Please enter a valid email");

                return;
            }


            /* BUTTON */

            const button = form.querySelector("button");

            button.disabled = true;
            button.textContent = "Sending...";


            /* SEND EMAIL */

            emailjs.sendForm(
                "service_9ufumvp",
                "template_5e8w01g",
                form
            )

            .then(function (response) {

                console.log("SUCCESS:", response);

                alert("Message sent successfully ✅");

                form.reset();

                button.disabled = false;
                button.textContent = "Send Message";

            })

            .catch(function (error) {

                console.error("EMAILJS ERROR:", error);

                alert(
                    "Message failed ❌\n\n" +
                    "Error: " +
                    (error.text || error.message || "Unknown error")
                );

                button.disabled = false;
                button.textContent = "Send Message";

            });

        });

    }


    /* ================= CHANGING TEXT ANIMATION ================= */

    const changingText =
        document.querySelector(".changing-text");

    if (changingText) {

        const texts = [
            "Web Developer",
            "Frontend Developer",
            "Web Designer",
            "Programmer"
        ];

        let count = 0;
        let index = 0;
        let currentText = "";
        let letter = "";


        function type() {

            if (count === texts.length) {
                count = 0;
            }

            currentText = texts[count];

            letter =
                currentText.slice(0, ++index);

            changingText.textContent = letter;


            if (letter.length === currentText.length) {

                setTimeout(erase, 1500);

                return;
            }

            setTimeout(type, 100);

        }


        function erase() {

            letter =
                currentText.slice(0, --index);

            changingText.textContent = letter;


            if (letter.length === 0) {

                count++;

                setTimeout(type, 200);

                return;
            }

            setTimeout(erase, 50);

        }


        type();

    }

});
