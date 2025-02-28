// Color mode toggle
const toggleMode = document.getElementById("toggleMode");
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Changing text animation
const changingText = document.getElementById("changing-text");
const textOptions = [
  "Jeffery Marfo",
  "Product Designer",
  "UI UX Designer",
  "Web Developer",
];
let currentIndex = 0;

function typeText(text, index = 0) {
  if (index < text.length) {
    changingText.textContent = text.substring(0, index + 1);
    setTimeout(() => typeText(text, index + 1), 100);
  } else {
    setTimeout(deleteText, 2000);
  }
}

function deleteText() {
  const currentText = changingText.textContent;
  if (currentText.length > 0) {
    changingText.textContent = currentText.substring(0, currentText.length - 1);
    setTimeout(deleteText, 50);
  } else {
    currentIndex = (currentIndex + 1) % textOptions.length;
    setTimeout(() => typeText(textOptions[currentIndex]), 500);
  }
}

// Start the animation
typeText(textOptions[currentIndex]);

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  const slideWidth = 100; // As percentage

  // Initialize carousel
  updateCarousel();

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Indicator dots
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      currentIndex = parseInt(indicator.dataset.index);
      updateCarousel();
    });
  });

  // Update carousel position and active indicator
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    // Update active indicator
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  // Auto-advance carousel (optional)
  let intervalId = setInterval(() => {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  }, 5000); // Change slide every 5 seconds

  // Pause auto-advance on hover
  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  carousel.addEventListener("mouseleave", () => {
    intervalId = setInterval(() => {
      currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    }, 5000);
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - next slide
      currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    }

    if (touchEndX > touchStartX + 50) {
      // Swipe right - previous slide
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Check if element is in viewport
        if (entry.isIntersecting) {
          // Add animate class to timeline
          if (entry.target.classList.contains("timeline")) {
            entry.target.classList.add("animate");

            // Animate timeline items with delay
            const items = entry.target.querySelectorAll(".timeline-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate");
              }, 300 * index);
            });
          }

          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
    }
  );

  // Observe all timelines
  document.querySelectorAll(".timeline").forEach((timeline) => {
    observer.observe(timeline);
  });

  // For demo purposes, trigger animation on load as well
  setTimeout(() => {
    document.querySelectorAll(".timeline").forEach((timeline) => {
      timeline.classList.add("animate");

      const items = timeline.querySelectorAll(".timeline-item");
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate");
        }, 300 * index);
      });
    });
  }, 500);
});

// About Me
// Add hover effect to skill tags
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseover", () => {
    tag.style.transform = "translateY(-3px)";
  });

  tag.addEventListener("mouseout", () => {
    tag.style.transform = "translateY(0)";
  });
});

// Smooth scroll for the contact button
document.querySelector(".contact-btn").addEventListener("click", (e) => {
  e.preventDefault();
  // You can add the smooth scroll to your contact section here
  console.log("Contact button clicked");
});

// projects

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Animation delay for portfolio items
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioGrid = document.querySelector(".portfolio-grid");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Filter items
      portfolioItems.forEach((item) => {
        const categories = item.getAttribute("data-category");

        if (filterValue === "all" || categories.includes(filterValue)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Modal functionality
  const modal = document.getElementById("projectModal");
  const modalClose = document.querySelector(".modal-close");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const viewButtons = document.querySelectorAll(".view-project");

  // Project data
  const projectData = {
    project1: {
      title: "Verser Brand Identity",
      image: "/api/placeholder/900/500",
      description:
        "A complete rebrand for Verser, a technology startup focused on blockchain solutions. The project involved creating a comprehensive brand identity including logo design, typography system, color palette, and detailed brand guidelines. The new identity system reflects the company's vision of transparency, security, and innovation. The rebrand has successfully positioned Verser as a premium player in their market, with brand recognition increasing by 45% within six months of launch.",
    },
    project2: {
      title: "Red Bull Mobile App",
      image: "/api/placeholder/900/500",
      description:
        "Redesigned the Red Bull mobile experience with a focus on event discovery and multimedia content. The app features a customized event feed based on user preferences, interactive maps for event locations, and seamless integration with social media for content sharing. The new design increased user engagement by 37% and extended average session duration to over 8 minutes. The project included extensive user research, wireframing, prototyping, and collaboration with development teams for implementation.",
    },
    project3: {
      title: "Fitness Dashboard",
      image: "/api/placeholder/900/500",
      description:
        "A comprehensive fitness tracking platform with intuitive data visualization and progress tracking features. The dashboard includes customizable workout plans, nutrition tracking, progress analytics, and social features for community motivation. The design process involved extensive user research with fitness enthusiasts and trainers to ensure the platform addressed real user needs and pain points.",
    },
    project4: {
      title: "Aromatic Coffee Branding",
      image: "/api/placeholder/900/500",
      description:
        "Brand identity for Aromatic, a premium coffee company that sources single-origin beans directly from farmers. The branding package included logo design, packaging for different coffee varieties, in-store materials, loyalty cards, and digital assets. The design emphasizes sustainability and craftsmanship through earthy tones, hand-drawn elements, and eco-friendly packaging materials.",
    },
    project5: {
      title: "Banking App Redesign",
      image: "/api/placeholder/900/500",
      description:
        "A modern approach to digital banking with an emphasis on security, accessibility, and user experience. The redesign simplified complex financial tasks, introduced biometric authentication, and created personalized insights into spending patterns. User testing showed that the new design reduced task completion time by 40% and greatly improved user satisfaction scores.",
    },
    project6: {
      title: "Travel Guide App",
      image: "/api/placeholder/900/500",
      description:
        "An interactive travel companion app featuring location-based recommendations, augmented reality for landmark information, and offline capabilities for travelers. The app includes customized itineraries, local experiences curation, and integration with transportation and accommodation services. The design process included extensive field testing in various travel scenarios to ensure usability in real-world conditions.",
    },
  };

  // Open modal with project details
  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project");
      const project = projectData[projectId];

      if (project) {
        modalTitle.textContent = project.title;
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalDescription.textContent = project.description;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal
  modalClose.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside of content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});
// skills and expertise
// Add animation to skill categories when they come into view
document.addEventListener("DOMContentLoaded", function () {
  const skillCategories = document.querySelectorAll(".skill-category");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  skillCategories.forEach((category) => {
    category.style.opacity = 0;
    category.style.transform = "translateY(20px)";
    category.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(category);
  });
});
// contact me
// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Here you would normally send the data to a server
  console.log("Form submitted:", { name, email, message });

  // Show confirmation (for demo purposes)
  alert("Thanks for your message! We will get back to you soon.");

  // Reset the form
  this.reset();
});
