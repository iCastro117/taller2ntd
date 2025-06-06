document.addEventListener("DOMContentLoaded", () => {
    // Inicializar funcionalidades
    initMobileMenu()
    initSubmenuHandlers()
    initScrollAnimations()
    initModalHandlers()
  })
  
  // Función para inicializar el menú móvil
  function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")
  
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", function () {
        const expanded = this.getAttribute("aria-expanded") === "true"
        this.setAttribute("aria-expanded", !expanded)
        navMenu.classList.toggle("active")
      })
    }
  }
  
  // Función para inicializar los manejadores de submenús
  function initSubmenuHandlers() {
    const hasSubmenu = document.querySelectorAll(".has-submenu > a")
  
    hasSubmenu.forEach((item) => {
      item.addEventListener("click", function (e) {
        if (window.innerWidth < 768) {
          e.preventDefault()
          const parent = this.parentElement
          parent.classList.toggle("submenu-active")
        }
      })
    })
  }
  
  // Función para inicializar las animaciones de scroll
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target) // Dejar de observar una vez animado
        }
      })
    }, observerOptions)
  
    // Observar todos los elementos con la clase animate-item
    document.querySelectorAll(".animate-item").forEach((item) => {
      observer.observe(item)
    })
  }
  
  // Función para inicializar los manejadores de modales
  function initModalHandlers() {
    // Obtener todos los botones "Read More"
    const readMoreButtons = document.querySelectorAll(".read-more")
  
    // Obtener todos los modales
    const modals = document.querySelectorAll(".modal")
  
    // Obtener todos los botones de cierre
    const closeButtons = document.querySelectorAll(".close-modal")
  
    // Función para abrir el modal
    function openModal(modalId) {
      const modal = document.getElementById(modalId)
      modal.style.display = "flex"
  
      // Agregar clase active después de un pequeño retraso para activar la transición
      setTimeout(() => {
        modal.classList.add("active")
      }, 10)
  
      document.body.style.overflow = "hidden" // Evitar scroll en el fondo
    }
  
    // Función para cerrar el modal
    function closeModal() {
      modals.forEach((modal) => {
        modal.classList.remove("active")
  
        // Esperar a que termine la transición antes de ocultar
        setTimeout(() => {
          modal.style.display = "none"
        }, 300)
      })
      document.body.style.overflow = "auto" // Restaurar scroll
    }
  
    // Asignar evento click a los botones "Read More"
    readMoreButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modalId = this.getAttribute("data-modal")
        openModal(modalId)
      })
    })
  
    // Asignar evento click a los botones de cierre
    closeButtons.forEach((button) => {
      button.addEventListener("click", closeModal)
    })
  
    // Cerrar el modal al hacer clic fuera del contenido
    modals.forEach((modal) => {
      modal.addEventListener("click", function (event) {
        if (event.target === this) {
          closeModal()
        }
      })
    })
  
    // Cerrar el modal con la tecla Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal()
      }
    })
  }
  
  // Efecto de scroll en el header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header")
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }
  })
  
  // Manejar cambios de tamaño de ventana
  window.addEventListener("resize", () => {
    const navMenu = document.querySelector(".nav-menu")
    const menuToggle = document.querySelector(".menu-toggle")
  
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false")
      }
    }
  })
  
  // Agregar retrasos a las animaciones para que aparezcan secuencialmente
  window.addEventListener("load", () => {
    const animateItems = document.querySelectorAll(".animate-item")
  
    animateItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05}s` // Reducido de 0.1s a 0.05s
    })
  })
  
  