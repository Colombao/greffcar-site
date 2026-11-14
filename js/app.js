/* Greff Car — interações */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const num = n => n.toLocaleString('pt-BR');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wa = msg => `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(msg)}`;
  const nome = c => `${c.marca} ${c.modelo} ${c.versao} ${c.ano}`;
  const isDestaque = c => DESTAQUES.includes(c.modelo);

  /* ---------- WhatsApp genérico ---------- */
  $$('[data-wa]').forEach(a => { a.href = wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- Favoritos ---------- */
  const store = {
    get() { try { return JSON.parse(localStorage.getItem('greff:favs')) || []; } catch { return []; } },
    set(v) { try { localStorage.setItem('greff:favs', JSON.stringify(v)); } catch { /* sem armazenamento */ } }
  };
  const favKey = c => `${c.marca}|${c.modelo}|${c.versao}|${c.ano}|${c.km}`;
  let favs = new Set(store.get());

  /* ---------- Estado dos filtros ---------- */
  const PAGE = 12;
  const state = { q: '', marca: '', tipo: '', cambio: '', preco: '', ordem: 'rel', soFavs: false, limite: PAGE };

  const filtrar = () => {
    const q = norm(state.q.trim());
    let r = ESTOQUE.filter(c =>
      (!q || q.split(/\s+/).every(t => norm(nome(c) + ' ' + c.categoria + ' ' + c.cor).includes(t))) &&
      (!state.marca || c.marca === state.marca) &&
      (!state.tipo || c.categoria === state.tipo) &&
      (!state.cambio || c.cambio === state.cambio) &&
      (!state.preco || (c.preco && c.preco <= +state.preco)) &&
      (!state.soFavs || favs.has(favKey(c))));
    const semPreco = c => (c.preco == null ? 1 : 0);
    const ord = {
      rel: (a, b) => isDestaque(b) - isDestaque(a) || semPreco(a) - semPreco(b) || a.id - b.id,
      menor: (a, b) => semPreco(a) - semPreco(b) || a.preco - b.preco,
      maior: (a, b) => semPreco(a) - semPreco(b) || b.preco - a.preco,
      novo: (a, b) => b.ano - a.ano || semPreco(a) - semPreco(b),
      km: (a, b) => (a.km == null) - (b.km == null) || a.km - b.km
    };
    return r.sort(ord[state.ordem]);
  };

  /* ---------- Cards ---------- */
  const foto = (c, cls = '') => c.foto
    ? `<img class="${cls}" src="${c.foto}" alt="${esc(nome(c))}, cor ${esc(c.cor.toLowerCase())}" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'nophoto',innerHTML:'<svg><use href=#i-car /></svg>Foto em breve'}))">`
    : `<div class="nophoto"><svg><use href="#i-car"/></svg>Foto em breve</div>`;

  const specs = c => [c.ano, c.km != null ? num(c.km) + ' km' : '', c.cambio, c.combustivel].filter(Boolean).map(s => `<li>${s}</li>`).join('');
  const msgInteresse = c => `Olá! Tenho interesse no ${nome(c)}${c.preco ? ' (' + brl(c.preco) + ')' : ''}, cor ${c.cor.toLowerCase()}. Ainda está disponível?`;

  const card = c => `
    <article class="car">
      <div class="car__media">
        ${foto(c)}
        ${isDestaque(c) ? '<span class="car__badge">Destaque</span>' : ''}
        <button class="car__fav ${favs.has(favKey(c)) ? 'on' : ''}" data-fav="${c.id}" aria-label="Favoritar ${esc(c.modelo)}" aria-pressed="${favs.has(favKey(c))}"><svg><use href="#i-heart"/></svg></button>
      </div>
      <div class="car__body">
        <div>
          <p class="car__brand">${esc(c.marca)}</p>
          <h3 class="car__name">${esc(c.modelo)}</h3>
          <p class="car__ver">${esc(c.versao)}</p>
        </div>
        <ul class="specs">${specs(c)}</ul>
        <div class="car__foot">
          ${c.preco ? `<span class="price">${brl(c.preco)}</span>` : '<span class="price price--ask">Consulte o valor</span>'}
          <a class="car__wa" href="${wa(msgInteresse(c))}" target="_blank" rel="noopener" aria-label="Perguntar sobre ${esc(c.modelo)} no WhatsApp"><svg><use href="#i-wa"/></svg></a>
        </div>
      </div>
      <button class="car__open" data-open="${c.id}" aria-label="Ver detalhes: ${esc(nome(c))}"></button>
    </article>`;

  const grid = $('#grid');
  const render = () => {
    const r = filtrar();
    grid.innerHTML = r.slice(0, state.limite).map(card).join('');
    $('#empty').hidden = r.length > 0;
    $('#more').hidden = r.length <= state.limite;
    $('#more').textContent = `Ver mais veículos (${r.length - state.limite})`;
    $('#resultCount').textContent = r.length === ESTOQUE.length ? `${r.length} veículos disponíveis`
      : `${r.length} de ${ESTOQUE.length} veículos`;
    renderChips();
    $$('.cat').forEach(b => b.classList.toggle('on', b.dataset.tipo === state.tipo));
    $('#favToggle').classList.toggle('on', state.soFavs);
  };

  const rotulos = { q: v => `“${v}”`, marca: v => v, tipo: v => v, cambio: v => v, preco: v => `Até ${brl(+v)}`, soFavs: () => 'Favoritos' };
  const renderChips = () => {
    $('#activeChips').innerHTML = Object.keys(rotulos).filter(k => state[k]).map(k =>
      `<button class="chip" data-clear="${k}" aria-label="Remover filtro ${esc(rotulos[k](state[k]))}">${esc(rotulos[k](state[k]))}<svg><use href="#i-x"/></svg></button>`).join('');
  };

  const sync = () => { // estado -> controles
    $('#q').value = state.q; $('#sMarca').value = state.marca; $('#sCambio').value = state.cambio;
    $('#sPreco').value = state.preco; $('#sOrdem').value = state.ordem;
    $('#fMarca').value = state.marca; $('#fTipo').value = state.tipo; $('#fPreco').value = state.preco;
    updateFinder();
  };
  const set = patch => { Object.assign(state, patch, { limite: PAGE }); sync(); render(); };
  const irEstoque = () => $('#estoque').scrollIntoView();

  /* ---------- Popular selects, categorias, números ---------- */
  const marcas = [...new Set(ESTOQUE.map(c => c.marca))].sort((a, b) => a.localeCompare(b, 'pt'));
  const ordemTipos = ['SUV', 'Sedan', 'Hatch', 'Picape', 'Minivan', 'Utilitário', 'Moto'];
  const tipos = ordemTipos.filter(t => ESTOQUE.some(c => c.categoria === t));
  const opts = arr => arr.map(v => `<option>${esc(v)}</option>`).join('');
  $('#fMarca').insertAdjacentHTML('beforeend', opts(marcas));
  $('#sMarca').insertAdjacentHTML('beforeend', opts(marcas));
  $('#fTipo').insertAdjacentHTML('beforeend', opts(tipos));
  $('#cats').innerHTML = tipos.map(t =>
    `<button class="cat" data-tipo="${t}">${t}<small>${ESTOQUE.filter(c => c.categoria === t).length}</small></button>`).join('');

  const precos = ESTOQUE.filter(c => c.preco).map(c => c.preco);
  $('#stQtd').textContent = ESTOQUE.length;
  $('#stMarcas').textContent = marcas.length;
  $('#stMin').textContent = 'R$ ' + (Math.min(...precos) / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil';

  /* ---------- Hero: destaques da semana ---------- */
  $('#heroDeck').innerHTML = ESTOQUE.filter(c => isDestaque(c) && c.foto).slice(0, 2).map(c => `
    <button class="deck" data-open="${c.id}">
      <img src="${c.foto}" alt="${esc(nome(c))}">
      <span class="deck__tag">Destaque da semana</span>
      <span class="deck__info"><b>${esc(c.marca)} ${esc(c.modelo)}</b><span>${c.ano} · ${num(c.km)} km · ${c.cambio}</span><strong>${brl(c.preco)}</strong></span>
    </button>`).join('');

  /* ---------- Busca do hero ---------- */
  const finderVals = () => ({ marca: $('#fMarca').value, tipo: $('#fTipo').value, preco: $('#fPreco').value });
  function updateFinder() {
    const f = finderVals();
    const n = ESTOQUE.filter(c => (!f.marca || c.marca === f.marca) && (!f.tipo || c.categoria === f.tipo) && (!f.preco || (c.preco && c.preco <= +f.preco))).length;
    $('#finderCount').textContent = n ? `Ver ${n} ${n === 1 ? 'veículo' : 'veículos'}` : 'Nenhum — ver todos';
  }
  $('#finder').addEventListener('change', updateFinder);
  $('#finder').addEventListener('submit', e => {
    e.preventDefault();
    const f = finderVals();
    const n = ESTOQUE.some(c => (!f.marca || c.marca === f.marca) && (!f.tipo || c.categoria === f.tipo) && (!f.preco || (c.preco && c.preco <= +f.preco)));
    set(n ? { ...f, q: '', cambio: '', soFavs: false } : { marca: '', tipo: '', preco: '', q: '', cambio: '', soFavs: false });
    irEstoque();
  });

  /* ---------- Eventos de filtro ---------- */
  let t;
  $('#q').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; state.limite = PAGE; render(); }, 120); });
  $('#sMarca').addEventListener('change', e => set({ marca: e.target.value }));
  $('#sCambio').addEventListener('change', e => set({ cambio: e.target.value }));
  $('#sPreco').addEventListener('change', e => set({ preco: e.target.value }));
  $('#sOrdem').addEventListener('change', e => set({ ordem: e.target.value }));
  $('#cats').addEventListener('click', e => {
    const b = e.target.closest('.cat'); if (!b) return;
    set({ tipo: state.tipo === b.dataset.tipo ? '' : b.dataset.tipo }); irEstoque();
  });
  $('#activeChips').addEventListener('click', e => {
    const b = e.target.closest('[data-clear]'); if (b) set({ [b.dataset.clear]: b.dataset.clear === 'soFavs' ? false : '' });
  });
  const limpar = () => set({ q: '', marca: '', tipo: '', cambio: '', preco: '', soFavs: false });
  $('#clearFilters').addEventListener('click', limpar);
  $('#more').addEventListener('click', () => { state.limite += PAGE; render(); });
  $('#favToggle').addEventListener('click', () => { set({ soFavs: !state.soFavs }); irEstoque(); });

  const updFavCount = () => { const el = $('#favCount'); el.textContent = favs.size; el.hidden = favs.size === 0; };
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-fav]');
    if (f) {
      const k = favKey(ESTOQUE[+f.dataset.fav]);
      favs.has(k) ? favs.delete(k) : favs.add(k);
      store.set([...favs]); updFavCount();
      if (state.soFavs) render(); else { f.classList.toggle('on'); f.setAttribute('aria-pressed', favs.has(k)); }
      return;
    }
    const o = e.target.closest('[data-open]');
    if (o) abrir(ESTOQUE[+o.dataset.open]);
  });

  /* ---------- Modal de detalhe ---------- */
  const modal = $('#modal');
  function abrir(c) {
    const linhas = [['Ano', c.ano], ['Quilometragem', c.km != null ? num(c.km) + ' km' : 'Consulte'], ['Câmbio', c.cambio || 'Consulte'],
      ['Combustível', c.combustivel || 'Consulte'], ['Cor', c.cor], ['Categoria', c.categoria]];
    $('#modalBody').innerHTML = `
      <div class="modal__media">${foto(c)}</div>
      <div class="modal__info">
        <div>
          <p class="car__brand">${esc(c.marca)}</p>
          <h2 id="mTitle">${esc(c.modelo)}</h2>
          <p class="car__ver">${esc(c.versao)}</p>
        </div>
        <dl class="dl">${linhas.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        <div class="modal__price">
          ${c.preco ? `<span class="price">${brl(c.preco)}</span><small>ou financie com<br>entrada facilitada</small>` : '<span class="price price--ask">Consulte o valor</span>'}
        </div>
        <div class="modal__act">
          <a class="btn btn--wa" href="${wa(msgInteresse(c))}" target="_blank" rel="noopener"><svg><use href="#i-wa"/></svg>Tenho interesse</a>
          ${c.preco ? `<button class="btn btn--ghost" data-sim="${c.id}">Simular financiamento</button>` : ''}
        </div>
      </div>`;
    modal.showModal();
  }
  $('#modalX').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => {
    if (e.target === modal) return modal.close();
    const s = e.target.closest('[data-sim]');
    if (s) { modal.close(); $('#simCar').value = s.dataset.sim; calc(); $('#financie').scrollIntoView(); }
  });

  /* ---------- Simulador ---------- */
  const comPreco = ESTOQUE.filter(c => c.preco).sort((a, b) => nome(a).localeCompare(nome(b), 'pt'));
  $('#simCar').innerHTML = comPreco.map(c => `<option value="${c.id}">${esc(c.marca)} ${esc(c.modelo)} ${c.ano} — ${brl(c.preco)}</option>`).join('')
    + '<option value="outro">Outro valor…</option>';
  const dest = ESTOQUE.find(c => isDestaque(c) && c.preco);
  if (dest) $('#simCar').value = dest.id;
  let prazo = 48;
  const parseBR = s => parseFloat(String(s).replace(/\./g, '').replace(',', '.')) || 0;

  function simDados() {
    const sel = $('#simCar').value;
    const outro = sel === 'outro';
    $('#simValorWrap').hidden = !outro;
    const valor = outro ? parseBR($('#simValor').value) : ESTOQUE[+sel].preco;
    const pct = +$('#simEnt').value;
    const entrada = valor * pct / 100;
    const fin = valor - entrada;
    const i = Math.min(Math.max(parseBR($('#simTaxa').value), 0), 10) / 100;
    const parcela = fin <= 0 ? 0 : i === 0 ? fin / prazo : fin * i / (1 - Math.pow(1 + i, -prazo));
    return { carro: outro ? null : ESTOQUE[+sel], valor, pct, entrada, fin, parcela };
  }
  function calc() {
    const d = simDados();
    $('#simEntOut').textContent = d.valor ? `${d.pct}% · ${brl(d.entrada)}` : `${d.pct}%`;
    $('#simParcela').innerHTML = d.valor ? `${brl(d.parcela)}<small>/mês</small>` : '—';
    $('#simFin').textContent = d.valor ? brl(d.fin) : '—';
  }
  $('#sim').addEventListener('input', calc);
  $('#simPrazo').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    prazo = +b.dataset.n;
    $$('#simPrazo button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); });
    calc();
  });
  $('#sim').addEventListener('submit', e => {
    e.preventDefault();
    const d = simDados();
    if (!d.valor) { $('#simValor').focus(); return; }
    const alvo = d.carro ? `o ${nome(d.carro)} (${brl(d.valor)})` : `um veículo de ${brl(d.valor)}`;
    window.open(wa(`Olá! Fiz uma simulação no site para ${alvo}:\n• Entrada: ${brl(d.entrada)} (${d.pct}%)\n• Prazo: ${prazo}x\n• Parcela estimada: ${brl(d.parcela)}\nPodem me passar as condições reais?`), '_blank', 'noopener');
  });

  /* ---------- Venda seu carro ---------- */
  $('#sell').addEventListener('submit', e => {
    e.preventDefault();
    const v = id => $(id).value.trim();
    const km = v('#vKm');
    window.open(wa(`Olá! Sou ${v('#vNome')} e gostaria de uma avaliação do meu veículo:\n• ${v('#vModelo')} — ${v('#vAno')}${km ? `\n• ${km} km` : ''}\n${$('#vTroca').checked ? 'Tenho interesse em usar na troca por um carro da loja.' : 'Quero vender.'}`), '_blank', 'noopener');
  });

  /* ---------- Aberto agora? (horário de Brasília) ---------- */
  (function status() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false })
      .formatToParts(new Date()).map(x => [x.type, x.value]));
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    const hora = (+p.hour % 24) + +p.minute / 60;
    const h = LOJA.horario[dia];
    const fmt = x => `${Math.floor(x)}h${x % 1 ? String(Math.round((x % 1) * 60)).padStart(2, '0') : ''}`;
    const el = $('#status');
    if (h && hora >= h[0] && hora < h[1]) {
      el.classList.add('is-open');
      el.lastElementChild.innerHTML = `<b>Aberto agora</b> · até ${fmt(h[1])}`;
    } else {
      let d = dia, quando = 'hoje';
      if (!(h && hora < h[0])) { do { d = (d + 1) % 7; } while (!LOJA.horario[d]); quando = d === (dia + 1) % 7 ? 'amanhã' : ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'][d]; }
      el.lastElementChild.textContent = `Fechado · abre ${quando} às ${fmt(LOJA.horario[d][0])}`;
    }
  })();

  /* ---------- Header, menu, animações ---------- */
  const header = $('#header'), burger = $('#burger'), nav = $('#nav');
  const onScroll = () => header.classList.toggle('is-stuck', scrollY > 36);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const menu = open => { nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => menu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => e.target.matches('a') && menu(false));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.sec-head, .why li, .duo > *, .about > *, .contact__in > *').forEach(el => { el.classList.add('reveal'); io.observe(el); });
  }

  $('#year').textContent = new Date().getFullYear();
  updFavCount(); sync(); render(); calc();
})();
