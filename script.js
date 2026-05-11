import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Portfolio() {

    /* ================= STATES ================= */

    const [menuOpen, setMenuOpen] = useState(false);

    const [linksOpen, setLinksOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const texts = [
        "Web Developer",
        "Frontend Developer",
        "Web Designer",
        "Programmer"
    ];

    const [textIndex, setTextIndex] = useState(0);

    const [displayText, setDisplayText] = useState("");

    const [isDeleting, setIsDeleting] = useState(false);

    const [charIndex, setCharIndex] = useState(0);

    /* ================= EMAILJS INIT ================= */

    useEffect(() => {

        emailjs.init("9QrxFWV8Q1pfl-yZK");

    }, []);

    /* ================= TYPING EFFECT ================= */

    useEffect(() => {

        const currentText = texts[textIndex];

        let timeout;

        if (!isDeleting) {

            setDisplayText(currentText.slice(0, charIndex + 1));

            timeout = setTimeout(() => {

                setCharIndex(charIndex + 1);

            }, 100);

            if (charIndex === currentText.length) {

                timeout = setTimeout(() => {

                    setIsDeleting(true);

                }, 1500);
            }

        } else {

            setDisplayText(currentText.slice(0, charIndex - 1));

            timeout = setTimeout(() => {

                setCharIndex(charIndex - 1);

            }, 50);

            if (charIndex === 0) {

                setIsDeleting(false);

                setTextIndex((textIndex + 1) % texts.length);
            }
        }

        return () => clearTimeout(timeout);

    }, [charIndex, isDeleting, textIndex]);

    /* ================= HANDLE INPUT ================= */

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    /* ================= HANDLE SUBMIT ================= */

    const handleSubmit = (e) => {

        e.preventDefault();

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {

            alert("Wrong Email ❌ Please enter a valid email");

            return;
        }

        emailjs.send(
            "service_7v8ttbm",
            "template_5e8w01g",
            formData
        )

        .then(() => {

            alert("Message sent successfully ✅");

            setFormData({
                name: "",
                email: "",
                message: ""
            });

        })

        .catch((error) => {

            console.log(error);

            alert("Message failed ❌ Check EmailJS setup");

        });
    };

    return (

        <div>

            {/* ================= NAVBAR ================= */}

            <nav className="navbar">

                <div
                    className={`menu-icon ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </div>

                <ul className={`menu ${menuOpen ? "show" : ""}`}>

                    <li><a href="#home">Home</a></li>

                    <li><a href="#projects">Projects</a></li>

                    <li><a href="#contact">Contact</a></li>

                </ul>

            </nav>

            {/* ================= HERO ================= */}

            <section id="home">

                <h1>Hello, I'm Hari</h1>

                <h2 className="changing-text">
                    {displayText}
                </h2>

            </section>

            {/* ================= PROJECT SECTION ================= */}

            <section id="projects">

                <h2>My Projects</h2>

                <button
                    onClick={() => setLinksOpen(!linksOpen)}
                >
                    View Project
                </button>

                {linksOpen && (

                    <div className="project-links">

                        <a href="#">PPT</a>

                        <a href="#">PDF</a>

                        <a href="#">Canvas</a>

                    </div>

                )}

            </section>

            {/* ================= CONTACT FORM ================= */}

            <section id="contact">

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Send Message
                    </button>

                </form>

            </section>

        </div>
    );
}
