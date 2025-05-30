// ① 화면 전환 함수 (이전과 동일)
function showScreen(screenId) {
  document.querySelectorAll('.screen')
    .forEach(el => el.classList.remove('active'));
  document.getElementById(screenId)
    .classList.add('active');
}

// ② DOMContentLoaded 시 초기 화면
document.addEventListener('DOMContentLoaded', () => {
  showScreen('login-screen');
});

// ③ 로그인 폼 처리 + 위치 권한 요청
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('user-id').value;
  const pw = document.getElementById('user-pw').value;

  // 예시 인증 로직
  if (id === 'test' && pw === '1234') {
    alert('로그인 성공!');

    // 홈 화면으로 전환
    showScreen('home-screen');
    history.pushState({screen:'home'}, '', '#home');

    // --- 위치 동의 팝업 요청 ---
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log('위치 허용됨:', pos.coords);
          // 위치 기반 추가 로직 가능
        },
        err => {
          console.warn('위치 요청 에러:', err.message);
        }
      );
    } else {
      console.warn('이 브라우저는 Geolocation을 지원하지 않습니다.');
    }

  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});

// ④ 홈 → 설정, 설정 → 홈, popstate 처리 (이전 예제와 동일)
document.getElementById('goto-settings').addEventListener('click', () => {
  showScreen('settings-screen');
  history.pushState({screen:'settings'}, '', '#settings');
});
document.getElementById('goto-home').addEventListener('click', () => {
  showScreen('home-screen');
  history.pushState({screen:'home'}, '', '#home');
});
window.addEventListener('popstate', e => {
  const screen = e.state?.screen || 'login';
  showScreen(screen + '-screen');
});
