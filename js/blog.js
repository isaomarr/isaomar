const HARDCODED_POSTS = [
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

async function getAllPosts() {
  try {
    const res = await fetch('/json/blog-meta.json');
    if (res.ok) {
      const adminPosts = await res.json();
      if (Array.isArray(adminPosts) && adminPosts.length > 0) {
        const adminSlugs = new Set(adminPosts.map(p => p.slug));
        const merged = [...adminPosts, ...HARDCODED_POSTS.filter(p => !adminSlugs.has(p.slug))];
        return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    }
  } catch (e) {}
  return HARDCODED_POSTS;
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('.translatable').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  document.getElementById('btn-en').classList.toggle('lang-active', lang === 'en');
  document.getElementById('btn-az').classList.toggle('lang-active', lang === 'az');

  getAllPosts().then(posts => renderBlogs(posts, lang));
}

function renderBlogs(posts, lang = "en") {
  const container = document.getElementById("blogContainer");
  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "glass p-6 rounded-2xl border border-white/10 hover-glow cursor-pointer transition";
    div.innerHTML = `
      <h3 class="text-lg font-semibold text-white mb-2">
        ${post["title_" + lang] || post.title_en}
      </h3>
      <p class="text-gray-400 text-sm mb-3">
        ${post["desc_" + lang] || post.desc_en || ''}
      </p>
      <span class="text-xs text-gray-500">${post.date}</span>
    `;
    div.addEventListener("click", () => {
      window.location.href = `post.html?slug=${post.slug}`;
    });
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("lang") || "en";
  document.documentElement.lang = savedLang;

  document.querySelectorAll('.translatable').forEach(el => {
    const text = el.getAttribute('data-' + savedLang);
    if (text) el.textContent = text;
  });

  document.getElementById('btn-en')?.classList.toggle('lang-active', savedLang === 'en');
  document.getElementById('btn-az')?.classList.toggle('lang-active', savedLang === 'az');

  const posts = await getAllPosts();
  renderBlogs(posts, savedLang);
});
