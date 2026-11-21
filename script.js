
/* ================= MOBILE MENU ================= */

function toggleMenu(icon) {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("show");
    }

    if (icon) {
        icon.classList.toggle("active");
    }
}


/* ================= PROJECT LINKS ================= */

function toggleLinks() {
    const links = document.getElementById("projectLinks");

    if (links) {
        links.classList.toggle("show-links");
    }
}


/* ================= EMAILJS ================= */

// Make sure the EmailJS browser SDK is loaded in your HTML
// before this script runs.


document.addEventListener("DOMContentLoaded", function () {

    // EMAILJS INITIALIZATION
    emailjs.init({
        publicKey: "2m61CqK4rkPPJYC9M"
    });

    // CONTACT FORM
    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = form.querySelector('button[type="submit"]');
        const emailInput = form.elements.namedItem("from_email");

        const email = emailInput ? emailInput.value.trim() : "";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // EMAIL VALIDATION
        if (!emailPattern.test(email)) {
            alert("Wrong Email ❌ Please enter a valid email.");
            return;
        }

        // CHECK EMAILJS
        if (!window.emailjs) {
            alert("EmailJS failed to load. Check your HTML script.");
            return;
        }

        // LOADING
        if (button) {
            button.disabled = true;
            button.textContent = "Sending...";
        }

        // SEND EMAIL
        emailjs.sendForm(
            "service_9ufumvp",
            "template_5e8w01g",
            form
        )

        .then(function (response) {

            console.log("SUCCESS:", response);

            alert("Message sent successfully ✅");

            form.reset();

        })

        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

            alert(
                "Message failed ❌\n" +
                (error.text || error.message || "Check EmailJS setup")
            );

        })

        .finally(function () {

            if (button) {
                button.disabled = false;
                button.textContent = "Send Message";
            }

        });

    });

});


    /* ================= CHANGING TEXT ================= */

    const changingText = document.querySelector(".changing-text");

    if (changingText) {
        const texts = [
            "Web Developer",
            "Frontend Developer",
            "Web Designer",
            "Programmer",
            "Data Analyst"
        ];

        let textIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function animateText() {
            const currentText = texts[textIndex];

            if (!deleting) {
                charIndex++;
                changingText.textContent = currentText.substring(0, charIndex);

                if (charIndex >= currentText.length) {
                    deleting = true;
                    setTimeout(animateText, 1500);
                    return;
                }

                setTimeout(animateText, 100);
            } else {
                charIndex--;
                changingText.textContent = currentText.substring(0, charIndex);

                if (charIndex <= 0) {
                    deleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(animateText, 300);
                    return;
                }

                setTimeout(animateText, 50);
            }
        }

        animateText();
    }


    /* ================= DATA ANALYTICS FILTERS ================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach(function (card) {
                const category = card.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    category === selectedFilter;

                card.classList.toggle("hidden", !shouldShow);
            });
        });
    });

});
