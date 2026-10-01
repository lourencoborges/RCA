const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");


menuToggle?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !mobileMenu?.classList.contains("open")) return;
  mobileMenu.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
  menuToggle?.focus();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector(".header");
const updateScrollState = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  header?.style.setProperty("--scroll-progress", `${progress}%`);
  header?.classList.toggle("scrolled", window.scrollY > 20);
};
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

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
  window.scrollTo({ top: 0, behavior: "smooth" });
});
