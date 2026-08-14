/* Admin panel: reads window.SITE_CONFIG, lets the owner edit it in a form,
   then generates a new config.js file to download and upload back to GitHub.
   This page never talks to a server - it only edits the config.js file. */

let current = null;

function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

function val(id) { return document.getElementById(id).value; }
function setVal(id, v) { document.getElementById(id).value = v ?? ""; }
function checked(id) { return document.getElementById(id).checked; }
function setChecked(id, v) { document.getElementById(id).checked = !!v; }

function fillForm(cfg) {
  setVal("f-brand-name", cfg.brand.name);
  setVal("f-brand-tagline", cfg.brand.tagline);

  setVal("f-hero-eyebrow", cfg.hero.eyebrow);
  setVal("f-hero-headline", cfg.hero.headline);
  setVal("f-hero-subtext", cfg.hero.subtext);
  setVal("f-hero-primary-btn", cfg.hero.primaryButtonText);
  setVal("f-hero-secondary-btn", cfg.hero.secondaryButtonText);

  setVal("f-product-name", cfg.product.name);
  setVal("f-product-price", cfg.product.price);
  setVal("f-product-oldprice", cfg.product.oldPrice);
  setVal("f-product-weight", cfg.product.weight);
  setVal("f-product-desc", cfg.product.description);
  setVal("f-product-image", cfg.product.image);
  setVal("f-product-ingredients", (cfg.product.ingredients || []).join(", "));
  setChecked("f-product-cod", cfg.product.codAvailable);
  setVal("f-product-codnote", cfg.product.codNote);

  const benefits = cfg.benefits || [];
  for (let i = 0; i < 6; i++) {
    setVal(`f-benefit-${i}-title`, benefits[i] ? benefits[i].title : "");
    setVal(`f-benefit-${i}-text`, benefits[i] ? benefits[i].text : "");
  }

  const steps = cfg.howToUse || [];
  for (let i = 0; i < 3; i++) {
    setVal(`f-step-${i}-title`, steps[i] ? steps[i].title : "");
    setVal(`f-step-${i}-text`, steps[i] ? steps[i].text : "");
  }

  setVal("f-about-heading", cfg.about.heading);
  setVal("f-about-text", cfg.about.text);
  setVal("f-about-image", cfg.about.image);
  setVal("f-about-signature", cfg.about.signature);

  setVal("f-whatsapp-number", cfg.contact.whatsappNumber);
  setVal("f-whatsapp-message", cfg.contact.whatsappMessage);
  setVal("f-phone", cfg.contact.phoneDisplay);
  setVal("f-email", cfg.contact.email);
  setVal("f-address", cfg.contact.address);
  setVal("f-hours", cfg.contact.hours);
  setVal("f-instagram", cfg.contact.instagram);
  setVal("f-facebook", cfg.contact.facebook);

  setVal("f-footer-text", cfg.footer.text);

  updatePreview(cfg);
}

