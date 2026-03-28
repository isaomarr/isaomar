const blogPosts = [
  {
    slug: "what-is-map",
    title_en: "From Maps to Meaning",
    title_az: "Xəritələrdən Məna Çıxarmağa",
    desc_en: "Understanding how geospatial thinking transforms data.",
    desc_az: "Geoməkan düşüncəsinin məlumatları necə dəyişdirdiyini anla.",
    date: "2026-03-28"
  },
  {
    slug: "webgis",
    title_en: "What is WebGIS?",
    title_az: "WebGIS nədir?",
    desc_en: "Understanding web-based GIS systems.",
    desc_az: "Veb əsaslı GIS sistemlərinin izahı.",
    date: "2026-03-20"
  },
  {
    slug: "geostack-build",
    title_en: "How is GeoStack built?",
    title_az: "GeoStack necə qurulub?",
    desc_en: "My experience building a WebGIS platform.",
    desc_az: "WebGIS platforması qurarkən təcrübəm.",
    date: "2026-03-26"
  }
];

// LANGUAGE SWITCH
function setLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('.translatable').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  document.getElementById('btn-en').classList.toggle('lang-active', lang === 'en');
  document.getElementById('btn-az').classList.toggle('lang-active', lang === 'az');

  renderBlogs(lang);
}

// RENDER BLOGS
function renderBlogs(lang = "en") {
  const container = document.getElementById("blogContainer");
  container.innerHTML = "";

  blogPosts.forEach(post => {
    const div = document.createElement("div");

    div.className = "glass p-6 rounded-2xl border border-white/10 hover-glow cursor-pointer transition";

    div.innerHTML = `
      <h3 class="text-lg font-semibold text-white mb-2">
        ${post["title_" + lang]}
      </h3>
      <p class="text-gray-400 text-sm mb-3">
        ${post["desc_" + lang]}
      </p>
      <span class="text-xs text-gray-500">${post.date}</span>
    `;

    // CLICK → POST PAGE
    div.addEventListener("click", () => {
      window.location.href = `post.html?slug=${post.slug}`;
    });

    container.appendChild(div);
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderBlogs("en");
});

