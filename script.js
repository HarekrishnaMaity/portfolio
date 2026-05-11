/* ================= EMAILJS INIT ================= */

(function () {

    emailjs.init("9QrxFWV8Q1pfl-yZK");

})();


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


/* ================= EMAILJS CONTACT FORM ================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact-form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            /* GET EMAIL */

            const email =
            form.querySelector('input[type="email"]').value;

            /* EMAIL VALIDATION */

            const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Wrong Email ❌ Please enter a valid email");

                return;

            }

            /* SEND EMAIL */

            emailjs.sendForm(
                "service_7v8ttbm",
                "template_5e8w01g",
                this
            )

            .then(() => {

                alert("Message sent successfully ✅");

                form.reset();

            })

            .catch((error) => {

                console.log(error);

                alert("Message failed ❌ Check EmailJS setup");

            });

        });

    }

});


/* ================= CHANGING TEXT ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {

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

        letter = currentText.slice(0, ++index);

        document.querySelector(".changing-text").textContent = letter;

        if (letter.length === currentText.length) {

            setTimeout(erase, 1500);

            return;

        }

        setTimeout(type, 100);

    }

    function erase() {

        letter = currentText.slice(0, --index);

        document.querySelector(".changing-text").textContent = letter;

        if (letter.length === 0) {

            count++;

            setTimeout(type, 200);

            return;

        }

        setTimeout(erase, 50);

    }

    type();

});
