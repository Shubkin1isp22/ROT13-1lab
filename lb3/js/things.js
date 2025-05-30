// Функция для отображения товаров
function renderProducts(products) {
  const grid = document.querySelector('.grid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = `/product.html?id=${product.id}`;
    });

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="card-title">${product.title}</div>
      <div class="price-row">
        <div class="price">$${product.price}</div>
        <button>&rarr;</button>
      </div>
    `;

    grid.appendChild(card);
  });
}
// Подгружаем все товары при загрузке
fetch('/products')
  .then(res => res.json())
  .then(data => renderProducts(data.products));

// Обработчик поиска
document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  fetch(`/products/search?q=${encodeURIComponent(query)}`)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка поиска');
      return res.json();
    })
    .then(data => renderProducts(data.products))
    .catch(err => {
      console.error('Ошибка при поиске:', err);
      alert('Ошибка при поиске');
    });
});