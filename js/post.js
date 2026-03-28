function calculateReadingTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function applyNavbarLang(lang) {
  document.querySelectorAll('.translatable').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });
}

async function loadPost() {
  const res = await fetch("/json/article.json");
  const data = await res.json();

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const urlLang = params.get("lang");

  const lang = urlLang || localStorage.getItem("lang") || "en";
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  const container = document.getElementById("postContainer");

  const postData = data[slug];

  if (!postData) {
    container.innerHTML = "<p class='text-red-400'>Post not found</p>";
    return;
  }

  const post = postData[lang] || postData["en"];

  // SEO
  document.title = post.title + " | Isa Omar";

  container.innerHTML = `
    <article class="max-w-3xl mx-auto">

      <h1 class="text-5xl font-bold leading-tight mb-6">
        ${post.title}
      </h1>

      <p class="text-gray-400 text-lg mb-6">
        ${post.subtitle}
      </p>

      <div class="text-gray-500 text-sm mb-12 flex gap-3 items-center">
        <span id="views">👁 loading...</span>
        <span>•</span>
        <span>${calculateReadingTime(post.content.map(s => s.text).join(" "))} • ${post.author}</span>
      </div>

      <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80"
           class="rounded-2xl mb-12 w-full object-cover" />

      <div class="space-y-16">
        ${post.content.map(sec => `
          <div>
            <h2 class="text-2xl font-semibold mb-4 text-white">
              ${sec.title}
            </h2>

            <img src="${sec.image}"
                 class="rounded-xl mb-6 w-full object-cover" />

            <p class="text-gray-300 leading-8 text-lg">
              ${sec.text.replace(/\n\n/g, "<br><br>")}
            </p>
          </div>
        `).join("")}
      </div>

      <div class="mt-10 flex gap-4">
        <button onclick="shareLinkedIn()" class="px-4 py-2 bg-blue-600 rounded">LinkedIn</button>
        <button onclick="shareTwitter()" class="px-4 py-2 bg-sky-500 rounded">Twitter</button>
      </div>

      <p class="text-xs text-gray-600 mt-16">
        All graphics and visuals in this article were generated using AI tools.
      </p>

    </article>
  `;

  // ✅ BURDA OLMALIDIR (ƏN VACİB)
  fetch(`https://api.countapi.xyz/hit/isaomar-${slug}/views`)
    .then(res => res.json())
    .then(data => {
      const viewsEl = document.getElementById("views");
      if (viewsEl) {
        viewsEl.innerText = "👁 " + data.value + " views";
      }
    });
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  applyNavbarLang(lang);
  loadPost();
}

function shareLinkedIn() {
  const url = window.location.href;
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
}

function shareTwitter() {
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?url=${url}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";

  document.documentElement.lang = savedLang;
  applyNavbarLang(savedLang);
  loadPost();
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const progress = (scrollTop / height) * 100;

  const bar = document.getElementById("progressBar");
  if (bar) bar.style.width = progress + "%";
});