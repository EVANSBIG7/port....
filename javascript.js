const mobileMenus = [
    {
        button: document.getElementById("joeMenuButton"),
        navigation: document.querySelector(".joe-nav-links"),
        openClass: "joe-show-menu"
    },
    {
        button: document.getElementById("contactMenuButton"),
        navigation: document.getElementById("contactNavLinks"),
        openClass: "contact-show-menu"
    },
    {
        button: document.getElementById("aboutMenuButton"),
        navigation: document.getElementById("aboutNavLinks"),
        openClass: "about-show-menu"
    },
    {
        button: document.getElementById("evansBlogMenu"),
        navigation: document.querySelector(".evans-blog-nav"),
        openClass: "evans-blog-mobile-open"
    }
];

mobileMenus.forEach(({ button, navigation, openClass }) => {
    if (!button || !navigation) {
        return;
    }

    const menuIcon = button.querySelector("i");
    const setMenuOpen = (isOpen) => {
        navigation.classList.toggle(openClass, isOpen);
        button.setAttribute("aria-expanded", String(isOpen));
        button.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);
        }
    };

    button.addEventListener("click", () => {
        setMenuOpen(!navigation.classList.contains(openClass));
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });
});

const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

if (contactForm && contactFormMessage) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !subject || !message) {
            contactFormMessage.textContent = "Please fill in all the fields.";
            contactFormMessage.style.color = "#d93025";
            return;
        }

        contactFormMessage.textContent =
            "Thanks! Your message has been prepared successfully.";
        contactFormMessage.style.color = "#7027e8";
        contactForm.reset();
    });
}



const aboutSkillsSection =
    document.querySelector(".about-skills");

const aboutProgressBars =
    document.querySelectorAll(".about-progress-fill");

const aboutPercentages =
    document.querySelectorAll(".about-skill-percent");


let aboutSkillsAnimated = false;


function animateAboutSkills() {

    if (aboutSkillsAnimated) {
        return;
    }

    aboutSkillsAnimated = true;


    aboutProgressBars.forEach((bar) => {

        const targetWidth =
            bar.getAttribute("data-width");

        bar.style.width = targetWidth;

    });


    aboutPercentages.forEach((percentage) => {

        const target =
            Number(percentage.getAttribute("data-percent"));

        let current = 0;

        const duration = 1800;

        const startTime = performance.now();


        function updatePercentage(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            current =
                Math.round(progress * target);

            percentage.textContent =
                current + "%";


            if (progress < 1) {

                requestAnimationFrame(
                    updatePercentage
                );

            } else {

                percentage.textContent =
                    target + "%";
            }
        }


        requestAnimationFrame(
            updatePercentage
        );

    });

}



if (aboutSkillsSection && "IntersectionObserver" in window) {
    const aboutSkillObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateAboutSkills();

                        aboutSkillObserver.disconnect();

                    }

                });

            },
            {
                threshold: 0.3
            }
        );

    aboutSkillObserver.observe(aboutSkillsSection);
}





























/* =================================
   EVANS BLOG JAVASCRIPT
================================= */


/* =================================
   BLOG ARTICLES
================================= */

const evansBlogArticles = {

    journey: {

        category: "FRONTEND JOURNEY",

        title:
            "How I Started My Journey Into Web Development",

        text:
            "My journey into web development started with curiosity. " +
            "I began by exploring how websites are created and gradually " +
            "moved into learning HTML and CSS. As I became more comfortable " +
            "with the basics, I started building real projects and learning " +
            "through practice. I'm still learning, experimenting and improving " +
            "with every project I create."

    },


    html: {

        category: "LEARNING",

        title:
            "What Learning HTML Taught Me",

        text:
            "HTML taught me that a website is more than what appears on " +
            "the screen. The structure behind a page matters. Learning " +
            "elements, headings, sections, links, images and forms helped " +
            "me understand how webpages are organised and gave me the " +
            "foundation to start building my own projects."

    },


    project: {

        category: "PROJECTS",

        title:
            "Building My First Real Website",

        text:
            "Building a real website was different from simply following " +
            "a tutorial. I had to think about layout, responsiveness, " +
            "navigation and how someone would actually use the website. " +
            "Projects like TastyBite and JerseyHub helped me turn what I " +
            "was learning into something I could actually see and use."

    },


    javascript: {

        category: "JAVASCRIPT",

        title:
            "Why I'm Learning JavaScript",

        text:
            "HTML gives a website structure and CSS controls how it looks. " +
            "JavaScript is the next step in making websites interactive. " +
            "I'm currently learning the fundamentals and using small " +
            "experiments to understand how JavaScript can respond to user " +
            "actions and make websites feel more dynamic."

    }

};


/* =================================
   MODAL
================================= */

const evansBlogModal =
    document.getElementById("evansBlogModal");

const evansBlogClose =
    document.getElementById("evansBlogClose");

const evansBlogModalCategory =
    document.getElementById("evansBlogModalCategory");

const evansBlogModalTitle =
    document.getElementById("evansBlogModalTitle");

const evansBlogModalText =
    document.getElementById("evansBlogModalText");


const evansBlogButtons =
    document.querySelectorAll(
        "[data-blog]"
    );


evansBlogButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const articleName =
            button.dataset.blog;

        const article =
            evansBlogArticles[articleName];

        if (!article) return;


        if (
            !evansBlogModal ||
            !evansBlogModalCategory ||
            !evansBlogModalTitle ||
            !evansBlogModalText
        ) {
            return;
        }

        evansBlogModalCategory.textContent =
            article.category;

        evansBlogModalTitle.textContent =
            article.title;

        evansBlogModalText.textContent =
            article.text;

        evansBlogModal.setAttribute("aria-hidden", "false");
        evansBlogModal.classList.add(
            "show"
        );

    });

});


/* =================================
   CLOSE MODAL
================================= */

if (evansBlogClose && evansBlogModal) {

    evansBlogClose.addEventListener(
        "click",
        () => {

            evansBlogModal.classList.remove(
                "show"
            );
            evansBlogModal.setAttribute("aria-hidden", "true");

        }
    );

}


if (evansBlogModal) {

    evansBlogModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                evansBlogModal
            ) {

                evansBlogModal.classList.remove(
                    "show"
                );
                evansBlogModal.setAttribute("aria-hidden", "true");

            }

        }
    );

}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && evansBlogModal?.classList.contains("show")) {
        evansBlogModal.classList.remove("show");
        evansBlogModal.setAttribute("aria-hidden", "true");
    }
});


/* =================================
   CATEGORY FILTER
================================= */

const evansBlogTags =
    document.querySelectorAll(
        ".evans-blog-tag"
    );

const evansBlogCards =
    document.querySelectorAll(
        ".evans-blog-card"
    );


evansBlogTags.forEach((tag) => {

    tag.addEventListener("click", () => {

        evansBlogTags.forEach((item) => {
            item.classList.remove("active");
        });

        tag.classList.add("active");


        const selectedCategory =
            tag.textContent
                .trim()
                .toLowerCase();


        evansBlogCards.forEach((card) => {

            const cardCategory =
                card.dataset.category;


            if (
                selectedCategory === "all"
            ) {

                card.style.display = "";

            } else if (
                selectedCategory.includes(
                    "javascript"
                ) &&
                cardCategory === "javascript"
            ) {

                card.style.display = "";

            } else if (
                selectedCategory.includes(
                    "projects"
                ) &&
                cardCategory === "projects"
            ) {

                card.style.display = "";

            } else if (
                selectedCategory.includes(
                    "learning"
                ) &&
                cardCategory === "learning"
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});
