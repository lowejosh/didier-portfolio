// Modern Portfolio JavaScript - Enhanced Interactions and Animations

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initScrollAnimations();
  initSmoothScrolling();
  initParallaxEffects();
  initTypingAnimation();
  initWorkFilters();
  initLazyLoading();
  initContactForm();
});

// Navigation functionality
function initNavigation() {
  const nav = document.getElementById("nav-main");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("nav-open");

      // Prevent body scroll when menu is open
      if (nav.classList.contains("nav-open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  // Close mobile menu when clicking on a link
  navItems.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("nav-open");
      document.body.style.overflow = "";
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class for styling
    if (scrollTop > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      nav.style.transform = "translateY(-100%)";
    } else {
      nav.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Active section highlighting
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingNavLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navItems.forEach((link) => link.classList.remove("active"));
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active");
        }
      }
    });
  });
}

// Scroll animations with Intersection Observer - optimized to prevent flickering
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");

        // Special animations for different elements with reduced delays
        if (entry.target.classList.contains("work-item")) {
          // Reduced stagger for work items
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            50;
          entry.target.style.animationDelay = `${delay}ms`;
        }

        if (entry.target.classList.contains("testimonial-card")) {
          // Reduced stagger for testimonial cards
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            75;
          entry.target.style.animationDelay = `${delay}ms`;
        }

        // Unobserve to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".work-item, .testimonial-card, .about-content, .contact-info, .section-header"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navHeight = document.getElementById("nav-main").offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Parallax effects for hero section
function initParallaxEffects() {
  const heroVisual = document.querySelector(".hero-visual");
  const heroContent = document.querySelector(".hero-content");

  if (heroVisual && heroContent) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      if (scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${
          scrolled * parallaxSpeed
        }px)`;
        heroContent.style.transform = `translateY(${
          scrolled * parallaxSpeed * 0.3
        }px)`;
      }
    });
  }
}

// Typing animation for hero title
function initTypingAnimation() {
  const heroTitle = document.querySelector(".hero-title");

  if (heroTitle) {
    const lines = heroTitle.querySelectorAll(".hero-title-line");

    lines.forEach((line, index) => {
      line.style.opacity = "0";
      line.style.transform = "translateY(30px)";

      setTimeout(() => {
        line.style.transition = "all 0.8s ease";
        line.style.opacity = "1";
        line.style.transform = "translateY(0)";
      }, index * 300 + 500);
    });
  }
}

// Work filters
function initWorkFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const workItems = document.querySelectorAll(".work-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter work items
      workItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Contact form enhancements
function initContactForm() {
  const contactButtons = document.querySelectorAll('a[href^="mailto:"]');

  contactButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add a subtle animation when clicking email links
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced scroll listener with debouncing
const debouncedScrollHandler = debounce(function () {
  // Additional scroll-based functionality can go here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Preloader (optional)
function initPreloader() {
  const preloader = document.querySelector(".preloader");

  if (preloader) {
    window.addEventListener("load", function () {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }
}

// Mouse cursor effects (optional enhancement)
function initCursorEffects() {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .work-item"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      cursor.classList.add("cursor-hover")
    );
    el.addEventListener("mouseleave", () =>
      cursor.classList.remove("cursor-hover")
    );
  });
}

// Performance optimization: Reduce animations on slower devices
function optimizeForPerformance() {
  // Check if device prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Disable complex animations
    document.documentElement.style.setProperty("--animation-duration", "0ms");
  }

  // Pause animations when tab is not visible
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.body.classList.add("animations-paused");
    } else {
      document.body.classList.remove("animations-paused");
    }
  });
}

// Initialize performance optimizations
optimizeForPerformance();

// Export functions for potential external use
window.PortfolioJS = {
  initNavigation,
  initScrollAnimations,
  initSmoothScrolling,
  initParallaxEffects,
  initTypingAnimation,
};
