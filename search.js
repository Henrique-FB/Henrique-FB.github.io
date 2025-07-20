document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.project-card');
  const allTags = document.querySelectorAll('#all-tags .tag');

  function filterProjects(query) {
    query = query.trim().toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
    const tags = (card.dataset.tags || '').split(',');
      const matches = title.includes(query) || desc.includes(query) || tags.includes(query);

      card.style.display = matches ? 'block' : 'none';
    });
  }

  // Filter as user types
  input.addEventListener('input', function () {
    filterProjects(this.value);
  });

  // Click tag in all-tags list to filter projects
  allTags.forEach(tag => {
    tag.addEventListener('click', function () {
      const tagName = this.dataset.tag;
      input.value = tagName;
      filterProjects(tagName);
    });
  });
});