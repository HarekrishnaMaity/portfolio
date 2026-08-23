/* ================= MOBILE MENU ================= */

function toggleMenu(icon) {

    const menu = document.getElementById("menu");

    menu.classList.toggle("show");

    icon.classList.toggle("active");

}


/* ================= PROJECT LINKS ================= */

function toggleLinks() {

    const links = document.getElementById("projectLinks");

    links.classList.toggle("show-links");

}


/* ================= EMAILJS ================= */

emailjs.init({
    publicKey: "9QrxFWV8Q1pfl-yZK"
});


document.addEventListener("DOMContentLoaded", function () {


    /* ================= CONTACT FORM ================= */

    const form =
        document.getElementById("contact-form");


    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const button =
                form.querySelector("button");

            const email =
                form.from_email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Wrong Email ❌ Please enter a valid email"
                );

                return;

            }


            button.disabled = true;

            button.textContent = "Sending...";


            emailjs.sendForm(

                "service_9ufumvp",

                "template_5e8w01g",

                form

            )

            .then(function () {

                alert(
                    "Message sent successfully ✅"
                );

                form.reset();

                button.disabled = false;

                button.textContent =
                    "Send Message";

            })

            .catch(function (error) {

                console.error(
                    "EMAILJS ERROR:",
                    error
                );

                alert(
                    "Message failed ❌\n\n" +
                    (error.text ||
                     error.message ||
                     "Check EmailJS setup")
                );

                button.disabled = false;

                button.textContent =
                    "Send Message";

            });

        });

    }


    /* ================= CHANGING TEXT ================= */

    const changingText =
        document.querySelector(".changing-text");


    if (changingText) {

        const texts = [

            "Web Developer",
            "Frontend Developer",
            "Web Designer",
            "Programmer"

        ];


        let textIndex = 0;

        let charIndex = 0;

        let deleting = false;


        function animateText() {

            const currentText =
                texts[textIndex];


            if (!deleting) {

                changingText.textContent =
                    currentText.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;


                if (
                    charIndex ===
                    currentText.length
                ) {

                    deleting = true;

                    setTimeout(
                        animateText,
                        1500
                    );

                    return;

                }


                setTimeout(
                    animateText,
                    100
                );

            } else {

                changingText.textContent =
                    currentText.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;


                if (charIndex === 0) {

                    deleting = false;

                    textIndex++;


                    if (
                        textIndex >=
                        texts.length
                    ) {

                        textIndex = 0;

                    }


                    setTimeout(
                        animateText,
                        300
                    );

                    return;

                }


                setTimeout(
                    animateText,
                    50
                );

            }

        }


        animateText();

    }

});
