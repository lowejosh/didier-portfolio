// Modern Portfolio JavaScript - Optimized for Performance

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initSmoothScrolling();
  initTypingAnimation();
  initWorkFilters();
  initLazyLoading();
  initContactForm();
});

// Navigation functionality - optimized with throttling
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

  // Throttled scroll handler to prevent excessive repainting
  let ticking = false;
  let lastScrollTop = 0;

  function updateNav() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class for styling
    if (scrollTop > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }

    // Hide/show navbar on scroll (simplified)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      nav.style.transform = "translateY(-100%)";
    } else {
      nav.style.transform = "translateY(0)";
    }

    // Active section highlighting (simplified)
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = scrollTop + 150;

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

    lastScrollTop = scrollTop;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });
}

// Scroll animations removed to prevent flickering

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

// Typing animation for hero title - simplified
function initTypingAnimation() {
  const heroTitle = document.querySelector(".hero-title");

  if (heroTitle) {
    const lines = heroTitle.querySelectorAll(".hero-title-line");

    lines.forEach((line, index) => {
      line.style.opacity = "0";
      line.style.transform = "translateY(20px)";

      setTimeout(() => {
        line.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        line.style.opacity = "1";
        line.style.transform = "translateY(0)";
      }, index * 200 + 300);
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
