document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('searchInput');
  if (!input) return;

  function filterProjects(query) {
    query = query.trim().toLowerCase();
    const rows = document.querySelectorAll('.project-row');

    rows.forEach(row => {
      const cards = row.querySelectorAll('.project-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.dataset.title || '';
        const desc  = card.dataset.desc  || '';
        const tags  = card.dataset.tags  || '';
        const matches = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });

      row.style.display = visibleCount > 0 ? '' : 'none';
    });
  }

  input.addEventListener('input', function () {
    filterProjects(this.value);
  });
});
