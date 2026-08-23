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
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const email = form.current.from_email.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Wrong Email ❌ Please enter a valid email");
      return;
    }

    emailjs
      .sendForm(
        "service_9ufumvp",
        "template_5e8w01g",
        form.current,
        "9QrxFWV8Q1pfl-yZK"
      )
      .then(() => {
        alert("Message sent successfully ✅");
        form.current.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Message failed ❌ Check EmailJS setup");
      });
  };

  return (
    <div>
      <form
        className="contact-form"
        id="contact-form"
        ref={form}
        onSubmit={sendEmail}
      >
        <h3>Send Message</h3>

        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          rows="8"
          placeholder="Your Message"
          required
        ></textarea>

        <button type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;

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
