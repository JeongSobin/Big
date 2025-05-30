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
