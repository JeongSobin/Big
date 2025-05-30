// 서비스 워커 등록 (PWA 필수)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('SW registered'))
    .catch(console.error);
}

// 화면 전환 함수
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// ① 앱 시작: 3초간 스플래시 보여준 뒤 로그인 화면
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => showScreen('login-screen'), 3000);
});

// ② 로그인 처리 + 위치 권한 요청
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value.trim();
  const pw = document.getElementById('user-pw').value.trim();

  // 예시 인증 로직 (원하는 대로 교체)
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');
    showScreen('home-screen');
    history.pushState({screen:'home'}, '', '#home');

    // 위치 권한 요청
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => console.log('위치 허용됨:', pos.coords),
        err => console.warn('위치 요청 에러:', err.message)
      );
    }
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});

// ③ 홈 ↔ 설정 화면 전환
document.getElementById('goto-settings').addEventListener('click', () => {
  showScreen('settings-screen');
  history.pushState({screen:'settings'}, '', '#settings');
});
document.getElementById('goto-home').addEventListener('click', () => {
  showScreen('home-screen');
  history.pushState({screen:'home'}, '', '#home');
});

// ④ 브라우저 뒤로가기(popstate) 처리
window.addEventListener('popstate', e => {
  const s = e.state?.screen || 'login';
  showScreen(s + '-screen');
});
