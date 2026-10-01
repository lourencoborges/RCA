const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const setMobileMenuOpen = open => {
  mobileMenu?.classList.toggle("open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  if (menuToggle) menuToggle.textContent = open ? "×" : "☰";
};

menuToggle?.addEventListener("click", () => {
  setMobileMenuOpen(!mobileMenu?.classList.contains("open"));
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    setMobileMenuOpen(false);
  });
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !mobileMenu?.classList.contains("open")) return;
  setMobileMenuOpen(false);
  menuToggle?.focus();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector(".header");
let maxScroll = 0;
const updateScrollState = () => {
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  header?.style.setProperty("--scroll-progress", `${progress}%`);
  header?.classList.toggle("scrolled", window.scrollY > 20);
};
const updateScrollRange = () => {
  maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  updateScrollState();
};
window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollRange, { passive: true });
window.addEventListener("load", updateScrollRange, { once: true });
updateScrollRange();

const revealTargets = document.querySelectorAll("main > section:not(.hero), .services-grid");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach(section => section.classList.add("scroll-reveal"));
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(section => revealObserver.observe(section));
}

const navigationLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
const sections = [...navigationLinks]
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-28% 0px -58% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
}

document.querySelector('footer a[href="#inicio"]')?.addEventListener("click", event => {
  event.preventDefault();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});
