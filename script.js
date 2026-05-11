import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const App = () => {

    /* ================= STATES ================= */

    const [menuOpen, setMenuOpen] = useState(false);

    const [showProjects, setShowProjects] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    /* ================= TYPING EFFECT ================= */

    const texts = [
        "Web Developer",
        "Frontend Developer",
        "Web Designer",
        "Programmer"
    ];

    const [textIndex, setTextIndex] = useState(0);

    const [charIndex, setCharIndex] = useState(0);

    const [displayText, setDisplayText] = useState("");

    const [isDeleting, setIsDeleting] = useState(false);


    /* ================= EMAILJS INIT ================= */

    useEffect(() => {

        emailjs.init("9QrxFWV8Q1pfl-yZK");

    }, []);


    /* ================= TEXT ANIMATION ================= */

    useEffect(() => {

        const currentText = texts[textIndex];

        let timer;

        if (!isDeleting) {

            setDisplayText(currentText.substring(0, charIndex + 1));

            timer = setTimeout(() => {

                setCharIndex(charIndex + 1);

            }, 100);

            if (charIndex === currentText.length) {

                timer = setTimeout(() => {

                    setIsDeleting(true);

                }, 1500);
            }

        } else {

            setDisplayText(currentText.substring(0, charIndex - 1));

            timer = setTimeout(() => {

                setCharIndex(charIndex - 1);

            }, 50);

            if (charIndex === 0) {

                setIsDeleting(false);

                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        }

        return () => clearTimeout(timer);

    }, [charIndex, isDeleting, textIndex]);


    /* ================= HANDLE INPUT ================= */

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    /* ================= HANDLE FORM ================= */

    const handleSubmit = (e) => {

        e.preventDefault();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {

            alert("❌ Wrong Email! Please enter a valid email.");

            return;
        }

        emailjs.send(
            "service_7v8ttbm",
            "template_5e8w01g",
            formData
        )

        .then(() => {

            alert("✅ Message Sent Successfully!");

            setFormData({
                name: "",
                email: "",
                message: ""
            });
        })

        .catch((error) => {

            console.log(error);

            alert("❌ Failed to send message.");
        });
    };


    /* ================= JSX ================= */

    return (

        <div>

            {/* ================= NAVBAR ================= */}

            <button
                className={`menu-btn ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <nav className={`menu ${menuOpen ? "show" : ""}`}>

                <a href="#home">Home</a>

                <a href="#about">About</a>

                <a href="#projects">Projects</a>

                <a href="#contact">Contact</a>

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

                <button
                    onClick={() => setShowProjects(!showProjects)}
                >
                    View Project
                </button>

                {showProjects && (

                    <div
                        className="project-links"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            marginTop: "10px"
                        }}
                    >
                        <a href="#">📄 PDF</a>

                        <a href="#">📊 PPT</a>

                        <a href="#">🎨 Canva</a>
                    </div>
                )}

            </section>


            {/* ================= CONTACT ================= */}

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
                    ></textarea>

                    <button type="submit">
                        Send Message
                    </button>

                </form>

            </section>

        </div>
    );
};

export default App;
