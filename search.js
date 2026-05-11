document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.row-slider').forEach(slider => {
    let isDragging = false;
    let startX, startScrollLeft;

    slider.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      startScrollLeft = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
      slider.style.userSelect = 'none';
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      slider.style.cursor = '';
      slider.style.userSelect = '';
    });

    slider.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = startScrollLeft - (x - startX);
    });

    // Prevent card clicks from firing after a drag
    slider.addEventListener('click', e => {
      if (Math.abs(slider.scrollLeft - startScrollLeft) > 5) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  });

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
