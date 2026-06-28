/* =========================================================
   PRIME COURT APARTMENTS — SITE SCRIPT
   Vanilla JS, no dependencies. Runs on both index.html and
   privacy.html — every selector is null-checked since not
   every element exists on every page.
   ========================================================= */
 
document.addEventListener("DOMContentLoaded", () => {
 
  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
 
  /* ---------- 1. Footer year ---------- */
  $$("#current-year").forEach(el => { el.textContent = new Date().getFullYear(); });
 
  /* ---------- 2. Mobile nav toggle ---------- */
  const navToggle = $("#nav-toggle");
  const navMenu = $("#nav-menu");
 
  if (navToggle && navMenu) {
    const closeNav = () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    const openNav = () => {
      navMenu.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
    };
 
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("is-open");
      isOpen ? closeNav() : openNav();
    });
 
    // Close the mobile menu once a link is tapped
    $$(".nav-link", navMenu).forEach(link => {
      link.addEventListener("click", closeNav);
    });
 
    // Close if the person taps/clicks outside the nav
    document.addEventListener("click", (e) => {
      if (!navMenu.classList.contains("is-open")) return;
      if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });
 
    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }
 
  /* ---------- 3. Date inputs: disallow past dates ---------- */
  const todayISO = new Date().toISOString().split("T")[0];
  ["#booking-checkin", "#booking-checkout", "#appointment-date"].forEach(sel => {
    const input = $(sel);
    if (input) input.min = todayISO;
  });
 
  /* ---------- 4. Form feedback helper ---------- */
  // Inserts a dismissible success/error banner at the top of a form.
  function showFormFeedback(form, message, type = "success") {
    const existing = $(".form-feedback", form);
    if (existing) existing.remove();
 
    const banner = document.createElement("div");
    banner.className = `form-feedback form-feedback-${type}`;
    banner.setAttribute("role", "status");
    banner.textContent = message;
    form.prepend(banner);
 
    if (type === "success") {
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
 
  /* ---------- 5. Booking form ---------- */
  const bookingForm = $("#booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
 
      const checkIn = $("#booking-checkin").value;
      const checkOut = $("#booking-checkout").value;
 
      if (checkIn && checkOut && checkOut <= checkIn) {
        showFormFeedback(bookingForm, "Check-out date must be after the check-in date.", "error");
        return;
      }
 
      // TODO: replace with a real submission — e.g. fetch() to your booking
      // API/backend, or a form service like Formspree. For now this just
      // confirms the request locally so the flow can be tested end to end.
      const name = $("#booking-name").value.trim();
      showFormFeedback(
        bookingForm,
        `Thanks${name ? ", " + name : ""}! Your booking request has been received. Our team will confirm shortly.`,
        "success"
      );
      bookingForm.reset();
      ["#booking-checkin", "#booking-checkout"].forEach(sel => {
        const input = $(sel);
        if (input) input.min = todayISO;
      });
    });
  }
 
  /* ---------- 6. Apartment "Book Now" buttons ---------- */
  // Pre-selects the matching apartment type in the booking form.
  $$(".book-now-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const apartmentCard = btn.closest("[data-apartment-type]");
      const apartmentSelect = $("#booking-apartment");
      if (apartmentCard && apartmentSelect) {
        apartmentSelect.value = apartmentCard.dataset.apartmentType;
      }
      // Anchor link already scrolls to #booking; just focus the first field
      // shortly after the smooth-scroll has had a moment to land.
      setTimeout(() => {
        const nameField = $("#booking-name");
        if (nameField) nameField.focus({ preventScroll: true });
      }, 500);
    });
  });
 
  /* ---------- 7. Appointment / schedule-viewing form ---------- */   
  const appointmentForm = $("#appointment-form");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#appointment-name").value.trim();
      // TODO: wire up to a real backend/calendar so the AI assistant and
      // the manual form share one source of truth for availability.
      showFormFeedback(
        appointmentForm,
        `Thanks${name ? ", " + name : ""}! Your viewing request has been received — we'll confirm the time shortly.`,
        "success"
      );
      appointmentForm.reset();
      const dateInput = $("#appointment-date");
      if (dateInput) dateInput.min = todayISO;
    });
  }
 
  /* ---------- 8. Contact form ---------- */
  const contactForm = $("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO: wire up to a real submission endpoint (e.g. Formspree, or
      // your own backend) once one is available.
      showFormFeedback(contactForm, "Thanks for reaching out! We'll get back to you soon.", "success");
      contactForm.reset();
    });
  }

  /* ---------- 9. AI agent hooks (for VoiceFlow custom actions) ---------- */
  // Expose small helpers VoiceFlow can call from a Custom Action / Function
  // step so the agent can actually act on the page, not just chat about it.
  // Example use inside a VoiceFlow Function step's code:
  //   window.PrimeCourt.scrollToBooking('one-bedroom');
  window.PrimeCourt = {
    scrollToBooking(apartmentType) {
      const select = $("#booking-apartment");
      if (apartmentType && select) select.value = apartmentType;
      $("#booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    scrollToSchedule() {
      $("#schedule-viewing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    scrollToDirections() {
      $("#directions")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

});
