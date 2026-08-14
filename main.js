/* Renders the page from window.SITE_CONFIG (see config.js) */

const ICONS = {
  leaf: '<path d="M4 20c0-9 6-15 16-15 0 10-6 16-16 15Z"/><path d="M4 20c4-4 8-7 12-11"/>',
  shield: '<path d="M16 3l11 5v8c0 8-6 13-11 15-5-2-11-7-11-15V8Z"/>',
  sparkle: '<path d="M16 3v9M16 20v9M3 16h9M20 16h9M7 7l6 6M25 25l-6-6M25 7l-6 6M7 25l6-6"/>',
  drop: '<path d="M16 4c6 8 10 13.5 10 18.5A10 10 0 0 1 6 22.5C6 17.5 10 12 16 4Z"/>',
  tooth: '<path d="M16 5c-5 0-9 3-9 8 0 6 2 8 3 13 .5 2 3 2 3.5 0l1-6c.2-1 1.8-1 2 0l1 6c.5 2 3 2 3.5 0 1-5 3-7 3-13 0-5-4-8-9-8Z"/>',
  ban: '<circle cx="16" cy="16" r="12"/><path d="M8 8l16 16"/>'
};

function iconSvg(name) {
  return `<svg class="benefit-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.leaf}</svg>`;
}

function waLink(cfg, extraMessage) {
  const number = (cfg.contact.whatsappNumber || "").replace(/[^0-9]/g, "");
  const priceText = `${cfg.product.currency} ${cfg.product.price}`;
  let msg = cfg.contact.whatsappMessage
    .replace("{product}", cfg.product.name)
    .replace("{price}", priceText);
  if (extraMessage) msg += "\n\n" + extraMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function render(cfg) {
  document.title = `${cfg.brand.name} \u2014 ${cfg.brand.tagline}`;

  // Nav
  document.querySelectorAll("[data-brand-name]").forEach(n => n.textContent = cfg.brand.name);
  const navCta = document.getElementById("nav-cta");
  if (navCta) navCta.href = waLink(cfg);

  // Hero
  document.getElementById("hero-eyebrow").textContent = cfg.hero.eyebrow;
  document.getElementById("hero-headline").textContent = cfg.hero.headline;
  document.getElementById("hero-subtext").textContent = cfg.hero.subtext;
  const heroPrimary = document.getElementById("hero-primary-btn");
  heroPrimary.textContent = cfg.hero.primaryButtonText;
  heroPrimary.href = waLink(cfg);
  document.getElementById("hero-secondary-btn").textContent = cfg.hero.secondaryButtonText;

  // Product
  document.getElementById("product-image").src = cfg.product.image;
  document.getElementById("product-image").alt = cfg.product.name;
  document.getElementById("product-name").textContent = cfg.product.name;
  document.getElementById("product-weight").textContent = cfg.product.weight;
  document.getElementById("price-now").textContent = `${cfg.product.currency} ${cfg.product.price}`;
  const priceOld = document.getElementById("price-old");
  if (cfg.product.oldPrice) {
    priceOld.textContent = `${cfg.product.currency} ${cfg.product.oldPrice}`;
  } else {
    priceOld.style.display = "none";
  }
  document.getElementById("product-desc").textContent = cfg.product.description;
  const tagWrap = document.getElementById("product-tags");
  tagWrap.innerHTML = "";
  (cfg.product.ingredients || []).forEach(ing => tagWrap.appendChild(el("span", "tag", ing)));
  const codNote = document.getElementById("cod-note");
  codNote.style.display = cfg.product.codAvailable ? "block" : "none";
  codNote.textContent = cfg.product.codNote;
  const productBtn = document.getElementById("product-order-btn");
  productBtn.href = waLink(cfg);

  // Benefits
  const bWrap = document.getElementById("benefits-grid");
  bWrap.innerHTML = "";
  (cfg.benefits || []).forEach(b => {
    const card = el("div", "benefit-card");
    card.innerHTML = `${iconSvg(b.icon)}<h3>${b.title}</h3><p>${b.text}</p>`;
    bWrap.appendChild(card);
  });

  // How to use
  const sWrap = document.getElementById("steps-list");
  sWrap.innerHTML = "";
  (cfg.howToUse || []).forEach(s => {
    const step = el("div", "step");
    step.innerHTML = `<div class="step-num"></div><div><h3>${s.title}</h3><p>${s.text}</p></div>`;
    sWrap.appendChild(step);
  });

  // About
  document.getElementById("about-heading").textContent = cfg.about.heading;
  document.getElementById("about-text").textContent = cfg.about.text;
  document.getElementById("about-image").src = cfg.about.image;
  document.getElementById("about-image").alt = cfg.about.heading;
  document.getElementById("about-signature").textContent = cfg.about.signature;

  // Contact
  document.getElementById("contact-phone").textContent = cfg.contact.phoneDisplay;
  document.getElementById("contact-email").textContent = cfg.contact.email;
  document.getElementById("contact-email").href = `mailto:${cfg.contact.email}`;
  document.getElementById("contact-address").textContent = cfg.contact.address;
  document.getElementById("contact-hours").textContent = cfg.contact.hours;
  const igLink = document.getElementById("contact-instagram");
  const fbLink = document.getElementById("contact-facebook");
  if (cfg.contact.instagram) { igLink.href = cfg.contact.instagram; } else { igLink.style.display = "none"; }
  if (cfg.contact.facebook) { fbLink.href = cfg.contact.facebook; } else { fbLink.style.display = "none"; }

  // Footer + floating button
  document.getElementById("footer-text").textContent = cfg.footer.text;
  document.getElementById("fab-whatsapp").href = waLink(cfg);

  // Order form -> builds WhatsApp message from name/quantity/address
  const form = document.getElementById("order-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("form-name").value.trim();
    const qty = document.getElementById("form-qty").value || "1";
    const address = document.getElementById("form-address").value.trim();
    const details = `Name: ${name}\nQuantity: ${qty}\nAddress: ${address}`;
    window.open(waLink(cfg, details), "_blank");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.SITE_CONFIG) {
    render(window.SITE_CONFIG);
  } else {
    console.error("config.js not loaded \u2014 check that it is included before main.js");
  }
});
