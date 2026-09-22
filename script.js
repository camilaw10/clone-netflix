const TITLES = [
  // FILMES
  { 
    title: "Homem-Aranha: Sem Volta para Casa", 
    desc: "Com a sua identidade revelada, Peter Parker pede ajuda ao Doutor Estranho. Quando um feitiço dá errado, vilões de outros universos começam a surgir.", 
    genre: "Ação / Heróis", 
    year: "2021", 
    match: "98%", 
    type: "filme", 
    banner: "homemaranha.png", 
    thumb: "homemaranha.png" 
  },
  { 
    title: "Taxi Driver", 
    desc: "Um veterano de guerra solitário e mentalmente instável trabalha como motorista de táxi à noite em Nova York, enfrentando a decadência da cidade.", 
    genre: "Drama / Crime", 
    year: "1976", 
    match: "96%", 
    type: "filme", 
    banner: "taxidriver.png", 
    thumb: "taxidriver.png" 
  },
  { 
    title: "Corações de Ferro", 
    desc: "Durante os últimos dias da Segunda Guerra Mundial, um sargento comanda a tripulação de um tanque de guerra americano numa missão mortal na Alemanha.", 
    genre: "Guerra / Ação", 
    year: "2014", 
    match: "94%", 
    type: "filme", 
    banner: "coracoes.png", 
    thumb: "coracoes.png" 
  },
  { 
    title: "Velozes e Furiosos", 
    desc: "Um policial disfarçado se infiltra no circuito de rachas noturnos de Los Angeles para investigar uma série de assaltos a caminhões.", 
    genre: "Ação / Policial", 
    year: "2001", 
    match: "91%", 
    type: "filme", 
    banner: "velozesefuriosos.png", 
    thumb: "velozesefuriosos.png" 
  },

  // SÉRIES
  { 
    title: "Supernatural", 
    desc: "Dois irmãos cruzam os Estados Unidos a bordo do seu Impala 67 caçando demônios, monstros e outras criaturas sobrenaturais.", 
    genre: "Mistério / Fantasia", 
    year: "2005", 
    match: "95%", 
    type: "serie", 
    banner: "supernatural.png", 
    thumb: "supernatural.png" 
  },
  { 
    title: "O Mentalista", 
    desc: "Um ex-psíquico fraudulento usa suas extraordinárias habilidades de observação para ajudar a polícia da Califórnia a solucionar assassinatos.", 
    genre: "Crime / Drama", 
    year: "2008", 
    match: "93%", 
    type: "serie", 
    banner: "mentalista.png", 
    thumb: "mentalista.png" 
  },
  { 
    title: "Breaking Bad", 
    desc: "Um professor de química com diagnóstico de câncer terminal se junta a um ex-aluno para fabricar e vender metanfetamina e garantir o futuro da família.", 
    genre: "Drama / Crime", 
    year: "2008", 
    match: "99%", 
    type: "serie", 
    banner: "breaking.png", 
    thumb: "breaking.png" 
  },
  { 
    title: "Dexter", 
    desc: "Um especialista em análise de borrifos de sangue da polícia de Miami esconde uma vida dupla como um serial killer que mata apenas outros criminosos.", 
    genre: "Crime / Suspense", 
    year: "2006", 
    match: "97%", 
    type: "serie", 
    banner: "dexter.png", 
    thumb: "dexter.png" 
  }
];

TITLES.forEach((t, i) => t.id = i);

function buildRow(name, items) {
  return { name, items };
}

const ROWS = [
  buildRow("Em Alta", TITLES),
  buildRow("Séries em Destaque", TITLES.filter(t => t.type === 'serie')),
  buildRow("Filmes de Ação e Drama", TITLES.filter(t => t.type === 'filme'))
];

const SERIES_ROWS = [
  buildRow("Séries do Catálogo", TITLES.filter(t => t.type === 'serie'))
];

const FILMES_ROWS = [
  buildRow("Filmes do Catálogo", TITLES.filter(t => t.type === 'filme'))
];

function getMyList() {
  try { return JSON.parse(localStorage.getItem('streamflix-list')) || []; }
  catch (e) { return []; }
}

function saveMyList(list) {
  try { localStorage.setItem('streamflix-list', JSON.stringify(list)); } catch (e) {}
}

function isInList(id) { return getMyList().includes(id); }

function toggleInList(id) {
  const list = getMyList();
  const idx = list.indexOf(id);
  if (idx === -1) list.push(id); else list.splice(idx, 1);
  saveMyList(list);
  return list.includes(id);
}

