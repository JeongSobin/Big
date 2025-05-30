// 서비스 워커 등록 (PWA 필수)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(console.error);
}

// ① 화면 전환 함수
function showScreen(screenId) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(screenId)
    .classList.add('active');
}

// ② DOMContentLoaded 시 초기 화면 설정 (스플래시 → 로그인)
document.addEventListener('DOMContentLoaded', () => {
  // 스플래시 3초 뒤 로그인 화면으로 전환
  setTimeout(() => {
    showScreen('login-screen');
  }, 3000);
});

// ③ 로그인 폼 처리 + 위치 권한 요청
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value;
  const pw = document.getElementById('user-pw').value;

  // 예시 인증 로직 (원하는 값으로 변경)
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');

    // 홈 화면으로 전환
    showScreen('home-screen');
    history.pushState({ screen: 'home' }, '', '#home');

    // 위치 권한 요청
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos  => console.log('위치 허용됨:', pos.coords),
        err  => console.warn('위치 요청 에러:', err.message)
      );
    } else {
      console.warn('이 브라우저는 Geolocation을 지원하지 않습니다.');
    }

  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});

// ④ 홈 → 설정, 설정 → 홈 버튼 이벤트
document.getElementById('goto-settings').addEventListener('click', () => {
  showScreen('settings-screen');
  history.pushState({ screen: 'settings' }, '', '#settings');
});
document.getElementById('goto-home').addEventListener('click', () => {
  showScreen('home-screen');
  history.pushState({ screen: 'home' }, '', '#home');
});

// ⑤ 브라우저 뒤로가기(popstate) 처리
window.addEventListener('popstate', e => {
  const screen = e.state?.screen || 'login';
  showScreen(screen + '-screen');
});
