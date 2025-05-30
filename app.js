const form  = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list  = document.getElementById('todo-list');

// 1) Service Worker 등록 (PWA 핵심)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('SW registered'))
    .catch(console.error);
}

// 2) 로컬스토리지에서 불러오기
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
render();

// 3) 할 일 추가
form.addEventListener('submit', e => {
  e.preventDefault();
  todos.push(input.value);
  input.value = '';
  saveAndRender();
});

// 4) 할 일 삭제
list.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const idx = e.target.dataset.idx;
    todos.splice(idx, 1);
    saveAndRender();
  }
});

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.textContent = todo;
    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.dataset.idx = i;
    li.appendChild(btn);
    list.appendChild(li);
  });
}
