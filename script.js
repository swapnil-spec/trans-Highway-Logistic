"use strict";

/* =========================================================
   ELEMENTS
========================================================= */

const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navWrapper = document.querySelector(".nav-wrapper");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && navWrapper) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navWrapper.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        document.body.classList.toggle("menu-open", isOpen);

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navWrapper) {
            return;
        }

        navWrapper.classList.remove("open");

        if (menuToggle) {

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

        document.body.classList.remove("menu-open");

    });

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 40) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   ESCAPE KEY - CLOSE MOBILE MENU
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    if (
        navWrapper &&
        navWrapper.classList.contains("open")
    ) {

        navWrapper.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");

    }

});

/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".trust-item, " +
    ".section-heading, " +
    ".about-visual, " +
    ".about-content, " +
    ".services-header-text, " +
    ".service-card, " +
    ".services-cta, " +
    ".fleet-header-note, " +
    ".fleet-card, " +
    ".fleet-bottom-cta, " +
    ".goods-header-mark, " +
    ".goods-card, " +
    ".goods-cta, " +
    ".why-intro, " +
    ".why-item, " +
    ".why-trust-box, " +
    ".safety-content, " +
    ".safety-feature, " +
    ".safety-highlight, " +
    ".pan-header, " +
    ".route-stop, " +
    ".coverage-tags, " +
    ".pan-cta"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("reveal-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal-element");

        revealObserver.observe(element);

    });

}

const customerPhone =
    document.getElementById("customerPhone");

if (customerPhone) {

    customerPhone.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "").slice(0, 10);

        }
    );

}

/* =========================================================
   STEP 7
   WHATSAPP QUOTE FORM
========================================================= */

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {

    quoteForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* ================================================
           GET FORM ELEMENTS
        ================================================= */

        const customerName =
            document.getElementById("customerName");

        const customerPhone =
            document.getElementById("customerPhone");

        const pickupLocation =
            document.getElementById("pickupLocation");

        const deliveryLocation =
            document.getElementById("deliveryLocation");

        const goodsType =
            document.getElementById("goodsType");

        const vehicleType =
            document.getElementById("vehicleType");

        const cargoWeight =
            document.getElementById("cargoWeight");

        const additionalMessage =
            document.getElementById("additionalMessage");


        /* ================================================
           GET ERROR ELEMENTS
        ================================================= */

        const customerNameError =
            document.getElementById("customerNameError");

        const customerPhoneError =
            document.getElementById("customerPhoneError");

        const pickupLocationError =
            document.getElementById("pickupLocationError");

        const deliveryLocationError =
            document.getElementById("deliveryLocationError");

        const goodsTypeError =
            document.getElementById("goodsTypeError");


        /* ================================================
           CLEAR OLD ERRORS
        ================================================= */

        customerNameError.textContent = "";
        customerPhoneError.textContent = "";
        pickupLocationError.textContent = "";
        deliveryLocationError.textContent = "";
        goodsTypeError.textContent = "";


        /* ================================================
           GET VALUES
        ================================================= */

        const name =
            customerName.value.trim();

        const phone =
            customerPhone.value.trim();

        const pickup =
            pickupLocation.value.trim();

        const delivery =
            deliveryLocation.value.trim();

        const goods =
            goodsType.value.trim();

        const vehicle =
            vehicleType.value.trim();

        const weight =
            cargoWeight.value.trim();

        const message =
            additionalMessage.value.trim();


        /* ================================================
           VALIDATION
        ================================================= */

        let isValid = true;


        // Name

        if (name.length < 2) {

            customerNameError.textContent =
                "Please enter your name.";

            isValid = false;
        }


        // Indian mobile number

        const phonePattern =
            /^[6-9][0-9]{9}$/;

        if (!phonePattern.test(phone)) {

            customerPhoneError.textContent =
                "Enter a valid 10-digit mobile number.";

            isValid = false;
        }


        // Pickup

        if (pickup.length < 2) {

            pickupLocationError.textContent =
                "Please enter pickup location.";

            isValid = false;
        }


        // Delivery

        if (delivery.length < 2) {

            deliveryLocationError.textContent =
                "Please enter delivery location.";

            isValid = false;
        }


        // Goods

        if (!goods) {

            goodsTypeError.textContent =
                "Please select goods type.";

            isValid = false;
        }


        /* ================================================
           STOP IF INVALID
        ================================================= */

        if (!isValid) {

            return;

        }


        /* ================================================
           COMPANY WHATSAPP NUMBER
        ================================================= */

        const companyWhatsApp =
            "918806274917";


        /* ================================================
           CREATE WHATSAPP MESSAGE
        ================================================= */

        const whatsappMessage =

`Hello Trans Highway Logistics,

I would like to enquire about transportation services.

*Customer Details*
Name: ${name}
Mobile: ${phone}

*Shipment Details*
Pickup Location: ${pickup}
Delivery Location: ${delivery}
Goods Type: ${goods}
Vehicle Required: ${vehicle || "Not specified"}
Approximate Weight: ${weight || "Not specified"}

*Additional Requirement*
${message || "No additional requirement provided."}

Please share the available vehicle and quotation details.

Thank you.`;


        /* ================================================
           ENCODE MESSAGE
        ================================================= */

        const encodedMessage =
            encodeURIComponent(whatsappMessage);


        /* ================================================
           WHATSAPP URL
        ================================================= */

        const whatsappURL =
            `https://wa.me/${companyWhatsApp}?text=${encodedMessage}`;


        /* ================================================
           SUCCESS MESSAGE
        ================================================= */

        const quoteSuccess =
            document.getElementById("quoteSuccess");

        quoteSuccess.textContent =
            "Your enquiry is ready. Opening WhatsApp...";

        quoteSuccess.classList.add("show");


        /* ================================================
           OPEN WHATSAPP
        ================================================= */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}

/* =========================================================
   STEP 8
   FAQ ACCORDION
========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const currentItem =
            this.closest(".faq-item");

        const isCurrentlyOpen =
            currentItem.classList.contains("active");


        /* Close all FAQ items */

        document
            .querySelectorAll(".faq-item")
            .forEach(function (item) {

                item.classList.remove("active");

                item
                    .querySelector(".faq-question")
                    .setAttribute(
                        "aria-expanded",
                        "false"
                    );

            });


        /* Open clicked item */

        if (!isCurrentlyOpen) {

            currentItem.classList.add("active");

            this.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});