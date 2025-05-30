// 1) 스플래시 화면 띄우기 & 3초 뒤에 로그인 화면으로 전환
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const login = document.getElementById('login-screen');

  // 3초 뒤에 스플래시 숨기고 로그인 보이기
  setTimeout(() => {
    splash.classList.add('hidden');
    login.classList.remove('hidden');
  }, 3000);
});

// 2) 로그인 폼 처리 (여기서는 단순 예시)
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value;
  const pw = document.getElementById('user-pw').value;

  // TODO: 실제 인증 로직 필요 (예: 서버 요청)
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');
    // 로그인 후 다음 화면으로 이동하거나 토큰 저장 등 처리
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});
// 화면 전환 함수
function showScreen(screenId) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(screenId)
    .classList.add('active');
}

// 초기 화면: 로그인
document.addEventListener('DOMContentLoaded', () => {
  showScreen('login-screen');
});

// 로그인 성공 시 홈으로 이동
document.getElementById('login-form')
  .addEventListener('submit', e => {
    e.preventDefault();
    // TODO: 실제 인증 로직
    showScreen('home-screen');
    history.pushState({screen:'home'}, '', '#home');
  });

// 홈 → 설정
document.getElementById('goto-settings')
  .addEventListener('click', () => {
    showScreen('settings-screen');
    history.pushState({screen:'settings'}, '', '#settings');
  });

// 설정 → 홈
document.getElementById('goto-home')
  .addEventListener('click', () => {
    showScreen('home-screen');
    history.pushState({screen:'home'}, '', '#home');
  });

// 뒤로가기(브라우저 히스토리) 처리
window.addEventListener('popstate', e => {
  const screen = e.state?.screen || 'login';
  showScreen(screen + '-screen');
});
