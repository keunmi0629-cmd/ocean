/* 데이터.js가 먼저 로드되므로 file:// 환경에서도 별도 서버 없이 작동합니다. */
(() => {
  'use strict';
  const data = typeof 장데이터 !== 'undefined' && Array.isArray(장데이터) ? 장데이터 : [];
  const q = document.getElementById('q');
  const list = document.getElementById('list');
  const count = document.getElementById('count');

  // 문자열을 HTML에 안전하게 출력합니다. 백서의 마크다운 표기만 제한적으로 변환합니다.
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const format = source => esc(source)
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  function render(items) {
    count.textContent = `결과 ${items.length}건`;
    list.replaceChildren();
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = '검색 결과가 없습니다. 다른 키워드로 검색해 주세요.';
      list.append(empty);
      return;
    }
    for (const item of items) {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `<div class="card-top"><span class="label">제${esc(item.장)}장</span></div><h2 class="title">${esc(item.제목)}</h2><div class="body">${format(item.본문)}</div>`;
      list.append(card);
    }
  }
  function search() {
    const keyword = q.value.trim().toLocaleLowerCase();
    const filtered = keyword ? data.filter(item =>
      String(item.제목 ?? '').toLocaleLowerCase().includes(keyword) ||
      String(item.본문 ?? '').toLocaleLowerCase().includes(keyword)
    ) : data;
    render(filtered);
  }
  q.addEventListener('input', search);
  search();
})();
