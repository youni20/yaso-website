// Enhanced circular photo interactions
document.addEventListener("DOMContentLoaded", () => {
  // Enhanced image interactions
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth"

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(".reason-card, .timeline-item, .message-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Photo showcase functionality
  const mainPhoto = document.getElementById("main-photo")
  const mainCaption = document.getElementById("main-photo-caption")
  const photoItems = document.querySelectorAll(".photo-item")
  const floatingPhotos = document.querySelectorAll(".floating-photo")

  // Photo grid interactions
  // Remove switching functionality: do not add click listeners to photoItems
  // Optionally, you can keep the hover effect for style only:
  photoItems.forEach((item) => {
    // Only keep hover effects, remove click event for switching
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.05) rotate(2deg)"
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Floating photos click to expand
  floatingPhotos.forEach((photo) => {
    photo.addEventListener("click", () => {
      createPhotoModal(photo.querySelector("img"))
    })
  })

  // Photo modal function
  function createPhotoModal(imgElement) {
    const modal = document.createElement("div")
    modal.className = "photo-modal"

    modal.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <img src="${imgElement.src}" alt="${imgElement.alt}">
          <p class="modal-caption">${imgElement.alt}</p>
        </div>
      </div>
    `

    // Modal styles
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    `

    const modalContent = modal.querySelector(".modal-content")
    modalContent.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
      text-align: center;
    `

    const modalImg = modal.querySelector("img")
    modalImg.style.cssText = `
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 1rem;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    `

    const modalClose = modal.querySelector(".modal-close")
    modalClose.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    `

    const modalCaption = modal.querySelector(".modal-caption")
    modalCaption.style.cssText = `
      color: white;
      margin-top: 1rem;
      font-size: 1.1rem;
      font-weight: 500;
    `

    document.body.appendChild(modal)
    document.body.style.overflow = "hidden"

    // Close functionality
    const closeModal = () => {
      document.body.removeChild(modal)
      document.body.style.overflow = ""
    }

    modalClose.addEventListener("click", closeModal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.className === "modal-backdrop") {
        closeModal()
      }
    })

    document.addEventListener("keydown", function handleEsc(e) {
      if (e.key === "Escape") {
        closeModal()
        document.removeEventListener("keydown", handleEsc)
      }
    })
  }

  // Main photo click to expand
  document.querySelector(".featured-photo").addEventListener("click", () => {
    createPhotoModal(mainPhoto)
  })

  // Add hover effects for interactive elements
  const cards = document.querySelectorAll(".reason-card, .message-card, .timeline-item")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02) translateY(-5px)"
    })
    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)"
    })
  })

  // Floating hearts animation
  function createFloatingHeart() {
    const heartsContainer = document.getElementById("hearts-container")
    const heart = document.createElement("div")
    heart.className = "floating-heart"
    heart.textContent = "💜"
    heart.style.left = Math.random() * window.innerWidth + "px"
    heart.style.top = window.innerHeight + "px"
    heartsContainer.appendChild(heart)

    // Remove heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 3000)
  }

  // Create floating hearts periodically
  setInterval(createFloatingHeart, 2000)

  // Add CSS for fadeIn animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `
  document.head.appendChild(style)

  // Add parallax effect to circular photos on scroll
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const parallax = document.querySelectorAll(".circular-photo")
    const speed = 0.5

    parallax.forEach((element, index) => {
      const yPos = -(scrolled * speed * (index % 2 === 0 ? 1 : -1))
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    })

    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick)

  // Add random gentle movement to photos
  function addRandomMovement() {
    const photos = document.querySelectorAll(".circular-photo")
    photos.forEach((photo, index) => {
      const randomDelay = Math.random() * 2000
      const randomDuration = 3000 + Math.random() * 2000

      setTimeout(() => {
        photo.style.animation = `gentleFloat ${randomDuration}ms ease-in-out infinite`
        photo.style.animationDelay = `${randomDelay}ms`
      }, index * 200)
    })
  }

  addRandomMovement()
})
