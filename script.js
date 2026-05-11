import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const App = () => {

    /* ================= EMAILJS INIT ================= */

    useEffect(() => {

        emailjs.init("9QrxFWV8Q1pfl-yZK");

    }, []);


    /* ================= MOBILE MENU ================= */

    const [menuOpen, setMenuOpen] = useState(false);


    /* ================= PROJECT LINKS ================= */

    const [showLinks, setShowLinks] = useState(false);


    /* ================= FORM DATA ================= */

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });


    /* ================= CHANGING TEXT ================= */

    const texts = [
        "Web Developer",
        "Frontend Developer",
        "Web Designer",
        "Programmer"
    ];

    const [count, setCount] = useState(0);

    const [index, setIndex] = useState(0);

    const [displayText, setDisplayText] = useState("");

    const [isDeleting, setIsDeleting] = useState(false);


    /* ================= TEXT ANIMATION ================= */

    useEffect(() => {

        const currentText = texts[count];

        let timeout;

        if (!isDeleting) {

            setDisplayText(currentText.slice(0, index + 1));

            timeout = setTimeout(() => {

                setIndex(index + 1);

            }, 100);

            if (index === currentText.length) {

                timeout = setTimeout(() => {

                    setIsDeleting(true);

                }, 1500);
            }

        } else {

            setDisplayText(currentText.slice(0, index - 1));

            timeout = setTimeout(() => {

                setIndex(index - 1);

            }, 50);

            if (index === 0) {

                setIsDeleting(false);

                setCount((count + 1) % texts.length);
            }
        }

        return () => clearTimeout(timeout);

    }, [index, isDeleting, count]);


    /* ================= INPUT CHANGE ================= */

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    /* ================= FORM SUBMIT ================= */

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

            {/* ================= MOBILE MENU ================= */}

            <button
                className={`menu-btn ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <nav
                id="menu"
                className={menuOpen ? "show" : ""}
            >

                <a href="#home">Home</a>

                <a href="#about">About</a>

                <a href="#projects">Projects</a>

                <a href="#contact">Contact</a>

            </nav>


            {/* ================= HERO SECTION ================= */}

            <section id="home">

                <h1>Hello, I'm Hari</h1>

                <h2 className="changing-text">
                    {displayText}
                </h2>

            </section>


            {/* ================= PROJECT SECTION ================= */}

            <section id="projects">

                <button onClick={() => setShowLinks(!showLinks)}>
                    View Project
                </button>

                {showLinks && (

                    <div
                        id="projectLinks"
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
