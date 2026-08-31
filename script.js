const state = {
  audience: "mandiri",
  level: "all",
  topic: "all",
  search: ""
};

const panelText = {
  mandiri: "Latihan mandiri dengan kunci jawaban di tiap worksheet. Mulai dari level dasar, cetak, kerjakan, cocokkan sendiri.",
  guru: "Materi dikemas jadi lesson pack: worksheet, lesson plan, dan classroom games — tinggal cetak dan bawa ke kelas."
};

const levelLabels = {
  kindergarten: "Kindergarten",
  elementary: "Elementary",
  "junior-high": "Junior High",
  "senior-high": "Senior High",
  general: "General English"
};

let allWorksheets = [];

async function loadWorksheets() {
  try {
    const res = await fetch("data/worksheets.json");
    allWorksheets = await res.json();
    render();
  } catch (err) {
    document.getElementById("grid").innerHTML =
      `<div class="empty-state">Gagal memuat data worksheet. Kalau kamu membuka file ini langsung dari komputer (file://), coba jalankan lewat Vercel atau local server — browser membatasi akses file JSON secara langsung.</div>`;
    console.error(err);
  }
}

function render() {
  const grid = document.getElementById("grid");
  const filtered = allWorksheets.filter(w => {
    const matchAudience = w.audience === state.audience || w.audience === "both";
    const matchLevel = state.level === "all" || w.level === state.level;
    const matchTopic = state.topic === "all" || w.topic === state.topic;
    const matchSearch = w.title.toLowerCase().includes(state.search.toLowerCase());
    return matchAudience && matchLevel && matchTopic && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">Belum ada worksheet yang cocok dengan filter ini. Coba ganti level atau topik.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(buildCard).join("");
}

function buildCard(w) {
  const isGame = w.type === "game";

  const metaHtml = isGame
    ? 'Game interaktif <span class="dot-sep"></span> Main langsung di browser'
    : `${w.pages} halaman <span class="dot-sep"></span> PDF` + (w.hasAnswerKey ? ' <span class="dot-sep"></span> + kunci jawaban' : '');

  const actionHtml = isGame
    ? `<a class="stamp-btn" href="${w.file}" target="_blank" rel="noopener">▶ MAIN SEKARANG</a>`
    : `<a class="stamp-btn" href="${w.file}" download>⬇ UNDUH PDF</a>`;

  return `
    <div class="card">
      <div class="card-top">
        <div class="badge-group">
          <span class="badge ${w.level}">${levelLabels[w.level] || w.level}</span>
          ${w.cefr ? `<span class="cefr-tag">${w.cefr}</span>` : ''}
        </div>
        <span class="aud-icon ${w.audience}" title="${w.audience === 'guru' ? 'Untuk guru' : 'Belajar mandiri'}">${w.audience === 'guru' ? 'G' : 'M'}</span>
      </div>
      <h3>${w.title}</h3>
      <p class="desc">${w.description}</p>
      <div class="card-meta">${metaHtml}</div>
      <div class="card-bottom">
        <span class="topic-tag">${w.topic.replace('-', ' ')}</span>
        ${actionHtml}
      </div>
    </div>
  `;
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");
      state.audience = tab.dataset.aud;
      document.getElementById("tabPanel").textContent = panelText[state.audience];
      render();
    });
  });
}

function setupChips() {
  document.querySelectorAll("[data-filter-group]").forEach(group => {
    group.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const filterType = group.dataset.filterGroup;
        state[filterType] = chip.dataset.value;
        render();
      });
    });
  });
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    state.search = input.value;
    render();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupChips();
  setupSearch();
  loadWorksheets();
});