const hero = document.getElementById('hero');
const featured = TITLES[0];
hero.style.backgroundImage = `url(${featured.banner})`;
document.getElementById('hero-title').textContent = featured.title;
document.getElementById('hero-desc').textContent = featured.desc;

let currentModalItem = null;
const modalAddBtn = document.getElementById('modal-add');

function refreshAddBtn() {
  if (!currentModalItem) return;
  const inList = isInList(currentModalItem.id);
  modalAddBtn.textContent = inList ? '✓ Na Lista' : '＋ Minha Lista';
  modalAddBtn.classList.toggle('added', inList);
}

function openModalFor(item) {
  currentModalItem = item;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-desc').textContent = item.desc;
  document.getElementById('modal-genre').textContent = item.genre;
  document.getElementById('modal-year').textContent = item.year;
  document.getElementById('modal-match').textContent = item.match + ' relevante';
  document.getElementById('modal-banner').style.backgroundImage = `url(${item.banner})`;
  refreshAddBtn();
  modalOverlay.classList.add('active');
}

modalAddBtn.addEventListener('click', () => {
  if (!currentModalItem) return;
  toggleInList(currentModalItem.id);
  refreshAddBtn();
  if (currentPage === 'lista') renderPage('lista');
});

document.getElementById('modal-play').addEventListener('click', () => {
  if (currentModalItem) alert('Reprodução simulada: ' + currentModalItem.title);
});

document.getElementById('hero-info').addEventListener('click', () => openModalFor(featured));
document.getElementById('hero-play').addEventListener('click', () => alert('Reprodução simulada: ' + featured.title));

const rowsContainer = document.getElementById('rows-container');
const pageTitleEl = document.getElementById('page-title');
const heroEl = document.getElementById('hero');
let currentPage = 'home';

function renderRows(rows) {
  rowsContainer.innerHTML = '';
  rows.forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';

    const titleEl = document.createElement('div');
    titleEl.className = 'row-title';
    titleEl.textContent = row.name;
    rowEl.appendChild(titleEl);

    const scrollEl = document.createElement('div');
    scrollEl.className = 'row-scroll';

    row.items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.backgroundImage = `url(${item.thumb})`;
      card.innerHTML = `<span class="card-title">${item.title}</span>`;
      card.addEventListener('click', () => openModalFor(item));
      scrollEl.appendChild(card);
    });

    rowEl.appendChild(scrollEl);
    rowsContainer.appendChild(rowEl);
  });
}

function renderPage(page) {
  currentPage = page;

  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  if (page === 'home') {
    heroEl.style.display = '';
    pageTitleEl.classList.remove('active');
    renderRows(ROWS);
  } else if (page === 'series') {
    heroEl.style.display = 'none';
    pageTitleEl.textContent = 'Séries';
    pageTitleEl.classList.add('active');
    renderRows(SERIES_ROWS);
  } else if (page === 'filmes') {
    heroEl.style.display = 'none';
    pageTitleEl.textContent = 'Filmes';
    pageTitleEl.classList.add('active');
    renderRows(FILMES_ROWS);
  } else if (page === 'lista') {
    heroEl.style.display = 'none';
    pageTitleEl.textContent = 'Minha Lista';
    pageTitleEl.classList.add('active');
    const myItems = TITLES.filter(t => isInList(t.id));
    if (myItems.length === 0) {
      rowsContainer.innerHTML = '<p class="empty-state">Sua lista está vazia. Adicione títulos pelo botão "＋ Minha Lista" no modal de detalhes.</p>';
    } else {
      renderRows([buildRow('Minha Lista', myItems)]);
    }
  }
  window.scrollTo(0, 0);
}

document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    renderPage(a.dataset.page);
  });
});

renderPage('home');

const modalOverlay = document.getElementById('modal-overlay');
document.getElementById('modal-close').addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modalOverlay.classList.remove('active');
});

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  
  if (term === '') {
    renderPage(currentPage);
  } else {
    const filtered = TITLES.filter(t => 
      t.title.toLowerCase().includes(term) || 
      t.genre.toLowerCase().includes(term)
    );
    
    heroEl.style.display = 'none';
    pageTitleEl.textContent = `Resultados para "${e.target.value}"`;
    pageTitleEl.classList.add('active');
    
    if (filtered.length > 0) {
      renderRows([buildRow("Encontrados", filtered)]);
    } else {
      rowsContainer.innerHTML = '<p class="empty-state">Nenhum título encontrado com este nome ou gênero.</p>';
    }
  }
});