(async function(){
  const input = document.getElementById("searchInput");
  const list = document.getElementById("lectureList");
  if(!input || !list) return;

  let data = [];
  try{
    const res = await fetch((window.__baseurl || "") + "/search.json");
    data = await res.json();
  }catch(e){
    // Fallback: Wenn search.json nicht geladen werden kann, filtern wir via data-attribute
    const cards = Array.from(list.querySelectorAll(".card"));
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      cards.forEach(c => {
        const hay = (c.dataset.title + " " + c.dataset.tags + " " + c.dataset.summary).toLowerCase();
        c.style.display = hay.includes(q) ? "" : "none";
      });
    });
    return;
  }

  // Re-render aus JSON (stabiler, durchsucht auch Content)
  const template = (item) => {
    const tags = (item.tags || []).map(t => `<span class="tag">#${t}</span>`).join(" ");
    const course = item.course ? `<span class="pill">${item.course}</span>` : "";
    return `
      <article class="card">
        <div class="meta">
          <span class="date">${item.date}</span>
          ${course}
          ${tags}
        </div>
        <h2 class="cardTitle"><a href="${item.url}">${item.title}</a></h2>
        ${item.summary ? `<p class="summary">${item.summary}</p>` : ""}
        <a class="readMore" href="${item.url}">Öffnen →</a>
      </article>
    `;
  };

  const render = (items) => {
    list.innerHTML = items.map(template).join("");
  };

  render(data.sort((a,b) => (a.date < b.date ? 1 : -1)));

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if(!q){
      render(data.sort((a,b) => (a.date < b.date ? 1 : -1)));
      return;
    }
    const filtered = data.filter(item => {
      const hay = [
        item.title, item.summary, item.course,
        (item.tags || []).join(" "),
        item.content
      ].join(" ").toLowerCase();
      return hay.includes(q);
    });
    render(filtered);
  });
})();
