// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor - only on desktop
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  // Check if it's not a mobile device
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"

      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })

    document.addEventListener("mousedown", () => {
      cursor.style.width = "8px"
      cursor.style.height = "8px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })

    document.addEventListener("mouseup", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
    })

    // Add hover effect to links and buttons
    const links = document.querySelectorAll("a, button, .project-card, .faq-question")

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.width = "0"
        cursor.style.height = "0"
        cursorFollower.style.width = "50px"
        cursorFollower.style.height = "50px"
        cursorFollower.style.borderColor = "var(--primary-color)"
        cursorFollower.style.backgroundColor = "rgba(110, 87, 255, 0.1)"
      })

      link.addEventListener("mouseleave", () => {
        cursor.style.width = "10px"
        cursor.style.height = "10px"
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
        cursorFollower.style.borderColor = "var(--primary-color)"
        cursorFollower.style.backgroundColor = "transparent"
      })
    })
  } else {
    // Hide cursor elements on mobile
    if (cursor) cursor.style.display = "none"
    if (cursorFollower) cursorFollower.style.display = "none"
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileLinks = document.querySelectorAll(".mobile-link")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open")
    mobileMenu.classList.toggle("open")
    document.body.classList.toggle("no-scroll")
  })

  mobileMenuClose.addEventListener("click", () => {
    menuBtn.classList.remove("open")
    mobileMenu.classList.remove("open")
    document.body.classList.remove("no-scroll")
  })

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open")
      mobileMenu.classList.remove("open")
      document.body.classList.remove("no-scroll")
    })
  })

  // Active nav link on scroll
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })

  // Counter animation
  const counters = document.querySelectorAll(".counter")
  const counterSection = document.querySelector(".about-stats")

  let counted = false

  function startCounting() {
    if (counted) return

    counters.forEach((counter) => {
      const target = +counter.dataset.target
      let count = 0
      const increment = target / 50

      const updateCount = () => {
        if (count < target) {
          count += increment
          counter.innerText = Math.ceil(count)
          setTimeout(updateCount, 30)
        } else {
          counter.innerText = target
        }
      }

      updateCount()
    })

    counted = true
  }

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Start counting when about section is in viewport
  window.addEventListener("scroll", () => {
    if (isInViewport(counterSection)) {
      startCounting()
    }
  })

  // Skills tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      tabBtns.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      const tabId = this.dataset.tab
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Animate skill bars when in viewport
  const skillSection = document.querySelector(".skills-section")
  const progressBars = document.querySelectorAll(".progress-bar")

  let skillsAnimated = false

  function animateSkills() {
    if (skillsAnimated) return

    progressBars.forEach((bar) => {
      const width = bar.dataset.width
      bar.style.width = width
    })

    skillsAnimated = true
  }

  window.addEventListener("scroll", () => {
    if (isInViewport(skillSection)) {
      animateSkills()
    }
  })

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })


  // Form submission
  const contactForm = document.getElementById("contact-form");
  const notification = document.getElementById("notification");
  const notificationClose = document.getElementById("notification-close");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      await fetch("https://formspree.io/f/xdkgdjod", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      contactForm.reset();
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 5000);
    } catch (error) {
      alert("Error submitting the form");
    }
  });

  notificationClose.addEventListener("click", () => {
    notification.classList.remove("show");
  });


  // Back to top button
  const backToTop = document.querySelector(".back-to-top")

  backToTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Typing effect for hero section
  const typedTextElement = document.querySelector(".typed-text")
  const phrases = ["MERN Stack Developer", "Frontend Developer", "Backend Developer", "Freelancer"]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeText() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 1000 // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before typing next phrase
    }

    setTimeout(typeText, typingSpeed)
  }

  // Start the typing effect
  setTimeout(typeText, 1000)
})
