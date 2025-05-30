// PWA 서비스 워커 등록
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('SW registered'))
    .catch(console.error);
}

// 화면 전환 함수
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ① 앱 시작 스플래시 → 3초 후 로그인 화면
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => showScreen('login-screen'), 3000);
});

// ② 로그인 폼 처리
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value.trim();
  const pw = document.getElementById('user-pw').value.trim();

  // 예시 인증 (원하는 로직으로 교체)
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');
    // 이후 원하는 화면으로 전환하거나 로직 추가 가능
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});