function readForm() {
  const cfg = deepClone(current);

  cfg.brand.name = val("f-brand-name");
  cfg.brand.tagline = val("f-brand-tagline");
  cfg.brand.logoText = val("f-brand-name");

  cfg.hero.eyebrow = val("f-hero-eyebrow");
  cfg.hero.headline = val("f-hero-headline");
  cfg.hero.subtext = val("f-hero-subtext");
  cfg.hero.primaryButtonText = val("f-hero-primary-btn");
  cfg.hero.secondaryButtonText = val("f-hero-secondary-btn");

  cfg.product.name = val("f-product-name");
  cfg.product.price = Number(val("f-product-price")) || 0;
  cfg.product.oldPrice = val("f-product-oldprice") ? Number(val("f-product-oldprice")) : null;
  cfg.product.weight = val("f-product-weight");
  cfg.product.description = val("f-product-desc");
  cfg.product.image = val("f-product-image");
  cfg.product.ingredients = val("f-product-ingredients").split(",").map(s => s.trim()).filter(Boolean);
  cfg.product.codAvailable = checked("f-product-cod");
  cfg.product.codNote = val("f-product-codnote");

  cfg.benefits = [];
  for (let i = 0; i < 6; i++) {
    const title = val(`f-benefit-${i}-title`);
    const text = val(`f-benefit-${i}-text`);
    if (title || text) {
      cfg.benefits.push({ icon: current.benefits[i] ? current.benefits[i].icon : "leaf", title, text });
    }
  }

  cfg.howToUse = [];
  for (let i = 0; i < 3; i++) {
    cfg.howToUse.push({ title: val(`f-step-${i}-title`), text: val(`f-step-${i}-text`) });
  }

  cfg.about.heading = val("f-about-heading");
  cfg.about.text = val("f-about-text");
  cfg.about.image = val("f-about-image");
  cfg.about.signature = val("f-about-signature");

  cfg.contact.whatsappNumber = val("f-whatsapp-number").replace(/[^0-9]/g, "");
  cfg.contact.whatsappMessage = val("f-whatsapp-message");
  cfg.contact.phoneDisplay = val("f-phone");
  cfg.contact.email = val("f-email");
  cfg.contact.address = val("f-address");
  cfg.contact.hours = val("f-hours");
  cfg.contact.instagram = val("f-instagram");
  cfg.contact.facebook = val("f-facebook");

  cfg.footer.text = val("f-footer-text");

  return cfg;
}

function updatePreview(cfg) {
  document.getElementById("pv-image").src = cfg.product.image;
  document.getElementById("pv-name").textContent = cfg.product.name;
  document.getElementById("pv-price").textContent = `${cfg.product.currency} ${cfg.product.price}`;
  const pvOld = document.getElementById("pv-oldprice");
  if (cfg.product.oldPrice) {
    pvOld.textContent = `${cfg.product.currency} ${cfg.product.oldPrice}`;
    pvOld.style.display = "inline";
  } else {
    pvOld.style.display = "none";
  }
  document.getElementById("pv-desc").textContent = cfg.product.description;
  document.getElementById("pv-brand").textContent = cfg.brand.name;
}

function toFileText(cfg) {
  return `/* Generated by admin.html \u2014 replace your project's config.js with this file,
   then commit/upload it to GitHub so the live site updates. */

window.SITE_CONFIG = ${JSON.stringify(cfg, null, 2)};
`;
}

function download(filename, text) {
  const blob = new Blob([text], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toDataUrl(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", () => {
  current = window.SITE_CONFIG ? deepClone(window.SITE_CONFIG) : null;
  if (!current) {
    document.getElementById("admin-error").style.display = "block";
    return;
  }
  fillForm(current);

  document.getElementById("admin-form").addEventListener("input", () => {
    updatePreview(readForm());
  });

  document.getElementById("btn-download").addEventListener("click", () => {
    const cfg = readForm();
    current = cfg;
    download("config.js", toFileText(cfg));
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("Reset the form back to the currently loaded config.js? Unsaved changes will be lost.")) {
      fillForm(current);
    }
  });

  document.getElementById("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const sandbox = { window: {} };
        const fn = new Function("window", reader.result + "\nreturn window.SITE_CONFIG;");
        const imported = fn(sandbox.window);
        if (!imported) throw new Error("No SITE_CONFIG found in file");
        current = imported;
        fillForm(current);
        alert("Loaded! Make your changes below, then click Download config.js.");
      } catch (err) {
        alert("Couldn't read that file as a valid config.js. Error: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("product-image-file").addEventListener("change", (e) => {
    if (e.target.files[0]) {
      toDataUrl(e.target.files[0], (dataUrl) => {
        setVal("f-product-image", dataUrl);
        updatePreview(readForm());
      });
    }
  });

  document.getElementById("about-image-file").addEventListener("change", (e) => {
    if (e.target.files[0]) {
      toDataUrl(e.target.files[0], (dataUrl) => {
        setVal("f-about-image", dataUrl);
      });
    }
  });
});
