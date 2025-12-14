// JavaScript Document

// Mobile menu functionality
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "auto";
});

// Close mobile menu when clicking on links
mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (
        !mobileMenuToggle.contains(e.target) &&
        !mobileMenu.contains(e.target)
    ) {
        mobileMenuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
}, observerOptions);

// Staggered animation for portfolio items
const portfolioObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll(".portfolio-item");
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("animate");
                    }, index * 150);
                });
            }
        });
    },
    { threshold: 0.1 },
);

// Observe all animation elements
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
        ".fade-in, .slide-in-left, .slide-in-right",
    );
    animatedElements.forEach((el) => observer.observe(el));

    const portfolioSection = document.querySelector(".portfolio-grid");
    if (portfolioSection) {
        portfolioObserver.observe(portfolioSection);
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

// **START OF MODIFIED CODE FOR GOOGLE APPS SCRIPT INTEGRATION**
document
    .querySelector(".contact-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = document.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;
        const form = e.target;
        const formUrl =
            "https://script.google.com/macros/s/AKfycbwO_g0EjNYbKh8XS4YsJbSAPXFRIm39hiFXxwoht5S21zDFTOjzhoy-xnjlwRCfB--d/exec"; // **<-- PASTE YOUR DEPLOYED WEB APP URL HERE**

        // Add loading state
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.style.background =
            "linear-gradient(135deg, #94a3b8, #64748b)";
        submitBtn.style.transform = "scale(1)"; // Reset animation

        try {
            const response = await fetch(formUrl, {
                method: "POST",
                body: new FormData(form),
            });

            if (response.ok) {
                submitBtn.textContent = "Message Sent! ✓";
                submitBtn.style.background =
                    "linear-gradient(135deg, #10b981, #059669)";

                // Show success animation
                submitBtn.style.transform = "scale(1.05)";
                setTimeout(() => {
                    submitBtn.style.transform = "scale(1)";
                }, 200);

                // Reset form and button after a delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = "";
                    form.reset();
                }, 3000);
            } else {
                throw new Error("Form submission failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            submitBtn.textContent = "Error! Please try again.";
            submitBtn.style.background =
                "linear-gradient(135deg, #ef4444, #b91c1c)";
            submitBtn.disabled = false;

            // Reset button state after a delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = "";
            }, 3000);
        }
    });
// **END OF MODIFIED CODE**

// Enhanced parallax effect for hero background
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const rate = scrolled * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add subtle hover effects to skill tags
document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
        tag.style.transform = "translateY(-2px) scale(1.05)";
    });

    tag.addEventListener("mouseleave", () => {
        tag.style.transform = "translateY(0) scale(1)";
    });
});

// Language switching functionality
function loadLanguage(lang) {
    // Update the language selector text
    const langSelector = document.getElementById("langSelector");
    if (langSelector) {
        langSelector.textContent =
            lang === "en" ? "English" : lang === "hi" ? "हिन्दी" : "मराठी";
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update the HTML lang attribute
    document.documentElement.lang = lang;

    // Save the selected language to localStorage
    localStorage.setItem("selectedLanguage", lang);
}

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
    // Get saved language or default to English
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    loadLanguage(savedLanguage);

    // Set up language dropdown click events
    document.querySelectorAll("[data-lang]").forEach((element) => {
        element.addEventListener("click", function (e) {
            e.preventDefault();
            const lang = this.getAttribute("data-lang");
            loadLanguage(lang);

            // Close mobile menu if open
            if (mobileMenu.classList.contains("active")) {
                mobileMenuToggle.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    });

    // Set up mobile language menu click events
    const mobileLangMenu = document.querySelector(".mobile-lang-menu");
    if (mobileLangMenu) {
        mobileLangMenu.querySelectorAll("a").forEach((element) => {
            element.addEventListener("click", function (e) {
                e.preventDefault();
                const lang = this.getAttribute("data-lang");
                loadLanguage(lang);
            });
        });
    }
});

// Fix for navigation link selector error
document.addEventListener("DOMContentLoaded", function () {
    // Safe smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href*="#"]');
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href.includes("#") && href !== "#") {
                const targetId = href.split("#")[1];
                if (targetId) {
                    const target = document.getElementById(targetId);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: "smooth",
                        });
                    }
                }
            }
        });
    });
});

// Fix for navigation link selector - completely safe version
document.addEventListener("DOMContentLoaded", function () {
    // Override any problematic link handlers
    const links = document.querySelectorAll("a");
    links.forEach(function (link) {
        const href = link.getAttribute("href");
        if (href && href.includes("#") && href !== "#") {
            link.addEventListener("click", function (e) {
                const targetId = href.split("#")[1];
                if (targetId && targetId.length > 0) {
                    const target = document.getElementById(targetId);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: "smooth",
                        });
                    }
                }
            });
        }
    });
});
