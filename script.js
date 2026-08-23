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

emailjs.init({
    publicKey: "9QrxFWV8Q1pfl-yZK"
});


/* ================= PAGE LOADED ================= */

document.addEventListener("DOMContentLoaded", function () {


    /* ================= CONTACT FORM ================= */

    const form = document.getElementById("contact-form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const button = form.querySelector("button");

            const name = form.from_name.value.trim();
            const email = form.from_email.value.trim();
            const message = form.message.value.trim();


            /* EMPTY FIELD CHECK */

            if (!name || !email || !message) {

                alert("Please fill all fields ❌");

                return;

            }


            /* EMAIL CHECK */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Wrong Email ❌ Please enter a valid email");

                return;

            }


            /* SENDING */

            button.disabled = true;
            button.textContent = "Sending...";


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
                    "EmailJS Error: " +
                    (error.text || error.message || "Unknown error")
                );

                button.disabled = false;
                button.textContent = "Send Message";

            });

        });

    }
    /* ================= CHANGING TEXT ================= */

document.addEventListener("DOMContentLoaded", function () {

    const changingText = document.querySelector(".changing-text");

    if (!changingText) {
        console.log("Changing text element not found");
        return;
    }

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

        const currentText = texts[textIndex];

        if (!deleting) {

            // Add letters
            changingText.textContent =
                currentText.substring(0, charIndex + 1);

            charIndex++;

            // Full word typed
            if (charIndex === currentText.length) {

                deleting = true;

                setTimeout(animateText, 1500);

                return;
            }

            setTimeout(animateText, 100);

        } else {

            // Remove letters
            changingText.textContent =
                currentText.substring(0, charIndex - 1);

            charIndex--;

            // Word completely removed
            if (charIndex === 0) {

                deleting = false;

                textIndex++;

                if (textIndex >= texts.length) {
                    textIndex = 0;
                }

                setTimeout(animateText, 300);

                return;
            }

            setTimeout(animateText, 50);
        }
    }

    animateText();

});


   
