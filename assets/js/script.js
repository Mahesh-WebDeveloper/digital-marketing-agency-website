'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
     header.style.backgroundColor = "white";
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});







// our custom js for typing effect 

var wordsToType = document.querySelector("span[words]").getAttribute("words").split(','),
typer = document.querySelector("span[words]"),
typingSpeed = parseInt(typer.getAttribute('typing-speed')) || 70,
typingDelay = parseInt(typer.getAttribute('typing-delay')) || 700,
    eraseDelay = 1500; // Delay before erasing

    var currentWordIndex = 0, currentCharacterIndex = 0;

    function type() {
      var wordToType = wordsToType[currentWordIndex % wordsToType.length];

      if (currentCharacterIndex < wordToType.length) {
        typer.innerHTML += wordToType[currentCharacterIndex++];
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(erase, eraseDelay);
      }
    }

    function erase() {
      var wordToType = wordsToType[currentWordIndex % wordsToType.length];

      if (currentCharacterIndex > 0) {
        typer.innerHTML = wordToType.substr(0, --currentCharacterIndex);
        setTimeout(erase, typingSpeed);
      } else {
        currentWordIndex++;
        setTimeout(type, typingDelay);
      }
    }

    window.onload = function() {
      setTimeout(type, typingDelay);
    }



// Darktext animation effect typing



    const elts = {
      text1: document.getElementById("text1"),
      text2: document.getElementById("text2")
    };

    const texts = [
      "Innovative Digital Solutions",
      "Custom Web Development Services",
      "SEO & Digital Marketing Expertise",
      "Tailored Online Marketing Strategies",
      "Market Research & Analytics",
      "Effective Social Media Management",
      "End-to-End E-Commerce Solutions",
      "Creative Design & Branding",
      "Email Marketing Campaigns",




      ];

    const morphTime = 1;
    const cooldownTime = 0.95;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }

    function setMorph(fraction) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;

      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";

      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
    }

    function animate() {
      requestAnimationFrame(animate);

      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();


        // project tab start

const tabsBox = document.querySelector(".tabs-box"),
allTabs = tabsBox.querySelectorAll(".tab"),
projectContents = document.querySelectorAll(".project-content");

let isDragging = false;

allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Remove active class from current tab
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");

        // Get the corresponding project ID for the clicked tab
        let projectId = tab.getAttribute("data-project");

        // Fade out current active content
        let currentContent = document.querySelector(".project-content.active");
        currentContent.style.opacity = 0; // Start fading out

        setTimeout(() => {
            currentContent.classList.remove("active"); // Hide it after fade-out

            // Show and fade in the new content
            let newContent = document.getElementById(projectId);
            newContent.classList.add("active");

            // Delay fade-in to ensure smooth transition
            setTimeout(() => {
                newContent.style.opacity = 1; // Fade-in new content
            }, 30); // Small delay for better transition effect
        }, 300); // Wait for fade-out to finish before showing new content
    });
});

// Dragging logic (no changes)
const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
};

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
};

tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);




// lottie player js image show 







document.addEventListener("DOMContentLoaded", function() {
    const lottiePlayer = document.querySelector('.lottie-player');
    const fallbackImage = document.querySelector('.fallback-image');

    // Set a timeout for 5 seconds to switch to the fallback image if Lottie fails to load
    const lottieTimeout = setTimeout(() => {
      lottiePlayer.style.display = 'none';  // Hide Lottie player
      fallbackImage.style.display = 'block';  // Show the fallback image
    }, 5000);  // 5 seconds delay

    // Check if the lottie player is ready or has loaded completely
    lottiePlayer.addEventListener('ready', () => {
      clearTimeout(lottieTimeout); // Clear the timeout since Lottie has loaded successfully
    });

    lottiePlayer.addEventListener('error', () => {
      lottiePlayer.style.display = 'none';  // Hide Lottie player if an error occurs
      fallbackImage.style.display = 'block';  // Show the fallback image
    });
  });



// counter function


  document.addEventListener('DOMContentLoaded', function () {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the value, the faster the counter

        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animate, 20);
                } else {
                    counter.innerText = target + (counter.getAttribute('data-target') === "10" ? "+" : "+");
                }
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animate();
                        observer.unobserve(counter);  // Stop observing once the animation is done
                    }
                });
            }, { threshold: 0.5 });  // Adjust this threshold for better control of when the animation starts

            observer.observe(counter);
        });
    });


// infanine review card slider


     window.addEventListener('load', function() {
    const track = document.querySelector('.slide-track');
    const slides = Array.from(track.children);
    
    // Clone the slides to make an infinite loop
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    slider.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });